import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PagenotFound404 from "./components/ErrorPages/404Page.jsx";
import UnauthorizedAccess from "./components/ErrorPages/403Page.jsx";

// ================================Website Routes================================================
import WebsiteMain from "./components/WebsiteMain.jsx";
import HomePage from "./components/HomeSection/HomePage.jsx";
import AboutPage from "./components/AboutSection/AboutPage.jsx";
import ContactUsPage from "./components/ContactUsSection/ContactUsPage.jsx";
import OrderDetailsWebSitePage from "./components/OrderDetailsWebsite/OrderDetailsWebSitePage.jsx";

import ServiceMainPage from "./components/ServiceSection/ServiceMainPage.jsx";
import DigitalService from "./components/ServiceSection/SubSections/DigitalService.jsx";
import BusinessSection from "./components/ServiceSection/SubSections/BusinessSection.jsx";
import RecruitmentSection from "./components/ServiceSection/SubSections/RecruitmentSection.jsx";
import ProcurementSection from "./components/ServiceSection/SubSections/ProcurementSection.jsx";

import CommunityMainPage from "./components/CommunitySection/CommunityMainPage.jsx";
import GallerySection from "./components/CommunitySection/SubSection/GallerySection.jsx";
import EdprowiseTalkSection from "./components/CommunitySection/SubSection/EdprowiseTalkSection.jsx";
import StudentZoneSection from "./components/CommunitySection/SubSection/StudentZoneSection.jsx";
import EducatorZoneSection from "./components/CommunitySection/SubSection/EducatorZoneSection.jsx";

import SupplierPage from "./components/BecomeSupplier/SupplierPage.jsx";
import FaqPage from "./components/FAQSection/FAQPage.jsx";
import PrivacyPage from "./components/PrivacyPage/PrivacyPage.jsx";
import CareerPage from "./components/CareerPage/CareerPage.jsx";
import CareerForm from "./components/CareerPage/CareerForm.jsx";

import ServiceFess from "./components/ServiceSection/ServiceDetails/FessPixal/ServiceFees.jsx";
import PayrollService from "./components/ServiceSection/ServiceDetails/PayrollService/PayrollService.jsx";
import FinanceBook from "./components/ServiceSection/ServiceDetails/FinanceBook/FinanceBook.jsx";
import SchoolOperation from "./components/ServiceSection/ServiceDetails/SchoolOperations/SchoolOperation.jsx";
import SchoolApplication from "./components/ServiceSection/ServiceDetails/SchoolApplication/SchoolApplicationTabs.jsx";
import SchoolWebsiteDesign from "./components/ServiceSection/ServiceDetails/SchoolWebsiteDesign/SchoolWebsiteDesign.jsx";

import TermsPage from "./components/PrivacyPage/TermsPage.jsx";
import RequestDemoForm from "./components/HomeSection/RequestDemoForm.jsx";

import StudentZoneFullBlog from "./components/CommunitySection/SubSection/StudentZoneBlog/StudentZoneFullBlog.jsx";
import StudentZoneFullBlog2 from "./components/CommunitySection/SubSection/StudentZoneBlog/StudentZoneFullBlog2.jsx";
import EducatorZoneBlog1 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog1.jsx";
import EducatorZoneBlog2 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog2.jsx";
import EducatorZoneBlog3 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog3.jsx";

import ForgotUserId from "./components/ForgotPasswordorUserId/ForgotUserId.jsx";
import NewUserId from "./components/ForgotPasswordorUserId/NewUserId.jsx";

// =================================Signup Login Routes================================================

import AdminLogin from "./components/Login/AdminLogin.jsx";
import UserLogin from "./components/Login/UserLogin.jsx";

import Signup from "./components/Signup/Signup.jsx";
import AdminSignup from "./components/Signup/AdminSignup.jsx";

// ==============Admin Routes ====================Admin Routes ========================Admin Routes=========

import ChangePasswordForAdmin from "./components/DashboardMainForAdmin/ChangePassword/ChangePassword.jsx";
import CompleteEdprowiseProfile from "./components/DashboardMainForAdmin/CompleteEdprowiseProfile/CompleteEdprowiseProfile.jsx";
import ViewAdminProfile from "./components/DashboardMainForAdmin/ViewAdminProfile/ViewAdminProfile.jsx";
import UpdateAdminProfile from "./components/DashboardMainForAdmin/UpdateAdminProfile/UpdateAdminProfile.jsx";
import AdminDashboardMain from "./components/DashboardMainForAdmin/AdminDashboardMain.jsx";
import Dashboard from "./components/DashboardMainForAdmin/Dashboard/Dashboard.jsx";

// ======================================Admin-List================================================================
import Admins from "./components/DashboardMainForAdmin/AllAdmin/Admin.jsx";
import AddNewAdmin from "./components/DashboardMainForAdmin/AllAdmin/AddNewAdmin/AddNewAdmin.jsx";
import UpdateAdmin from "./components/DashboardMainForAdmin/AllAdmin/UpdateAdmin/UpdateAdmin.jsx";

// ======================================School================================================================
import Schools from "./components/DashboardMainForAdmin/Schools/Schools.jsx";
import AddNewSchool from "./components/DashboardMainForAdmin/Schools/AddNewSchool/AddNewSchool.jsx";
import ViewSchool from "./components/DashboardMainForAdmin/Schools/ViewSchool/ViewSchool.jsx";
import UpdateSchool from "./components/DashboardMainForAdmin/Schools/UpdateSchool/UpdateSchool.jsx";

// ======================================Seller================================================================

