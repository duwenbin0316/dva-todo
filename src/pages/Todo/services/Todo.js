
export async function addTodo(todoText) {
    const res = await new Promise((resolve) => {
        setTimeout(() => resolve(todoText), 1000);
    }).then(res => res);

    return res;
}

export async function remove(id) {
    const res = await new Promise((resolve) => {
        setTimeout(() => resolve(id), 1000);
    }).then(res => res);

    return res;
}
