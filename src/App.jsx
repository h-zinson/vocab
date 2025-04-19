import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/singup";
import { AuthProvider } from "./providers/auth-context";

function App() {
  return (
    <AuthProvider>
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
