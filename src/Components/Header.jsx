import  React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props)
        this.hamburgerButton = React.createRef();
        this.navMenu = React.createRef();
        // this.navLinkA = React.createRef();
        // this.navLinkB = React.createRef();
        // this.navLinkC = React.createRef();
    }
    handleSelectPage = (routeA) =>    {
        this.props.history.push(routeA)
    }

    handleLinkA = (routeE) => {
        this.props.history.push(routeE)
    }
    toggleHamburger = () => {
        this.hamburgerButton.current.classList.toggle("active");
        this.navMenu.current.classList.toggle("active");
    }

    closeMenu = () => {
        this.hamburgerButton.current.classList.remove("active");
        this.navMenu.current.classList.remove("active")
    }

    render()    {

        return (
            <div>
                    <header>
                        <nav>
                            <ul className="nav-menu" ref={this.navMenu}>
                                <li className="nav-item">
                                    <Link className="nav-link" 
                                    to="/generate-report"
                                    ref = {this.navLinkA}
                                    // onClick = {this.closeMenu}
                                    >Generate report</Link></li>
                                <li className="nav-item">
                                    <Link className="nav-link" 
                                    to="/expenses-card"
                                    onClick = {() => this.handleLinkA('/4')}
                                    ref = {this.navLinkB}
                                    // onClick = {this.closeMenu}
                                    >Expenses</Link></li>
                                <li className="nav-item">
                                    <Link className="nav-link"
                                    ref = {this.navLinkC} 
                                    to="/about"
                                    // onClick = {this.closeMenu}
                                    >about</Link>
                                </li>
                            </ul>
                            <div onClick = {this.toggleHamburger}
                                ref = {this.hamburgerButton}
                                className="hamburger">
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                            <a href="/">expensify</a>
                            
                            <FontAwesomeIcon 
                            
                            onClick = {() => this.handleSelectPage('/1')} 
                            style={{ fontSize: '2rem'}} id="add-expense" icon={faPlus}/>
                        
                        </nav>
                    </header>
            </div>
        )
    }
}
export default withRouter(Header)