import React from 'react'
import Header from './Header.jsx'
import { withRouter } from "react-router"
import { v4 as uuidv4 } from 'uuid';



class NewSheet extends React.Component {
    constructor(props)  {
        super(props) 
        this.state = {
            expensesName : '',
            spendingLimit : 0,
            expensesList : [],
            expensesID : uuidv4(),
        }
    }

    handleExpenseNameChange = (e) => {
        const { expensesName } = this.state
        const _expensesName = e.target.value

        this.setState({
            expensesName : _expensesName
        })
        console.log(expensesName)
    }

    handleSpendingLimitChange = (e) => {
        const { spendingLimit } = this.state
        const _spendingLimit = e.target.value
        this.setState({
            spendingLimit : _spendingLimit
        })
        console.log(spendingLimit);
    }

    handleFormSubmit = (e, routeD) =>    {
        const { expensesName, spendingLimit, expensesList, expensesID } = this.state
        e.preventDefault()
        let expenses = {
            _expensesID : expensesID,
            _expensesName: expensesName,
            _spendingLimit: spendingLimit,
            expense : {
                _merchant : '',
                _date : '',
                _currency : '',
                _total : 0,
                _description: '',
                _category : ''
            }
        }
        if (!expensesName || spendingLimit < 0) {
            alert('fill all enteries')
        } else {
            const dbExpenses = JSON.parse(localStorage.getItem('expensesList'));
            const newArr = [...expensesList, expenses];
            
            this.setState({expensesList: newArr})
            console.log({newArr});
            console.log(dbExpenses)
            
            if (dbExpenses) {
                localStorage.setItem('expensesList', JSON.stringify([...dbExpenses, expenses]))
            } else {
                localStorage.setItem('expensesList', JSON.stringify(newArr))
            }
        }
        this.props.history.push('/existing-sheet')  
    }
    render()    {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main>
                     <div className="sheet-layout">  
                         <form id='form' onSubmit={ this.handleFormSubmit}>
                              <div className="rows new-expenseID">
                                <label htmlFor="expense-id">Expenses Name: </label><input 
                                    id="expense-id"
                                    name="expense-id" 
                                    placeholder="Expenses Name" type="text"
                                    onChange = {this.handleExpenseNameChange} />
                                    <p></p>
                                </div>
                                <div className='rows spending-limit'>
                                     <label htmlFor="spending-limit">Spending limit: </label><input 
                                      name="spending-limit"
                                      id="spending-limit"
                                      placeholder="Budget"
                                      type="number"
                                     onChange = { this.handleSpendingLimitChange} />
                                     <p></p>
                                </div>
                                <input id="submit" type="submit" value="save" />
                                <input type="reset" value="reset" />
                          </form>
                      </div>
                </main>
            </div>
        )
    }
}

export default withRouter(NewSheet) 