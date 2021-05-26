import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router"

class SelectPage extends React.Component    {
    constructor(props)  {
        super(props)
    }

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
            <div>
                <header>
                    <nav>
                        <FontAwesomeIcon onClick = {() => this.goToPreviousPage('/')} id="arrow-left" icon={faArrowLeft} style={{ fontSize: '2rem'}} />
                    </nav>
                </header>
                <main> 
                      <div className="create-expense-button">
                          <button onClick ={() => this.handleCreateExpenseButton('/2')} id="new-sheet" className="new-sheet">Create expense</button>
                          <button onClick = {() => this.handleExistingExpenseButton('/3')} className="existing-sheet" id="existing-sheet">...existing sheet</button>
                      </div>
                </main>
            </div>
        )
    }
}

export default withRouter(SelectPage)