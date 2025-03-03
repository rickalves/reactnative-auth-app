import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import SuccessIcon from '../../components/SuccessIcon';
import { Styles } from '@/constants/Styles';

export default function Confirmation() {
  return (
    <View style={Styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 800 }}
      >
        <SuccessIcon size={120} color="#28a745" />
      </MotiView>


      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, duration: 500 }}
      >
        <Text style={Styles.title}>Cadastro Concluído!</Text>
        <Text style={Styles.message}>Agora você pode fazer login e começar a usar o aplicativo.</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 500 }}
      >
        <Link href="/auth/login" style={Styles.button}>
          <Text style={Styles.buttonText}>Voltar ao Login</Text>
        </Link>
      </MotiView>
    </View>
  );
}