import Sellers from "./components/DashboardMainForAdmin/Sellers/Sellers.jsx";
import AddNewSeller from "./components/DashboardMainForAdmin/Sellers/AddNewSeller/AddNewSeller.jsx";
import ViewSeller from "./components/DashboardMainForAdmin/Sellers/ViewSeller/ViewSeller.jsx";
import UpdateSeller from "./components/DashboardMainForAdmin/Sellers/UpdateSeller/UpdateSeller.jsx";

// ====================================== Subscriptions======================================

import Subscriptions from "./components/DashboardMainForAdmin/Subscription/Subscription.jsx";
import AddNewSubscription from "./components/DashboardMainForAdmin/Subscription/AddNewSubscription/AddNewSubscription.jsx";
import ViewSubscriptions from "./components/DashboardMainForAdmin/Subscription/ViewSubscription/ViewSubscription.jsx";
import UpdateSubscription from "./components/DashboardMainForAdmin/Subscription/UpdateSubscription/UpdateSubscription.jsx";

// =====================================EmailSettings====================================
// import SMTPHostSettings from "./components/DashboardMainForAdmin/EmailSMTPSettings/SMTPHostSettings/SMTPHostSettings.js";
// import EmailTemplatesList from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplatesTable/EmailTemplatesList.js";
// import SchoolRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SchoolRegistrationEmailTamplate.js";
// import SellerRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SellerRegistrationEmailTamplate.js";
// import PasswordUpdateEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/PasswordUpdate.js";

// ========================================Fees module===========================================

import ViewRequestsForDemo from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestsForDemo.jsx";
import { ViewRequestDemoDetails } from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestDemoDetails.jsx";
import ContactUsEdprowise from "./components/DashboardMainForAdmin/Enquiry/ContactUsEdprowise.jsx";
import ViewEnquiryDetails from "./components/DashboardMainForAdmin/Enquiry/ViewEnquiryDetails.jsx";

// ================================ Admin Procurement Services========================================
import AdminProcurementDashboard from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/ProcurementDashboard/ProcurementDashboard.jsx";

import TrackQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/TrackQuoteTable.jsx";
import ViewRequestedQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote.jsx";
import ViewAllQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable.jsx";
import ViewQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewQuote/ViewQuote.jsx";

import BankDetailsTable from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/BankDetailsTable.jsx";
import AddNewBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/AddNewBankDetail/AddNewBankDetail.jsx";
import UpdateBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/UpdateBankDetail/UpdateBankDetail.jsx";

import TrackOrderHistoryTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/TrackOrderHistoryTable.jsx";
import ViewOrderHistoryForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory.jsx";

import SubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/SubCategory.jsx";
import AddSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/AddSubCategory.jsx";
import UpdateSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/UpdateSubCategory.jsx";

// ====================EmailSettings====================================
// add on admin umesh new routes
import SMTPHostSettings from "./components/DashboardMainForAdmin/EmailSMTPSettings/SMTPHostSettings/SMTPHostSettings.jsx";
import EmailTemplatesList from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplatesTable/EmailTemplatesList.jsx";
import MarketingEmail from "./components/DashboardMainForAdmin/EmailSMTPSettings/Marketing/MarketingEmail.jsx";

// ====================================Payroll===============================================

