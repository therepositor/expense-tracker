import React from 'react'
import Header from './Header.jsx'
import { withRouter } from "react-router"

class SelectPage extends React.Component    {

    goToPreviousPage = (routeB) =>    {
        this.props.history.push(routeB)
    }

    handleCreateExpenseButton = (routeC) => {
        this.props.history.push(routeC)
    }

    handleExistingExpenseButton = (routeD) =>   {
        this.props.history.push(routeD)
    }
    render ()   {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main> 
                      <div className="create-expense-button">
                          <button onClick ={() => this.handleCreateExpenseButton('/new-sheet')} 
                          id="new-sheet" className="new-sheet">Create expense</button>
                          <button onClick = {() => this.handleExistingExpenseButton('/existing-sheet')} 
                          className="existing-sheet" id="existing-sheet">...existing sheet</button>
                      </div>
                </main>
            </div>
        )
    }
}

export default withRouter(SelectPage)