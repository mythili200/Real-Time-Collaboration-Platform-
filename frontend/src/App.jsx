import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/Layout";

const LoginPage = lazy(() => import("../src/pages/Login"));
const RegisterPage = lazy(() => import("../src/pages/Register"));
const Dashboard = lazy(() => import("../src/pages/Dashboard"));
const Files = lazy(() => import("../src/pages/Files"));
const Collaboration = lazy(() => import("../src/pages/Collaboration"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/files"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Files />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Collaboration />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
