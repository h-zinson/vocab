import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/singup";
import { AuthProvider } from "./providers/auth-context";
import UnAuthenticatedRoute from "./components/un-authenticated";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
