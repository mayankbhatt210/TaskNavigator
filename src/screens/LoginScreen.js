import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';
import { Colors } from '../Theme';

const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!token.trim()) {
            Alert.alert('Error', 'Token is required');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get('/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('====================================');
            console.log("response--->", response);
            console.log('====================================');
            await login(token);
        } catch (error) {
            Alert.alert('Invalid Token', 'Please enter a valid GoRest API token');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Navigator</Text>

            <TextInput
                placeholder="Enter GoRest API Token"
                value={token}
                onChangeText={setToken}
                style={styles.input}
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 14,
        marginBottom: 16,
    },
    button: {
        backgroundColor: Colors.themeColor,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '600',
    },
});


export default LoginScreen;
