import React from 'react'
import Header from './Header.jsx'

class ExpensesCard extends React.Component  {
    constructor(props)  {
        super(props)
        this.state = {
            updatedExpensesList : [],
            selectOptionToGenerate  : '' 
        }
    }
    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({updatedExpensesList: dbExpenses}) 

        
    }

    render()    {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main>
                    <div className='sheet-layout'>
                        <h1>Expenses</h1>
                        <div className = 'card-list'>

                        </div>
                    </div>

                </main>
            </div>
        )
    }
}

export default ExpensesCard