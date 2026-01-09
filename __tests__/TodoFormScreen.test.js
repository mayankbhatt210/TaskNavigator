import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axiosInstance from '../src/api/axios';
import NetInfo from '@react-native-community/netinfo';
import TodoFormScreen from '../src/screens/TodoFormScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../src/api/axios');
jest.mock('@react-native-community/netinfo', () => ({
    fetch: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage');

const navigation = {
    goBack: jest.fn(),
};

const route = { params: {} };

describe('TodoFormScreen with axios instance', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('creates todo when online and token exists', async () => {
        NetInfo.fetch.mockResolvedValueOnce({ isConnected: true });
        AsyncStorage.getItem.mockResolvedValueOnce('FAKE_TOKEN');

        axiosInstance.post.mockResolvedValueOnce({ data: { id: 1 } });

        const { getByPlaceholderText, getByText } = render(
            <TodoFormScreen navigation={navigation} route={route} />
        );

        fireEvent.changeText(
            getByPlaceholderText('Enter task title'),
            'Test Todo'
        );

        fireEvent.press(getByText('Create Task'));

        await waitFor(() => {
            expect(axiosInstance.post).toHaveBeenCalledWith(
                '/todos',
                expect.objectContaining({
                    title: 'Test Todo',
                    status: 'pending',
                })
            );
            expect(navigation.goBack).toHaveBeenCalled();
        });
    });
});
