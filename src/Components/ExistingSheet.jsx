import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router"
import { v4 as uuidv4 } from 'uuid';

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
            expensesID : uuidv4(),
            expensesList : [],
            updatedExpensesList : []
        }

    }
    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('expensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({expensesList: dbExpenses}) 
        
        // dbExpenses.map(expenses => {
        //     this.setState({
        //         savedExpensesID : expenses._expensesID,
        //         selectSpendingLimit : expenses._spendingLimit,
        //         selectExpensesName : expenses.__expensesName
        //     })
        // })
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
                    _expensesID: this.state.expensesID,
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
                //  this.state.expensesList.forEach(i => {
                //     const tableRow = document.createElement('tr')
                //     const tdOne = document.createElement('td')
                //     tdOne.textContent = i.expense._date
    
                //     const tdTwo = document.createElement('td')
                //     tdTwo.textContent = i.expense._merchant
    
                //     const tdThree = document.createElement('td')
                //     tdThree.textContent = i.expense._description
    
                //     const tdFour = document.createElement('td')
                //     tdFour.textContent = i.expense._category
    
                //     const tdFive = document.createElement('td')
                //     tdFive.textContent = i.expense._total
                    
                //     const table = document.getElementById('table')

                //     table.appendChild(tableRow)
                //     tableRow.appendChild(tdOne)
                //     tableRow.appendChild(tdTwo)
                //     tableRow.appendChild(tdThree)
                //     tableRow.appendChild(tdFour)
                //     tableRow.appendChild(tdFive)
                // })
            
            }          
    
            
    closeExistingSheet = (routeE) =>  {
        this.props.history.push(routeE)
    }

    handleSpendingLimitOptions = (e) => {
        e.preventDefault()
        const selectedExpensesName = e.target.value
    
        this.state.expensesList.map(expenses => {
            if (selectedExpensesName === expenses._expensesName && this.state.expensesID)  {
                return this.setState({
                    selectSpendingLimit : expenses._spendingLimit,
                    selectExpensesName : selectedExpensesName,
                })
            }
        })
        console.log(this.state.selectSpendingLimit)
        console.log(this.state.selectExpensesName)
        console.log(this.state.expensesID)
        
    }

    handleMerchantChange = (e) =>   {
        e.preventDefault()
        const { merchant } = this.state
        const _merchant = e.target.value
        this.setState({
            merchant : _merchant
        })
    
    }

    handleDateChange = (e) =>   {
        e.preventDefault()
        const { date } = this.state
        const _date = e.target.value
        this.setState({
            date : _date
        })
    }

    handleCurrencyChange = (e) => {
        e.preventDefault()
        const { currency } = this.state
        const _currency = e.target.value
        this.setState({
            currency : _currency
        })
    }

    handleTotalChange = (e) =>  {
        e.preventDefault()
        const { total } = this.state
        const _total = e.target.value
        this.setState({
            total : _total
        })
    }

    handleDescriptionChange = (e) =>    {
        e.preventDefault()
        const { description } = this.state
        const _description = e.target.value
        this.setState({
            description : _description
        })
    }

    handleCategoryChange = (e) =>   {
        e.preventDefault()
        const { category } = this.state
        const _category = e.target.value
        this.setState({
            category : _category
        })
    }
    render()    {        
        return ( 
            <div>
                <header>
                    <nav>
                         <FontAwesomeIcon
                          onClick = {() => this.closeExistingSheet('/1')} 
                          id="faTimes" icon={ faTimes } 
                          style = {{fontSize: '2rem'}}/>
                    </nav>
                </header>
                <main>
                     <div className="existing-sheet-layout">
                         <p>{}</p>
                         <form id='form' onSubmit ={this.submitExpenseForm}>
                             <div className="rows">
                                  <label htmlFor="spending-limit-select"></label>
                                  <select onChange = { this.handleSpendingLimitOptions } 
                                   name="spending-limit-select" id="spending-limit-select">
                                   {this.state.expensesList.map((expense, index) => (<option key={index} value={expense._expensesName}>
                                   {expense._expensesName}</option>) )}
                                  </select>
                                  <span id='spending-limit'>Balance: {this.state.selectSpendingLimit} </span>
                             </div>
                             <div className="rows">
                                  <label htmlFor="merchant">Merchant</label>
                                  <input id="merchant" type="text" placeholder='merchant'
                                  onChange = {this.handleMerchantChange} />
                             </div>
                             <div className="rows">
                                  <label htmlFor="date">Date</label>
                                  <input id="date" name="date" type="date"
                                  onChange = {this.handleDateChange} />
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
                                  <input id="total" type="number" placeholder = 'total'
                                   onChange = {this.handleTotalChange} />
                             </div>
                             <div className="rows">
                                  <label htmlFor="description">Desription</label>
                                  <input id="description" name="description" type="text" 
                                   placeholder = 'description'
                                  onChange = {this.handleDescriptionChange} />
                             </div>
                             <div className="rows">
                                  <label htmlFor="category">Category</label>
                                  <select name="category" id="category"
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
                                  <input id="reimburse" name="reimburse" type="checkbox" />
                             </div>
                             <input type="submit" value="save" />
                             <input id='reset' type="reset" value="reset" />
                         </form>
                         <div id='tableDiv' className="tableDiv">
                              <table id='table'>
                                  <tr>
                                     <thead>
                                          <td>Date</td>
                                          <td>Merchant</td>
                                          <td>Description</td>
                                          <td>Category</td>
                                          <td>Amount</td>
                                     </thead>
                                  </tr>
                              </table>
                         </div>
                    </div>
                </main> 
            </div>
        )
    }

}
export default withRouter(ExistingSheet)  