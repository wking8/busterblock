import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'
import { logout } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    logout = () => {
        axios.delete('/auth/logout')
            .then(() => {
                this.props.logout()
                this.props.history.push(`/`)
            })
    }
    render() {
        return (
            <div className='header'>
                <h1 className='app-title'>BusterBlock</h1>  
                <div className='account'>
                    <button className='account-btn'>ACCOUNT</button>
                    <div class="divider"/>
                    <button className='logout' onClick={this.logout}>LOGOUT</button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { logout }
)(withRouter(Header))