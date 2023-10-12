import React, { useState,useContext, useEffect } from "react"
import axios from 'axios'



// const BASE_URL = "http://localhost:5000/api/v1/"; 
const BASE_URL = "https://expensemanager-6myd.onrender.com"; 

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes,setIncomes] = useState([])
    const [expenses,setExpenses] = useState([])
    const [error,setError] = useState(null)


    //for incomes
    const addIncome = async (income) =>{
        const response = await axios.post(`${BASE_URL}/api/v1/add-income`,income)
        .catch((err) =>{
           setError(err.response.data.message) 
        })
        getIncomes()
    }
    const getIncomes =  async () => {
        const response = await axios.get(`${BASE_URL}/api/v1/get-income`)
        setIncomes(response.data)
        console.log(response.data)
        return response;
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}/api/v1/delete-income/${id}`)
        getIncomes()
    }
    
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    console.log(totalIncome());

    //for expense
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}/api/v1/add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}/api/v1/get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}/api/v1/delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () =>{
        return totalIncome()-totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 8)
    }


    return  (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            expenses,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
} 

export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}