import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { getModules, formats, fontStyles } from "../../../quillConfig.jsx";
import getAPI from "../../../../api/getAPI.jsx";
import postAPI from "../../../../api/postAPI.jsx";
import CreatableSelect from "react-select/creatable";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as XLSX from "xlsx";
import { components } from "react-select";

const MarketingEmail = () => {
  const [formData, setFormData] = useState({
    mailTo: [],
    subject: "",
    content: "",
    attachments: [],
  });

  // const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [emailOptions, setEmailOptions] = useState([]);
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);
  const importFileInputRef = useRef(null); // For Import emails file
  const attachmentFileInputRef = useRef(null); // For attachments

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = fontStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Update modules to include the handler
  const modules = useMemo(() => getModules({}), []);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const emailResponse = await getAPI(
          `${process.env.REACT_APP_EMAIL_SERVICE}/get-all-emails`,
          {},
          true
        );
        if (!emailResponse.hasError) {
          const options = emailResponse.data.data.map((email) => ({
            label: email,
            value: email,
          }));
          setEmailOptions(options);
        }
      } catch (err) {
        toast.error("Initialization error: " + err.message);
      }
    };

    fetchInitialData();
  }, []);

  // Handle file import from CSV/Excel
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const isCSV = file.name.endsWith(".csv");
    const isExcel = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

    reader.onload = (e) => {
      try {
        let emails = [];

        if (isCSV) {
          const text = e.target.result;
          emails = parseCSV(text);
        } else if (isExcel) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

          const hasHeader =
            rows[0] && rows[0][0]?.toString().toLowerCase().includes("email");
          const startIndex = hasHeader ? 1 : 0;

          emails = rows
            .slice(startIndex)
            .map((row) => row[0])
            .filter(Boolean);
        }

        const validEmails = emails.filter(isValidEmail);
        if (validEmails.length === 0) {
          toast.warning("No valid email found in file.");
          return;
        }

        const newOptions = validEmails.map((email) => ({
          label: email,
          value: email,
        }));

        setEmailOptions((prevOptions) => {
          const existing = new Set(prevOptions.map((opt) => opt.value));
          const uniqueNew = newOptions.filter(
            (opt) => !existing.has(opt.value)
          );
          return [...prevOptions, ...uniqueNew];
        });

        setFormData((prevData) => {
          const existing = new Set(prevData.mailTo);
          const uniqueNew = validEmails.filter((email) => !existing.has(email));
          return {
            ...prevData,
            mailTo: [...prevData.mailTo, ...uniqueNew],
          };
        });

        toast.success(`${validEmails.length} emails imported and selected.`);
      } catch (err) {
        toast.error("Error processing file: " + err.message);
      }
    };

    if (isCSV) {
      reader.readAsText(file);
    } else if (isExcel) {
      reader.readAsArrayBuffer(file);
    } else {
      toast.error(
        "Unsupported file format. Please upload a .csv, .xls, or .xlsx file."
      );
    }

    event.target.value = null; // Clear the file input
  };

  const handleAttachmentChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    // Create an array of file objects with the properties you need
    const newAttachments = Array.from(files).map((file) => ({
      file, // Keep the original File object
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    e.target.value = null; // reset input
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };

  const handleEmailChange = (selectedOptions) => {
    const selectedEmails = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData((prevData) => ({
      ...prevData,
      mailTo: selectedEmails,
    }));
  };

  // Helper functions
  const parseCSV = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    if (lines.length === 0) return [];
    // Check if the first column of the first line contains "email" (case-insensitive)
    const firstLineColumns = lines[0]
      .split(",")
      .map((col) => col.trim().toLowerCase());
    const hasHeader = firstLineColumns.includes("email");
    const startIndex = hasHeader ? 1 : 0;
    return lines
      .slice(startIndex)
      .map((line) => {
        const columns = line.split(",").map((col) => col.trim());
        return columns[0] || ""; // Assuming email is in the first column
      })
      .filter((email) => email);
  };

  const isValidEmail = (email) => {
    // A more robust email regex
    const emailRegex =
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const triggerFileInput = () => {
    importFileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("content", formData.content);
      formData.mailTo.forEach((email) =>
        formDataToSend.append("mailTo[]", email)
      );

      // Log attachments before appending
      console.log("Frontend attachments:", formData.attachments);

      // Append attachments
      formData.attachments.forEach((attachment) => {
        console.log("Appending file:", attachment.file);
        formDataToSend.append("attachments", attachment.file);
      });

      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/send-email`,
        formDataToSend,
        { "Content-Type": "multipart/form-data" },
        true // <- this must be the fourth argument
      );

      if (response.hasError) {
        toast.error(response.message || "Failed to send email.");
      } else {
        toast.success(response.message || "Email sent successfully!");
        // Cleanup object URLs and reset form

        setFormData({
          mailTo: [],
          subject: "",
          content: "",
          attachments: [],
        });
      }
      // ... rest of your code
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong: " + err.message);
    } finally {
      setSending(false);
    }
  };

  // Custom components for email selector
  const MultiValueContainer = ({ children, ...props }) => {
    if (props.selectProps.value.indexOf(props.data) >= 6) {
      // Index starts at 0, so >=4 means 5th item onwards
      return null;
    }
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
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
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center">Email Details</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="emailTo" className="form-label">
                          To <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          className="email-recipient-select"
                          options={emailOptions}
                          isMulti
                          isClearable
                          onChange={handleEmailChange}
                          value={(formData.mailTo || []).map((email) => ({
                            label: email,
                            value: email,
                          }))}
                          placeholder="Select or enter email addresses"
                          formatOptionLabel={(
                            { value, label },
                            { context }
                          ) => {
                            if (context === "menu") {
                              return label;
                            }
                            const selectedCount = formData.mailTo.length;
                            if (selectedCount <= 6) {
                              return label;
                            }

                            const index = formData.mailTo.indexOf(value);
                            if (index < 5) {
                              return label;
                            }
                            if (index === 5) {
                              return `+${selectedCount - 5} more`;
                            }
                            return null;
                          }}
                          components={{ MultiValueContainer }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 align-content-center">
                      <div style={{ marginTop: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="btn btn-primary custom-submit-button align-content-center"
                        >
                          Import
                        </button>
                        <input
                          type="file"
                          ref={importFileInputRef}
                          onChange={handleFileImport}
                          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          className="hidden-file-input hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Enter Email Subject"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="container">
                      <div className="card-header d-flex justify-content-between align-items-center gap-1">
                        <h4 className="card-title text-center custom-heading-font">
                          Email Message
                        </h4>
                        <div className="align-content-center">
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                attachmentFileInputRef.current.click()
                              }
                              className="btn btn-secondary"
                            >
                              Attach Files
                            </button>
                            <input
                              type="file"
                              ref={attachmentFileInputRef}
                              onChange={handleAttachmentChange}
                              multiple
                              name="attachments"
                              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              className="d-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <ReactQuill
                          ref={quillRef}
                          theme="snow"
                          value={formData.content}
                          onChange={handleContentChange}
                          modules={modules}
                          formats={formats}
                          placeholder="Compose your email here..."
                          className="quill-editor-custom"
                        />
                      </div>
                    </div>

                    {/* Attachments preview */}
                    {formData.attachments.length > 0 && (
                      <div className="mt-3">
                        <h5>Attachments ({formData.attachments.length})</h5>
                        <div className="d-flex flex-wrap gap-2">
                          {formData.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="attachment-item d-flex align-items-center bg-light p-2 rounded"
                            >
                              <span
                                className="text-truncate"
                                style={{ maxWidth: "150px" }}
                              >
                                {file.name}
                              </span>
                              <button
                                type="button"
                                className="btn btn-sm btn-link text-danger ms-2"
                                onClick={() => removeAttachment(index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={sending}
                      >
                        {sending ? "Sending..." : "Send"}
                      </button>
                    </div>
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
export default MarketingEmail;
