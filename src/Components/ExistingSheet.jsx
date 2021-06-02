import React from 'react'
import Header from './Header.jsx'
import { withRouter } from "react-router"


class ExistingSheet extends React.Component {
    constructor(props)  {
        super(props)
        this.state = {
            merchant : '',
            date : '',
            currency : '',
            total : 0,
            description : '',
            category : '',
            selectExpensesName : '',
            selectSpendingLimit : 0,
            Limit : 0,
            expensesList : [],
            updatedExpensesList : [],
            expensesID : ''
        }

    }
    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('expensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({expensesList: dbExpenses}) 
        
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.limit !== prevProps.limit)   {

            const dbUpdatedExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));
            if (dbUpdatedExpenses.length) this.setState({updatedExpensesList : dbUpdatedExpenses})
        }
    }
    submitExpenseForm = (e) =>  {
        e.preventDefault()
        const { merchant, date, currency, total, description, category } = this.state

           if (merchant === '' 
                || date === '' 
                || currency === '' 
                || total < 0 
                || description === '' 
                || category === '')    {
                    alert('fill all entries')
            } else {
                const dbUpdatedExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));

                let expenses = {
                    _expensesID : this.state.expensesID,
                    _expensesName: this.state.selectExpensesName,
                    _spendingLimit: this.state.selectSpendingLimit,
                    expense : {
                        _merchant : merchant,
                        _date : date,
                        _currency : currency,
                        _total : total,
                        _description: description,
                        _category : category
                    }
                }
                const newArr = [...this.state.updatedExpensesList, expenses];
                
                this.setState({updatedExpensesList: newArr})
                console.log({newArr});
                console.log(dbUpdatedExpenses)
                
                if (dbUpdatedExpenses) {
                    localStorage.setItem('updatedExpensesList', JSON.stringify([...dbUpdatedExpenses, expenses]))
                } else {
                    localStorage.setItem('updatedExpensesList', JSON.stringify(newArr))
                }
            }
            
            }          


    handleSpendingLimitOptions = (e) => {
        e.preventDefault()
        const id = e.target.value;
        const expenseObj = this.state.expensesList.filter(expense => expense._expensesID === id)[0];
        console.log({expenseObj})
        this.setState({
            selectSpendingLimit: expenseObj._spendingLimit,
            selectExpensesName: expenseObj._expensesName,
            expensesID: expenseObj._expensesID
        });
        
    }

    handleMerchantChange = (e) =>   {
        e.preventDefault()
        const _merchant = e.target.value
        this.setState({
            merchant : _merchant
        })
    
    }

    handleDateChange = (e) =>   {
        e.preventDefault()
        const _date = e.target.value
        this.setState({
            date : _date
        })
    }

    handleCurrencyChange = (e) => {
        e.preventDefault()
        const _currency = e.target.value
        this.setState({
            currency : _currency
        })
    }

    handleTotalChange = (e) =>  {
        e.preventDefault()
        const _total = e.target.value
        this.setState({
            total : parseFloat(_total)
        })
    }

    handleDescriptionChange = (e) =>    {
        e.preventDefault()
        const _description = e.target.value
        this.setState({
            description : _description
        })
    }

    handleCategoryChange = (e) =>   {
        e.preventDefault()
        const _category = e.target.value
        this.setState({
            category : _category
        })
    }
    render() {        
        return ( 
            <div>
                <Header />
                <main>
                     <div className="existing-sheet-layout">
                         <p>{}</p>
                         <form id='form' onSubmit ={this.submitExpenseForm}>
                             <div className="rows">
                                  <label htmlFor="spending-limit-select"></label>
                                  <select
                                        onChange = { this.handleSpendingLimitOptions } 
                                        name="spending-limit-select" id="spending-limit-select">
                                        {this.state.expensesList.map((expense, index) => (<option 
                                        key={index} 
                                        value={expense._expensesID}
                                        >
                                        {expense._expensesName}
                                        </option>) )}
                                  </select>
                                  <span
                                        id='spending-limit'>Expended: {
                                        this.state.updatedExpensesList.reduce((acc, sum) => {
                                        return parseFloat(acc) + parseFloat(sum.expense._total)   
                                        }, 0) }
                                  </span>
                                  <span>Limit: {this.state.selectSpendingLimit}</span>
                             </div>
                             <div className="rows">
                                  <label htmlFor="merchant">Merchant</label>
                                  <input 
                                        id="merchant" 
                                        type="text" 
                                        placeholder='merchant'
                                        onChange = {this.handleMerchantChange}
                                  />
                             </div>
                             <div className="rows">
                                  <label htmlFor="date">Date</label>
                                  <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        onChange = {this.handleDateChange} 
                                  />
                             </div>
                             <div id='currency-rows' className="rows">
                                  <label htmlFor="currency"></label>
                                  <select name="currency" id="currency"
                                      onChange = {this.handleCurrencyChange}>
                                      <option value="">[available currency]</option>
                                      <option value="NGN">Naira</option>
                                      <option value="$">Us Dollars</option>
                                      <option value="CAD">CAD</option>
                                      <option value="">Pounds</option>
                                      <option value="">Euro</option>
                                      <option value="Y">Yen</option>
                                  </select>
                                  <label htmlFor="total">Total</label>
                                  <input  
                                        id="total" 
                                        type="number" 
                                        placeholder = 'total'
                                        onChange = {this.handleTotalChange} 
                                   />
                             </div>
                             <div className="rows">
                                  <label htmlFor="description">Desription</label>
                                  <input 
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder = 'description'
                                        onChange = {this.handleDescriptionChange} 
                                   />
                             </div>
                             <div className="rows">
                                  <label htmlFor="category">Category</label>
                                  <select
                                        name="category"
                                        id="category"
                                        onChange = {this.handleCategoryChange}>
                                        <option value="">[select category]</option>
                                        <option value="rent">Rent</option>
                                        <option value="food">Food</option>
                                        <option value="transportation">Fuel/Transportation</option>
                                        <option value="black-tax">Black Tax</option>
                                        <option value="power">Power</option>
                                        <option value="internet">Internet</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="misc">Misc</option>
                                  </select>
                             </div>
                             <div className="rows">
                                  <label htmlFor="reimburse">Reimburse</label>
                                  <input
                                        id="reimburse"
                                        name="reimburse"
                                        type="checkbox"
                                  />
                             </div>
                             <input type="submit" value="save" />
                             <input id='reset' type="reset" value="reset" />
                         </form>
                         <div id='tableDiv' className="tableDiv">
                              <table id='table'>
                                  <thead>
                                     <tr>
                                          <th>Date</th>
                                          <th>Merchant</th>
                                          <th>Description</th>
                                          <th>Category</th>
                                          <th>Amount</th>
                                     </tr>
                                  </thead>
                                  {this.state.updatedExpensesList.map((expenses, index) => {
                                    return <tbody>
                                      <tr  key = {index}>
                                          <td>{expenses.expense._date}</td>
                                          <td>{expenses.expense._merchant}</td>
                                          <td>{expenses.expense._description}</td>
                                          <td>{expenses.expense._category}</td>
                                          <td>{expenses.expense._total}</td>
                                      </tr>
                                  </tbody>
                                  })}
                                  
                              </table>
                         </div>
                    </div>
                </main> 
            </div>
        )
    }

}
export default withRouter(ExistingSheet)  