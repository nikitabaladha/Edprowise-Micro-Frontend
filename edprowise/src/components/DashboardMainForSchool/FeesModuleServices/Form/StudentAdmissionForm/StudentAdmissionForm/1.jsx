import React from "react";
import { useLocation } from "react-router-dom";

const formatDate = (isoDate) => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const AdmissionOfficialInformation = () => {
  const location = useLocation();
  const student = location.state?.student;

  if (!student) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">No student data available.</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow border-0">
            <div
              className="card-header  text-white text-center"
              style={{ backgroundColor: "rgb(169, 255, 253)" }}
            >
              <h4 className="mb-0">Student Admission Details</h4>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover text-center">
                  <tbody>
                    <tr>
                      <th>Application Received Date</th>
                      <td>{formatDate(student?.createdAt)}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>{student.paymentMode || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Transaction No./Cheque No.</th>
                      <td>{student?.transactionNumber || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Receipt No.</th>
                      <td>{student?.receiptNumber || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Date Of Receipt</th>
                      <td>{formatDate(student?.applicationDate)}</td>
                    </tr>
                    <tr>
                      <th>Admission No.</th>
                      <td>{student?.AdmissionNumber || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionOfficialInformation;
