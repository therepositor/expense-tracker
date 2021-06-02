import React from 'react'
import Header from './Header.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

class Contact extends React.Component {
    
    render()    {
        return (
            <div className = 'fluid-container'>
                <Header />
                <main>
                    <div className = 'sheet-layout-about'>
                        <ul>
                            <li><a rel="noreferrer" href = 'https://twitter.com/unclejocie' target = '_blank'>
                                <FontAwesomeIcon icon = {faTwitter} />
                            </a></li>
                            <li><a rel="noreferrer" href = 'https://github.com/therepositor' target = '_blank'>
                                <FontAwesomeIcon icon = {faGithub} />
                            </a></li>
                            <li><a rel="noreferrer" href = 'https://www.linkedin.com/in/joseph-oguntebi-89a06281/' target = '_blank'>
                                <FontAwesomeIcon icon = {faLinkedin} />
                            </a></li>
                            <li><a rel="noreferrer" href = 'https://instagram.com/thegreymatta' target = '_blank'>
                                <FontAwesomeIcon icon = {faInstagram} />
                            </a></li>
                        </ul>
                                             
                    </div>
                </main>
            </div>
        )
    }
} 
export default Contact