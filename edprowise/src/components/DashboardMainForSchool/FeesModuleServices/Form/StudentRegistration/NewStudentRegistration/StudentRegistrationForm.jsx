import CreatableSelect from "react-select/creatable";
import useStudentRegistration from "./UseStudentRegistration.jsx";

const StudentRegistrationForm = () => {
  const {
    formData,
    handleChange,
    handleSave,
    handleSubmit,
    isSubmitting,
    showAdditionalData,
    classes,
    shifts,
    cityOptions,
    countryOptions,
    stateOptions,
    isNursery,
    handlePhotoUpload,
    availableFeeTypes,
    selectedFeeType,
    registrationFee,
    concessionAmount,
    finalAmount,

    handleCountryChange,
    handleStateChange,
    handleCityChange,
  } = useStudentRegistration();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Student Registration Form
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                      <div
                        className="border rounded d-flex justify-content-center align-items-center mb-2"
                        style={{
                          width: "150px",
                          height: "180px",
                          overflow: "hidden",
                        }}
                      >
                        {formData.studentPhoto ? (
                          <img
                            src={
                              typeof formData.studentPhoto === "string"
                                ? formData.studentPhoto
                                : URL.createObjectURL(formData.studentPhoto)
                            }
                            alt="Passport"
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <div className="text-secondary">Photo</div>
                        )}
                      </div>
                      <div className="mb-3 w-100 text-center">
                        <label className="form-label mb-1 d-block text-start"></label>
                        <input
                          type="file"
                          id="studentPhoto"
                          name="studentPhoto"
                          className="d-none"
                          accept=".jpg,.jpeg"
                          onChange={handlePhotoUpload}
                          required
                        />
                        <label
                          htmlFor="studentPhoto"
                          className="btn btn-primary btn-sm"
                        >
                          Upload Photo
                        </label>
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="form-control"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="middleName" className="form-label">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              id="middleName"
                              name="middleName"
                              className="form-control"
                              value={formData.middleName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="form-control"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">
                              Date Of Birth{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              className="form-control"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                              Age <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              className="form-control"
                              value={formData.age}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="nationality" className="form-label">
                          Nationality <span className="text-danger">*</span>
                        </label>
                        <select
                          id="nationality"
                          name="nationality"
                          className="form-control"
                          value={formData.nationality}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Nationality</option>
                          <option value="India">India</option>
                          <option value="International">International</option>
                          <option value="SAARC Countries">
                            SAARC Countries
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className="form-control"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="masterDefineClass"
                          className="form-label"
                        >
                          Class <span className="text-danger">*</span>
                        </label>
                        <select
                          id="masterDefineClass"
                          name="masterDefineClass"
                          className="form-control"
                          value={formData.masterDefineClass}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Master Define Class</option>
                          {classes.map((classItem) => (
                            <option key={classItem._id} value={classItem._id}>
                              {classItem.className}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label
                          htmlFor="masterDefineShift"
                          className="form-label"
                        >
                          Shift <span className="text-danger">*</span>
                        </label>
                        <select
                          id="masterDefineShift"
                          name="masterDefineShift"
                          className="form-control"
                          value={formData.masterDefineShift}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Master Define Shift</option>
                          {shifts.map((shift) => (
                            <option key={shift._id} value={shift._id}>
                              {shift.masterDefineShiftName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="fatherName" className="form-label">
                          Father Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          className="form-control"
                          value={formData.fatherName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="fatherContactNo" className="form-label">
                          Father Contact Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="fatherContactNo"
                          name="fatherContactNo"
                          className="form-control"
                          value={formData.fatherContactNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="motherName" className="form-label">
                          Mother Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="motherName"
                          name="motherName"
                          className="form-control"
                          value={formData.motherName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="motherContactNo" className="form-label">
                          Mother Contact Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="motherContactNo"
                          name="motherContactNo"
                          className="form-control"
                          value={formData.motherContactNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="currentAddress" className="form-label">
                        Current Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="currentAddress"
                        name="currentAddress"
                        rows={3}
                        value={formData.currentAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          id="country"
                          name="country"
                          options={countryOptions}
                          value={
                            formData.country
                              ? {
                                  value: formData.country,
                                  label: formData.country,
                                }
                              : null
                          }
                          onChange={handleCountryChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a country"
                          formatCreateLabel={(inputValue) =>
                            `Use "${inputValue}"`
                          }
                          noOptionsMessage={() => "Type to add a new country"}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                          State <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          value={
                            formData.state
                              ? { value: formData.state, label: formData.state }
                              : null
                          }
                          onChange={handleStateChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a state"
                          formatCreateLabel={(inputValue) =>
                            `Use "${inputValue}"`
                          }
                          noOptionsMessage={() =>
                            formData.country
                              ? "Type to add a new state"
                              : "Select a country first"
                          }
                          isValidNewOption={(inputValue) =>
                            inputValue.length > 0
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                          City <span className="text-danger">*</span>
                        </label>
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          value={
                            formData.city
                              ? { value: formData.city, label: formData.city }
                              : null
                          }
                          onChange={handleCityChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a city"
                          formatCreateLabel={(inputValue) =>
                            `Use "${inputValue}"`
                          }
                          noOptionsMessage={() =>
                            formData.state
                              ? "Type to add a new city"
                              : "Select a state first"
                          }
                          isValidNewOption={(inputValue) =>
                            inputValue.length > 0
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {!isNursery && (
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          {" "}
                          <div className="mb-3">
                            <label
                              htmlFor="previousSchoolName"
                              className="form-label"
                            >
                              Previous School Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="previousSchoolName"
                              name="previousSchoolName"
                              className="form-control"
                              value={formData.previousSchoolName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          {" "}
                          <div className="mb-3">
                            <label
                              htmlFor="addressOfpreviousSchool"
                              className="form-label"
                            >
                              Address Of Previous School{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="addressOfpreviousSchool"
                              name="addressOfpreviousSchool"
                              className="form-control"
                              value={formData.addressOfpreviousSchool}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label
                              htmlFor="previousSchoolBoard"
                              className="form-label"
                            >
                              Previous School Board{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="previousSchoolBoard"
                              name="previousSchoolBoard"
                              className="form-control"
                              value={formData.previousSchoolBoard}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          {" "}
                          <div className="mb-3">
                            <label
                              htmlFor="previousSchoolResult"
                              className="form-label"
                            >
                              Result Of Previous School{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              id="previousSchoolResult"
                              name="previousSchoolResult"
                              className="form-control"
                              accept=".jpg,.jpeg,.pdf"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          {" "}
                          <div className="mb-3">
                            <label
                              htmlFor="tcCertificate"
                              className="form-label"
                            >
                              TC Certificate{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              id="tcCertificate"
                              name="tcCertificate"
                              className="form-control"
                              accept=".jpg,.jpeg,.pdf"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="studentCategory" className="form-label">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select
                          id="studentCategory"
                          name="studentCategory"
                          className="form-control"
                          value={formData.studentCategory}
                          onChange={handleChange}
                          disabled={
                            formData.nationality === "SAARC Countries" ||
                            formData.nationality === "International"
                          }
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="ST">ST</option>
                          <option value="SC">SC</option>
                        </select>
                      </div>
                    </div>

                    {formData.studentCategory !== "General" && (
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="castCertificate"
                            className="form-label"
                          >
                            Caste Certificate{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            id="castCertificate"
                            name="castCertificate"
                            className="form-control"
                            accept=".jpg,.jpeg,.pdf"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="aadharPassportFile"
                          className="form-label"
                        >
                          Aadhar/Passport Upload{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="aadharPassportFile"
                          name="aadharPassportFile"
                          className="form-control"
                          accept=".jpg,.jpeg,.pdf"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="aadharPassportNumber"
                          className="form-label"
                        >
                          Aadhar/Passport Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="aadharPassportNumber"
                          name="aadharPassportNumber"
                          className="form-control"
                          value={formData.aadharPassportNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="howReachUs" className="form-label">
                          How did you reach us{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          id="howReachUs"
                          name="howReachUs"
                          className="form-control"
                          value={formData.howReachUs}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select </option>
                          <option value="Teacher">Teacher</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Student">Student</option>
                          <option value="Online Search">Online Search</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {!showAdditionalData ? (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={handleSave}
                      >
                        Save & Continue
                      </button>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Understanding
                        </h4>
                      </div>
                      <div className="form-check ms-1 mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                          name="agreementChecked"
                          checked={formData.agreementChecked}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheck1"
                        >
                          I Understand & agree that the registration of my word
                          does not guarantee admission to the school & the
                          registration fee is neither transferable not
                          refundable.
                        </label>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="selectedFeeType"
                            className="form-label"
                          >
                            Fee Type <span className="text-danger">*</span>
                          </label>
                          <select
                            id="selectedFeeType"
                            name="selectedFeeType"
                            className="form-control"
                            value={selectedFeeType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Fee Type</option>
                            {availableFeeTypes.map((feeType) => (
                              <option key={feeType.id} value={feeType.id}>
                                {feeType.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="Registartionfees"
                            className="form-label"
                          >
                            Registration Fees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="Registartionfees"
                            name="Registartionfees"
                            className="form-control"
                            value={registrationFee}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label
                            htmlFor="concessionamount"
                            className="form-label"
                          >
                            Concession
                          </label>
                          <input
                            // type="number"
                            id="concessionamount"
                            name="concessionamount"
                            className="form-control"
                            value={concessionAmount}
                            onChange={handleChange}
                            max={registrationFee}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="finalamount" className="form-label">
                            Final Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="finalamount"
                            name="finalamount"
                            className="form-control"
                            value={finalAmount}
                            readOnly
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name of person filling the form{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Option{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            id="paymentMode"
                            name="paymentMode"
                            className="form-control"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select </option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online">Online</option>
                          </select>
                        </div>
                      </div>

                      {formData.paymentMode === "Cheque" && (
                        <>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="chequeNumber"
                                className="form-label"
                              >
                                Cheque Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="chequeNumber"
                                name="chequeNumber"
                                className="form-control"
                                value={formData.chequeNumber}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="bankName" className="form-label">
                                Bank Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="bankName"
                                name="bankName"
                                className="form-control"
                                value={formData.bankName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-primary custom-submit-button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Proceed Further...."
                            : "Proceed Further"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentRegistrationForm;
