import { useEffect } from 'react';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './themes';
import PageLayout from './components/PageLayout';
import AppRoutes from './components/AppRoutes';

import './App.css';

const Home = lazyWithPreload(() => import('./components/Home'));
const CreateMacro = lazyWithPreload(() => import('./components/CreateMacro'));
const ViewMacro = lazyWithPreload(() => import('./components/ViewMacro'));
const EditMacro = lazyWithPreload(() => import('./components/EditMacro'));

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    useEffect(() => {
        Home.preload();
        CreateMacro.preload();
        ViewMacro.preload();
        EditMacro.preload();
    }, []);

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
