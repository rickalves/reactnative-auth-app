import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Styles } from '../../constants/Styles'; // Importando estilos globais
import { Colors } from '../../constants/Colors'; //Importando cores globais


export default function EmailSent() {
  const router = useRouter();

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Email Enviado</Text>
      <Text style={Styles.message}>Um email de recuperação foi enviado para o seu endereço de email.</Text>
      <TouchableOpacity style={Styles.button} onPress={() => router.push('/auth/verifyCode')}>
        <Text style={Styles.buttonText}>Verificar Código</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={{ color: Colors.primary, marginTop: 10 }}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}