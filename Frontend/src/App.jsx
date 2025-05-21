import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import CreateSoftware from "./pages/CreateSoftware.jsx";
import RequestAccess from "./pages/RequestAccess.jsx";
import PendingRequests from "./pages/PendingRequests.jsx";
import MyRequests from "./pages/MyRequest.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-software"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <CreateSoftware />
              </ProtectedRoute>
            }
          />

          <Route
            path="/request-access"
            element={
              <ProtectedRoute roles={["Employee"]}>
                <RequestAccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-requests" // ✅ NEW: MyRequests route
            element={
              <ProtectedRoute roles={["Employee"]}>
                <MyRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pending-requests"
            element={
              <ProtectedRoute roles={["Manager"]}>
                <PendingRequests />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
