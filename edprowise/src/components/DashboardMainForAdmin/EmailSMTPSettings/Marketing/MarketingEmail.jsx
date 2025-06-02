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
import DOMPurify from "dompurify";

const MarketingEmail = () => {
  // State
  const [formData, setFormData] = useState({
    mailTo: [],
    subject: "",
    content: "",
    attachments: [],
  });

  const [sending, setSending] = useState(false);
  const [emailOptions, setEmailOptions] = useState([]);
  const [editorMode, setEditorMode] = useState("wysiwyg");
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);

  // Refs
  const quillRef = useRef(null);
  const importFileInputRef = useRef(null);
  const attachmentFileInputRef = useRef(null);
  const htmlEditorRef = useRef(null);

  // Quill modules
  const modules = useMemo(() => getModules({}), []);

  // For style
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = fontStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Load saved draft on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const emailResponse = await getAPI(
          `${process.env.REACT_APP_EMAIL_SERVICE}/get-all-emails`,
          {},
          true
        );
        if (!emailResponse.hasError) {
          setEmailOptions(
            emailResponse.data.data.map((email) => ({
              label: email,
              value: email,
            }))
          );
        }

        const savedDraft = localStorage.getItem("emailDraft");
        if (savedDraft) {
          setFormData(JSON.parse(savedDraft));
        }
      } catch (err) {
        toast.error("Initialization error: " + err.message);
      }
    };

    fetchInitialData();
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("emailDraft", JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Handle HTML content safely
  const sanitizeHtml = (html) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html;
  };

  // File import handler
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
          emails = parseCSV(e.target.result);
        } else if (isExcel) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          emails = rows.map((row) => row[0]).filter(Boolean);
        }

        const validEmails = emails.filter(isValidEmail);
        if (validEmails.length === 0) {
          toast.warning("No valid emails found");
          return;
        }

        setEmailOptions((prev) => [
          ...prev,
          ...validEmails
            .map((email) => ({ label: email, value: email }))
            .filter((opt) => !prev.some((e) => e.value === opt.value)),
        ]);

        setFormData((prev) => ({
          ...prev,
          mailTo: [...new Set([...prev.mailTo, ...validEmails])],
        }));

        toast.success(`${validEmails.length} emails imported`);
      } catch (err) {
        toast.error("File processing error: " + err.message);
      }
    };

    if (isCSV) reader.readAsText(file);
    else if (isExcel) reader.readAsArrayBuffer(file);
    else toast.error("Unsupported file format");

    event.target.value = null;
  };

  // Attachment handling
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        ...validFiles.map((file) => ({
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        })),
      ],
    }));

    e.target.value = null;
  };

  // Editor mode toggle with content conversion
  const toggleEditorMode = () => {
    if (editorMode === "wysiwyg") {
      // Convert Quill content to HTML
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const html = quill.root.innerHTML;
        setFormData((prev) => ({ ...prev, content: html }));
      }
    } else {
      // When switching back to WYSIWYG, parse HTML
      const quill = quillRef.current?.getEditor();
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(formData.content);
      }
    }
    setEditorMode((prev) => (prev === "wysiwyg" ? "html" : "wysiwyg"));
    setShowHtmlPreview(false);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mailTo.length) {
      toast.error("Please add at least one recipient");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Email content is required");
      return;
    }

    setSending(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("content", sanitizeHtml(formData.content));
      formData.mailTo.forEach((email) =>
        formDataToSend.append("mailTo[]", email)
      );
      formData.attachments.forEach((att) =>
        formDataToSend.append("attachments", att.file)
      );

      const response = await postAPI(
        `${process.env.REACT_APP_EMAIL_SERVICE}/send-email`,
        formDataToSend,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (response.hasError) {
        throw new Error(response.message);
      }

      toast.success("Email sent successfully!");
      setFormData({
        mailTo: [],
        subject: "",
        content: "",
        attachments: [],
      });
      localStorage.removeItem("emailDraft");
    } catch (err) {
      toast.error("Failed to send: " + err.message);
    } finally {
      setSending(false);
    }
  };

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
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Compose Email</h4>

              <form onSubmit={handleSubmit}>
                {/* Recipients Section */}
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label">
                        To <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isMulti
                        isClearable
                        options={emailOptions}
                        value={formData.mailTo.map((email) => ({
                          label: email,
                          value: email,
                        }))}
                        onChange={(opts) =>
                          setFormData((prev) => ({
                            ...prev,
                            mailTo: opts ? opts.map((o) => o.value) : [],
                          }))
                        }
                        placeholder="Select or Enter Email Addresses"
                        className="email-select"
                        formatOptionLabel={({ value, label }, { context }) => {
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

                  <div className="col-md-2 align-content-center">
                    <button
                      type="button"
                      onClick={() => importFileInputRef.current.click()}
                      className="btn btn-outline-primary w-auto custom-submit-button align-content-center"
                      style={{ marginTop: "0.4rem" }}
                    >
                      Import Emails
                    </button>
                    <input
                      type="file"
                      ref={importFileInputRef}
                      onChange={handleFileImport}
                      accept=".csv,.xlsx,.xls"
                      hidden
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="row mt-3">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        placeholder="Email subject"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Editor Toggle */}
                <div className="row">
                  <div className="container">
                    <div className="card-header d-flex justify-content-between align-items-center gap-1">
                      <h4 className="card-title text-center custom-heading-font">
                        Email Message
                      </h4>
                      <div className="d-flex justify-content-between">
                        <div className="align-content-center">
                          <button
                            type="button"
                            onClick={() =>
                              attachmentFileInputRef.current.click()
                            }
                            className="btn btn-outline-secondary me-2"
                          >
                            Add Attachments
                          </button>
                          <input
                            type="file"
                            ref={attachmentFileInputRef}
                            onChange={handleAttachmentChange}
                            multiple
                            hidden
                          />
                        </div>
                        <button
                          type="button"
                          onClick={toggleEditorMode}
                          className="btn btn-outline-primary"
                        >
                          {editorMode === "wysiwyg"
                            ? "Switch to HTML Editor"
                            : "Switch to Text Editor"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Editor Area */}
                  <div className="col-md-12">
                    <div className="mb-4">
                      {editorMode === "wysiwyg" ? (
                        <ReactQuill
                          ref={quillRef}
                          theme="snow"
                          value={formData.content}
                          // onChange={(content,) => setFormData(prev => ({
                          //   ...prev,
                          //   content
                          // }))}
                          onChange={(content, delta, source, editor) => {
                            // Get the HTML with proper link handling
                            const html = editor.getHTML();
                            setFormData((prev) => ({ ...prev, content: html }));
                          }}
                          modules={modules}
                          formats={formats}
                          placeholder="Write your email content here..."
                          className="quill-editor-custom"
                        />
                      ) : (
                        <div className="html-editor-container">
                          <div className="d-flex align-content-center justify-content-end my-2">
                            <button
                              type="button"
                              onClick={() =>
                                setShowHtmlPreview(!showHtmlPreview)
                              }
                              className="btn btn-sm btn-outline-secondary"
                            >
                              {showHtmlPreview ? "Edit HTML" : "Preview Email"}
                            </button>
                          </div>

                          {showHtmlPreview ? (
                            <div
                              className="border p-3 bg-white"
                              style={{ pointerEvents: "auto" }} // This makes links clickable
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(formData.content),
                              }}
                              onClick={(e) => {
                                // Handle link clicks in preview
                                if (e.target.tagName === "A") {
                                  e.preventDefault();
                                  window.open(e.target.href, "_blank");
                                }
                              }}
                            />
                          ) : (
                            <textarea
                              ref={htmlEditorRef}
                              value={formData.content}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  content: e.target.value,
                                }))
                              }
                              className="form-control"
                              rows={10}
                              placeholder="Write your HTML email here..."
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attachments Preview */}
                  {formData.attachments.length > 0 && (
                    <div className="mb-3">
                      <h6>Attachments ({formData.attachments.length})</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="bg-light p-2 rounded d-flex align-items-center"
                          >
                            <span className="me-2">{file.name}</span>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  attachments: prev.attachments.filter(
                                    (_, i) => i !== index
                                  ),
                                }))
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
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
  );
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default MarketingEmail;
