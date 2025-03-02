// Importa o React e o hook useState
import React, { useState } from 'react';
// Importa componentes do React Native para construir a interface
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// Importa axios para realizar requisições HTTP à API
import axios from 'axios';
// Importa o hook useRouter para navegação programática
import { useRouter } from 'expo-router';

// Componente Register para a tela de cadastro
export default function Register() {
  // Estado para armazenar o nome digitado pelo usuário
  const [nome, setNome] = useState('');
  // Estado para armazenar o email digitado pelo usuário
  const [email, setEmail] = useState('');
  // Estado para armazenar a senha digitada pelo usuário
  const [senha, setSenha] = useState('');
  
  // Estado para armazenar a senha digitada pelo usuário
  const [tipo, setTipo] = useState('Aluno');

  // Inicializa o hook useRouter para controlar a navegação
  const router = useRouter();

  // Função para lidar com o processo de cadastro
  const handleRegister = async () => {
    try {
      // Realiza uma requisição POST para a API de cadastro, enviando nome, email e senha
      await axios.post('http://192.168.68.102:5000/api/auth/register', {
        nome,       // Envia o nome informado
        email,      // Envia o email informado
        senha,   // Envia a senha informada
        tipo,   // Envia o tipo do usuario
      });
      // Após cadastro bem-sucedido, redireciona para a tela de login
      router.replace('/auth/login');
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro no console
      console.log('Erro no cadastro:', error);
    }
  };

  return (
    // Renderiza a interface da tela de cadastro
    <View style={styles.container}>
      {/* Título da tela de cadastro */}
      <Text style={styles.title}>Cadastro</Text>
      {/* Campo de entrada para o nome */}
      <TextInput
        placeholder="Nome"              // Texto de sugestão para o campo
        value={nome}                    // Valor atual do estado name
        onChangeText={setNome}           // Atualiza o estado ao digitar
        style={styles.input}            // Aplica o estilo definido para o input
      />
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
      {/* Botão para efetuar o cadastro */}
      <Button title="Cadastrar" onPress={handleRegister} />
      {/* Botão para voltar para a tela de login */}
      <Button title="Voltar para Login" onPress={() => router.push('/auth/login')} />
    </View>
  );
}

// Estilos para o componente Register
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
