// Importa o React e o hook useState
import React, { useState } from 'react';
// Importa componentes do React Native para construir a interface
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
// Importa axios para realizar requisições HTTP à API
import axios from 'axios';
// Importa o hook useRouter para navegação programática
import { useRouter } from 'expo-router';

import { Styles } from '@/constants/Styles'; // Importando estilos globais
import { Colors } from '@/constants/Colors'; //Importando cores globais

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
    <View style={Styles.container}>
      {/* Título da tela de cadastro */}
      <Text style={Styles.title}>Cadastro</Text>
      {/* Campo de entrada para o nome */}
      <Text style={Styles.titleInput}>Nome:</Text>
      <TextInput
        placeholder="Nome"              // Texto de sugestão para o campo
        value={nome}                    // Valor atual do estado name
        onChangeText={(text) => {
          setNome(text);// Atualiza o estado
          setNomeError(false);// Remove o erro ao digitar
        }}
        style={[Styles.input, nomeError && Styles.inputError]}// Aplica estilo de erro condicionalmente
      />
      {/* Campo de entrada para o email */}
      <Text style={Styles.titleInput}>Email:</Text>
      <TextInput
        placeholder="Email"             // Texto de sugestão para o campo
        value={email}                   // Valor atual do estado email
        onChangeText={(text) => {
          setEmail(text);// Atualiza o estado
          setEmailError(false);// Remove o erro ao digitar
        }}
        style={[Styles.input, emailError && Styles.inputError]}// Aplica estilo de erro condicionalmente
        keyboardType="email-address"    // Configura o teclado para digitar emails
        autoCapitalize="none"           // Evita a capitalização automática do texto
      />
      {/* Campo de entrada para a senha */}
      <Text style={Styles.titleInput}>Senha:</Text>
      <TextInput
        placeholder="Senha"             // Texto de sugestão para o campo
        value={senha}                // Valor atual do estado password
        onChangeText={(text) => {
          setSenha(text);// Atualiza o estado
          setSenhaError(false);// Remove o erro ao digitar
        }}
        style={[Styles.input, senhaError && Styles.inputError]}// Aplica estilo de erro condicionalmente
        secureTextEntry                // Oculta os caracteres para segurança
      />

      {/* 🔹 Exibe a mensagem de erro caso haja algum problema */}
      {errorMessage ? <Text style={Styles.errorText}>{errorMessage}</Text> : null}

      {/* Botão para efetuar o cadastro */}

      <TouchableOpacity style={Styles.button} onPress={handleRegister}>
        <Text style={Styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão para voltar para a tela de login */}
      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={{ color: Colors.primary, marginTop: 10 }}>Voltar para login</Text>
      </TouchableOpacity>
    </View>
  );
}


