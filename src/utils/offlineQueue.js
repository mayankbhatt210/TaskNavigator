import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'OFFLINE_QUEUE';

export const addToQueue = async (request) => {
    const queue = await getQueue();
    queue.push(request);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const getQueue = async () => {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearQueue = async () => {
    await AsyncStorage.removeItem(QUEUE_KEY);
};
