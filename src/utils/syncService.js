import NetInfo from '@react-native-community/netinfo';
import axios from '../api/axios';
import { getQueue, clearQueue } from './offlineQueue';

export const startSyncListener = () => {
    NetInfo.addEventListener(async (state) => {
        if (state.isConnected) {
            const queue = await getQueue();

            for (const item of queue) {
                if (item.type === 'CREATE_TODO') {
                    await axios.post('/todos', item.payload);
                }
            }

            if (queue.length) {
                await clearQueue();
                console.log('Offline tasks synced');
            }
        }
    });
};
