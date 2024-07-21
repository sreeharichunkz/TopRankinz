import React from "react";
import "./index.css";
import LoginCheckRoute from './components/ProtectedRoute';
import LoginRoute from './components/LoginProtectedRoute';
import { AuthProvider } from "./contexts";
import { AdminAuthProvider } from "./contexts/admin/AuthContext";

import Account from "./pages/Account";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Layout2 from "./components/login/Layout";
import Activities from "./pages/Activities";
import Signup from "./pages/Signup";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/Layout'
import AdminLogin from './pages/admin/Login'
import ProfileAdd from './pages/admin/Profile';
import User from './pages/admin/Users';
import Slider from './pages/admin/Slider';
import AdminDashboard from './pages/admin/Dashboard'
import AdminLoginCheck from "./components/admin/AdminLoginCheck";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SocialAuthCallback from "./components/socialAuth/SocailAuthCallback";

function App() {

  return (
    <>
      <BrowserRouter >
        <ScrollToTop>
          <Routes>
            {/* Admin Routes */}
            <Route element={<AdminAuthProvider><AdminLayout /></AdminAuthProvider>}>
              <Route element={<AdminLoginCheck />}>
                <Route path="/admin" element={<AdminLogin />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/profile" element={<ProfileAdd />} />
                <Route path="/admin/user" element={<User />} />
                <Route path="/admin/slider" element={<Slider />} />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<AuthProvider><Layout /></AuthProvider>}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="ranking" element={<Ranking />} />
            </Route>

            <Route element={<SocialAuthCallback/>}></Route>

            {/* User Routes */}
            <Route path="/" element={<AuthProvider><Layout2 /></AuthProvider>}>
              <Route path="contact" element={<Contact />} />
              <Route path="helpcenter" element={<HelpCenter />} />
            

              <Route element={<LoginRoute />}>
                <Route path="account" element={<Account />} />
                <Route path="activities" element={<Activities />} />
              </Route>


              {/* Protected Routes */}

              <Route element={<LoginCheckRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
