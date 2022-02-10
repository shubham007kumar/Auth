import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Button } from "./Button";
import { Login } from "./Components/Authentication/Login";
import { Signup } from "./Components/Authentication/Signup";
import { Form } from "./Components/Form";
import { AuthContext } from "./Context/AuthContextProvider";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Button />} />
        <Route path="/register-taxPayer" element={<Signup />} />
        <Route path="/register-taxAccountant" element={<Signup />} />
        <Route path="/register-admin" element={<Signup />} />
        <Route path="/login-taxPayer" element={<Login />} />
        <Route path="/login-taxAccountant" element={<Login />} />
        <Route path="/login-admin" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Form />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
