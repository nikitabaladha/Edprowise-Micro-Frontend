import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAutorenew } from "react-icons/md";

const RentDetails = () => {
  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const navigate = useNavigate();
  const [rentData, setRentData] = useState(
    months.reduce((acc, month) => {
      acc[month] = {
        rent: "",
        city: "",
        landlordName: "",
        landlordPan: "",
        landlordAddress: "",
        receipt: null,
      };
      return acc;
    }, {})
  );

  const handleChange = (month, field, value) => {
    setRentData((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [field]: value,
      },
    }));
  };

  const handleFileChange = (month, file) => {
    setRentData((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        receipt: file,
      },
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    House Rent Details
                  </h4>
                  <button
                    type="button "
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="table-responsive mb-2">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Month
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Declared Rent
                        </th>
                        <th
                          className="text-center align-content-center border border-dark text-nowrap p-2"
                          style={{ minWidth: "9rem" }}
                        >
                          City
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Name of Landlord
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          PAN of Landlord
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Address of Landlord
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Upload Rent Receipt
                        </th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((month, index) => (
                        <tr key={month} className="payroll-table-body">
                          <td className="text-center align-content-center border border-dark p-2">
                            {month}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={rentData[month].rent}
                              onChange={(e) =>
                                handleChange(month, "rent", e.target.value)
                              }
                            />
                          </td>
                          <td
                            className="text-end border border-dark p-2"
                            style={{ minWidth: "9rem" }}
                          >
                            <select
                              className="form-control payroll-table-body payroll-input-border"
                              required
                              value={rentData[month].city}
                              onChange={(e) =>
                                handleChange(month, "city", e.target.value)
                              }
                            >
                              <option value="">Select City</option>
                              <option value="Metro">Metro</option>
                              <option value="Non-Metro">Non-Metro</option>
                            </select>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={rentData[month].landlordName}
                              onChange={(e) =>
                                handleChange(
                                  month,
                                  "landlordName",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={rentData[month].landlordPan}
                              onChange={(e) =>
                                handleChange(
                                  month,
                                  "landlordPan",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={rentData[month].landlordAddress}
                              onChange={(e) =>
                                handleChange(
                                  month,
                                  "landlordAddress",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="file"
                              className="form-control payroll-input-border"
                              accept="image/*,application/pdf"
                              onChange={(e) =>
                                handleFileChange(month, e.target.files[0])
                              }
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-primary fs-4 custom-submit-button"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title="Auto fill same previous month's data"
                                onClick={() => {
                                  const prevMonth = months[index - 1];
                                  const prevData = rentData[prevMonth];
                                  setRentData((prev) => ({
                                    ...prev,
                                    [month]: {
                                      ...prevData,
                                      receipt: null, // Don't copy file
                                    },
                                  }));
                                }}
                              >
                                <MdOutlineAutorenew />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