import EmployeeRegistrationList from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/EmployeeRegistrationList.jsx";
import AddEmployeeRegistration from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/AddEmployeeRegistration.jsx";
import UpdateEmployeeRegistrationForm from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/UpdateEmployeeRegistrationForm.jsx";
import ViewEmployeeRegisterDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/ViewEmployeeRegisterDetails.jsx";
import UpdateEmployeeDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/UpdateDetails/UpdateEmployeeDetails.jsx";
import CTCUpdate from "./components/DashboardMainForAdmin/PayrollModule/Employer/CTCUpdate/CTCUpdate.jsx";
import DefineCtcComponentsList from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcComponentsList.jsx";
import DefineCtcCOmponents from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcCOmponents.jsx";
import EmployeeDetails from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeDetails/EmployeeDetails.jsx";
import AddProcessPayroll from "./components/DashboardMainForAdmin/PayrollModule/Employer/ProcessPayroll/AddProcessPayroll.jsx";
import AddSalaryIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/AddSalaryIncrement.jsx";
import SalarySlip from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/Salary Slip/SalarySlip.jsx";
import Form16 from "./components/DashboardMainForAdmin/PayrollModule/Employer/Form16/Form16.jsx";
import ItDeclaration from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ITDeclaration/ItDeclaration.jsx";
import RentDetails from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ITDeclaration/RentDetails.jsx";
import Form16Self from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/Form16/Form16.jsx";
import LoanStatement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LoanStatement/LoanStatement.jsx";
import MyAttendanceReport from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/MyAttendanceReport/MyAttendanceReport.jsx";
import ApplyForLeave from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ApplyForLeave/ApplyForLeave.jsx";
import IncomeTaxComputationSheet from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/IncomeTaxComputationSheet/IncomeTaxComputationSheet.jsx";
import GenerateAppointmentCTCLetter from "./components/DashboardMainForAdmin/PayrollModule/Employer/Generate AppointmentCTC Letter/GenerateAppointmentCTCLetter.jsx";
import CheckSupportingSubmittedForTaxList from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/CheckSupportingSubmittedForTaxList.jsx";
import ViewCheckSupportingSubmittedForTaxList from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/ViewCheckSupportingSubmittedForTaxList.jsx";
import VerifyRentDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/VerifyRentDetails.jsx";
import PayLoan from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/PayLoan.jsx";
import EmployeeLoanStatement from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/EmployeeLoanStatement.jsx";
import ViewEmployeeLoanStatement from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/ViewEmployeeLoanStatement.jsx";
import OvertimeAllowanceEmployeesTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/OvertimeAllowance/OvertimeAllowanceEmployeesTable.jsx";
import ViewOvertimeAllowanceEmployeesDetail from "./components/DashboardMainForAdmin/PayrollModule/Employer/OvertimeAllowance/ViewOvertimeAllowanceEmployeesDetail.jsx";
import PerformanceTrackingTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/PerformanceTracking/PerformanceTrackingTable.jsx";
import BulkEmployeeIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/BulkEmployeeIncrement/BulkEmployeeIncrement.jsx";
import SingleEmployeeIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/SingleEmployeeIncrement/SingleEmployeeIncrement.jsx";
import AnnualLeaveUpdate from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/AnnualLeaveUpdate/AnnualLeaveUpdate.jsx";
import OvertimeAllowanceRate from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/OvertimeAllowanceRate/OvertimeAllowanceRate.jsx";
import LoanSummary from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LoanStatement/LoanSummary.jsx";
import PreviousEmploymentIncome from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PreviousEmploymentIncome/PreviousEmploymentIncome.jsx";
import EmployeeResignationForm from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeExit/EmployeeResignation/EmployeeResignationForm.jsx";
import ResignationReport from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ResignationReport.jsx";
import EmployeeExitInterview from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeExit/EmployeeExitInterview/EmployeeExitInterview.jsx";
import EmployerResignationApproval from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployerResignationApproval/EmployerResignationApproval.jsx";
import ViewEmployeeResignationDetail from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ViewEmployeeResignationDetails.jsx";
import ViewEmployeeExitInterview from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ViewEmployeeExitInterview.jsx";
import RequestForLoan from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/RequestForLoan/RequestForLoan.jsx";
import PayLoanEmployeeTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/PayLoanEmployeeTable.jsx";
import ViewEmployeeLoanSummary from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/ViewEmployeeLoanSummary.jsx";
import FreezeITDeclaration from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/FreezeITDeclaration/FreezeITDeclaration.jsx";
import DefineJobDesignation from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/JobDesignation/DefineJobDesignation.jsx";
import DefineGrade from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/Grade/DefineGrade.jsx";
import ViewEmployeePerformanceAppraisal from "./components/DashboardMainForAdmin/PayrollModule/Employer/PerformanceTracking/ViewEmployeePerformanceAppraisal.jsx";
import DefineCategory from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/DefineCategory/DefineCategory.jsx";
import LetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/LetterAndDocuments.jsx";
import PromotionNomination from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PromotionNomination/PromotionNomination.jsx";
import AddAwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/AddAwardsAndAchievement.jsx";
import AwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/AwardsAndAchievement.jsx";
import ViewAwardAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/ViewAwardAndAchievement.jsx";
import AddLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/AddLetterAndDocuments.jsx";
import ViewLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/ViewLetterAndDocuments.jsx";
import UpdateLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/UpdateLetterAndDocuments.jsx";
import UpdateAwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/UpdateAwardsAndAchievement.jsx";

// ================School Routes=============School Routes============School Routes===========================

import CompleteSchoolProfile from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfile.jsx";
import CompleteSchoolProfileBySchool from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfileBySchool.jsx";
import UpdateSchoolProfile from "./components/DashboardMainForSchool/UpdateSchoolProfile/UpdateSchoolProfile.jsx";
import ViewSchoolProfile from "./components/DashboardMainForSchool/ViewSchoolProfile/ViewSchoolProfile.jsx";
import ChangePasswordForSchoolAdmin from "./components/DashboardMainForSchool/ChangePassword/ChangePassword.jsx";

import SchoolDashboardMain from "./components/DashboardMainForSchool/SchoolDashboardMain.jsx";
import SchoolDashboard from "./components/DashboardMainForSchool/SchoolDashboard/SchoolDashboard.jsx";

// ================================ School Procurement Services========================================
import SchoolProcurementDashboard from "./components/DashboardMainForSchool/ProcurementServices/ProcurementDashboard/ProcurementDashboard.jsx";

import TrackQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/TrackQuoteTable.jsx";
import RequestQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/RequestQuote/RequestQuote.jsx";

import ViewRequestedQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote.jsx";

import ViewQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewQuote/ViewQuote.jsx";
import ViewAllQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable.jsx";

import ViewCart from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/Cart/ViewCart.jsx";

import TrackOrderHistoryTable from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/TrackOrderHistoryTable.jsx";
import ViewOrderHistory from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory.jsx";

import PayToEdProwiseForSchool from "./components/DashboardMainForSchool/ProcurementServices/PayToEdProwise/PayToEdProwise.jsx";

// =====================================School Fees Module==============================================

import StudentRegisterListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/StudentRegisterListTable.jsx";
import StudentRegistrationForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/NewStudentRegistration/StudentRegistrationForm.jsx";
import ViewStudentInfoRegister from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/ViewStudentInfoRegister/ViewStudentInfoRegister.jsx";
import UpdateStudentRegistrationForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/UpdateStudentRegistrationForm.js/UpdateStudentRegistrationForm.jsx";
import StudentAdmissionListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionListTable.jsx";
import StudentAdmissionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionForm/StudentAdmissionForm.jsx";
import ViewStudentAdmissionDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/ViewStudentAdmissionDetail/ViewStudentAdmissionDetails.jsx";
import UpdateAdmissionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/UpdateAdmissionDetail/UpdateAdmissionForm.jsx";
import StudentTCFormTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCFormTable.jsx";
import StudentAddTCForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCForm/StudentAddTCForm.jsx";
import ViewTCFormDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/ViewTCFormDetails/ViewTCFormDetails.jsx";
import UpdateTCForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/UpdateTCform/UpdateTCForm.jsx";
import ConcessionStudentListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionStudentListTable.jsx";
import AddConcessionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionForm/AddConcessionForm.jsx";
import ViewStudentConcessionDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ViewStudentConcessionForm/ViewStudentConcessionDetails.jsx";
import UpdateConcessionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/UpdateConcessionForm/UpdateConcessionForm.jsx";

import ClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/ClassAndSection.jsx";
import FeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/FeesStructure.jsx";
import UpdateFeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/UpdateFeesStructure.jsx";
import ViewFeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/ViewFeesStructure.jsx";
import SchoolShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/SchoolShifts.jsx";
import CreateClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/CreateClassAndSection.jsx";
import UpdateClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/UpdateClassAndSection.jsx";
import ViewClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/ViewClassAndSection.jsx";
import TypeOfFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/TypeOfFeesList.jsx";
import AddFeesType from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/AddFeesType.jsx";
import UpdateFeesType from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/UpdateFeesType.jsx";
import AddShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/AddShifts.jsx";
import UpdateShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/UpdateShifts.jsx";
import FeesStructureListTable from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/FeesStructureListTable.jsx";
import SchoolFeesReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/SchoolFeesReceipts.jsx";
import StudentReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/Recipt.jsx";
import FeeReceiptsSchoolFees from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/FeeReceiptsForm.jsx";
import BoardRegistrationFee from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardRegistrationFees/BoardRegistrationFees.jsx";
import BoardRegistrationFeeReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardRegistrationFees/BoardRegistrationReceipts.jsx";
import BoardExamFee from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardExamFees/BoardExamFee.jsx";
import BoardExamFeeReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardExamFees/BoardExamReceipts.jsx";
import RegistrationOfficialDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/NewStudentRegistration/RegistrationOfficialDetails.jsx";
import AdmissionOfficialInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionForm/AdmissionOfficialInformation.jsx";
import TcOfficialInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCForm/TCOfficialInformation.jsx";
import ConcessionFormInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionForm/ConcessionOfficialInformation.jsx";
import PrefixSetting from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/PrefixTable.jsx";
import AddPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/AddPrefix.jsx";
import AdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/PrefixTable.jsx";
import AddAdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/AddPrefix.jsx";
import Fine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/FineTable.jsx";
import AddFine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/Addfine.jsx";
import OneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/OneTimeFeesTable.jsx";
import AddOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/AddoneTimeFees.jsx";
import UpdateOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/UpdateOneTimeFees.jsx";
import ViewOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/ViewOneTimeFees.jsx";

import AddBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/AddBoardRegistrationFees.jsx";
import UpdateBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/UpdateBoardRegistration.jsx";
import ViewBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/ViewBoardRegistration.jsx";
import BoardRegistrationFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/BoardRegistrationFeesTable.jsx";

import AddBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/AddBoardExamFees.jsx";
import UpdateBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/UpdateBoardExamFees.jsx";
import ViewBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/ViewBoardExamFees.jsx";
import BoardExamFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/BoardExamFeesTable.jsx";

// ======================Seller Routes==========================Seller Routes=====================Seller Routes=======================
import CompleteSellerProfile from "./components/DashboardMainForSeller/CompleteSellerProfile/CompleteSellerProfile.jsx";

import ViewSellerProfile from "./components/DashboardMainForSeller/ViewSellerProfile/ViewSellerProfile.jsx";
import UpdateSellerProfile from "./components/DashboardMainForSeller/UpdateSellerProfile/UpdateSellerProfile.jsx";
import ChangePasswordForSeller from "./components/DashboardMainForSeller/ChangePassword/ChangePassword.jsx";
import SellerDashboardMain from "./components/DashboardMainForSeller/SellerDashboardMain.jsx";
import SellerDashboard from "./components/DashboardMainForSeller/SellerDashboard/SellerDashboard.jsx";

import SellerProcurementDashboard from "./components/DashboardMainForSeller/ProcurementServicesForSeller/ProcurementDashboard/ProcurementDashboard.jsx";

import TrackQuoteTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/TrackQuoteTable.jsx";
import ViewRequestedQuoteForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote.jsx";

import SubmitQuote from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/SubmitQuote/SubmitQuote.jsx";

import TrackOrderHistoryTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/TrackOrderHistoryTable.jsx";
import ViewOrderHistoryForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory.jsx";

import PayToEdprowiseForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/PayToEdProwise/PayToEdProwise.jsx";

// umesh Added
import ForgotPassword from "./components/ForgotPasswordorUserId/ForgotPassword.jsx";
import NewPassword from "./components/ForgotPasswordorUserId/NewPassword.jsx";

// ================================Comman Pages================================================//
import SchoolCommanpage from "./components/CommanPage/CommanPageCardsSchool.jsx";
import SchoolFeesManagementYear from "./components/CommanPage/YearPage.jsx";

import RemoveThemeAttribute from "./components/RemoveThemeAttribute.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";

