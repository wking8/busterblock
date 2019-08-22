import React, { Component } from 'react'
import './Header.scss'
import axios from 'axios'
import { logout, updateSearchTerm } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd';

class Header extends Component {
    state = {
    
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
        e.persist()
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
            this.props.updateSearchTerm(e.target.value)
        }, 250);
    }
    render() {
        return (
            <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
                <div className='header'>
                    <h1 className='app-title'>BusterBlock</h1>
                    <div className='account'>
                        <Button
                            className='account-btn'>
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
    { logout, updateSearchTerm }
)(withRouter(Header))