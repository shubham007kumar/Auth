import React, { useContext, useState } from "react";
import styles from "./Signup.module.css";
import axios from 'axios'
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { saveData } from "../../utils/localStorage";

const init = {
  email: "",
  password: "",
};

export const Signup = () => {
  const {pathname} = useLocation()
  let role = pathname.split('-')[1]
  const [query, setQuery] = useState(init);
  const {setRole} = useContext(AuthContext)
  const { email, password } = query;
  const navigate = useNavigate()
  const handleSubmit =  (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/user/register-${role}`,{
    email,
    password
  }).then((res)=>{
       setRole(res.data.role)
       navigate(`/login-${role}`)
   }).catch((err)=>{
       console.log(err)
   })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const update = { ...query, [name]: value };
    setQuery(update);
  };

  return (
    <>
        <div className={styles.container}>
          <h1 className={styles.H1}>Sign Up</h1>
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
            <input
              type="submit"
              value="Signup"
              className={styles.submitField}
            />
          </form>
        </div>
    </>
  );
};
