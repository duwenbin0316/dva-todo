import React from 'react';
import { connect } from 'dva';
import { Table, Divider, Popconfirm } from 'antd';
import styles from './Todo.css';
import AddTodo from './AddTodo';
import Filter from './Filter';

class Todo extends React.Component {

    addHandler(payload) {
        this.props.dispatch({
            type: 'Todo/addTodo',
            payload
        })
    }

    deleteHandler({ id }) {
        this.props.dispatch({
            type: 'Todo/remove',
            payload: id
        })
    }

    toggleHandler({ id }) {
        this.props.dispatch({
            type: 'Todo/toggle',
            payload: id
        })
    }

    /**
     * 组件挂载后派发mock action
     * mock 5到10个假数据
     */
    componentDidMount() {
        this.props.dispatch({
            type: 'Todo/mock'
        })
    }

    render() {
        const columns = [
            {
                title: 'Key',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Text',
                dataIndex: 'text',
                key: 'text',
            },
            {
                title: 'Completed',
                dataIndex: 'completed',
                key: 'completed',
                render: completed => completed ? 'true' : 'false',
            },
            {
                title: 'Operation',
                key: 'operation',
                render: (text, record) => (
                    <span className={styles.operation}>
                        <Popconfirm title="Confirm to toggle?"  onConfirm={ this.toggleHandler.bind(this, record) }>
                            <a href="">Toggle</a>
                        </Popconfirm>
                        <Divider type='vertical'/>
                        <Popconfirm title="Confirm to delete?" onConfirm={ this.deleteHandler.bind(this, record) }>
                            <a href="">Delete</a>
                        </Popconfirm>
                    </span>
                ),
            }
        ]

        const { loading } = this.props;
        const { todos } = this.props;

        return (
            <div className={ styles.normal }>
                <AddTodo onOk={ this.addHandler.bind(this) }/>
                <div>
                    <Table
                    columns={columns}
                    dataSource={todos}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={loading}
                    />
                </div>
                <Filter />
            </div>
        )
    }
}

function getVisibleTodos({todos, filter}){
    switch(filter){
        case 'ALL':
        return todos;
        case 'ACTIVE':
        return todos.filter(t => !t.completed);
        case 'COMPLETED':
        return todos.filter(t => t.completed);
        default:
        return todos;
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        todos: getVisibleTodos(state.Todo),
        loading: state.loading.models.Todo,
    }
}

export default connect(mapStateToProps)(Todo);
