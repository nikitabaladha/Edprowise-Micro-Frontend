import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmailTemplatesList = () => {
  const navigate = useNavigate();
  const tamplateList = [
    {
      TamplateName: "Admin Registration ",
      sendTo: "/admin-dashboard/email/templates/admin-registration-template",
    },
    {
      TamplateName: "School Registration ",
      sendTo: "/admin-dashboard/email/templates/school-registration-template",
    },
    {
      TamplateName: "Seller Registration",
      sendTo: "/admin-dashboard/email/templates/seller-registration-template",
    },
    {
      TamplateName: "Password Update",
      sendTo: "/admin-dashboard/email/templates/password-update-template",
    },
    {
      TamplateName: "UserId Update",
      sendTo: "/admin-dashboard/email/templates/userid-update-template",
    },
    {
      TamplateName: "School Request Quote",
      sendTo: "/admin-dashboard/email/templates/reuest-for-quote",
    },
    {
      TamplateName: "Seller New Quote Request Receive",
      sendTo: "/admin-dashboard/email/templates/seller-quote-receive-template",
    },
    {
      TamplateName: "Quote Proposal Receive For School",
      sendTo: "/admin-dashboard/email/templates/quote-proposal-template",
    },
    {
      TamplateName: "Order Place Sucessfully",
      sendTo: "/admin-dashboard/email/templates/order-place-template",
    },
    {
      TamplateName: "Order Receive For Seller",
      sendTo: "/admin-dashboard/email/templates/order-receive-template",
    },
    {
      TamplateName: "Order Delivered",
      sendTo: "/admin-dashboard/email/templates/seller-quote-receive-template",
    },
  ];
  const navigateToView = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Templates List</h4>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th>Templates Name</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tamplateList.map((template, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`checkbox-${index}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox-${index}`}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{template.TamplateName}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              className="btn btn-light btn-sm"
                              onClick={(event) =>
                                navigateToView(event, template.sendTo)
                              }
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplatesList;
