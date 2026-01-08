import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'CACHED_TODOS';

export const saveTodosToCache = async (todos) => {
    try {
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (e) {
        console.log('Error saving todos', e);
    }
};

export const getTodosFromCache = async () => {
    try {
        const data = await AsyncStorage.getItem(TODOS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.log('Error reading todos', e);
        return [];
    }
};
