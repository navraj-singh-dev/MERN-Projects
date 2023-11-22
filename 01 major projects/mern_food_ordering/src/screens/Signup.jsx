import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const fillCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // synthetic event
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const output_of_response = await response.json();
    console.log(output_of_response);

    if (!output_of_response.success) {
      alert("Enter Valid Credentials!");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              name="name"
              value={credentials.name}
              onChange={fillCredentials}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={fillCredentials}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={fillCredentials}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress1"
              name="geolocation"
              value={credentials.geolocation}
              onChange={fillCredentials}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-primary" to="/login">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}
