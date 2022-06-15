import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MacroList from './MacroList';

const Home = () => {
    return (
        <div>
            <MacroList />
            <div>
                <Button component={RouterLink} to="/roll" variant="contained">
                    Get Rollin
                </Button>
                <Button
                    component={RouterLink}
                    to="/macro/create"
                    variant="contained"
                >
                    New macro
                </Button>
            </div>
        </div>
    );
};

export default Home;
