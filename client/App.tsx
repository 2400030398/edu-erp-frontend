import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherMarks from "./pages/teacher/Marks";
import TeacherAttendance from "./pages/teacher/Attendance";
import StudentDashboard from "./pages/student/Dashboard";
import StudentMarks from "./pages/student/Marks";
import StudentAttendance from "./pages/student/Attendance";
import StudentProfile from "./pages/student/Profile";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />

    {/* Admin Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminUsers />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reports"
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminReports />
        </ProtectedRoute>
      }
    />

    {/* Teacher Routes */}
    <Route
      path="/teacher"
      element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/classes"
      element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherClasses />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/marks"
      element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherMarks />
        </ProtectedRoute>
      }
    />
    <Route
      path="/teacher/attendance"
      element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherAttendance />
        </ProtectedRoute>
      }
    />

    {/* Student Routes */}
    <Route
      path="/student"
      element={
        <ProtectedRoute requiredRole="student">
          <StudentDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/marks"
      element={
        <ProtectedRoute requiredRole="student">
          <StudentMarks />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/attendance"
      element={
        <ProtectedRoute requiredRole="student">
          <StudentAttendance />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/profile"
      element={
        <ProtectedRoute requiredRole="student">
          <StudentProfile />
        </ProtectedRoute>
      }
    />

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
