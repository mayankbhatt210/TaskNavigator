import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    commonStylesheet,
    Alert,
} from 'react-native';
import axios from '../api/axios';
import { commonStyles } from './commonStyle';
import NetInfo from '@react-native-community/netinfo';

const TodoFormScreen = ({ navigation, route }) => {
    const todo = route.params?.todo;
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        }
    }, [todo]);

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert('Validation', 'Title is required');
            return;
        }

        const netState = await NetInfo.fetch();
        console.log("netState-->", netState);


        try {
            // 🔴 OFFLINE
            if (!netState.isConnected) {
                if (todo) {
                    // Offline Edit
                    await addToQueue({
                        type: 'UPDATE',
                        payload: {
                            id: todo.id,
                            data: { title, status },
                        },
                    });
                } else {
                    // Offline Create
                    await addToQueue({
                        type: 'CREATE',
                        payload: {
                            title,
                            status,
                            user_id: 8263985,
                            due_on: new Date().toISOString(),
                        },
                    });
                }

                Alert.alert(
                    'Offline',
                    'Task saved locally and will sync when online'
                );
                navigation.goBack();
                return;
            }

            // 🟢 ONLINE
            if (todo) {
                await axios.patch(`/todos/${todo.id}`, {
                    title,
                    status,
                });
            } else {
                await axios.post('/todos', {
                    title,
                    status,
                    user_id: 8263985,
                    due_on: new Date().toISOString(),
                });
            }

            navigation.goBack();
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.formCard}>
                <Text style={[commonStyles.title, { marginBottom: 16 }]}>
                    {todo ? 'Edit Task' : 'Create Task'}
                </Text>

                {/* Title */}
                <View style={commonStyles.inputContainer}>
                    <Text style={commonStyles.label}>Task Title</Text>
                    <TextInput
                        style={commonStyles.input}
                        placeholder="Enter task title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Status */}
                <Text style={commonStyles.label}>Status</Text>
                <View style={commonStyles.statusToggle}>
                    <TouchableOpacity
                        style={[
                            commonStyles.statusOption,
                            status === 'pending' && commonStyles.statusActive,
                        ]}
                        onPress={() => setStatus('pending')}
                    >
                        <Text
                            style={[
                                commonStyles.statusText,
                                status === 'pending' ?
                                    commonStyles.statusTextActive : commonStyles.statusTextInActive,
                            ]}
                        >
                            Pending
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            commonStyles.statusOption,
                            status === 'completed' && commonStyles.statusActive,
                        ]}
                        onPress={() => setStatus('completed')}
                    >
                        <Text
                            style={[
                                commonStyles.statusText,
                                status === 'completed' ?
                                    commonStyles.statusTextActive : commonStyles.statusTextInActive,
                            ]}
                        >
                            Completed
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Submit */}
                <TouchableOpacity
                    style={[commonStyles.primaryButton, { marginTop: 24 }]}
                    onPress={handleSubmit}
                >
                    <Text style={commonStyles.primaryButtonText}>
                        {todo ? 'Update Task' : 'Create Task'}
                    </Text>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                    style={commonStyles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={commonStyles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default TodoFormScreen;
