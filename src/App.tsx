import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './themes';
import MacroRoller from './components/MacroRoller';
import PageLayout from './components/PageLayout';
import Home from './components/Home';
import CreateMacro from './components/CreateMacro';
import './App.css';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <PageLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/roll" element={<MacroRoller />} />
                    <Route path="/macro/create" element={<CreateMacro />} />
                </Routes>
            </PageLayout>
        </ThemeProvider>
    );
};

export default App;
