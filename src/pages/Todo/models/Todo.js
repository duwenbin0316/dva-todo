import { addTodo, remove } from "../services/Todo";


export default {
    namespace: 'Todo',
    state: {
        todos: [],
        filter: 'ALL'
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
        filter(state, { payload }){
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
    }
}
