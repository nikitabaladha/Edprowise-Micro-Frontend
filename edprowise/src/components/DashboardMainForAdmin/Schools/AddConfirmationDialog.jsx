import React from "react";
import { toast } from "react-toastify";
import postAPI from "../../../api/postAPI.jsx";

const AddConfirmationDialog = ({ onClose, id, onAdd }) => {
  const handleSubmit = async () => {
    try {
      const response = await postAPI(
        "/create-user",
        { schoolId: id },

        true
      );

      if (!response.hasError) {
        toast.success("User added successfully");

        const newUser = {
          _id: response.data.data.id,
          schoolId: response.data.data.schoolId,
          userId: response.data.data.userId,
          role: response.data.data.role,
        };

        onAdd(newUser);

        onClose();
      } else {
        toast.error(response.message || "Failed to add User");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
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
          Are you sure? You want to add
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
            onClick={handleSubmit}
          >
            Yes, add it!
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

export default AddConfirmationDialog;
