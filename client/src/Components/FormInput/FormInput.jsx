import React, { memo, useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import styled from "./FormInput.module.css";
const FormInput = ({
  name,
  email,
  category,
  state,
  tax,
  dueDate,
  handleChange,
  handleSubmit,
  edit,
  handleUpdate,
}) => {
  const { role } = useContext(AuthContext);
  return (
    <>
      <fieldset className={styled.field}>
        <legend>Create Tax</legend>
        <form onSubmit={edit ? handleSubmit : handleUpdate}>
          <div className={styled.container}>
            <div className={styled.row_1}>
              <div className={styled.col_1}>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className={styled.col_2}></div>
            </div>
            <div className={styled.row_2}>
              <div className={styled.col_21}>
                <span>State</span>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={handleChange}
                />
              </div>
              <div className={styled.col_22}>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styled.row_3}>
              <div className={styled.col_31}>
                <span>Category</span>
                {role === "taxAccountant" ? (
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                  >
                    <option value="New">NEW</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                ) : (
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                  >
                    <option value="Paid">Paid</option>
                  </select>
                )}
              </div>
              <div className={styled.col_32}>
                <span>DueDate</span>
                <input
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styled.row_4}>
              <div className={styled.col_41}>
                <span>Tax</span>
                <div>
                  <input
                    type="text"
                    name="tax"
                    value={tax}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styled.col_42}>
                {edit ? (
                  <input type="submit" value="Add" />
                ) : (
                  <input type="submit" value="update" />
                )}
              </div>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default memo(FormInput);
