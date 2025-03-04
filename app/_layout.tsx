// app/_layout.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar'
// Importa o Slot do Expo Router para renderizar as rotas aninhadas
import { Slot } from 'expo-router';

export default function Layout() {
  // Renderiza o Slot imediatamente, permitindo que as páginas aninhadas sejam montadas
  return (
    <>
      <Slot />;
      <StatusBar style='dark'/>
    </>
  );
}
