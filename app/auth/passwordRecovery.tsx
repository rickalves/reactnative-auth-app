import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Styles } from '../../constants/Styles'; // Importando estilos globais
import { Colors } from '../../constants/Colors'; //Importando cores globais


export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const router = useRouter();

  const handlePasswordRecovery = async () => {
    if (!email) {
      setErrorMessage(true);
      setMessage('Por favor, preencha o campo de email.');
      return;
    }

    try {
      setErrorMessage(false);
      setMessage('Enviando email de recuperação...');

      const response = await axios.post('http://192.168.68.101:5000/api/auth/recover-password', { email });

      if (response.data.success) {
        setMessage('Email de recuperação enviado com sucesso!');
      } else {
        setMessage('Erro ao enviar email de recuperação.');
      }
    } catch (error) {
      setMessage('Falha na conexão com o servidor.');
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Recuperação de Senha</Text>
      <Text style={Styles.titleInput}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(false);
        }}
        style={[Styles.input, errorMessage && Styles.inputError]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {message ? <Text style={Styles.errorText}>{message}</Text> : null}

      <TouchableOpacity style={Styles.button} onPress={handlePasswordRecovery}>
        <Text style={Styles.buttonText}>Enviar Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={{ color: Colors.primary, marginTop: 10 }}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}