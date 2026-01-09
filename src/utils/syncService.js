import NetInfo from '@react-native-community/netinfo';
import axios from '../api/axios';
import { getQueue, clearQueue } from './offlineQueue';

export const startTodoSync = () => {
    NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
            const queue = await getQueue();
            for (const action of queue) {
                if (action.type === 'CREATE') {
                    await axios.post('/todos', action.payload);
                }
                if (action.type === 'UPDATE') {
                    await axios.patch(
                        `/todos/${action.payload.id}`,
                        action.payload.data
                    );
                }
            }
            if (queue.length) {
                await clearQueue();
                console.log('Offline todos synced');
            }
        }
    });
};
