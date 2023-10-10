import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styled/Layout';
import IncomeItem from '../incomeitem/incomeitem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹ {totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            console.log(expense)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
display:flex;
overflow:auto;
h1{
  margin-bottom:1rem;
}
h2{
  margin-bottom:1rem;
}
.income-content{
  display:flex;
  gap: 2rem;
}
.incomes{
  width:125%;
}
`;
export default Expenses
