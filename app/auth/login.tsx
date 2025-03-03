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

  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro

  // Estados para armazenar erros individuais dos inputs
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Inicializa o hook useRouter para controlar a navegação
  const router = useRouter();

  // Função para lidar com o processo de login
const handleLogin = async () => {
   // 🔹 Valida se os campos estão preenchidos
   if (!email) setEmailError(true);
   if (!senha) setPasswordError(true);

  // 🔹 Verifica se os campos estão preenchidos antes de tentar o login
  if (!email || !senha) {
    setErrorMessage('Por favor, preencha todos os campos.');
    return;
  }

  try {
    setErrorMessage(''); // Reseta a mensagem de erro antes da tentativa

    const response = await axios.post('http://192.168.68.101:5000/api/auth/login', {
      email,
      senha,
    });

    const { token, usuario } = response.data; // Pega o token e os dados do usuário

    // Armazena o token
    await SecureStore.setItemAsync('userToken', token);

    // Armazena o objeto de usuário convertendo para string JSON
    await SecureStore.setItemAsync('userData', JSON.stringify(usuario));

    router.replace('/home'); // Redireciona para Home
  } catch (error:any) {
    console.log('Erro no login:', error);
    // 🔹 Captura mensagens de erro vindas da API
    if (error.response) {
      setErrorMessage(error.response.data.error || 'Erro ao fazer login.');
    } else {
      setErrorMessage('Falha na conexão com o servidor.');
    }
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
        onChangeText={(text) => {
          setEmail(text); // Atualiza o estado
          setEmailError(false); // Remove o erro ao digitar
        }}
        style={[styles.input, emailError && styles.inputError]} // Aplica estilo de erro condicionalmente
        keyboardType="email-address"    // Configura o teclado para digitar emails
        autoCapitalize="none"           // Evita a capitalização automática do texto
      />
      {/* Campo de entrada para a senha */}
      <TextInput
        placeholder="Senha"             // Texto de sugestão para o campo
        value={senha}                // Valor atual do estado password
        onChangeText={(text) => {
          setSenha(text); // Atualiza o estado
          setPasswordError(false); // Remove o erro ao digitar
        }}
        secureTextEntry                // Oculta os caracteres para segurança
        style={[styles.input, passwordError && styles.inputError]} // Aplica estilo de erro condicionalmente
      />
      {/* 🔹 Exibe a mensagem de erro caso haja algum problema */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text>  : null}


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
    padding: 10, 
    borderRadius:8,
    borderWidth:1,         // Adiciona preenchimento interno ao input
  },
  errorText: {
    color: 'red', // 🔹 Cor vermelha para destacar o erro
    textAlign: 'center',
    marginBottom: 10,
  },
  inputError:{
    borderColor:'red',
  }
});
