import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
    const navigate = useNavigate();
    const { pathname, state } = useLocation();
    const backLink = (state as { back?: string })?.back ?? '/';
    const isHome = pathname === '/';

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
                {!isHome && (
                    <IconButton
                        aria-label="home"
                        onClick={() => navigate(backLink, { replace: true })}
                    >
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    flex: '1 1',
                    justifyContent: 'center',
                    lineHeight: 0,
                }}
            >
                <h1>Macro Roller</h1>
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
