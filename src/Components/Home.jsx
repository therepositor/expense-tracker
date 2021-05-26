import React from 'react'
import Header from './Header.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, whatsapp  } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


class Home extends React.Component  {
    
    render()    {
        return  (
            <div className='fluid-container'>
                <Header />
                <main>
                    <div className="invite-text">
                        <p>...the more the merrier</p>
                        <p>Invite an accountability partner</p>
                    </div>
                    <div className="invite-buttons">
                        <button>Invite via whatsapp <span>
                        <FontAwesomeIcon icon={['fab', 'whatsapp']} /></span></button>
                        <button>Invite via e-mail <span>
                        <FontAwesomeIcon icon={faEnvelope} /></span>
                        </button>
                    </div>
                </main>
            </div>
        )
    }
}
export default Home