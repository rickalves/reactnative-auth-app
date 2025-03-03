import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Styles } from '../../constants/Styles'; // Importando estilos globais
import { Colors } from '../../constants/Colors'; //Importando cores globais
import * as SecureStore from 'expo-secure-store';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const router = useRouter();

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            setErrorMessage(true);
            setMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage(true);
            setMessage('As senhas não coincidem.');
            return;
        }

        try {
            setErrorMessage(false);
            setMessage('Redefinindo senha...');
            const email = await SecureStore.getItemAsync('recoveryEmail');
            const code = await SecureStore.getItemAsync('recoveryCode');
            const response = await axios.post('http://192.168.68.101:5000/api/auth/reset-password', { email, code, password });

            if (response.status === 200) {
                setMessage('Senha redefinida com sucesso!');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            } else {
                setErrorMessage(true);
                setMessage('Erro ao redefinir senha.');
            }
        } catch (error) {
            setErrorMessage(true);
            setMessage('Falha na conexão com o servidor.');
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Redefinição de Senha</Text>
            <Text style={Styles.titleInput}>Nova Senha:</Text>
            <TextInput
                placeholder="Nova Senha"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setErrorMessage(false);
                }}
                style={[Styles.input, errorMessage && Styles.inputError]}
                secureTextEntry
                autoCapitalize="none"
            />
            <Text style={Styles.titleInput}>Confirmar Nova Senha:</Text>
            <TextInput
                placeholder="Confirmar Nova Senha"
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrorMessage(false);
                }}
                style={[Styles.input, errorMessage && Styles.inputError]}
                secureTextEntry
                autoCapitalize="none"
            />
            {message ? <Text style={errorMessage? Styles.errorText : Styles.successText}>{message}</Text> : null}

            <TouchableOpacity style={Styles.button} onPress={handleResetPassword}>
                <Text style={Styles.buttonText}>Redefinir Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={{ color: Colors.primary, marginTop: 10 }}>Voltar para Login</Text>
            </TouchableOpacity>
        </View>
    );
}