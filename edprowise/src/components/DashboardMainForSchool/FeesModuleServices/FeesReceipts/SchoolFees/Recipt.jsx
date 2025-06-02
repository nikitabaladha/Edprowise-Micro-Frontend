import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
  const location = useLocation();
  const receiptDetails = location.state;

  useEffect(() => {
    console.log("receiptDetails", receiptDetails);
  }, [receiptDetails]);

  if (
    !receiptDetails ||
    !Array.isArray(receiptDetails) ||
    receiptDetails.length === 0
  ) {
    return <div className="container my-4">No receipt data found</div>;
  }

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");
    const options = {
      filename: `fees_receipt_${receiptDetails[0].receiptNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Fees Receipt</strong>
        </h4>
        <div>
          <button
            onClick={printReceipt}
            className="btn btn-outline-primary me-2"
            style={{ borderRadius: "20px" }}
          >
            <FaPrint className="me-1" /> Print
          </button>
          <button
            onClick={downloadReceiptAsPDF}
            className="btn btn-primary"
            style={{ borderRadius: "20px" }}
          >
            <FaDownload className="me-1" /> Download PDF
          </button>
        </div>
      </div>

      <div id="receipt-content">
        {receiptDetails.map((receipt, receiptIndex) =>
          receipt.installments.map((installment, instIndex) => (
            <div
              key={`${receiptIndex}-${instIndex}`}
              className="p-4 shadow-sm mb-5"
              style={{
                backgroundColor: "#ffff",
                pageBreakAfter: "always",
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              {/* Header */}
              <div className="text-center mb-2 text-sm">
                <h2 className="text-primary mb-1">ABC International School</h2>
                <p className="mb-1">123 Education Street, Knowledge City</p>
                <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
                <div className="d-flex justify-content-center">
                  <div
                    style={{
                      borderTop: "2px solid #0d6efd",
                      width: "100%",
                      margin: "0 10px",
                    }}
                  ></div>
                </div>
              </div>

              <h3
                className="text-center text-uppercase mb-3"
                style={{ color: "#0d6efd" }}
              >
                <strong>Fees Receipt</strong>
              </h3>

              {/* Student Details */}
              <div className="row mb-2 text-black">
                <div className="col-md-6">
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Receipt No:
                    </span>
                    <span>{receipt.receiptNumber}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Student Name:
                    </span>
                    <span>{receipt.studentName}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Admission No:
                    </span>
                    <span>{receipt.studentAdmissionNumber}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Date:
                    </span>
                    <span>{receipt.date}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Academic Year:
                    </span>
                    <span>{receipt.academicYear}</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Class/Section:
                    </span>
                    <span>
                      {receipt.className}/{receipt.section}
                    </span>
                  </div>
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "120px" }}
                    >
                      Installment:
                    </span>
                    <span>{installment.number}</span>
                  </div>
                </div>
              </div>

              {/* Installment Table */}
              <div className="table-responsive mb-3">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center">Fee Type</th>
                      <th className="text-center">Fees Amt (₹)</th>
                      <th className="text-center">Concession (₹)</th>
                      <th className="text-center">Fine (₹)</th>
                      <th className="text-center">Fees Payable (₹)</th>
                      <th className="text-center">Fees Paid (₹)</th>
                      <th className="text-center">Balance (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {installment.feeItems.map((item, itemIndex) => (
                      <tr key={itemIndex}>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.amount}</td>
                        <td className="text-center text-danger">
                          {item.concession}
                        </td>
                        <td className="text-center">{item.fineAmount}</td>
                        <td className="text-center">{item.payable}</td>
                        <td className="text-center">{item.paid}</td>
                        <td className="text-center">{item.balance}</td>
                      </tr>
                    ))}

                    {/* Totals Row */}
                    <tr className="table-secondary fw-bold">
                      <td className="text-center">Total</td>
                      <td className="text-center">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.amount),
                          0
                        )}
                      </td>
                      <td className="text-center text-danger">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.concession),
                          0
                        )}
                      </td>
                      <td className="text-center">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.fineAmount),
                          0
                        )}
                      </td>
                      <td className="text-center">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.payable),
                          0
                        )}
                      </td>
                      <td className="text-center">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.paid),
                          0
                        )}
                      </td>
                      <td className="text-center">
                        {installment.feeItems.reduce(
                          (sum, item) => sum + Number(item.balance),
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div
                className="row mb-2 text-black"
                style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
              >
                <div className="col-md-6">
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "150px" }}
                    >
                      Payment Mode:
                    </span>
                    <span className="text-capitalize">
                      {receipt.paymentMode}
                    </span>
                  </div>
                  {!["cash", "cheque"].includes(
                    receipt.paymentMode?.toLowerCase()
                  ) && (
                    <div className="d-flex mb-2">
                      <span
                        className="fw-bold me-2"
                        style={{ minWidth: "150px" }}
                      >
                        Transaction ID:
                      </span>
                      <span>{receipt.transactionNumber || "N/A"}</span>
                    </div>
                  )}
                  {receipt.paymentMode?.toLowerCase() === "cheque" && (
                    <>
                      <div className="d-flex mb-2">
                        <span
                          className="fw-bold me-2"
                          style={{ minWidth: "150px" }}
                        >
                          Cheque No:
                        </span>
                        <span>{receipt.transactionNumber || "N/A"}</span>
                      </div>
                      <div className="d-flex mb-2">
                        <span
                          className="fw-bold me-2"
                          style={{ minWidth: "150px" }}
                        >
                          Bank Name:
                        </span>
                        <span>{receipt.bankName || "N/A"}</span>
                      </div>
                    </>
                  )}
                  <div className="d-flex mb-2">
                    <span
                      className="fw-bold me-2"
                      style={{ minWidth: "150px" }}
                    >
                      Date of Payment:
                    </span>
                    <span>{receipt.paymentDate}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 text-center" style={{ height: "100%" }}>
                    <p className="mb-4">Authorized Signature</p>
                    <div
                      className="mt-4 pt-3"
                      style={{ borderTop: "1px solid #dee2e6" }}
                    >
                      <p className="mb-0 fw-bold">
                        {receipt.collectorName || "School Administrator"}
                      </p>
                      <p className="mb-0 small text-muted">Receipt Collector</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-center mt-2 pt-3 mb-1"
                style={{
                  borderTop: "2px solid #0d6efd",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <p className="small text-muted mb-1">
                  This is a computer generated receipt and does not require a
                  physical signature.
                </p>
                <p className="small text-muted">
                  For any queries, please contact accounts@abcschool.edu or call
                  +1234567890
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeesReceipt;
