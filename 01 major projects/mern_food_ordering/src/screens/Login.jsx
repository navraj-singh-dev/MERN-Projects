import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const fillCredentials = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // synthetic event
    e.preventDefault();

    // fetch
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // output of fetch
    const output_of_response = await response.json();
    console.log(output_of_response);

    // action on fetch's output
    if (!output_of_response.success) {
      alert("Enter Valid Credentials!");
    } else if (output_of_response.success) {
      localStorage.setItem("userEmail", output_of_response.email);
      localStorage.setItem("authToken", output_of_response.authToken);
      console.log(localStorage.getItem("authToken"));
      console.log(localStorage.getItem("userEmail"));
      navigate("/");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-white text-center bg-dark border border-light p-2 rounded">
          Login Page
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-5">
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

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>

          <Link className="m-3 btn btn-primary" to="/signup">
            Make New Account??
          </Link>
        </form>
      </div>
    </div>
  );
}
