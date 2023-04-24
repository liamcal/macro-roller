import { Link as RouterLink } from 'react-router-dom';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MacroList from './MacroList';

const CreateMacro = lazyWithPreload(() => import('./CreateMacro'));

const Home = () => {
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
                onMouseOver={CreateMacro.preload}
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Home;
