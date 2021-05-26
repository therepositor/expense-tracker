import React from 'react'
import Header from './Header.jsx'
import { CSVLink, CSVDownload } from "react-csv";


class GenerateReport extends React.Component    {
    constructor(props)  {
        super(props)
        this.state = {
            updatedExpensesList : [] ,
            selectOptionToGenerate  : '' ,
            selectOptionToGenerateText : ''
        }

    }

    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({updatedExpensesList: dbExpenses}) 
    }

    handleSelectOptionToGenerate = (e) =>   {
        e.preventDefault()
        const selectedExpensesName = e.target.value
    
        this.state.updatedExpensesList.map(expenses => {
            if (selectedExpensesName === expenses._expensesName)  {
                return this.setState({
                    selectOptionToGenerate : selectedExpensesName,
                    selectOptionToGenerateText : selectedExpensesName
                })
            }
        })
    }
    handleGenerateSubmit = (e) => {
        this.state.updatedExpensesList.map((expenses, index) => {
             if (this.state.selectOptionToGenerate === expenses._expensesName)   {
                return <ul>
                    <ol key={index}>{expenses.expense._total}</ol>
                </ul>
            }
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
                        
                        <form action="" onSubmit = {this.handleGenerateSubmit}>
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
                            <input type="submit" value="Generate"/>
                        </form>
                        {this.state.selectOptionToGenerate ? 
                        <table>
                            <thead>
                                <tr>
                                        <th>Date</th>
                                        <th>Merchant</th>
                                        <th>Description</th>
                                        <th>category</th>
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
                          <CSVLink data =  {this.state.updatedExpensesList}>Download me</CSVLink>
                          
                    </div>
                </main>
            </div>
        )
    }
}

export default GenerateReport