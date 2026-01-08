export const linking = {
    prefixes: ['tasknavigator://'],
    config: {
        screens: {
            TodoList: 'todos',
            TodoDetail: {
                path: 'todo/:id',
                parse: {
                    id: (id) => Number(id),
                },
            },
            TodoForm: 'todo-form',
        },
    },
};
