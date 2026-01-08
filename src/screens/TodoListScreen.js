import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import axios from '../api/axios';
import { commonStyles } from './commonStyle';
import { useFocusEffect } from '@react-navigation/native';

const PER_PAGE = 20;

const TodoListScreen = ({ navigation }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchTodos = async (pageNumber = 1) => {
        try {
            pageNumber === 1 ? setLoading(true) : setLoadingMore(true);

            const res = await axios.get(
                `/todos?page=${pageNumber}&per_page=${PER_PAGE}`
            );

            const newTodos = res.data;

            if (newTodos.length === 0) {
                setHasMore(false);
                return;
            }

            setTodos((prev) =>
                pageNumber === 1 ? newTodos : [...prev, ...newTodos]
            );
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch todos');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTodos(1);
        }, [])
    );

    const loadMore = () => {
        if (!loadingMore && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchTodos(nextPage);
        }
    };

    const renderFooter = () => {
        if (!loadingMore) return null;
        return <ActivityIndicator style={{ marginVertical: 16 }} />;
    };

    const renderItem = ({ item }) => {
        const isCompleted = item.status === 'completed';

        return (
            <TouchableOpacity
                style={commonStyles.card}
                activeOpacity={0.8}
                onPress={() =>
                    navigation.navigate('TodoDetail', { id: item.id })
                }
            >
                <View style={commonStyles.cardHeader}>
                    <Text style={commonStyles.cardTitle} numberOfLines={2}>
                        {item.title}
                    </Text>

                    <View
                        style={[
                            commonStyles.badge,
                            isCompleted
                                ? commonStyles.badgeCompleted
                                : commonStyles.badgePending,
                        ]}
                    >
                        <Text
                            style={
                                isCompleted
                                    ? commonStyles.badgeTextCompleted
                                    : commonStyles.badgeTextPending
                            }
                        >
                            {isCompleted ? 'Completed' : 'Pending'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading && page === 1) {
        return <ActivityIndicator style={{ marginTop: 20 }} />;
    }

    return (
        <View style={commonStyles.container}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />

            <TouchableOpacity
                style={commonStyles.addButton}
                onPress={() => navigation.navigate('TodoForm')}
            >
                <Text style={commonStyles.addText}>＋</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TodoListScreen;
