import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import SuccessIcon from '../../components/SuccessIcon';

export default function Confirmation() {
  return (
    <View style={styles.container}>
      {/* Ícone animado */}
      <MotiView
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 800 }}
      >
        <SuccessIcon size={120} color="#28a745" />
      </MotiView>

      {/* Mensagem de sucesso */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, duration: 500 }}
      >
        <Text style={styles.title}>Cadastro Concluído!</Text>
        <Text style={styles.message}>Agora você pode fazer login e começar a usar o aplicativo.</Text>
      </MotiView>

      {/* Botão animado */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 500 }}
      >
        <Link href="/auth/login" style={styles.button}>
          <Text style={styles.buttonText}>Voltar ao Login</Text>
        </Link>
      </MotiView>
    </View>
  );
}

// Estilos da tela de confirmação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
