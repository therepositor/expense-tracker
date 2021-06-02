import React from 'react'
import Header from './Header.jsx'
import { CSVLink } from "react-csv";


class GenerateReport extends React.Component    {
    constructor(props)  {
        super(props)
        this.state = {
            updatedExpensesList : [] ,
            selectOptionToGenerate  : '' ,
            selectOptionToGenerateText : '',
            expensesSelected : []
        }

    }

    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({updatedExpensesList: dbExpenses}) 
    }

    handleSelectOptionToGenerate = (e, selectedExpensesName) =>   {
        e.preventDefault()
         selectedExpensesName = e.target.value
    
        this.state.updatedExpensesList.map(expenses => {
            if (selectedExpensesName === expenses._expensesName && expenses._expensesID)  {
                return this.setState({
                    selectOptionToGenerate : selectedExpensesName,
                    selectOptionToGenerateText : selectedExpensesName,
                    expensesSelected : expenses.expense
                })
            }
        })
        this.setState({
            expensesSelected : this.state.updatedExpensesList.filter(expenses => {
               if (expenses._expensesName === selectedExpensesName) return this.state.expensesSelected
                console.log(this.state.expensesSelected);
            })
        })
    }
    
    render ()   {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main>
                    <div className="sheet-layout">
                        <h2>Generate report: 
                            <span id='generate-expense-text'>
                            {this.state.selectOptionToGenerateText} </span>
                        </h2>
                        <hr />
                        
                        <form style = {{margin : '1rem 0'}} action="" >
                            <div className = 'rows'>
                                <label htmlFor='select-options-to-generate'>
                                Select Expense to Generate: </label>
                                <select name="select"
                                id="select-options-to-generate"
                                onChange= {this.handleSelectOptionToGenerate}>
                                {this.state.updatedExpensesList
                                    .map((expense, index) => (<option key={index} value={expense._expensesName}>
                                    {expense._expensesName}</option>) )}
                                    
                                </select>
                            </div>
                        </form>
                        {this.state.selectOptionToGenerate ? 
                        <table>
                            <thead>
                                <tr>
                                        <th>Date</th>
                                        <th>Merchant</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.updatedExpensesList.map((expenses, index) => {
                                if (this.state.selectOptionToGenerate === expenses._expensesName) {

                                return <tr key = {index}>
                                        <td>{expenses.expense._date}</td>
                                        <td>{expenses.expense._merchant}</td>
                                        <td>{expenses.expense._description}</td>
                                        <td>{expenses.expense._category}</td>
                                        <td>{expenses.expense._total}</td>
                                </tr>
                                }
                            })}
                            </tbody>
                        </table>
                          : ''}
                          
                          <CSVLink style = {{textDecoration : 'none', fontSize : '2rem', color : 'brown' }} data =  {this.state.expensesSelected}>Download</CSVLink>
                    </div>
                </main>
            </div>
        )
    }
}

export default GenerateReport