const DashboardLayout = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const PrivateRoute = ({ allowedRoles, requiredSubscription, children }) => {
  const { isAuthenticated, role, subscription } = useAuth();

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed, redirecting to unauthorized`);
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredSubscription) {
    const hasSubscription = subscription?.some(
      (sub) =>
        sub.subscriptionFor === requiredSubscription &&
        new Date(sub.subscriptionEndDate) > new Date()
    );

    if (!hasSubscription) {
      console.log(
        `Subscription ${requiredSubscription} required but not active`
      );
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log("Access granted");
  return children ? children : <Outlet />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role, userDetails } = useAuth();

  if (isAuthenticated) {
    if (role === "Admin") {
      return (
        <Navigate
          to={
            userDetails?.status === "Pending"
              ? "/complete-admin-profile"
              : "/admin-dashboard"
          }
          replace
        />
      );
    }

    if (role === "School") {
      return (
        <Navigate
          to={
            userDetails?.status === "Pending"
              ? "/complete-school-profile"
              : "/school/go-to-dashboard"
          }
          replace
        />
      );
    }

    if (role === "Seller") {
      return (
        <Navigate
          to={
            userDetails?.status === "Pending"
              ? "/complete-seller-profile"
              : "/seller-dashboard"
          }
          replace
        />
      );
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <UserLogin />
          </PublicRoute>
        }
      />

      <Route
        path="/login/admin"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/signup/admin"
        element={
          <PublicRoute>
            <AdminSignup />
          </PublicRoute>
        }
      />

      <Route
        path="/school/go-to-dashboard"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolCommanpage />
          </PrivateRoute>
        }
      />
      <Route
        path="/school/fees-management-year"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolFeesManagementYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password/new-password"
        element={
          <PublicRoute>
            <NewPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/complete-admin-profile"
        element={
          <PrivateRoute allowedRoles={["Admin"]}>
            <DashboardLayout>
              <CompleteEdprowiseProfile />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/complete-school-profile"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <CompleteSchoolProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/complete-your-school-profile"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <CompleteSchoolProfileBySchool />
          </PrivateRoute>
        }
      />

      <Route
        path="/complete-seller-profile"
        element={
          <PrivateRoute allowedRoles={["Seller"]}>
            <CompleteSellerProfile />
          </PrivateRoute>
        }
      />

      {/* =========================Website Routes========================= */}

      <Route
        path="/"
        element={
          <>
            <RemoveThemeAttribute />
            <WebsiteMain />
          </>
        }
      >
        <Route index element={<HomePage />} />

        <Route path="about-us" element={<AboutPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="order" element={<OrderDetailsWebSitePage />} />

        <Route path="services" element={<ServiceMainPage />}>
          <Route path="digital-services" element={<DigitalService />} />
          <Route path="academic-admin-services" element={<BusinessSection />} />
          <Route path="hire-teacher" element={<RecruitmentSection />} />
          <Route path="get-goods-for-school" element={<ProcurementSection />} />
        </Route>

        <Route path="community-connect" element={<CommunityMainPage />}>
          <Route path="gallery" element={<GallerySection />} />
          <Route path="edprowise-talks" element={<EdprowiseTalkSection />} />
          <Route path="student-zone" element={<StudentZoneSection />} />
          <Route path="educator-zone" element={<EducatorZoneSection />} />
        </Route>

        <Route path="become-supplier" element={<SupplierPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="career/:jobName" element={<CareerForm />} />
        <Route path="request-demo" element={<RequestDemoForm />} />
        <Route
          path="services/digital-services/school-fees-management"
          element={<ServiceFess />}
        />
        <Route
          path="services/digital-services/school-payroll"
          element={<PayrollService />}
        />
        <Route
          path="services/digital-services/school-financial-management"
          element={<FinanceBook />}
        />
        <Route
          path="services/digital-services/school-operation-management"
          element={<SchoolOperation />}
        />
        <Route
          path="services/digital-services/school-mobile-application"
          element={<SchoolApplication />}
        />
        <Route
          path="services/digital-services/school-website-design"
          element={<SchoolWebsiteDesign />}
        />

        <Route
          path="community-connect/student-zone/proposed-exam-reforms-by-cbse"
          element={<StudentZoneFullBlog />}
        />

        <Route
          path="community-connect/student-zone/how-to-be-successful-in-the-cbse-board-exam"
          element={<StudentZoneFullBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/how-to-be-successful-teacher"
          element={<EducatorZoneBlog1 />}
        />

        <Route
          path="community-connect/educator-zone/teaching-strategies-and-pedagogy"
          element={<EducatorZoneBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/teacher-well-being-and-work-life-balance"
          element={<EducatorZoneBlog3 />}
        />
      </Route>

      {/* ===================================================Admin Routes==================================== */}

      <Route
        path="/admin-dashboard"
        element={
          <ThemeProvider>
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminDashboardMain />
            </PrivateRoute>
          </ThemeProvider>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Main Dashboard Route */}
        <Route path="view-admin-profile" element={<ViewAdminProfile />} />
        <Route path="update-admin-profile" element={<UpdateAdminProfile />} />
        <Route
          path="change-edprowise-admin-password"
          element={<ChangePasswordForAdmin />}
        />

        {/* School Table page and it's Add, View, Update Routes */}
        <Route path="admins" element={<Admins />}>
          <Route path="add-new-admin" element={<AddNewAdmin />} />
          <Route path="update-admin" element={<UpdateAdmin />} />
        </Route>

        {/* School Table page and it's Add, View, Update Routes */}
        <Route path="schools" element={<Schools />}>
          <Route path="add-new-school" element={<AddNewSchool />} />
          <Route path="view-school" element={<ViewSchool />} />
          <Route path="update-school" element={<UpdateSchool />} />
        </Route>
        {/* Subscriptions Table page and it's Add, View, Update Routes */}
        <Route path="subscriptions" element={<Subscriptions />}>
          <Route
            path="add-new-subscriptions"
            element={<AddNewSubscription />}
          />
          <Route path="view-subscriptions" element={<ViewSubscriptions />} />
          <Route path="update-subscriptions" element={<UpdateSubscription />} />
        </Route>
        {/* Seller Table page and it's Add, View, Update Routes */}
        <Route path="sellers" element={<Sellers />}>
          <Route path="add-new-seller" element={<AddNewSeller />} />
          <Route path="view-seller" element={<ViewSeller />} />
          <Route path="update-seller" element={<UpdateSeller />} />
        </Route>
        {/* =====================Fees module=========================================== */}
        <Route path="request-for-demo" element={<ViewRequestsForDemo />} />
        <Route
          path="request-for-demo/view-demo-request-details"
          element={<ViewRequestDemoDetails />}
        />
        <Route path="enquiry" element={<ContactUsEdprowise />} />
        <Route
          path="enquiry/enquity-details"
          element={<ViewEnquiryDetails />}
        />
        {/*======================= Procurement Services Routes================== */}
        <Route
          path="procurement-services/dashboard"
          element={<AdminProcurementDashboard />}
        />
        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTableForAdmin />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuoteForAdmin />}
        />
        <Route
          path="procurement-services/view-quote-table"
          element={<ViewAllQuoteTableForAdmin />}
        />
        <Route
          path="procurement-services/view-quote"
          element={<ViewQuoteForAdmin />}
        />
        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTableForAdmin />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistoryForAdmin />}
        />

        <Route
          path="procurement-services/good-services"
          element={<SubCategory />}
        >
          <Route path="add-goods-services" element={<AddSubCategory />} />
          <Route path="update-goods-services" element={<UpdateSubCategory />} />
        </Route>

        <Route
          path="procurement-services/bank-details"
          element={<BankDetailsTable />}
        />
        <Route
          path="procurement-services/add-bank-detail"
          element={<AddNewBankDetail />}
        />
        <Route
          path="procurement-services/update-bank-detail"
          element={<UpdateBankDetail />}
        />

        {/*=============================== Email routes================== */}

        <Route path="email/smtp-setting" element={<SMTPHostSettings />} />
        <Route path="email/templates" element={<EmailTemplatesList />} />
        <Route path="email/marketing" element={<MarketingEmail />} />

        {/* ==================================Pay Roll==================================== */}

        {/* ===========================Admin Settings=================== */}
        <Route
          path="payroll-module/admin-setting/freeze-it-declaration"
          element={<FreezeITDeclaration />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components"
          element={<DefineCtcComponentsList />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components/define-ctc-components"
          element={<DefineCtcCOmponents />}
        />

        <Route
          path="payroll-module/admin-setting/define-grade"
          element={<DefineGrade />}
        />

        <Route
          path="payroll-module/admin-setting/define-category"
          element={<DefineCategory />}
        />

        <Route
          path="payroll-module/admin-setting/annual-leave-update"
          element={<AnnualLeaveUpdate />}
        />

        <Route
          path="payroll-module/admin-setting/overtime-allowance-rate"
          element={<OvertimeAllowanceRate />}
        />

        <Route
          path="payroll-module/admin-setting/define-job-designation"
          element={<DefineJobDesignation />}
        />

        {/* ************Employee Self Services */}
        <Route
          path="payroll-module/employee-services/update-details"
          element={<EmployeeDetails />}
        />

        <Route
          path="payroll-module/employee-services/salary-slip"
          element={<SalarySlip />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/it-declaration"
          element={<ItDeclaration />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/it-declaration/rent-details"
          element={<RentDetails />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/income-tax-computation-sheet"
          element={<IncomeTaxComputationSheet />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/form16"
          element={<Form16Self />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/previous-employment-income"
          element={<PreviousEmploymentIncome />}
        />

        <Route
          path="payroll-module/employee-services/request-for-loan"
          element={<RequestForLoan />}
        />

        <Route
          path="payroll-module/employee-services/loan-summary"
          element={<LoanSummary />}
        />

        <Route
          path="payroll-module/employee-services/loan-summary/my-loan-statement"
          element={<LoanStatement />}
        />

        <Route
          path="payroll-module/employee-services/my-attendance-report"
          element={<MyAttendanceReport />}
        />

        <Route
          path="payroll-module/employee-services/apply-for-leave"
          element={<ApplyForLeave />}
        />

        <Route
          path="payroll-module/employee-services/exit/employee-resignation-form"
          element={<EmployeeResignationForm />}
        />

        <Route
          path="payroll-module/employee-services/exit/exit-interview"
          element={<EmployeeExitInterview />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents"
          element={<LetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/add-letter-documents"
          element={<AddLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/view-letter-documents"
          element={<ViewLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/update-letter-documents"
          element={<UpdateLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement"
          element={<AwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/add-award-achievement"
          element={<AddAwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/view-award-achievement"
          element={<ViewAwardAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/update-award-achievement"
          element={<UpdateAwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/promotion-nomination"
          element={<PromotionNomination />}
        />

        {/* ************Employer************  */}
        <Route
          path="payroll-module/employer/registration"
          element={<EmployeeRegistrationList />}
        />

        <Route
          path="payroll-module/employer/registration/registration-form"
          element={<AddEmployeeRegistration />}
        />

        <Route
          path="payroll-module/employer/registration/update-registration-form"
          element={<UpdateEmployeeRegistrationForm />}
        />

        <Route
          path="payroll-module/employer/registration/view-registration-form"
          element={<ViewEmployeeRegisterDetails />}
        />

        <Route
          path="payroll-module/employer/update-employee-details"
          element={<UpdateEmployeeDetails />}
        />

        <Route
          path="payroll-module/employer/ctc-Update"
          element={<CTCUpdate />}
        />

        <Route
          path="payroll-module/employer/payroll-process"
          element={<AddProcessPayroll />}
        />

        <Route
          path="payroll-module/employer/salary-increment/bulk-employee-increment"
          element={<BulkEmployeeIncrement />}
        />

        <Route
          path="payroll-module/employer/salary-increment/single-employee-increment"
          element={<SingleEmployeeIncrement />}
        />

        <Route
          path="payroll-module/employer/form-16-list"
          element={<Form16 />}
        />

        <Route
          path="payroll-module/employer/generate-appointment-ctc-letter"
          element={<GenerateAppointmentCTCLetter />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted"
          element={<CheckSupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted/view-supporting-submitted-for-Tax"
          element={<ViewCheckSupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted/view-supporting-submitted-for-Tax/view-rent-details"
          element={<VerifyRentDetails />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/pay-loan"
          element={<PayLoanEmployeeTable />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/pay-loan/pay-loan-detail"
          element={<PayLoan />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement"
          element={<EmployeeLoanStatement />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement/view-loan-summary"
          element={<ViewEmployeeLoanSummary />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement/view-loan-summary/view-loan-Statement"
          element={<ViewEmployeeLoanStatement />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance"
          element={<OvertimeAllowanceEmployeesTable />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance/view-overtime-allowance-detail"
          element={<ViewOvertimeAllowanceEmployeesDetail />}
        />

        <Route
          path="payroll-module/employer/performance-tracking"
          element={<PerformanceTrackingTable />}
        />

        <Route
          path="payroll-module/employer/performance-tracking/employee-performance-appraisal"
          element={<ViewEmployeePerformanceAppraisal />}
        />

        <Route
          path="payroll-module/employer/resignation"
          element={<ResignationReport />}
        />

        <Route
          path="payroll-module/employer/resignation/resignation-approval-form"
          element={<EmployerResignationApproval />}
        />

        <Route
          path="payroll-module/employer/resignation/view-employee-resignation-detail"
          element={<ViewEmployeeResignationDetail />}
        />

        <Route
          path="payroll-module/employer/resignation/view-employee-exit-interview"
          element={<ViewEmployeeExitInterview />}
        />
      </Route>
      {/* ==========================================Schhool Routes================================*/}
      <Route
        path="/school-dashboard"
        element={
          <>
            <ThemeProvider>
              <PrivateRoute allowedRoles={["School"]}>
                <SchoolDashboardMain />
              </PrivateRoute>
            </ThemeProvider>
          </>
        }
      >
        <Route index element={<SchoolProcurementDashboard />} />
        {/*School Dashboard Route */}
        <Route path="view-school-profile" element={<ViewSchoolProfile />} />
        <Route path="update-school-profile" element={<UpdateSchoolProfile />} />
        <Route
          path="change-school-admin-password"
          element={<ChangePasswordForSchoolAdmin />}
        />

        <Route index element={<SchoolDashboard />} />

        {/* ============Procurement Services========== */}
        <Route
          path="procurement-services/dashboard"
          element={<SchoolProcurementDashboard />}
        />
        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTable />}
        />
        <Route
          path="procurement-services/request-quote"
          element={<RequestQuote />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuote />}
        />

        <Route path="procurement-services/view-quote" element={<ViewQuote />} />
        <Route
          path="procurement-services/view-quote-table"
          element={<ViewAllQuoteTable />}
        />

        <Route path="procurement-services/view-cart" element={<ViewCart />} />

        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTable />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistory />}
        />
        <Route
          path="procurement-services/Pay-to-edprowise"
          element={<PayToEdProwiseForSchool />}
        />

        {/* ==========================================Fees Module================================== */}
        <Route
          path="fees-module/form/registration"
          element={
            // <PrivateRoute allowedRoles={["School"]} requiredSubscription="Fees">
            <PrivateRoute>
              <StudentRegisterListTable />
            </PrivateRoute>
          }
        />
        <Route
          path="fees-module/form/registration-form"
          element={<StudentRegistrationForm />}
        />
        <Route
          path="fees-module/form/registed-student-info"
          element={<ViewStudentInfoRegister />}
        />
        <Route
          path="fees-module/form/update-registed-student-info"
          element={<UpdateStudentRegistrationForm />}
        />
        <Route
          path="fees-module/form/registration-form/receipts"
          element={<RegistrationOfficialDetails />}
        />

        <Route
          path="fees-module/form/admission"
          element={<StudentAdmissionListTable />}
        />
        <Route
          path="fees-module/form/admission-form"
          element={<StudentAdmissionForm />}
        />
        <Route
          path="fees-module/form/admission-form/admission-details"
          element={<AdmissionOfficialInformation />}
        />
        <Route
          path="fees-module/form/view-admission-details"
          element={<ViewStudentAdmissionDetails />}
        />
        <Route
          path="fees-module/form/update-admission-form"
          element={<UpdateAdmissionForm />}
        />

        <Route
          path="fees-module/form/trasfer-certificate-list"
          element={<StudentTCFormTable />}
        />
        <Route
          path="fees-module/form/trasfer-certificate-form"
          element={<StudentAddTCForm />}
        />
        <Route
          path="fees-module/form/view-trasfer-certificate-details"
          element={<ViewTCFormDetails />}
        />
        <Route
          path="fees-module/form/update-trasfer-certificate-form"
          element={<UpdateTCForm />}
        />

        <Route
          path="fees-module/form/trasfer-certificate-form-details"
          element={<TcOfficialInformation />}
        />

        <Route
          path="fees-module/form/concession-table"
          element={<ConcessionStudentListTable />}
        />
        <Route
          path="fees-module/form/concession-form"
          element={<AddConcessionForm />}
        />
        <Route
          path="fees-module/form/view-concession-details"
          element={<ViewStudentConcessionDetails />}
        />
        <Route
          path="fees-module/form/update-concession-form"
          element={<UpdateConcessionForm />}
        />
        <Route
          path="fees-module/form/concession-form-details"
          element={<ConcessionFormInformation />}
        />

        {/*---------------------- Admin Settings ------------------*/}

        {/*------------------------------------ Prefix Seetings----------------------------- */}

        <Route
          path="fees-module/admin-setting/prefix-setting/registartion-prefix"
          element={<PrefixSetting />}
        />
        <Route
          path="fees-module/admin-setting/prefix-setting/registartion-prefix/add-prefix"
          element={<AddPrefix />}
        />

        <Route
          path="fees-module/admin-setting/prefix-setting/admission-prefix"
          element={<AdmissionPrefix />}
        />
        <Route
          path="fees-module/admin-setting/prefix-setting/admission-prefix/add-prefix"
          element={<AddAdmissionPrefix />}
        />

        {/*--------------------------------------- Grade-------------------------------- */}

        <Route
          path="fees-module/admin-setting/grade/class-section"
          element={<ClassAndSection />}
        />
        <Route
          path="fees-module/admin-setting/grade/class-section/create-class-section"
          element={<CreateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/class-section/update-class-section"
          element={<UpdateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/class-section/view-class-section"
          element={<ViewClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/shifts"
          element={<SchoolShifts />}
        />
        <Route
          path="fees-module/admin-setting/grade/shifts/add-shift"
          element={<AddShifts />}
        />

        <Route
          path="fees-module/admin-setting/grade/shifts/update-shift"
          element={<UpdateShifts />}
        />

        {/*-------------------------------------- Fees Structure--------------------------------------- */}

        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list"
          element={<TypeOfFeesList />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list/add-fees-type"
          element={<AddFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list/update-fees-type"
          element={<UpdateFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees"
          element={<FeesStructureListTable />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/add-school-fees"
          element={<FeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/update-school-fees"
          element={<UpdateFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/view-school-fees"
          element={<ViewFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees"
          element={<OneTimeFees />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-add"
          element={<AddOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-update"
          element={<UpdateOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-view"
          element={<ViewOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/fine"
          element={<Fine />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/fine/add-fine"
          element={<AddFine />}
        />

        {/*--------------------------------------Board Fees--------------------------------------- */}

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees"
          element={<BoardRegistrationFeesList />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-add"
          element={<AddBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-update"
          element={<UpdateBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-view"
          element={<ViewBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/exam-fees"
          element={<BoardExamFeesList />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-add"
          element={<AddBoardExamFees />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-update"
          element={<UpdateBoardExamFees />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-view"
          element={<ViewBoardExamFees />}
        />

        {/* --------------------------------------------Fees Receipts------------------------------------------------------- */}

        <Route
          path="fees-module/fees-receipts/school-fees"
          element={<SchoolFeesReceipts />}
        />

        <Route
          path="fees-module/fees-receipts/school-fees/student-receipts"
          element={<StudentReceipts />}
        />
        <Route
          path="fees-module/fees-receipts/school-fees/fees-receipts"
          element={<FeeReceiptsSchoolFees />}
        />

        <Route
          path="fees-module/fees-receipts/board-registration-fees"
          element={<BoardRegistrationFee />}
        />

        <Route
          path="fees-module/fees-receipts/board-registration-fees/receipts"
          element={<BoardRegistrationFeeReceipts />}
        />

        <Route
          path="fees-module/fees-receipts/board-exam-fees"
          element={<BoardExamFee />}
        />

        <Route
          path="fees-module/fees-receipts/board-exam-fees/receipts"
          element={<BoardExamFeeReceipts />}
        />
      </Route>
      {/* =========================================Seller Routes============================================= */}

      <Route
        path="/seller-dashboard"
        element={
          <ThemeProvider>
            <PrivateRoute allowedRoles={["Seller"]}>
              <SellerDashboardMain />
            </PrivateRoute>
          </ThemeProvider>
        }
      >
        {/*Seller Dashboard Route */}

        <Route index element={<SellerProcurementDashboard />} />

        <Route path="view-seller-profile" element={<ViewSellerProfile />} />
        <Route path="update-seller-profile" element={<UpdateSellerProfile />} />

        <Route
          path="change-seller-password"
          element={<ChangePasswordForSeller />}
        />

        {/* Procurement Services Routes */}
        <Route
          path="procurement-services/dashboard"
          element={<SellerProcurementDashboard />}
        />

        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTableForSeller />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuoteForSeller />}
        />

        <Route
          path="procurement-services/submit-quote"
          element={<SubmitQuote />}
        />

        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTableForSeller />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistoryForSeller />}
        />
        <Route
          path="procurement-services/Pay-to-edprowise"
          element={<PayToEdprowiseForSeller />}
        />
      </Route>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            role === "Admin" ? (
              <Navigate to="/admin-dashboard/dashboard" replace />
            ) : role === "School" ? (
              <Navigate to="/school-dashboard/dashboard" replace />
            ) : role === "Seller" ? (
              <Navigate to="/seller-dashboard/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/*----------------------------------------- Error Routes-------------------------------------------------------- */}
      <Route path="/404" element={<PagenotFound404 />} />
      <Route path="/unauthorized" element={<UnauthorizedAccess />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
