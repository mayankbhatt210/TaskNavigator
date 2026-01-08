import React, { useContext, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  LogBox,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './src/auth/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import TodoDetailScreen from './src/screens/TodoDetailScreen';
import TodoFormScreen from './src/screens/TodoFormScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import { linking } from './src/utils/deepLinking';
import CustomHeader from './src/components/CustomHeader';
import { startSyncListener } from './src/utils/syncService';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { token, loading, logout } = useContext(AuthContext);

  const logoutTap = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="TodoList"
              component={TodoListScreen}
              options={{
                header: ({ navigation }) => (
                  <CustomHeader title="Task List" rightAction={logoutTap} />
                ),
              }}
            />
            <Stack.Screen
              name="TodoDetail"
              component={TodoDetailScreen}
              options={{
                header: ({ navigation }) => (
                  <CustomHeader
                    title="Task Details"
                    onBack={() => {
                      if (navigation.canGoBack()) {
                        navigation.goBack();
                      } else {
                        navigation.replace('TodoList');
                      }
                    }}
                  />
                ),
              }}
            />

            <Stack.Screen
              name="TodoForm"
              component={TodoFormScreen}
              options={{
                header: ({ navigation }) => (
                  <CustomHeader
                    title="Task Details"
                    onBack={() => navigation.goBack()}
                  />
                ),
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  LogBox.ignoreAllLogs();
  useEffect(() => {
    startSyncListener();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
