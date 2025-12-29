import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomePage from "./page/HomePage";
import NotFoundPage from "./page/NotFoundPage";
import SignInPage from "./page/SignInPage";
import SignUpPage from "./page/SignUpPage";
import VerifyPage from "./page/VerifyPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import UserAccount from "./module/UserProfile/UserAccount";
import UserOrder from "./module/UserProfile/UserOrder";
import UserAddress from "./module/UserProfile/UserAddress";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import ProductDetail from "./page/ProductDetail";
import UpdatePassword from "./module/UserProfile/UpdatePassword";
import CartPage from "./module/cart/CartPage";
import PaymentPage from "./module/payment/PaymentPage";
import ProductFilterPage from "./page/ProductFilterPage";
import PaymentCash from "./module/payment/PaymentCash";
import PaymentBank from "./module/payment/PaymentBank";
import PaymentResult from "./page/PaymentResult";
import InformationDetailOrder from "./module/UserProfile/InformationDetailOrder";
import Navbar from "./components/navbar/Navbar";
// PayPal removed - using PayOS instead
import { key } from "./utils/constants/key";
import ContactWidget from "./components/contact/ContactWidget";
import HelpCenterPage from "./page/support/HelpCenterPage";
import AboutUsPage from "./page/about/AboutUsPage";
import CompanyPage from "./page/about/CompanyPage";
import NewsPage from "./page/about/NewsPage";
import NewsDetailPage from "./page/about/NewsDetailPage";
import LegalPage from "./page/about/LegalPage";
import PartnersPage from "./page/partners/PartnersPage";
import PartnersBenefitsPage from "./page/partners/PartnersBenefitsPage";
import PartnersApplyPage from "./page/partners/PartnersApplyPage";
import PartnersContactPage from "./page/partners/PartnersContactPage";
import SnowEffect from "./components/snow/SnowEffect";
import { fetchCSRFToken } from "./api/axiosClient";
import { toast } from "react-toastify";

// ProtectedRoute Component - Inline để không cần file riêng
function ProtectedRoute({ children, requiredRoles = [] }) {
  const { current: currentUser } = useSelector((state) => state.user);

  // Kiểm tra đã đăng nhập chưa
  if (!currentUser) {
    toast.warning("Vui lòng đăng nhập để truy cập trang này");
    return <Navigate to="/sign-in" replace />;
  }

  // Kiểm tra role nếu có yêu cầu
  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    toast.error("Bạn không có quyền truy cập trang này");
    return <Navigate to="/" replace />;
  }

  // Tất cả kiểm tra đã pass, render component
  return children;
}

function App() {
  const { current: currentUser } = useSelector((state) => state.user);

  // Fetch CSRF token on app initialization if user is already logged in
  useEffect(() => {
    if (currentUser) {
      fetchCSRFToken().catch((error) => {
        console.error("Failed to fetch CSRF token on app init:", error);
      });
    }
  }, [currentUser]);

  return (
    <>
      <div className="app-wrapper">
        <SnowEffect />
        <Header />
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/sign-in" element={<SignInPage />}></Route>
              <Route path="/sign-up" element={<SignUpPage />}></Route>
              <Route path="/verify" element={<VerifyPage />}></Route>
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              ></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              ></Route>
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/account" element={<UserAccount />}></Route>
                <Route path="/account/orders" element={<UserOrder />}></Route>
                <Route
                  path="/account/orders/:id"
                  element={<InformationDetailOrder />}
                ></Route>
                <Route path="/account/address" element={<UserAddress />}></Route>
                <Route
                  path="/account/reset-password"
                  element={<UpdatePassword />}
                ></Route>
              </Route>
              <Route element={<ProductDetail />} path="/:slug/:id"></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/checkout" element={<PaymentPage />}></Route>
              <Route path="/product" element={<ProductFilterPage />}></Route>
              <Route path="/payment-cash" element={<PaymentCash />}></Route>
              <Route path="/payment-bank" element={<PaymentBank />}></Route>
              <Route path="/payment-result" element={<PaymentResult />}></Route>
              <Route path="/order/:id" element={<InformationDetailOrder />}></Route>
              <Route path="/support/help-center" element={<HelpCenterPage />}></Route>
              <Route path="/about/us" element={<AboutUsPage />}></Route>
              <Route path="/about/company" element={<CompanyPage />}></Route>
              <Route path="/about/news" element={<NewsPage />}></Route>
              <Route path="/about/news/:id" element={<NewsDetailPage />}></Route>
              <Route path="/about/legal" element={<LegalPage />}></Route>
              <Route path="/partners" element={<PartnersPage />}></Route>
              <Route path="/partners/benefits" element={<PartnersBenefitsPage />}></Route>
              <Route path="/partners/apply" element={<PartnersApplyPage />}></Route>
              <Route path="/partners/contact" element={<PartnersContactPage />}></Route>
              <Route path="/*" element={<NotFoundPage />}></Route>
            </Routes>
          </main>
          <Footer />
          <ContactWidget />
        </div>
      </>
    );
  }

export default App;
