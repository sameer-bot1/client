import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styled/Layout';
import Chart from '../chart/Chart';
import { rupee } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import History from '../History/History';




function Dashboard() {
  const {totalExpenses,incomes, expenses, totalIncome, getIncomes, getExpenses,totalBalance } = useGlobalContext()

  useEffect(() => {
      getIncomes()
      getExpenses()
  }, [])

  return (
    <DashboardStyled>
        <InnerLayout>
            <h1>All Transation</h1>
            <div className='stats-con'>
              <div className='chart-con'>
                 <Chart/>
                 <div className='amount-container'>
                            <div className="income">
                                <h3>Total Income</h3>
                                <p>
                                    {rupee} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h3>Total Expense</h3>
                                <p>
                                    {rupee} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h3>Total Balance</h3>
                                <p>
                                    {rupee} {totalBalance()}
                                </p>
                            </div>
                 </div>
              </div>
              <div className='history-con'>
                <History/>
              </div>
            </div>
        </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
/* .chart-con{
  display:flex;
  gap: 2rem
} */
.stats-con{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:2rem;
  .chart-con{
    grid-column:1/4;
    height:400px
  }
}
.income,.expense,.balance{
  /* padding:1rem; */
  border: 2px solid #FFFFFF;
  p{
    font-weight:700;
    padding: 0.5rem;
    font-size:1rem
  }
}
.amount-container{
  justify-content:center;
  text-align:center;
}
`;
export default Dashboard