import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewCheckSupportingSubmittedForTaxList = () => {
  const navigate = useNavigate();

  const [isBuyer, setIsBuyer] = useState(true);
  const [isYes, setIsYes] = useState(true);
  const [isYes1, setIsYes1] = useState(true);
  const [isYes2, setIsYes2] = useState(true);

  const handleToggle = () => {
    setIsBuyer(!isBuyer);
  };

  const handleToggleYes = () => {
    setIsYes(!isYes);
  };

  const handleToggleYes1 = () => {
    setIsYes1(!isYes1);
  };

  const handleToggleYes2 = () => {
    setIsYes2(!isYes2);
  };

  const handleNavigateToRentDetails = () => {
    navigate(
      "/admin-dashboard/payroll-module/employer/supporting-tax-submitted/view-supporting-submitted-for-Tax/view-rent-details"
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Supporting Submitted for Tax
                    </h4>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <form onSubmit="">
                  {/* <div className='d-flex'> */}
                  <div className="row m-0 mb-2 pt-2 salary-slip-box">
                    <div className="col-md-8">
                      <p className="text-dark payroll-box-text">
                        <strong>Employee Name : </strong>Umesh jadhav
                      </p>
                    </div>

                    <div className="col-md-4">
                      <p className="text-dark payroll-box-text">
                        <strong>Employee ID : </strong>Emp-001
                      </p>
                    </div>

                    <div className="col-md-4">
                      <p className="text-dark payroll-box-text">
                        <strong>Tax Regime :</strong>
                      </p>
                    </div>

                    <div className="col-md-4">
                      <p className="text-dark payroll-box-text">
                        <strong> PAN No :</strong> CPJPKPP1
                      </p>
                    </div>

                    <div className="col-md-4">
                      <p className="text-dark">
                        <label
                          for="yearSelect"
                          className="mb-0 payroll-box-text fw-bold"
                        >
                          Financial Year :{" "}
                        </label>
                        <select
                          id="yearSelect"
                          className="custom-select payroll-table-body"
                          aria-label="Select Year"
                          style={{ marginLeft: "5px" }}
                        >
                          <option selected>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                          <option>2028</option>
                          <option>2029</option>
                        </select>
                      </p>
                    </div>
                  </div>

                  <div className="table-responsive mb-4">
                    <table className="table text-dark border border-dark  mb-4">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-content-center border border-dark p-2">
                            Investment
                          </th>
                          <th className="text-center align-content-center border border-dark p-2">
                            Limit
                          </th>
                          <th className="text-center align-content-center border border-dark p-2">
                            Declared
                          </th>
                          <th className="text-center align-content-center border border-dark p-2">
                            Proof Submitted
                          </th>

                          <th className="text-center align-content-center border border-dark p-2">
                            Document
                          </th>
                          <th className="text-center align-content-center border border-dark p-2">
                            Action
                          </th>
                          <th className="text-center align-content-center border border-dark p-2">
                            Admin Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center border border-dark fw-bold p-2">
                            Section 80C
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            1,00,000
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            1,00,000
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            1,70,000
                          </td>

                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark  px-3 py-2">
                            Life Insurance Premium including Bima Nivesh( only
                            Self , Spouse and children)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"50,000"}
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"40,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-light btn-sm">
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Provident Fund
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={"50,000"}
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"50,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="p-2 align-content-center border border-dark px-3">
                            Tuition Fees
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>

                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"50,000"}
                            />
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 border border-dark p-2">
                            Term Deposits(Bank tax saving FD)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={"90,000"}
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"80,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Sukanya Samriddhi Account
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Housing Loan Principal/Stamp Duty & Registration
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Unit Link Insurance Plan / Infrastructure Bond /
                            National Saving Certificate / Accrued Interest on
                            NSC
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Subscription To Notified Central Government Security
                            (NSS) / Mutual Funds/ELSS and Others / Pension Fund
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center border border-dark fw-bold p-2">
                            Section 80D
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            20,000
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            20,000
                          </td>

                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Medical Insurance Premium For Self,Spouse and
                            Dependent Children (If all are non-senior citizen)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            25,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={"20,000"}
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"20,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Medical Insurance Premium For parents(Non-senior
                            citizen)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            25,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center px-3 border border-dark p-2">
                            Medical Insurance Premium For Parents (Senior
                            citizen)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            50,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Medical Expenditure For Senior Citizen (self) (If No
                            Insurance Premium)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            50,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Medical Expenditure For Senior Citizen(Parents) (If
                            No Insurance Premium)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            50,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center border border-dark fw-bold p-2">
                            Other Section
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            45,000
                          </td>

                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2"></td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Deduction For Dependent With Disability( Form 10-I)
                            (Flat Dedcution of INR 75000) (Yes/No)
                            <div
                              className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                              style={{
                                maxWidth: "fit-content",
                              }}
                            >
                              <button
                                className={`btn ${
                                  isBuyer ? "btn-primary" : "btn-dark"
                                } rounded-pill`}
                                type="button"
                                style={{
                                  backgroundColor: isBuyer ? "white" : "black",
                                  borderColor: isBuyer ? "black" : "",
                                  color: isBuyer ? "black" : "white",
                                  maxWidth: "fit-content",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                }}
                                onClick={handleToggle}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className={`btn ${
                                  !isBuyer ? "btn-primary" : "btn-dark"
                                }  rounded-pill`}
                                style={{
                                  backgroundColor: !isBuyer ? "white" : "black",
                                  borderColor: !isBuyer ? "black" : " ",
                                  color: !isBuyer ? "black" : "white",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                  maxWidth: "fit-content",
                                }}
                                onClick={handleToggle}
                              >
                                No
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            75,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Deduction For Dependent With Severe Disability( Form
                            10-I) (Flat dedcution of INR 125000) (Yes/No)
                            <div
                              className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                              style={{
                                maxWidth: "fit-content",
                              }}
                            >
                              <button
                                className={`btn ${
                                  isYes ? "btn-primary" : "btn-dark"
                                }  rounded-pill`}
                                type="button"
                                style={{
                                  backgroundColor: isYes ? "white" : "black",
                                  borderColor: isYes ? "black" : "",
                                  color: isYes ? "black" : "white",
                                  // color: 'black',
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                  maxWidth: "fit-content",
                                }}
                                onClick={handleToggleYes}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className={`btn ${
                                  !isYes ? "btn-primary" : "btn-dark"
                                } rounded-pill`}
                                style={{
                                  backgroundColor: !isYes ? "white" : "black",
                                  borderColor: !isYes ? "black" : " ",
                                  color: !isYes ? "black" : "white",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                  maxWidth: "fit-content",
                                }}
                                onClick={handleToggleYes}
                              >
                                No
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            1,00,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Deduction For Self Disability (Flat dedcution of INR
                            75000) (Yes/No)
                            <div
                              className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                              style={{
                                maxWidth: "fit-content",
                              }}
                            >
                              <button
                                className={`btn ${
                                  isYes1 ? "btn-primary" : "btn-dark"
                                }  rounded-pill`}
                                type="button"
                                style={{
                                  backgroundColor: isYes1 ? "white" : "black",
                                  borderColor: isYes1 ? "black" : "",
                                  color: isYes1 ? "black" : "white",
                                  maxWidth: "fit-content",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                }}
                                onClick={handleToggleYes1}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className={`btn ${
                                  !isYes1 ? "btn-primary" : "btn-dark"
                                } rounded-pill`}
                                style={{
                                  backgroundColor: !isYes1 ? "white" : "black",
                                  borderColor: !isYes1 ? "black" : " ",
                                  color: !isYes1 ? "black" : "white",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                  maxWidth: "fit-content",
                                }}
                                onClick={handleToggleYes1}
                              >
                                No
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            75,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Deduction For Self Severe Disability (Flat dedcution
                            of INR 125000) (Yes/No)
                            <div
                              className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                              style={{
                                maxWidth: "fit-content",
                              }}
                            >
                              <button
                                className={`btn ${
                                  isYes2 ? "btn-primary" : "btn-dark"
                                } rounded-pill`}
                                type="button"
                                style={{
                                  backgroundColor: isYes2 ? "white" : "black",
                                  borderColor: isYes2 ? "black" : "",
                                  color: isYes2 ? "black" : "white",
                                  maxWidth: "fit-content",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                }}
                                onClick={handleToggleYes2}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                className={`btn ${
                                  !isYes2 ? "btn-primary" : "btn-dark"
                                }  rounded-pill`}
                                style={{
                                  backgroundColor: !isYes2 ? "white" : "black",
                                  borderColor: !isYes2 ? "black" : " ",
                                  color: !isYes2 ? "black" : "white",
                                  transition: "all 0.4s ease-in-out",
                                  boxShadow: "none",
                                  maxWidth: "fit-content",
                                }}
                                onClick={handleToggleYes2}
                              >
                                No
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            1,00,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Mediclaim Expenses For Critical Illness (Deduction
                            allowed to the extent of expenses incurred , Maximum
                            of INR 40000)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            40,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"10,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Mediclaim Expenses For Critical Illness - Senior
                            Citizen (Deduction allowed to the extent of expenses
                            incurred , Maximum of INR 100000)
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            20,000
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"25,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2">
                            Interest On Educational Loan For Higher Studies (u/s
                            80E) - Self
                          </td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"10,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark p-2">
                            <button className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button className="btn btn-primary btn-sm">
                                Accept
                              </button>
                              <button className="btn btn-danger btn-sm">
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                            />
                          </td>
                        </tr>

                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                          <td className="align-content-center fw-bold border border-dark p-2">
                            HRA Exemption
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-center align-content-center border border-dark fw-bold p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              required
                              value={"10,000"}
                            />
                          </td>
                          <td className="text-end align-content-center border border-dark fw-bold p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end "
                              required
                              value={"10,000"}
                            />
                          </td>

                          <td className="text-center align-content-center border border-dark fw-bold p-2">
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={handleNavigateToRentDetails}
                              style={{
                                color: "red",
                                // textDecoration: "underline",
                                fontWeight: "bold",
                                fontSize: "1rem",
                              }}
                            >
                              Rent Details
                            </button>
                          </td>
                          <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                          <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                        </tr>
                        <tr className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2"></td>

                          <td className="text-center align-content-center border border-dark p-2"></td>
                          <td className="text-center align-content-center border border-dark p-2"></td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                        </tr>

                        <tr>
                          <td
                            colSpan={7}
                            className="align-content-center border border-dark fw-bold p-2"
                          >
                            I hereby declare that all the investment proofs
                            given by me as mentioned above are correct. In case
                            of any tax deduction being levied on account of
                            incorrect proofs, I shall be fully responsible for
                            payment of such income tax.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Verified
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCheckSupportingSubmittedForTaxList;
