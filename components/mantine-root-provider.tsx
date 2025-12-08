// components/MantineRootProvider.tsx
"use client";

import { MantineProvider, createTheme } from '@mantine/core';

// Optionnel : Définissez un thème personnalisé (important pour les couleurs/polices)
const theme = createTheme({
  // Exemple: Si vous utilisez la palette de couleurs par défaut de Mantine
  // colors: { ... }, 
});

export function MantineRootProvider({ children }: { children: React.ReactNode }) {
  return (
    // 'withGlobalStyles' et 'withNormalizeCSS' sont obsolètes dans Mantine v7.
    // L'inclusion des fichiers CSS globaux est maintenant la méthode préférée.
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}
