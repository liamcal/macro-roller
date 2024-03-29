import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MacroList from './MacroList';

const Home = () => {

    useEffect(() => {
        document.title = `Macro Roller`;
    }, []);

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
        </div>
    );
};

export default Home;
