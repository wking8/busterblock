import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }
    render() {
        return (
            <div className='login-inputs'>
                <input oncChange={e => this.handleChange(e)} name='username' type="text" placeholder='USERNAME' />
                <input onChange={e => this.handleChange(e)} name='password' type="text" placeholder='PASSWORD' />
                <button>LOGIN</button>
            </div>
        )
    }
}