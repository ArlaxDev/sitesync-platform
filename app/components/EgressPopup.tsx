import React, { useState } from 'react';

const EgressPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRunEgressScript = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button
                onClick={handleRunEgressScript}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Open Egress Simulation
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Egress Simulation</h2>
                        <div className="bg-gray-100 p-4 rounded-md overflow-hidden">
                            <img
                                src="http://localhost:5001/video_feed"
                                alt="Egress Simulation"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EgressPopup;
