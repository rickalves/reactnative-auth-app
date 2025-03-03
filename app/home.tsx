import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

import { Styles } from '@/constants/Styles'
import { Colors } from '@/constants/Colors'
export default function Home() {
  const [userData, setUserData] = useState<{ nome: string } | null>(null);
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
    <View style={Styles.container}>
      <Text style={Styles.title}>Bem-vindo, {userData?.nome || 'Usuário'}! 🎉</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: Colors.primary, marginTop: 10 }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
