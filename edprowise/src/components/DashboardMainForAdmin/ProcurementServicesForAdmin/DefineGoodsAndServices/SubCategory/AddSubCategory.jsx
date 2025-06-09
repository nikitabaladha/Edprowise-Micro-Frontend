import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import postAPI from "../../../../../api/postAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";

const AddCategory = () => {
  const [mainCategories, setMainCategories] = useState([]);

  const [categoryRows, setCategoryRows] = useState([
    {
      mainCategoryName: "",
      categoryName: "",
      subCategoryName: "",
      edprowiseMargin: "",
      selectedEdprowiseMargin: "",
    },
  ]);

  const [showOtherFields, setShowOtherFields] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/main-category`,
          true
        );
        if (!response.hasError) {
          setMainCategories(response.data.data);
        } else {
          toast.error(`Failed to fetch Main Categories: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching main categories.");
      }
    };
    fetchMainCategories();
  }, []);

  const handleMainCategoryChange = async (index, selectedMainCategoryId) => {
    const updatedRows = [...categoryRows];
    updatedRows[index].mainCategoryId = selectedMainCategoryId;
    updatedRows[index].categories = [];
    updatedRows[index].categoryId = "";

    if (selectedMainCategoryId) {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/category/${selectedMainCategoryId}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          updatedRows[index].categories = response.data.data;
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (err) {
        toast.error("Error fetching categories.");
      }
    }
    setCategoryRows(updatedRows);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...categoryRows];

    if (field === "categoryId") {
      const selectedCategory = updatedRows[index].categories.find(
        (category) => category.id === value
      );
      const selectedEdprowiseMargin = selectedCategory
        ? selectedCategory.edprowiseMargin
        : "";

      updatedRows[index] = {
        ...updatedRows[index],
        categoryId: value,
        selectedEdprowiseMargin,
      };
    } else {
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
      };
    }

    setCategoryRows(updatedRows);
  };

  const addRow = () => {
    if (categoryRows.length > 0) {
      const firstRowData = { ...categoryRows[0] };
      firstRowData.subCategoryName = "";
      setCategoryRows([...categoryRows, firstRowData]);
    }
  };

  const removeRow = (index) => {
    const updatedRows = categoryRows.filter((_, i) => i !== index);
    setCategoryRows(updatedRows);
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      for (const row of categoryRows) {
        let subCategoryData = {};

        if (row.mainCategoryId && row.categoryId) {
          subCategoryData = {
            subCategoryName: row.subCategoryName,
            categoryId: row.categoryId,
            mainCategoryId: row.mainCategoryId,
          };
          const response = await postAPI(
            `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/sub-category`,
            subCategoryData,
            {},
            true
          );
          if (!response.hasError) {
            toast.success("Goods and Service Created Successfully");
          } else {
            toast.error(`Failed to create Sub Category: ${response.message}`);
          }
        } else if (row.mainCategoryId && !row.categoryId) {
          subCategoryData = {
            subCategoryName: row.subCategoryName,
            categoryName: row.categoryName,
            mainCategoryId: row.mainCategoryId,
            edprowiseMargin: row.edprowiseMargin,
          };
          const response = await postAPI(
            `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/sub-category-without-category-id`,
            subCategoryData,
            {},
            true
          );
          if (!response.hasError) {
            toast.success("Goods and Service Created Successfully");
          } else {
            toast.error(`Failed to create Category: ${response.message}`);
          }
        } else if (!row.mainCategoryId && !row.categoryId) {
          subCategoryData = {
            subCategoryName: row.subCategoryName,
            categoryName: row.categoryName,
            mainCategoryName: row.mainCategoryName,
            edprowiseMargin: row.edprowiseMargin,
          };
          const response = await postAPI(
            `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/sub-category-without-ids`,
            subCategoryData,
            {},
            true
          );
          if (!response.hasError) {
            toast.success("Goods and Service Created Successfully");
          } else {
            toast.error(`Failed to create Main Category: ${response.message}`);
          }
        }
      }
      navigate(-1);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    {showOtherFields
                      ? "Add Custom Goods And Services"
                      : "Add New Goods And Services"}
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {categoryRows.map((row, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-3">
                      {!showOtherFields && mainCategories.length > 0 ? (
                        <>
                          <label
                            htmlFor={`mainCategoryId-${index}`}
                            className="form-label"
                          >
                            Main Category List
                          </label>
                          <select
                            required
                            className="form-control"
                            id={`mainCategoryId-${index}`}
                            value={row.mainCategoryId}
                            onChange={(e) =>
                              handleMainCategoryChange(index, e.target.value)
                            }
                          >
                            <option value="">Select Main Category</option>
                            {mainCategories.map((mainCategory) => (
                              <option
                                key={mainCategory._id}
                                value={mainCategory._id}
                              >
                                {mainCategory.mainCategoryName}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor={`mainCategoryName-${index}`}
                            className="form-label"
                          >
                            Main Category Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={row.mainCategoryName}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                "mainCategoryName",
                                e.target.value
                              )
                            }
                            required
                          />
                        </>
                      )}
                    </div>

                    <>
                      {!showOtherFields &&
                      row.mainCategoryId &&
                      row.categories.length > 0 ? (
                        <>
                          <div className="col-md-3">
                            <label
                              htmlFor={`categoryId-${index}`}
                              className="form-label"
                            >
                              Category List
                            </label>
                            <select
                              required
                              className="form-control"
                              id={`categoryId-${index}`}
                              value={row.categoryId}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "categoryId",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Category</option>
                              {row.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label
                              htmlFor={`edprowiseMargin-${index}`}
                              className="form-label"
                            >
                              EdProwise Margin %
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={row.selectedEdprowiseMargin}
                              readOnly
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-3">
                            <label
                              htmlFor={`categoryName-${index}`}
                              className="form-label"
                            >
                              Category Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={row.categoryName}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "categoryName",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="col-md-2">
                            <label
                              htmlFor={`edprowiseMargin-${index}`}
                              className="form-label"
                            >
                              EdProwise Margin %
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              type="number"
                              name="edprowiseMargin"
                              className="form-control"
                              value={row.edprowiseMargin || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "edprowiseMargin",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </>
                      )}
                    </>
                    <div className="col-md-2">
                      <label htmlFor="subCategoryName" className="form-label">
                        Sub Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={row.subCategoryName}
                        onChange={(e) =>
                          handleRowChange(
                            index,
                            "subCategoryName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2 d-flex align-items-center mt-3">
                      <button
                        type="button"
                        className="btn btn-success me-2"
                        onClick={addRow}
                      >
                        Add
                      </button>
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeRow(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowOtherFields(!showOtherFields)}
                  >
                    {showOtherFields
                      ? "Add Goods And Services"
                      : "Add Custom Goods And Services"}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={sending}
                  >
                    {sending ? "Submitting..." : "Submit"}
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

export default AddCategory;
