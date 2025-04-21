import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/singup";
import { AuthProvider } from "./providers/auth-context";
import UnAuthenticatedRoute from "./components/un-authenticated";
import { Header } from "./components/header/header";
import Footer from "./components/footer";
import { ThemeProvider } from "./providers/theme-provider";
import Dashboard from "./pages/dashboard";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./components/protected";
import VocabularyList from "./pages/vocabulary-list";

import SentenceGenerator from "./pages/sentence";
import Quiz from "./pages/quiz";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vocabulary"
              element={
                <ProtectedRoute>
                  <VocabularyList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sentence-generator"
              element={
                <ProtectedRoute>
                  <SentenceGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnAuthenticatedRoute>
                  <LoginPage />
                </UnAuthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
