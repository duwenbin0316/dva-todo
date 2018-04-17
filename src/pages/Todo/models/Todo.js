import { addTodo, remove } from "../services/Todo";


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
                    payload
                ]
            }
        },
        delete(state, { payload }){
            const newTodos = state.todos.filter((t, i) => i !== payload)

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
            yield put({ type: 'save', payload: { ...res } })
        },
        *remove({ payload }, { call, put }){
            const res = yield call(remove, payload);
            yield put({ type: 'delete', payload: res })
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
