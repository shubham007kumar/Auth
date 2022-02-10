import React, { useCallback, useContext, useEffect, useState } from "react";
import FormInput from "./FormInput/FormInput";
import FormList from "./FormList/FormList";
import axios from "axios";
import { getData } from "../utils/localStorage";
import {format, parseISO} from 'date-fns'
import { AuthContext } from "../Context/AuthContextProvider";
const init = {
  name: "",
  email: "",
  category: "",
  state: "",
  tax: "",
  dueDate: "",
};

export const Form = () => {
  const [data, setData] = useState(init);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(true);
  const [fakeId, setFakeId] = useState("");
  const { name, email, category, state, tax, dueDate } = data;
  const {role} = useContext(AuthContext)
  console.log(list)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getData("userInfo")}`,
      },
    };

    const payload = {
      name: name,
      email: email,
      category: category,
      state: state,
      tax: tax,
      dueDate: dueDate
    };
    axios
      .post(`http://localhost:3001/tax/${role}/create`, payload, config)
      .then((res) => {
        getUser();
      });
  };

  const getUser = useCallback(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getData("userInfo")}`,
      },
    };

    axios
      .get(`http://localhost:3001/tax/${role}`, config)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [role]);

  const handleEdit = useCallback((id) => {
    setFakeId(id);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getData("userInfo")}`,
      },
    };

    axios
      .get(`http://localhost:3001/tax/${role}/${id}`, config)
      .then((res) => {
        const time = res.data.dueDate.split("T");
        const fetchdate = format(parseISO(time[0]),'yyy-MM-dd');
        setData({
          name: res.data.name,
          email: res.data.email,
          category: res.data.category,
          state: res.data.state,
          tax: res.data.tax,
          dueDate: fetchdate
        });
        setEdit(false);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      category:category
    };
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getData("userInfo")}`,
      },
    };

    axios
      .put(`http://localhost:3001/tax/${role}/update/${fakeId}`, payload,config)
      .then((res) => {
        getUser()
        setEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <FormInput
        edit={edit}
        {...data}
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />
       <FormList list={list} handleEdit={handleEdit} />
    </>
  );
};
