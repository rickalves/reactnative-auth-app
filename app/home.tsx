// Importa o React e os hooks useEffect e useState
import React, { useEffect, useState } from 'react';
// Importa componentes do React Native para construir a interface
import { View, Text, Button, StyleSheet } from 'react-native';
// Importa SecureStore para acessar e manipular o token armazenado de forma segura
import * as SecureStore from 'expo-secure-store';
// Importa o hook useRouter para navegação programática
import { useRouter } from 'expo-router';

// Componente Home para a tela protegida
export default function Home() {
  // Estado para armazenar o token do usuário (pode ser usado para validar a sessão)
  const [token, setToken] = useState<string | null>(null);
  // Inicializa o hook useRouter para controlar a navegação
  const router = useRouter();

  // useEffect executado ao montar o componente para carregar o token armazenado
  useEffect(() => {
    // Função assíncrona para carregar o token
    const loadToken = async () => {
      // Recupera o token armazenado de forma segura
      const storedToken = await SecureStore.getItemAsync('userToken');
      // Atualiza o estado com o token recuperado
      setToken(storedToken);
      // Se não houver token, redireciona para a tela de login
      if (!storedToken) {
        router.replace('/auth/login');
      }
    };
    // Chama a função para carregar o token
    loadToken();
  }, []);

  // Função para realizar o logout do usuário
  const handleLogout = async () => {
    // Remove o token armazenado de forma segura
    await SecureStore.deleteItemAsync('userToken');
    // Redireciona para a tela de login após o logout
    router.replace('/auth/login');
  };

  return (
    // Renderiza a interface da tela Home
    <View style={styles.container}>
      {/* Título da tela Home */}
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      {/* Exibe o token para demonstração (pode ser removido em produção) */}
      <Text>Seu token: {token}</Text>
      {/* Botão para efetuar o logout */}
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

// Estilos para o componente Home
const styles = StyleSheet.create({
  container: {
    flex: 1,               // Ocupa toda a tela
    padding: 20,           // Aplica preenchimento interno
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
  },
  title: {
    fontSize: 24,          // Define o tamanho da fonte do título
    marginBottom: 20,      // Adiciona espaço abaixo do título
  },
});
