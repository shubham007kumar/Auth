import React, { useContext } from "react";
import styled from "./FormList.module.css";
import {format, parseISO} from 'date-fns'
import { AuthContext } from "../../Context/AuthContextProvider";
const FormList = ({ list, handleEdit }) => {
  const {role} = useContext(AuthContext)
  let forma 
  if(list === 1){
     let formatdata = list.dueDate.split('T')[0]
     forma = format(parseISO(formatdata),'dd-MM-yyyy')
  }

  return (
    <>
      <table className={styled.table}>  
        <thead className={styled.thead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>State</th>
            <th>Tax</th>
            <th>DueDate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styled.tbody}>
          { role === 'taxPayer' ? 
           
          <tr key={list._id}>
            <td>{list.name}</td>
            <td>{list.email}</td>
            <td>{list.category}</td>
            <td>{list.state}</td>
            <td>{forma}</td>
            <td>{list.tax}</td>
            <td>
              <button onClick={() => handleEdit(list._id)}>Edit</button>
            </td>
        </tr>
          :
           list?.map((item) => {
            const {dueDate} = item
            let formatDate = dueDate.split('T')
            formatDate = format(parseISO(formatDate[0]),'dd-MM-yyyy')
          return <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.category}</td>
          <td>{item.state}</td>
          <td>{formatDate}</td>
          <td>{item.tax}</td>
          <td>
            <button onClick={() => handleEdit(item._id)}>Edit</button>
          </td>
        </tr>
        })
          
          }
        </tbody>
      </table>
    </>
  );
};

export default React.memo(FormList);
