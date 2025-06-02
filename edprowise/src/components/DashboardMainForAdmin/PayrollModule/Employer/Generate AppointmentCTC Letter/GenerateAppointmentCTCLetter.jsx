import React, { useState } from "react";

const GenerateAppointmentCTCLetter = () => {
  const [showForm, setShowForm] = useState(false);
  const handleProceed = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center ">
                    Appointment Letter
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                {/* <div className='d-flex'> */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                  <div
                    className={`col-md-2 ${showForm ? "d-none" : ""}`}
                    style={{ alignContent: "end", textAlign: "center" }}
                  >
                    {/* <div className=""> */}
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                  {/* </div> */}
                </div>
                {showForm && (
                  <>
                    <div id="receipt-content" className="box-border p-3">
                      <div className="text-center mb-3">
                        <h4 className="text-center payroll-title mb-0 p-2">
                          <strong>APPOINTMENT LETTER</strong>
                        </h4>
                      </div>

                      <div className="row border border-dark" />

                      <div className="row m-0 salary-slip-box pt-2 my-2">
                        <div className="col-md-8">
                          <p className="text-dark payroll-box-text">
                            <strong>Name of Employee :</strong> Umesh jadhav
                          </p>

                          <p className="text-dark payroll-box-text">
                            <strong>Address of Employee :</strong> Nashik
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p className="text-dark payroll-box-text">
                            <strong> Date :</strong> 08-05-2025
                          </p>
                          <p className="text-dark payroll-box-text">
                            <strong> Date of Joining :</strong> 08-05-2025
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p className="text-dark payroll-box-text">
                            <strong> Designation :</strong> Teacher
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p className="text-dark payroll-box-text">
                            <strong> Category of Employees :</strong> Teaching
                            Staff
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p className="text-dark payroll-box-text">
                            <strong>Grade :</strong> A
                          </p>
                        </div>
                      </div>
                      <div className="row border border-dark" />
                      <div className="row m-0 pt-2 my-2">
                        <div className="col-12">
                          <p className="text-dark">
                            Welcome to the opportunity to make a valuable
                            difference!
                          </p>

                          <p className="text-dark">
                            We are proud to invite you to join our institution
                            and are pleased to offer you .
                          </p>
                          <p className="text-dark">
                            We look forward to your dedication and commitment as
                            we work together and wish you many fruitful years
                            here. We expect you to be a critical pillar.
                          </p>
                        </div>
                      </div>

                      <div className="row border border-dark" />
                      <div className="row m-0 py-2 mt-2">
                        <div className="col-12 px-0">
                          <h4 className="card-title custom-heading-font">
                            Below is the CTC Components:
                          </h4>
                        </div>
                      </div>

                      <div className="table-responsive px-lg-6 px-md-5 py-3">
                        <table
                          className="table mb-0 text-dark border border-dark"
                          style={{
                            border: "1px solid black",
                            color: "black",
                            placeContent: "center",
                          }}
                        >
                          <thead>
                            <tr className="payroll-table-header">
                              <th
                                className="text-center border border-dark align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Components
                              </th>
                              <th
                                className="text-center border border-dark align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Annual Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Basic Salary
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                10,000
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                HRA
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                5,000.00
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                PF Contribution
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                1,000.00
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center fw-bold p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Total Annual Gross
                              </td>
                              <td
                                className="text-center align-content-center fw-bold p-2"
                                style={{ border: "1px solid black" }}
                              >
                                16,000.00
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Gratuity
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                900.00
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Bonus
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                1,000.00
                              </td>
                            </tr>
                            <tr className="payroll-table-body">
                              <td
                                className="align-content-center fw-bold p-2"
                                style={{ border: "1px solid black" }}
                              >
                                Annual Cost to Institution
                              </td>
                              <td
                                className="text-center align-content-center p-2"
                                style={{ border: "1px solid black" }}
                              >
                                17,900.00
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="row border border-dark" />
                      <div className="row m-0 py-2 my-2">
                        <div className="col-12 px-0">
                          <h4 className="card-title custom-heading-font">
                            Explanation/Others:
                          </h4>
                        </div>
                      </div>

                      <div className="row border border-dark" />

                      <div className="row py-3">
                        <div className="col-12">
                          <p className="text-dark">
                            <strong>Gratuity :</strong> Employees are entitled
                            to payment of Gratuity of 15 days of Basic Pay, for
                            every year of completed service once they complete 5
                            years in the company, as per the Payment of Gratuity
                            Act 1972. In the event the employee ceases to be in
                            employment before completion of five years, this
                            benefit will be forfeited.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            <strong> Provident Fund :</strong> You will be
                            governed by the provisions of The Employees
                            Provident Fund & Misc. Provisions Act, 1952.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            It is mandatory that all information
                            provided/declared by you as part of your
                            offer/appointment with the Company, must be true and
                            accurate. In the event of any suppression of facts
                            or falsification of information, your services are
                            liable to be terminated, without any notice.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            You will be called upon to attend your duties as and
                            when required in shifts, on holidays or Sundays in
                            accordance with the exigencies. In view of your
                            position, it may be required to undertake such work
                            and also undertake tours and travels, as and when
                            necessary. You will be compensated for the same as
                            per the Company rules.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            You will be responsible for maintaining the secrecy
                            and confidentiality and shall not divulge/disclose
                            to anyone the information obtained by you during the
                            course of your employment. The same is applicable
                            with respect to all the software or technical
                            developments made by you or you had associated with
                            during your service.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            Your services are liable to be transferred to any
                            other department, branch office or any other
                            establishment anywhere in India or abroad at the
                            sole discretion of the Management. In such events,
                            you will be governed by the terms and conditions, as
                            applicable at the place of transfer.
                          </p>
                          <div className="row border border-dark" />
                          <p className="text-dark">
                            You will be eligible for Leave as per prevailing
                            rules and entitlements in line with the Company’s
                            Leave Policy, made available to all employees on the
                            institution Intranet portal. You will be able to
                            access the portal on your joining. The rules and
                            entitlements of Leave are subject to periodic review
                            and all employees will be governed by any changes
                            that may be brought in, at any later date.
                          </p>
                          <div className="row border border-dark" />
                          <div className="row mt-4 text-dark">
                            <div className="col-6 text-start">
                              <p className="text-dark">
                                <strong>Signature Of Principal</strong>
                              </p>
                            </div>
                            <div className="col-6 text-end">
                              <p className="text-dark">
                                <strong>Received & Accepted</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateAppointmentCTCLetter;
