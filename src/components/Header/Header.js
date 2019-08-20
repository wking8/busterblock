import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'
import { logout } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd';

class Header extends Component {
    state = {
        search: ''
    }
    componentDidMount() {
        const el = document.querySelector('nav');
        this.setState({ top: el.offsetTop, height: el.offsetHeight });
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate() {
        this.state.scroll > this.state.top ?
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
    }
    handleScroll = () => {
        this.setState({ scroll: window.scrollY });
    }
    logout = () => {
        axios.delete('/auth/logout')
            .then(() => {
                this.props.logout()
                this.props.history.push(`/`)
            })
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
                <div className='header'>
                    <h1 className='app-title'>BusterBlock</h1>
                    <div className='account'>
                        <Button
                            className='account'>
                            Account
                        </Button>
                        <Button
                            onClick={this.logout}
                            className='logout'>
                            Logout
                        </Button>
                        <div class="divider" />
                        <input
                            onChange={e => this.handleChange(e)}
                            name='search'
                            type="text"
                            placeholder='Search'
                        />
                    </div>
                </div>
            </nav>
        )
    }
}

export default connect(
    null,
    { logout }
)(withRouter(Header))