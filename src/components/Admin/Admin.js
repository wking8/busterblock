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
                        <a onClick={() => this.editUser(record.username)}>Edit </a>
                        <Divider type="vertical" />
                        <a>Delete</a>
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
                        <a onClick={() => this.handleAddTitle(record.imdbID)}>Add </a>
                    </span>
                ),
            },
        ]
    )
    render() {
        return (
            <div className='admin'>
                <Tabs defaultActiveKey="2" >
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
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
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