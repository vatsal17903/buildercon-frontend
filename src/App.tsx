import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Buildings = lazy(() => import("./pages/Buildings"));
const BuildingDetail = lazy(() => import("./pages/BuildingDetail"));
const Floors = lazy(() => import("./pages/Floors"));
const Plots = lazy(() => import("./pages/Plots"));
const Sellers = lazy(() => import("./pages/Sellers"));
const Units = lazy(() => import("./pages/Units"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buildings"
              element={
                <ProtectedRoute>
                  <Buildings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buildings/:id"
              element={
                <ProtectedRoute>
                  <BuildingDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buildings/:id/floors"
              element={
                <ProtectedRoute>
                  <Floors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plots"
              element={
                <ProtectedRoute>
                  <Plots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sellers"
              element={
                <ProtectedRoute>
                  <Sellers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/units"
              element={
                <ProtectedRoute>
                  <Units />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
