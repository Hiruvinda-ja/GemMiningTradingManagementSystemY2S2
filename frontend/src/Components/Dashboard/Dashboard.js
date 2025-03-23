import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Finance Dashboard</h1><br/>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <br/>
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    LKR {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    LKR {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    LKR {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="history-con-salary-expense">
                    <h2 className="salary-title">Min <span>Income</span>Max</h2>
                    
                        <div className="salary-item">
                            <p>
                                LKR {Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                LKR {Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                LKR {Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                LKR {Math.max(...expenses.map(item => item.amount))} 
                            </p>
                        </div>
                    </div>
                    


                    <div className="history-con recent-history">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}


const DashboardStyled = styled.div`
    .stats-con {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        /* Chart - First Row */
        .chart-con {
            width: 100%;
            height: 400px;
        }

        /* Total Income, Expense, Balance - Second Row */
        .amount-con {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2rem;
            

            .income, .expense, .balance {
                background: white;
                //background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                text-align: center;
                
                p {
                    font-size: 2.5rem;
                    font-weight: 700;
                }
            }

            .balance {
                p {
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 3rem;
                }
            }
        }

        /* Salary and Expense Min/Max - Third Row */
        .history-con-salary-expense {
            display: inline;
            grid-template-columns: repeat(2, 1fr); /* Split into 2 columns */
            gap: 2rem;
            margin-top: 14rem;

            /* Salary Min/Max Section */
            > :nth-child(1), /* Salary Title */
            > :nth-child(2) { /* Salary Item */
                grid-column: 1; /* Place in first column */
            }

            /* Expense Min/Max Section */
            > :nth-child(3), /* Expense Title */
            > :nth-child(4) { /* Expense Item */
                grid-column: 2; /* Place in second column */
            }

            .salary-title, .expense-title {
                font-size: 1.2rem;
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 600px;
                margin-left: 250px;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item, .expense-item {
                background: white;
                //background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 600px;
                margin-left: 250px;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }

        /* Recent History - Bottom Section */
        .history-con.recent-history {
            width: 55%;
            margin-top: 3rem;
            margin-left: 248px;


            /* Full width for History component */
            > * {
                width: 100%;
            }
        }
    }
`;

export default Dashboard