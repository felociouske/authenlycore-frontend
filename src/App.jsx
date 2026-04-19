import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PageWrapper from "./components/layout/PageWrapper";

import HomePage from "./pages/HomePage";
import ReviewsPage from "./pages/ReviewsPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import LegitSitesPage from "./pages/LegitSitesPage";
import SubmitEvidencePage from "./pages/SubmitEvidencePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#D7DADC",
                border: "1px solid #2a2a2a",
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "13px",
                borderRadius: "4px",
              },
            }}
          />
          <Routes>
            {/* Standalone pages - no sidebar */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Main app - with sidebar layout */}
            <Route
              path="/*"
              element={
                <PageWrapper>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/legitimate" element={<LegitSitesPage />} />
                    <Route path="/submit" element={<SubmitEvidencePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </PageWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}