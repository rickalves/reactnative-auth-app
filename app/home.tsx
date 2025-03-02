import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function Home() {
  const [userData, setUserData] = useState<{ nome: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = await SecureStore.getItemAsync('userData'); // Recupera os dados do usuário como string
      const token = await SecureStore.getItemAsync('userToken');

      if (!token) {
        router.replace('/auth/login');
      } else if (storedUser) {
        setUserData(JSON.parse(storedUser)); // Converte de string JSON para objeto
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userData?.nome || 'Usuário'}! 🎉</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
