import React from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './themes';
import MacroRoller from './components/MacroRoller';
import './App.css';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <MacroRoller />
        </ThemeProvider>
    );
};

export default App;
