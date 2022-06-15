import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

const Header = () => {
    return (
        <header
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockEnd: '1rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    lineHeight: 0,
                    width: '2rem',
                }}
            >
                <IconButton aria-label="home" component={RouterLink} to="/">
                    <HomeIcon fontSize="inherit" />
                </IconButton>
            </div>
            <div
                style={{
                    display: 'flex',
                    flex: '1 1',
                    justifyContent: 'center',
                    lineHeight: 0,
                }}
            >
                <h1 style={{ margin: '0' }}>Macro Roller</h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '2rem',
                }}
            ></div>
        </header>
    );
};

export default Header;
