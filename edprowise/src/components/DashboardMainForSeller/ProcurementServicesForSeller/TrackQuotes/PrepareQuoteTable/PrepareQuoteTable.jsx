import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const PrepareQuoteTable = ({
  products,
  handleRemoveProduct,
  handleAddProduct,
  handleChange,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  locationData,
  sending,
}) => {
  const shouldShowCGST_SGST = () => {
    const { schoolState, sellerState, edprowiseState } = locationData;

    if (schoolState === edprowiseState && edprowiseState === sellerState) {
      return true;
    } else if (
      schoolState === edprowiseState &&
      edprowiseState !== sellerState
    ) {
      return true;
    }
    return false;
  };

  const shouldShowIGST = () => {
    const { schoolState, sellerState, edprowiseState } = locationData;

    if (schoolState !== edprowiseState && edprowiseState === sellerState) {
      return true;
    } else if (
      schoolState !== edprowiseState &&
      edprowiseState !== sellerState
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="row p-2">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center gap-1">
            <button
              type="button"
              className="btn btn-primary custom-submit-button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>

            <h4 className="card-title flex-grow-1 m-0 text-center custom-heading-font">
              Prepare Quote
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Action</th>
                    <th>Sr No. </th>
                    <th>
                      Subcategory Name <span className="text-danger">*</span>
                    </th>
                    <th>
                      HSN/SAC <span className="text-danger">*</span>
                    </th>
                    <th>
                      Listing Rate <span className="text-danger">*</span>
                    </th>
                    <th>
                      Edprowise Margin <span className="text-danger">*</span>
                    </th>
                    <th>
                      Quantity <span className="text-danger">*</span>
                    </th>
                    <th>
                      Discount % <span className="text-danger">*</span>
                    </th>
                    {shouldShowCGST_SGST() && (
                      <th>
                        CGST Rate <span className="text-danger">*</span>
                      </th>
                    )}
                    {shouldShowCGST_SGST() && (
                      <th>
                        SGST Rate <span className="text-danger">*</span>
                      </th>
                    )}
                    {shouldShowIGST() && (
                      <th>
                        IGST Rate <span className="text-danger">*</span>
                      </th>
                    )}
                    <th>Upload Sample Images of Products </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        {products.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-primary custom-submit-button"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          name="subCategoryName"
                          className="form-control"
                          value={product.subCategoryName || ""}
                          onChange={(e) => handleChange(index, e)}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="hsnSacc"
                          className="form-control"
                          value={product.hsnSacc || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="listingRate"
                          className="form-control"
                          value={product.listingRate || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="edprowiseMargin"
                          className="form-control"
                          value={product.edprowiseMargin || ""}
                          readOnly
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          value={product.quantity || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="discount"
                          className="form-control"
                          value={product.discount || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      {shouldShowCGST_SGST() && (
                        <td>
                          <input
                            type="number"
                            name="cgstRate"
                            className="form-control"
                            value={product.cgstRate || ""}
                            onChange={(e) => handleChange(index, e)}
                            required
                          />
                        </td>
                      )}
                      {shouldShowCGST_SGST() && (
                        <td>
                          <input
                            type="number"
                            name="sgstRate"
                            className="form-control"
                            value={product.sgstRate || ""}
                            onChange={(e) => handleChange(index, e)}
                            required
                          />
                        </td>
                      )}
                      {shouldShowIGST() && (
                        <td>
                          <input
                            type="number"
                            name="igstRate"
                            className="form-control"
                            value={product.igstRate || ""}
                            onChange={(e) => handleChange(index, e)}
                            required
                          />
                        </td>
                      )}

                      {/* <td>
                        <div className="d-flex align-items-start gap-3">
                          <div style={{ flex: "1" }}>
                            <input
                              type="file"
                              id={`prepareQuoteImages-${index}`}
                              name="prepareQuoteImages"
                              className="form-control"
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              multiple
                              disabled={
                                (products[index]?.prepareQuoteImages?.length ||
                                  0) >= 4
                              }
                            />
                            {(products[index]?.prepareQuoteImages?.length ||
                              0) >= 4 && (
                              <small className="text-muted">
                                Maximum 4 images reached
                              </small>
                            )}
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            {products[index]?.prepareQuoteImages?.map(
                              (image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="position-relative"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${imgIndex + 1}`}
                                    className="img-fluid h-100 rounded"
                                  />
                                  <button
                                    type="button"
                                    className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0"
                                    style={{ width: "20px", height: "20px" }}
                                    onClick={() =>
                                      handleRemoveImage(index, imgIndex)
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </td> */}

                      <td>
                        <div className="d-flex align-items-start gap-3">
                          {/* File input section */}
                          <div style={{ minWidth: "250px", flexGrow: 1 }}>
                            <input
                              type="file"
                              id={`prepareQuoteImages-${index}`}
                              name="prepareQuoteImages"
                              className="form-control"
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              multiple
                              disabled={
                                (products[index]?.prepareQuoteImages?.length ||
                                  0) >= 4
                              }
                            />
                          </div>

                          {/* Image preview section */}
                          <div
                            className="d-flex flex-wrap gap-2"
                            style={{ maxWidth: "300px", flexShrink: 0 }}
                          >
                            {products[index]?.prepareQuoteImages?.map(
                              (image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="position-relative"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${imgIndex + 1}`}
                                    className="img-fluid h-100 rounded"
                                  />
                                  <button
                                    type="button"
                                    className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0"
                                    style={{ width: "20px", height: "20px" }}
                                    onClick={() =>
                                      handleRemoveImage(index, imgIndex)
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end m-2">
              <button
                type="submit"
                className="btn btn-primary custom-submit-button"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Submit"}
              </button>

              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrepareQuoteTable;
