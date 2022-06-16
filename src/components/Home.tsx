import { Link as RouterLink } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MacroList from './MacroList';

const Home = () => {
    return (
        <div>
            <MacroList />
            <Fab
                color="primary"
                aria-label="add"
                component={RouterLink}
                to="macro/create"
                sx={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
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
