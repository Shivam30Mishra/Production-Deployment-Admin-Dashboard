import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout"

// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
