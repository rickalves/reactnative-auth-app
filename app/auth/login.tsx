// Importa o React e o hook useState
import React, { useState } from 'react';
// Importa componentes do React Native para construir a interface
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// Importa axios para realizar requisições HTTP à API
import axios from 'axios';
// Importa SecureStore para armazenar o token de forma segura no dispositivo
import * as SecureStore from 'expo-secure-store';
// Importa o hook useRouter para realizar navegação programática
import { useRouter } from 'expo-router';

// Componente Login para a tela de autenticação
export default function Login() {
  // Estado para armazenar o valor do email digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar o valor da senha digitada
  const [senha, setSenha] = useState('');

  // Inicializa o hook useRouter para controlar a navegação
  const router = useRouter();

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    try {
      // Realiza uma requisição POST para a API de login, enviando email e senha
      const response = await axios.post('http://192.168.68.102:5000/api/auth/login', {
        email,      // Envia o email informado
        senha,   // Envia a senha informada
      });
      // Recupera o token JWT retornado pela API
      const token = response.data.token;
      // Armazena o token de forma segura utilizando o SecureStore
      await SecureStore.setItemAsync('userToken', token);
      // Após login bem-sucedido, redireciona para a tela Home
      router.replace('../home');
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro no console
      console.log('Erro no login:', error);
    }
  };

  return (
    // Renderiza a interface da tela de login
    <View style={styles.container}>
      {/* Título da tela de login */}
      <Text style={styles.title}>Login</Text>
      {/* Campo de entrada para o email */}
      <TextInput
        placeholder="Email"             // Texto de sugestão para o campo
        value={email}                   // Valor atual do estado email
        onChangeText={setEmail}          // Atualiza o estado ao digitar
        style={styles.input}            // Aplica o estilo definido para o input
        keyboardType="email-address"    // Configura o teclado para digitar emails
        autoCapitalize="none"           // Evita a capitalização automática do texto
      />
      {/* Campo de entrada para a senha */}
      <TextInput
        placeholder="Senha"             // Texto de sugestão para o campo
        value={senha}                // Valor atual do estado password
        onChangeText={setSenha}       // Atualiza o estado ao digitar
        secureTextEntry                // Oculta os caracteres para segurança
        style={styles.input}            // Aplica o estilo definido para o input
      />
      {/* Botão para realizar o login */}
      <Button title="Entrar" onPress={handleLogin} />
      {/* Botão para navegar para a tela de cadastro */}
      <Button title="Cadastrar" onPress={() => router.push('/auth/register')} />
    </View>
  );
}

// Estilos para o componente Login
const styles = StyleSheet.create({
  container: {
    flex: 1,               // Ocupa toda a tela
    padding: 20,           // Aplica preenchimento interno
    justifyContent: 'center', // Centraliza verticalmente
    gap:8,
  },
  title: {
    fontSize: 24,          // Define o tamanho da fonte do título
    marginBottom: 20,      // Adiciona espaço abaixo do título
    textAlign: 'center',   // Centraliza o texto do título
  },
  input: {
    borderBottomWidth: 1,  // Define a largura da borda inferior do input
    marginBottom: 15,      // Adiciona espaço abaixo do input
    padding: 10,           // Adiciona preenchimento interno ao input
  },
});
