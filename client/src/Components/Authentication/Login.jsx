import React, { useContext, useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import {  saveData } from "../../utils/localStorage";
const init = {
  email: "",
  password: "",
};
export const Login = () => {
  const [query, setQuery] = useState(init);
  let { setAuth,role,setRole} = useContext(AuthContext);
  const { email, password } = query;
  const {pathname} = useLocation()
  role = pathname.split('-')[1]
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/user/login-${role}`, {
        email,
        password,
      })
      .then((res) => {
        setAuth(true);
        setRole(res.data.role)
        saveData("userInfo", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => { 
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const update = { ...query, [name]: value };
    setQuery(update);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.H1}>Login in</h1>
        <hr className={styles.hori} />
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email{" "}
            <input
              type="email"
              className={styles.inputField}
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              className={styles.inputField}
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </label>

          <input type="submit" value="Login" className={styles.submitField} />
        </form>
      </div>
    </>
  );
};
