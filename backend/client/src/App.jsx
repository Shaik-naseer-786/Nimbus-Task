import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductsPage from './components/ProductList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProductsPage />
    </ThemeProvider>
  );
}

export default App;
