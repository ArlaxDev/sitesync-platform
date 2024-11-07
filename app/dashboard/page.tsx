"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { FiUser, FiLogOut, FiPlusSquare, FiFile } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Drawing {
  urn: string;
  metadata: object;
  name: string;
  thumbnail?: string;
  token: string;
}

interface ElementInfo {
  type: string;
  count: number;
  details: { id: number; name: string; location: string }[];
}

const DashboardPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [elementInfo, setElementInfo] = useState<ElementInfo[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router, supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push("/login");
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadStatus("Starting upload and processing...");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/tools/analyzer/upload-and-translate", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const { urn, token } = await uploadResponse.json();
        console.log("File uploaded and translation started:", urn);

        setUploadStatus("Processing file. Please wait...");
        const metadata = await pollTranslationStatus(urn);

        if (metadata) {
          const thumbnail = extractThumbnail(metadata, token);
          setUploadStatus("File processed successfully!");
          setDrawings((prev) => [
            ...prev,
            { urn, metadata, name: file.name, thumbnail, token },
          ]);
        } else {
          setUploadStatus("Translation failed or timed out.");
        }
      } else {
        setUploadStatus("File upload or translation failed.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadStatus("Error processing file.");
    }
  };

  const pollTranslationStatus = async (urn: string) => {
    const maxAttempts = 30;
    const delay = 8000;
    let attempt = 0;

    while (attempt < maxAttempts) {
      attempt++;
      try {
        const response = await fetch(`/api/tools/analyzer/poll-translation-status?urn=${urn}`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            return data;
          }
          console.log("Translation not complete, checking again...");
        } else {
          console.error("Failed to fetch translation status:", await response.text());
        }
      } catch (error) {
        console.error("Error polling translation status:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return null;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      await handleFileUpload(file);
    }
  };

  const extractThumbnail = (metadata: any, token: string): string | undefined => {
    const thumbnailChild = metadata.derivatives
      ?.find((d: any) => d.outputType === "thumbnail")
      ?.children?.find((child: any) => child.role === "thumbnail");

    return thumbnailChild
      ? `https://developer.api.autodesk.com/oss/v2/buckets/${thumbnailChild.urn}?access_token=${token}`
      : undefined;
  };

  const handleDrawingClick = (drawing: Drawing) => {
    setSelectedDrawing(drawing);
    setElementInfo([]); // Reset element info on each click
  };

  const closeModal = () => {
    setSelectedDrawing(null);
    setElementInfo([]);
  };

  const fetchModelGuid = async (urn: string, token: string) => {
    const response = await fetch('/api/tools/analyzer/get-model-guid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urn, token }),
    });
    const data = await response.json();
    return data.modelGuid;
  };

  const fetchElementCounts = async () => {
    if (!selectedDrawing) return;

    try {
      const modelGuid = await fetchModelGuid(selectedDrawing.urn, selectedDrawing.token);

      const response = await fetch('/api/tools/analyzer/count-elements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urn: selectedDrawing.urn,
          modelGuid,
          token: selectedDrawing.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch element counts");
      }

      const data = await response.json();
      const formattedElementInfo = data.elementInfo.map((element: ElementInfo) => ({
        ...element,
        details: element.details || [],
      }));

      setElementInfo(formattedElementInfo);
    } catch (error) {
      console.error("Error fetching element counts:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 left-6">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="SiteSync Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <div className="absolute top-4 right-6">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400">
              <FiUser className="text-gray-600 text-xl" />
            </Menu.Button>
          </div>
          <Transition as={Fragment}>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <FiLogOut className="mr-3" />
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 p-6 max-w-4xl">
        {drawings.map((drawing, index) => (
          <div
            key={index}
            onClick={() => handleDrawingClick(drawing)}
            className="flex flex-col items-center justify-center w-40 h-40 bg-white shadow-md rounded-lg cursor-pointer"
          >
            {drawing.thumbnail ? (
              <img src={drawing.thumbnail} alt="Thumbnail" className="w-full h-24 object-cover rounded-md" />
            ) : (
              <FiFile className="text-gray-500 text-4xl" />
            )}
            <span className="mt-2 text-sm text-gray-700 text-center">{drawing.name}</span>
          </div>
        ))}

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-400 text-gray-400 rounded-lg cursor-pointer hover:border-blue-500 hover:text-blue-500"
        >
          <input
            id="file-upload"
            type="file"
            accept=".rvt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <FiPlusSquare className="text-4xl mb-2" />
          <span className="text-sm">Upload Drawing</span>
        </label>
      </div>

      {uploadStatus && <p className="mt-4 text-sm text-gray-600">{uploadStatus}</p>}

      {selectedDrawing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">{selectedDrawing.name}</h2>
            {selectedDrawing.thumbnail ? (
              <img src={selectedDrawing.thumbnail} alt="Thumbnail" className="w-60 h-60 object-cover rounded-md" />
            ) : (
              <p className="text-gray-600">No thumbnail available</p>
            )}
            <button
              onClick={fetchElementCounts}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Count Elements
            </button>
            <button
              onClick={closeModal}
              className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
            {elementInfo && elementInfo.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Element Counts</h3>
                <ul className="text-sm text-gray-700">
                  {elementInfo.map((element) => (
                    <li key={element.type}>
                      <strong>{element.type}</strong>: {element.count}
                      <ul>
                        {element.details && element.details.map((detail) => (
                          <li key={detail.id} className="ml-4">
                            ID: {detail.id}, Name: {detail.name}, Location: {detail.location}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
