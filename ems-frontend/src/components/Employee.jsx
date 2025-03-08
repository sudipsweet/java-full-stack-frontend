import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployees] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();
  const saveOrUpdateEmployees = (e) => {
    e.preventDefault();
    const isFormValid = validateForm(employee);
    if (isFormValid) {
      console.log(employee);
      if (id) {
        // Call update employee REST API
        updateEmployee(id, employee)
          .then((response) => {
            console.log("Response data -> " + response.data);
          })
          .catch((error) => console.log(error));
        navigator("/employees");
      } else {
        // Call add employee REST API
        addEmployee(employee)
          .then((response) => {
            console.log("Response data -> " + response.data);
          })
          .catch((error) => console.log(error));
        navigator("/employees");
      }
    }
  };

  const validateForm = (formData) => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (formData.firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      isValid = false;
    }
    if (formData.lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      isValid = false;
    }
    if (formData.email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email name is required";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  return (
    <div className="container my-3">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h4 className="text-center mt-2">
            {id > 0 ? "Update Employee" : "Add Employee"}
          </h4>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={employee.firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setEmployees({ ...employee, firstName: e.target.value });
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={employee.lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    setEmployees({ ...employee, lastName: e.target.value });
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email Id</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email Id"
                  name="email"
                  value={employee.email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => {
                    setEmployees({ ...employee, email: e.target.value });
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-primary me-md-2"
                type="button"
                onClick={saveOrUpdateEmployees}
              >
                Save Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
