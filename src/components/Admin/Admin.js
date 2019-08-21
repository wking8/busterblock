import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Tabs, Table, Divider, Input, notification } from 'antd';
const { TabPane } = Tabs;
const { Search } = Input;

export default class Admin extends Component {
    state = {
        data: [],
        modalOpen: false,
        activeUser: '',
        newUser: '',
        searchResults: []
    }
    componentDidMount() {
        this.handleGetUsers()
    }
    editUser = (username) => {
        this.setState({
            modalOpen: true,
            activeUser: username
        });
    }
    deleteUser = async (username) => {
        const data = await axios.delete(`/admin/deleteUser/${username}`)
        this.setState({ data: data.data })
    }
    handleOk = e => {
        this.setState({
            modalOpen: false,
        }, async () => {
            const { activeUser, newUser } = this.state
            await axios.put('/admin/editUsername', { username: activeUser, newUser })
            this.handleGetUsers()
        });
    };
    handleCancel = e => {
        this.setState({
            modalOpen: false,
        });
    };
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }
    handleGetUsers = async () => {
        const data = await axios.get('/admin/users')
        this.setState({ data: data.data })
    }
    handleSearch = async (searchTerm) => {
        const { data } = await axios.post('/admin/searchMovie', { searchTerm })
        this.setState({ searchResults: data.Search })
    }
    handleAddTitle = async imdbID => {
        const { data } = await axios.post('/admin/addMovie', { imdbID })
        notification.open({
            message: `Successfully added ${data.title}`
        });
    }
    buildColumns = () => (
        [
            {
                title: 'username',
                dataIndex: 'username',
                key: 'username',
                render: text => <a>{text}</a>,
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <button
                            className='admin-btns'
                            onClick={() => this.editUser(record.username)}
                        >Edit
                        </button>
                        <Divider type="vertical" />
                        <button
                            className='admin-btns'
                            onClick={() => this.deleteUser(record.username)}
                        >Delete
                        </button>
                    </span>
                ),
            },
        ]
    )
    buildMovieColumns = () => (
        [
            {
                title: 'Poster',
                dataIndex: 'Poster',
                key: 'Poster',
                render: text => <img style={{ height: '70px', width: '50px' }} src={text} alt='movie' />,
            },
            {
                title: 'Title',
                dataIndex: 'Title',
                key: 'Title',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Year',
                dataIndex: 'Year',
                key: 'Year',
                render: text => <a>{text}</a>,
            },
            {
                title: 'imdbID',
                dataIndex: 'imdbID',
                key: 'imdbID',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <button onClick={() => this.handleAddTitle(record.imdbID)}>Add</button>
                    </span>
                ),
            },
        ]
    )
    buildRentalColumns = () => (
        [
            {
                title: 'Name',
                dataIndex: 'Name',
                key: 'Name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Number',
                dataIndex: 'Number',
                key: 'Number',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Movie',
                dataIndex: 'Movie',
                key: 'Movie',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <button>Contact</button>
                        <Divider type="vertical" />
                        <button>Delete</button>
                    </span>
                ),
            },
        ]
    )
    render() {
        return (
            <div className='admin'>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Users" key="1">
                        <Table
                            columns={this.buildColumns()}
                            dataSource={this.state.data}
                            pagination={false} rowKey={'Fix'}
                        />
                    </TabPane>
                    <TabPane tab="Movies" key="2">
                        <Search
                            placeholder="input search text"
                            onSearch={this.handleSearch}
                            style={{ width: 200 }}
                        />
                        <Table
                            columns={this.buildMovieColumns()}
                            dataSource={this.state.searchResults}
                            pagination={false} rowKey={'Fix'}
                        />
                    </TabPane>
                    <TabPane tab="Rentals" key="3">
                        <Search
                            placeholder="input search text"
                            onSearch={this.handleSearch}
                            style={{ width: 200 }}
                        />
                        <Table
                            columns={this.buildRentalColumns()}
                            dataSource={this.state.data}
                            pagination={false} rowKey={'Fix'}
                        />
                    </TabPane>
                </Tabs>
                <Modal
                    title={`Edit ${this.state.activeUser}`}
                    visible={this.state.modalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <input
                        onChange={this.handleChange}
                        type="text"
                        name='newUser'
                        defaultValue={this.state.activeUser}
                    />
                </Modal>
            </div>
        )
    }
}