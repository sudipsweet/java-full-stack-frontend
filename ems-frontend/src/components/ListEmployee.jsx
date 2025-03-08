import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    loadAllEmployee();
  }, [employees]);

  function loadAllEmployee() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const dummyDate = [
  //   {
  //     id: 1,
  //     firstName: "Bacchu",
  //     lastName: "Das",
  //     email: "sudipsweet@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Madhab",
  //     lastName: "Das",
  //     email: "madhabdas@hotmail.com",
  //   },
  // ];
  const addEmployees = () => {
    console.log("Call Add Employee");
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    console.log("Call update Employee");
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    console.log("Call delete Employee " + id);
    if (id) {
      deleteEmployee(id)
        .then((response) => {
          console.log("Employee is deleted: " + response.data);
          loadAllEmployee();
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="container">
      <h3 className="text-center my-2">List Of Employee Details</h3>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end my-2 mx-2">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={addEmployees}
        >
          Add Employee
        </button>
        {/* <button className="btn btn-primary" type="button">
          Button
        </button> */}
      </div>
      <table className="table">
        <thead className="thead-dark table-striped table-bordered">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button
                  className="btn btn-info me-md-2"
                  type="button"
                  onClick={() => updateEmployee(emp.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger me-md-2"
                  type="button"
                  onClick={() => removeEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
