import React from "react";

const Register = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
      </form>
    </div>
  );
};

export default Register;
