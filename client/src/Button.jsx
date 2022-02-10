import React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

export const Button =() => {
    const navigate = useNavigate();
    return(
        <>
        <button onClick={() => navigate('register-taxPayer')}>Tax payer</button>
        <button onClick={() => navigate('register-taxAccountant')}>Tax Accountant</button>
        <button onClick={() => navigate('register-admin')}>Admin</button>
        </>
    )
}