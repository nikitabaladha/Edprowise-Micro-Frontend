import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import putAPI from "../../../../../api/putAPI.jsx";
import getAPI from "../../../../../api/getAPI.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSubCategory = () => {
  const location = useLocation();
  const subCategory = location?.state?.subCategory;
  const navigate = useNavigate();

  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState({
    subCategoryName: "",
    categoryId: "",
    mainCategoryId: "",
    edprowiseMargin: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await getAPI(
          `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/main-category`,
          true
        );
        if (!response.hasError) {
          setMainCategories(response.data.data);

          // If we have a subCategory with mainCategoryId, set it immediately
          if (subCategory?.mainCategoryId) {
            setMainCategoryId(subCategory.mainCategoryId);
            await fetchCategoriesForMainCategory(subCategory.mainCategoryId);
          }
        } else {
          toast.error(`Failed to fetch Main Categories: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching main categories.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainCategories();
  }, []);

  const fetchCategoriesForMainCategory = async (mainCatId) => {
    try {
      const response = await getAPI(
        `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/category/${mainCatId}`,
        {},
        true
      );
      if (!response.hasError && Array.isArray(response.data.data)) {
        setCategories(response.data.data);

        // If we have a subCategory with categoryId, set it immediately
        if (subCategory?.categoryId) {
          setCategoryId(subCategory.categoryId);
          const selectedCategory = response.data.data.find(
            (cat) => cat.id === subCategory.categoryId
          );
          if (selectedCategory) {
            setFormData((prev) => ({
              ...prev,
              edprowiseMargin: selectedCategory.edprowiseMargin || "",
              subCategoryName: subCategory.subCategoryName || "",
            }));
          }
        }
      } else {
        toast.error("Failed to load categories.");
      }
    } catch (err) {
      toast.error("Error fetching categories.");
    }
  };

  // Fetch categories when main category is selected
  const handleMainCategoryChange = async (e) => {
    const selectedMainCategoryId = e.target.value;
    setMainCategoryId(selectedMainCategoryId);
    setCategoryId("");
    setCategories([]);
    setFormData((prev) => ({
      ...prev,
      edprowiseMargin: "",
      categoryId: "",
    }));

    if (selectedMainCategoryId) {
      await fetchCategoriesForMainCategory(selectedMainCategoryId);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);

    // Find the selected category and set its edprowiseMargin
    const selectedCategory = categories.find(
      (cat) => cat.id === selectedCategoryId
    );
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        edprowiseMargin: selectedCategory.edprowiseMargin || "",
      }));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSending(true);

    try {
      const response = await putAPI(
        `${process.env.REACT_APP_PROCUREMENT_CATEGORY_SERVICE}/sub-category/${subCategory.id}`,
        {
          subCategoryName: formData.subCategoryName,
          categoryId,
          mainCategoryId,
          edprowiseMargin: formData.edprowiseMargin,
        },
        {},
        true
      );

      if (!response.data.hasError) {
        toast.success("Sub Category updated successfully!");
        navigate(-1);
      } else {
        toast.error(response.data.message || "Failed to update SubCategory.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setSending(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">
                    Update Sub Category
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="row">
                  {/* Main Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Main Category</label>
                      <select
                        className="form-control"
                        value={mainCategoryId}
                        onChange={handleMainCategoryChange}
                        required
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
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control"
                        value={categoryId}
                        onChange={handleCategoryChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Edprowise Margin */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="edprowiseMargin" className="form-label">
                        Edprowise Margin (%)
                      </label>
                      <input
                        type="number"
                        name="edprowiseMargin"
                        value={formData.edprowiseMargin}
                        onChange={handleChange}
                        className="form-control"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Sub Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Sub Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subCategoryName"
                        value={formData.subCategoryName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={sending}
                  >
                    {sending ? "Updating..." : "update"}
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

export default UpdateSubCategory;
