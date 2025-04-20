import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/singup";
import { AuthProvider } from "./providers/auth-context";
import UnAuthenticatedRoute from "./components/un-authenticated";
import { Header } from "./components/header/header";
import Footer from "./components/footer";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route index element={<HomePage />} />
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
