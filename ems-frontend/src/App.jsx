import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Employee from "./components/Employee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path="/" exact element={<ListEmployee />} />
          {/* http://localhost:3000/employees */}
          <Route path="/employees" exact element={<ListEmployee />} />
          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" exact element={<Employee />} />
          {/* http://localhost:3000/edit-employee/id */}
          <Route path="/edit-employee/:id" exact element={<Employee />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
