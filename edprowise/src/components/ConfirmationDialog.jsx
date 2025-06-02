import React from "react";
import { toast } from "react-toastify";
import deleteAPI from "../api/deleteAPI.jsx";

const DELETE_CONFIG = {
  school: {
    getEndpoint: (id) =>
      `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/school/${id}`,
    successMessage: "School successfully deleted!",
    errorMessage: "Failed to delete school.",
    idKey: "schoolId",
  },
  admin: {
    getEndpoint: (id) =>
      `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/delete-admin/${id}`,
    successMessage: "Admin successfully deleted!",
    errorMessage: "Failed to delete Admin.",
    idKey: "adminId",
  },
  seller: {
    getEndpoint: (id) =>
      `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/seller-profile/${id}`,
    successMessage: "Seller successfully deleted!",
    errorMessage: "Failed to delete seller.",
    idKey: "sellerId",
  },
  user: {
    getEndpoint: (id) =>
      `${process.env.REACT_APP_USER_AND_PROFILE_SERVICE}/user/${id}`,
    successMessage: "User successfully deleted!",
    errorMessage: "Failed to delete user.",
    idKey: "userId",
  },
  subscription: {
    getEndpoint: (id) => `/subscription/${id}`,
    successMessage: "Subscription successfully deleted!",
    errorMessage: "Failed to delete subscription.",
    idKey: "schoolId",
  },
  cart: {
    getEndpoint: ({ enquiryNumber, sellerId }) =>
      `/cart?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`,
    successMessage: "Cart successfully deleted!",
    errorMessage: "Failed to delete Cart.",
  },
  subCategory: {
    getEndpoint: (id) => `/sub-category/${id}`,
    successMessage: "SubCategory data successfully deleted!",
    errorMessage: "Failed to delete Subcategory.",
    idKey: "id",
  },
  singleCart: {
    getEndpoint: (id) => `/delete-by-cart-id/${id}`,
    successMessage: "Cart data successfully deleted!",
    errorMessage: "Failed to delete Cart.",
    idKey: "id",
  },
  bankDetail: {
    getEndpoint: (id) => `/bank-detail/${id}`,
    successMessage: "Bank Detail successfully deleted!",
    errorMessage: "Failed to delete Bank Detail.",
    idKey: "bankDetailId",
  },
  requestdemo: {
    getEndpoint: (id) => `/delete-request/${id}`,
    successMessage: "Demo request successfully deleted!",
    errorMessage: "Failed to delete demo request.",
    idKey: "_id",
  },
  enquiry: {
    getEndpoint: (id) => `/delete-contact-form/${id}`,
    successMessage: "Enquiry request successfully deleted!",
    errorMessage: "Failed to delete enquiry request.",
    idKey: "_id",
  },
  // =======Shantanu=====
  feesType: {
    getEndpoint: (id) => `/delete-fees-type/${id}`,
    successMessage: "Fees type successfully deleted!",
    errorMessage: "Failed to delete fees type.",
    idKey: "_id",
  },
  shifts: {
    getEndpoint: (id) => `/master-define-shift/${id}`,
    successMessage: "Shift successfully deleted!",
    errorMessage: "Failed to delete shift.",
    idKey: "_id",
  },
  classandsection: {
    getEndpoint: (id) => `/delete-class-and-section/${id}`,
    successMessage: "Class and Section successfully deleted!",
    errorMessage: "Failed to delete class and section.",
    idKey: "_id",
  },
  feesstructure: {
    getEndpoint: (id) => `/delete-fees-structure/${id}`,
    successMessage: "Fess structure successfully deleted!",
    errorMessage: "Failed to delete fees structure.",
    idKey: "_id",
  },
  onetimesfees: {
    getEndpoint: (id) => `/delete-one-time-fees/${id}`,
    successMessage: "One time fees successfully deleted!",
    errorMessage: "Failed to delete one time fees.",
    idKey: "_id",
  },
  prefix: {
    getEndpoint: (id) => `/delete-prefix/${id}`,
    successMessage: "Prefix successfully deleted!",
    errorMessage: "Failed to delete prefix.",
    idKey: "_id",
  },
  admissionprefix: {
    getEndpoint: (id) => `/delete-admission-prefix/${id}`,
    successMessage: "Prefix successfully deleted!",
    errorMessage: "Failed to delete prefix.",
    idKey: "_id",
  },
  fine: {
    getEndpoint: (id) => `/delete-fine/${id}`,
    successMessage: "Fine successfully deleted!",
    errorMessage: "Failed to delete fine.",
    idKey: "_id",
  },
  registrationform: {
    getEndpoint: (id) => `/delete-registartion-form/${id}`,
    successMessage: "Registartion form successfully deleted!",
    errorMessage: "Failed to delete registartion form .",
    idKey: "_id",
  },
  admissionform: {
    getEndpoint: (id) => `/delete-admission-form/${id}`,
    successMessage: "Admission form successfully deleted!",
    errorMessage: "Failed to delete admission form .",
    idKey: "_id",
  },
  TCform: {
    getEndpoint: (id) => `/delete-TC-form/${id}`,
    successMessage: "TC form successfully deleted!",
    errorMessage: "Failed to delete TC form .",
    idKey: "_id",
  },
  concessionform: {
    getEndpoint: (id) => `/delete-concession-form/${id}`,
    successMessage: "Concession form successfully deleted!",
    errorMessage: "Failed to delete Concession form .",
    idKey: "_id",
  },
  boardregistrationfees: {
    getEndpoint: (id) => `/delete-board-registration-fees/${id}`,
    successMessage: "Board registartion fees successfully deleted!",
    errorMessage: "Failed to delete board registartion fees .",
    idKey: "_id",
  },
  boardexamfees: {
    getEndpoint: (id) => `/delete-board-exam-fees/${id}`,
    successMessage: "Board exam fees successfully deleted!",
    errorMessage: "Failed to delete board exam fees.",
    idKey: "_id",
  },
};

