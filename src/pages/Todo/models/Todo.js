import { addTodo, remove } from "../services/Todo";
const Mock = require('mockjs');

const delay = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve,timeout);
    })
}

export default {
    namespace: 'Todo',
    state: {
        todos: [],
        filter: null
    },
    reducers: {
        save(state, { payload }){
            return {
                ...state,
                todos: [
                    ...state.todos,
                    ...payload
                ]
            }
        },
        delete(state, { payload }){
            const newTodos = state.todos.filter((t, i) => t.id !== payload)
            return {
                ...state,
                todos: newTodos
            }
        },
        filter(state, { payload = 'ALL' }){
            return {
                ...state,
                filter: payload
            }
        },
        toggle(state, { payload }){
            return {
                ...state,
                todos: state.todos.map((t) => {
                    if(t.id === payload){
                        t.completed = !t.completed
                    }

                    return t;
                })
            }
        }
    },
    effects: {
        *addTodo({ payload }, { call, put }){
            const res = yield call(addTodo, payload);
            yield put({ type: 'save', payload: [{ ...res }] })
        },
        *remove({ payload }, { call, put }){
            const res = yield call(remove, payload);
            yield put({ type: 'delete', payload: res })
        },
        *mock(action, { call, put }){
            yield call(delay, 1000);
            const { todos } = Mock.mock({
                'todos|5-10': [
                    {
                        id: '@integer',
                        text: '@string',
                        completed: '@boolean'
                    }
                ] 
            })
            yield put({ type: 'save', payload: todos })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/Todo') {
                    dispatch({ type: 'filter', payload: query.filter });
                }
            });
        },
    }
}
