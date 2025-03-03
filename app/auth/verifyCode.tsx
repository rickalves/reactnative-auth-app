import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Styles } from '../../constants/Styles'; // Importando estilos globais
import { Colors } from '../../constants/Colors'; //Importando cores globais
import * as SecureStore from 'expo-secure-store';
import * as Clipboard from 'expo-clipboard';

export default function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const router = useRouter();
 // Função para verificar o código
  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setErrorMessage(true);
      setMessage('Por favor, preencha todos os campos com o código.');
      return;
    }

    try {
      setErrorMessage(false);
      setMessage('Verificando código...');
      const email = await SecureStore.getItemAsync('recoveryEmail');

      const response = await axios.post('http://192.168.68.101:5000/api/auth/verify-code', { email, code: fullCode });

      if (response.status === 200) {
        setMessage('Código verificado com sucesso!');
        await SecureStore.setItemAsync('recoveryCode', fullCode);
        setTimeout(() => {
          router.push('/auth/resetPassword');
        }, 2000);
      } else {
        setMessage('Código inválido.');
      }
    } catch (error) {
      setMessage('Falha na conexão com o servidor.');
      setErrorMessage(true);
    }
  };
 // Função para alterar o código
  const handleChangeText = (text:string, index:number):void => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };
 // Função para colar o código da área de transferência
  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    if (clipboardContent.length === 6 && /^\d+$/.test(clipboardContent)) {
      setCode(clipboardContent.split(''));
      setErrorMessage(false);
      setMessage('');
    }
  };
  // Função para reenviar o email de recuperação
  const handleResendEmail = async () => {
    try {
      setErrorMessage(false);
      setCode(['', '', '', '', '', '']);
      setMessage('Reenviando email de recuperação...');
      const email = await SecureStore.getItemAsync('recoveryEmail');

      const response = await axios.post('http://192.168.68.101:5000/api/auth/recovery-password', { email });

      if (response.status === 200) {
        setMessage('Email de recuperação reenviado com sucesso!');
      } else {
        setMessage('Erro ao reenviar email de recuperação.');
      }
    } catch (error) {
      setMessage('Falha na conexão com o servidor.');
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Verificação de Código</Text>
      <Text style={Styles.titleInput}>Código:</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => {
              handleChangeText(text, index);
              setErrorMessage(false);
              setMessage('');
            }}
            style={[Styles.input, styles.codeInput, errorMessage && Styles.inputError]}
            keyboardType="numeric"
            maxLength={1}
            autoCapitalize="none"
            onFocus={handlePaste}
          />
        ))}
      </View>
      {message ? <Text style={errorMessage ? Styles.errorText : Styles.successText}>{message}</Text> : null}
      <TouchableOpacity style={Styles.button} onPress={handleVerifyCode}>
        <Text style={Styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={{ color: Colors.primary }}>Não recebeu o código?</Text>
        <TouchableOpacity onPress={handleResendEmail}>
          <Text style={[{ textDecorationLine: 'underline', color: Colors.primary }]}>Reenviar Email</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={{ color: Colors.primary, marginTop: 10 }}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  codeInput: {
    width: 40,
    textAlign: 'center',
  },
});