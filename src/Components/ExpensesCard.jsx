import React from 'react'
import Header from './Header.jsx'
import ScrollToTop from "react-scroll-to-top"


class ExpensesCard extends React.Component  {
    constructor(props)  {
        super(props)
        this.state = {
            updatedExpensesList : [],
            searchText : '',
            searchList : []
             
        }
    }
    componentDidMount = () =>   {
        const dbExpenses = JSON.parse(localStorage.getItem('updatedExpensesList'));
        console.log(dbExpenses);
        if (dbExpenses.length) this.setState({updatedExpensesList: dbExpenses}) 

        
    }
    handleSearchChange = (e) => {
        e.preventDefault()
        const searchTerm = e.target.value
        this.setState({ searchText: searchTerm})

        this.setState({
            searchList: this.state.updatedExpensesList.filter(expenses => {
                if (searchTerm === (expenses._expensesName.toLowerCase()) )
                                    return this.state.searchList
                                    console.log(this.state.searchList);
                                })
                            })
    }
    handleSearchSubmit = (e) => {
        e.preventDefault()   
    }

    render()    {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main>
                    <div className='sheet-layout'>
                        <h2 style={{textAlign: 'center'}}>Expenses</h2>
                        <form onSubmit = {this.handleSearchSubmit}>
                            <input onChange = {this.handleSearchChange} 
                                type = 'search' 
                                id = 'search' 
                                placeholder = 'search expenses' 
                                style = {{height: '50px',
                                borderRadius: '25px', marginBottom: '2rem', borderColor : 'brown', padding : '1rem'}}
                            />  
                        </form>
                        <div className = 'card-list'>
                        {this.state.searchText ? 
                            this.state.searchList.reverse().map((expenses, index) => {
                            return <div key={index} className = 'card'>
                                <h3>Date: {expenses.expense._date}</h3>
                                <h3>Merchant: {expenses.expense._merchant}</h3>
                                <h3>Cost: {expenses.expense._total}</h3>
                                <h3>Description: {expenses.expense._description}</h3>
                                <h3>Category: {expenses.expense._category}</h3>
                            </div>
                        } )
                        :
                        this.state.updatedExpensesList.reverse().map((expenses, index) => {
                            return <div  key={index} className = 'card'>
                                <h3>Date: {expenses.expense._date}</h3>
                                <h3>Merchant: {expenses.expense._merchant}</h3>
                                <h3>Cost: {expenses.expense._total}</h3>
                                <h3>Description: {expenses.expense._description}</h3>
                                <h3>Category: {expenses.expense._category}</h3>
                            </div>
                        })}
                           
                        </div>
                        <ScrollToTop smooth style = {{color: 'brown', top: '20'}} />
                    </div>

                </main>
            </div>
        )
    }
}

export default ExpensesCard