// app/index.tsx
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Adia o redirecionamento para o final da fila de execução,
    // garantindo que o Root Layout esteja montado.
    const timeout = setTimeout(() => {
      router.replace('/auth/login');
    }, 0);

    // Limpa o timeout se o componente for desmontado
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text>Redirecionando para a tela de login...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // Ocupa toda a tela
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',     // Centraliza horizontalmente
  },
});
