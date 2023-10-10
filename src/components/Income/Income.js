import React from 'react'
import { useEffect } from "react";
import styled from 'styled-components'
import { InnerLayout } from '../../styled/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../incomeitem/incomeitem';

function Income() {
    const {addIncome,incomes,getIncomes,deleteIncome,totalIncome} = useGlobalContext()
   
    useEffect(() =>{
      getIncomes()
  }, [])
    
  return (
    <IncomeStyled>
        <InnerLayout>
            <h1>Incomes</h1>
            <h2 className='totalIncome'> Total Income: <span>₹ {totalIncome()}</span></h2>
            <div className='income-content'>
                <div className='form-container'>
                  <Form/>
                </div>
                <div className='incomes'>
                {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                            key={_id}
                            id={_id} 
                            title={title} 
                            description={description} 
                            amount={amount} 
                            date={date} 
                            type={type}
                            category={category} 
                            deleteItem={deleteIncome}
                            />
                        })}
                </div>
            </div>
        </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
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
export default Income
