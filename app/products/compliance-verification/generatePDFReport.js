import { jsPDF } from "jspdf";

// Mock data example for non-compliant features
const nonCompliantFeatures = [
    {
        title: "Insufficient Exit Width",
        description: "The main exit width is below the minimum required standard.",
        recommendation: "Widen the main exit to meet building code requirements.",
        codeReference: "Atlanta Building Code, Section 1011.3",
        estimatedCostSavings: "$5,000",
    },
    {
        title: "Inadequate Room Capacity",
        description: "Room occupancy exceeds safe capacity limits.",
        recommendation: "Reduce room capacity or increase space.",
        codeReference: "Atlanta Fire Code, Section 1029.2",
        estimatedCostSavings: "$3,000",
    },
    // Add more as needed
];

export const downloadPDFReport = (companyDetails) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Compliance Verification Report", 105, 20, null, null, "center");

    // Company Info Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Company:", 20, 40);
    doc.setFont("helvetica", "bold");
    doc.text(companyDetails.name, 50, 40);

    doc.setFont("helvetica", "normal");
    doc.text("Project:", 20, 50);
    doc.setFont("helvetica", "bold");
    doc.text(companyDetails.project, 50, 50);

    doc.setFont("helvetica", "normal");
    doc.text("Location:", 20, 60);
    doc.setFont("helvetica", "bold");
    doc.text(companyDetails.location, 50, 60);

    doc.setFont("helvetica", "normal");
    doc.text("Room:", 20, 70);
    doc.setFont("helvetica", "bold");
    doc.text(companyDetails.room, 50, 70);

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 80, 190, 80);

    // Non-Compliant Features Section Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Non-Compliant Features", 20, 90);

    // Non-Compliant Features
    nonCompliantFeatures.forEach((feature, index) => {
        const startY = 100 + index * 40;

        // Feature Title
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${feature.title}`, 20, startY);

        // Feature Details
        doc.setFont("helvetica", "normal");
        doc.text("Description:", 30, startY + 8);
        doc.text(feature.description, 60, startY + 8);

        doc.text("Recommendation:", 30, startY + 16);
        doc.text(feature.recommendation, 60, startY + 16);

        doc.text("Code Reference:", 30, startY + 24);
        doc.text(feature.codeReference, 60, startY + 24);

        doc.text("Estimated Cost Savings:", 30, startY + 32);
        doc.text(feature.estimatedCostSavings, 90, startY + 32);
    });

    // Line separator
    doc.line(20, 180, 190, 180);

    // Summary Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Compliance Summary", 20, 190);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
        "Resolving these compliance issues will ensure regulatory adherence, enhance workplace safety, and improve overall project efficiency.",
        20,
        200,
        { maxWidth: 170 }
    );

    // Cost Savings Chart Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Potential Cost Savings", 20, 220);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
        "Addressing these non-compliance issues could save the company significant expenses by avoiding fines, minimizing project delays, and enhancing safety.",
        20,
        230,
        { maxWidth: 170 }
    );

    // Download PDF
    doc.save("Compliance_Verification_Report.pdf");
};
