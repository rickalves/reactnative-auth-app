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

  // Estado para armazenar mensagens de erro
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para armazenar erros individuais dos inputs
  const [nomeError, setNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);

  // Inicializa o hook useRouter para controlar a navegação
  const router = useRouter();

  // Função para lidar com o processo de cadastro
  const handleRegister = async () => {
    // 🔹 Valida se os campos estão preenchidos
    if (!nome) setNomeError(true);
    if (!email) setEmailError(true);
    if (!senha) setSenhaError(true);

    // 🔹 Verifica se os campos estão preenchidos antes de tentar o login
    if (!nome || !senha || !email) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Realiza uma requisição POST para a API de cadastro, enviando nome, email e senha
      await axios.post('http://192.168.68.101:5000/api/auth/register', {
        nome,       // Envia o nome informado
        email,      // Envia o email informado
        senha,   // Envia a senha informada
        tipo,   // Envia o tipo do usuario
      });
      // Após cadastro bem-sucedido, redireciona para a tela de login
      router.replace('./confirmation');
    } catch (error: any) {
      // Em caso de erro, exibe a mensagem de erro no console
      console.log('Erro no cadastro:', error);
      // 🔹 Captura mensagens de erro vindas da API
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Erro ao fazer login.');
      } else {
        setErrorMessage('Falha na conexão com o servidor.');
      }
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
        onChangeText={(text) => {
          setNome(text);// Atualiza o estado
          setNomeError(false);// Remove o erro ao digitar
        }}
        style={[styles.input, nomeError && styles.inputError]}// Aplica estilo de erro condicionalmente
      />
      {/* Campo de entrada para o email */}
      <TextInput
        placeholder="Email"             // Texto de sugestão para o campo
        value={email}                   // Valor atual do estado email
        onChangeText={(text) => {
          setEmail(text);// Atualiza o estado
          setEmailError(false);// Remove o erro ao digitar
        }}
        style={[styles.input, emailError && styles.inputError]}// Aplica estilo de erro condicionalmente
        keyboardType="email-address"    // Configura o teclado para digitar emails
        autoCapitalize="none"           // Evita a capitalização automática do texto
      />
      {/* Campo de entrada para a senha */}
      <TextInput
        placeholder="Senha"             // Texto de sugestão para o campo
        value={senha}                // Valor atual do estado password
        onChangeText={(text) => {
          setSenha(text);// Atualiza o estado
          setSenhaError(false);// Remove o erro ao digitar
        }}
        style={[styles.input, senhaError && styles.inputError]}// Aplica estilo de erro condicionalmente
        secureTextEntry                // Oculta os caracteres para segurança
      />

      {/* 🔹 Exibe a mensagem de erro caso haja algum problema */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text>  : null}

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
    gap: 8,
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
    borderWidth: 1,
    borderRadius: 8,          // Adiciona preenchimento interno ao input
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red', // 🔹 Cor vermelha para destacar o erro
    textAlign: 'center',
    marginBottom: 10,
  },
});
