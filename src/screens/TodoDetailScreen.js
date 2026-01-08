import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import axios from '../api/axios';
import { commonStyles } from './commonStyle';
import { useFocusEffect } from '@react-navigation/native';

const TodoDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [todo, setTodo] = useState(null);

    // const { todoId } = route.params;

    // Fetch todo by ID
    useEffect(() => {
        console.log('====================================');
        console.log("Details-->", id);
        console.log('====================================');
        axios.get(`/todos/${id}`).then((res) => {
            setTodo(res.data);
        });
    }, [id]);


    const fetchTodo = async () => {
        try {
            const res = await axios.get(`/todos/${id}`);
            setTodo(res.data);
        } catch {
            Alert.alert('Error', 'Failed to load todo');
        }
    };

    const handleDelete = async () => {
        Alert.alert('Confirm', 'Delete this todo?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    await axios.delete(`/todos/${id}`);
                    navigation.goBack();
                },
            },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            fetchTodo();
        }, [])
    );

    if (!todo) return null;

    const isCompleted = todo.status === 'completed';

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.detailCard}>
                {/* Header */}
                <View style={commonStyles.detailHeader}>
                    <Text style={commonStyles.detailTitle}>
                        {todo.title}
                    </Text>

                    <View style={commonStyles.detailStatusRow}>
                        <View
                            style={[
                                commonStyles.statusDot,
                                isCompleted
                                    ? commonStyles.dotCompleted
                                    : commonStyles.dotPending,
                            ]}
                        />
                        <Text style={commonStyles.subtitle}>
                            {isCompleted ? 'Completed' : 'Pending'}
                        </Text>
                    </View>
                </View>

                <View style={commonStyles.detailDivider} />

                {/* Actions */}
                <View style={commonStyles.actionRow}>
                    <TouchableOpacity
                        style={[
                            commonStyles.actionButton,
                            commonStyles.editButton,
                        ]}
                        onPress={() =>
                            navigation.navigate('TodoForm', { todo })
                        }
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            commonStyles.actionButton,
                            commonStyles.deleteButton,
                        ]}
                        onPress={handleDelete}
                    >
                        <Text style={commonStyles.primaryButtonText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TodoDetailScreen;
