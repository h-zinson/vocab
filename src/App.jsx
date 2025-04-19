import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default App;