const ConfirmationDialog = ({ onClose, deleteType, id, onDeleted }) => {
  const handleDelete = async () => {
    const config = DELETE_CONFIG[deleteType];

    if (!config) {
      console.error("Invalid delete type.");
      toast.error("Invalid delete type.");
      return;
    }

    if (deleteType === "cart" && (!id?.enquiryNumber || !id?.sellerId)) {
      console.error("Missing required delete parameters.");
      toast.error("Required delete parameters are missing.");
      return;
    }

    if (deleteType !== "cart" && !id) {
      console.error(`${config.idKey} is missing.`);
      toast.error(`${config.idKey} is required.`);
      return;
    }

    const endpoint = config.getEndpoint(id);
    const payload =
      deleteType === "cart"
        ? { enquiryNumber: id.enquiryNumber, sellerId: id.sellerId }
        : {};

    try {
      const response = await deleteAPI(endpoint, payload, true);

      if (!response.hasError) {
        toast.success(config.successMessage);

        if (typeof onDeleted === "function") {
          onDeleted(id);
        }
        onClose();
      } else {
        console.error(config.errorMessage, response.message);
        toast.error(`${config.errorMessage}: ${response.message}`);
      }
    } catch (error) {
      console.error(`Error while deleting ${deleteType}:`, error);
      toast.error(`An error occurred while deleting the ${deleteType}.`);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target.id === "overlay") {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="swal2-container swal2-center swal2-backdrop-show"
      style={{ overflowY: "auto" }}
      onClick={handleOverlayClick}
    >
      <div
        aria-labelledby="swal2-title"
        aria-describedby="swal2-html-container"
        className="swal2-popup swal2-modal swal2-icon-warning swal2-show"
        tabIndex={-1}
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
        style={{ display: "grid" }}
      >
        <button
          type="button"
          className="swal2-close"
          aria-label="Close this dialog"
          style={{ display: "none" }}
        >
          ×
        </button>
        <ul className="swal2-progress-steps" style={{ display: "none" }} />
        <div
          className="swal2-icon swal2-warning swal2-icon-show"
          style={{ display: "flex" }}
        >
          <div className="swal2-icon-content">!</div>
        </div>
        <img className="swal2-image" style={{ display: "none" }} />
        <h2
          className="swal2-title"
          id="swal2-title"
          style={{ display: "block" }}
        >
          Are you sure?
        </h2>
        <div
          className="swal2-html-container"
          id="swal2-html-container"
          style={{ display: "block" }}
        >
          You won't be able to revert this!
        </div>
        <input className="swal2-input" style={{ display: "none" }} />
        <input type="file" className="swal2-file" style={{ display: "none" }} />
        <div className="swal2-range" style={{ display: "none" }}>
          <input type="range" />
          <output />
        </div>
        <select className="swal2-select" style={{ display: "none" }} />
        <div className="swal2-radio" style={{ display: "none" }} />
        <label
          htmlFor="swal2-checkbox"
          className="swal2-checkbox"
          style={{ display: "none" }}
        >
          <input type="checkbox" />
          <span className="swal2-label" />
        </label>
        <textarea
          className="swal2-textarea"
          style={{ display: "none" }}
          defaultValue={""}
        />
        <div
          className="swal2-validation-message"
          id="swal2-validation-message"
          style={{ display: "none" }}
        />
        <div className="swal2-actions" style={{ display: "flex" }}>
          <div className="swal2-loader" />
          <button
            type="button"
            className="swal2-confirm btn btn-primary w-xs me-2 mt-2"
            aria-label=""
            style={{ display: "inline-block" }}
            onClick={handleDelete}
          >
            Yes, delete it!
          </button>
          <button
            type="button"
            className="swal2-deny"
            aria-label=""
            style={{ display: "none" }}
          >
            No
          </button>
          <button
            type="button"
            className="swal2-cancel btn btn-danger w-xs mt-2"
            aria-label=""
            style={{ display: "inline-block" }}
            onClick={onClose}
          >
            No, cancel!
          </button>
        </div>
        <div className="swal2-footer" style={{ display: "none" }} />
        <div className="swal2-timer-progress-bar-container">
          <div
            className="swal2-timer-progress-bar"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
