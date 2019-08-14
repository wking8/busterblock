import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'
import { setUser } from '../../ducks/reducer'
import { connect } from 'react-redux'

class Login extends Component {
    state = {
        usernameInput: '',
        emailInput: '',
        passwordInput: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    register = () => {
        const {
            usernameInput: username,
            emailInput: email,
            passwordInput: password
        } = this.state
        axios.post('/auth/register', { username, email, password })
            .then(res => {
                this.props.setUser({ username, email })
                this.props.history.push('/allmovies')
            })
            .catch(err => {
                alert('Email already in use.')
            })
    }
    login = () => {
        const {
            emailInput: email,
            passwordInput: password
        } = this.state
        axios.post(`/auth/login`, { email, password })
            .then(res => {
                const { username, email } = res.data.user
                this.props.setUser({ username, email })
                this.props.history.push(`/allmovies`)
            })
            .catch(err => {
                alert('Please try again.')
            })
    }
    render() {
        return (
            <div className='container'>
                <div className='login-inputs'>
                    <input
                        onChange={e => this.handleChange(e)}
                        name='usernameInput' type="text"
                        placeholder='USERNAME'
                    />
                    <input
                        onChange={e => this.handleChange(e)}
                        name='emailInput' type="text"
                        placeholder='EMAIL'
                    />
                    <input
                        onChange={e => this.handleChange(e)}
                        name='passwordInput' type="text"
                        placeholder='PASSWORD'
                    />
                    <button onClick={this.login}>LOGIN</button>
                    <button onClick={this.register}>REGISTER</button>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { setUser }
)(Login)
