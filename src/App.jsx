import { Route, Routes } from "react-router";
import HomePage from "./pages/home";

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </main>
  );
}

export default App;
