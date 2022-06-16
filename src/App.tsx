import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './themes';
import PageLayout from './components/PageLayout';
import AppRoutes from './components/AppRoutes';

import './App.css';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <PageLayout>
                <AppRoutes />
            </PageLayout>
        </ThemeProvider>
    );
};

export default App;
