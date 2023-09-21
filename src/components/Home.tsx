import { Link as RouterLink } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MacroList from './MacroList';
import { useEffect } from 'react';
import { Import } from './Import';

const CreateMacro = lazyWithPreload(() => import('./CreateMacro'));
const ViewMacro = lazyWithPreload(() => import('./ViewMacro'));
const EditMacro = lazyWithPreload(() => import('./EditMacro'));

const Home = () => {
    // useEffect(() => {
    //     CreateMacro.preload();
    //     ViewMacro.preload();
    //     EditMacro.preload();
    // }, []);

    return (
        <div>
            <MacroList />
            <Fab
                color="primary"
                aria-label="add"
                component={RouterLink}
                to="macro/create"
                state={{ back: '/' }}
                sx={{
                    margin: 0,
                    top: 'auto',
                    right: 24,
                    bottom: 24,
                    left: 'auto',
                    position: 'fixed',
                }}
            >
                <AddIcon />
            </Fab>
            <Import />
        </div>
    );
};

export default Home;
