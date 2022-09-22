import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Snackbar,
    TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';
import { useMacros } from '../hooks';

const EditMacro = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const backLink = (state as { back?: string })?.back ?? '/';
    const { macroId } = useParams();
    const { macros, updateMacroById, deleteMacro } = useMacros(
        MACROS_LOCAL_STORAGE_KEY
    );
    const currentMacro = useMemo(
        () =>
            macroId
                ? macros.find((macro) => macro.macroId === macroId)
                : undefined,
        [macros, macroId]
    );
    const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
        useState(false);
    const [isErrorSnackbarVisible, setIsErrorSnackbarVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [macroContent, setMacroContent] = useState(
        currentMacro?.content ?? ''
    );
    const [macroName, setMacroName] = useState(currentMacro?.name ?? '');

    if (!currentMacro) {
        return null;
    }

    const showErrorSnackbar = (message: string) => {
        setIsErrorSnackbarVisible(true);
        setErrorMessage(message);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            updateMacroById({
                macroId: currentMacro.macroId,
                name: macroName,
                content: macroContent,
            });
            navigate(backLink);
        } catch (error) {
            if (error instanceof Error) {
                showErrorSnackbar(error.message);
            }
        }
    };

    const handleConfirmDeleteClick = () => {
        setIsConfirmDeleteDialogOpen(false);
        deleteMacro(currentMacro.macroId);
        navigate('/', { replace: true });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    sx={{
                        paddingBlockEnd: '1rem',
                    }}
                    fullWidth={true}
                    value={macroName}
                    onChange={(e) => setMacroName(e.target.value)}
                    label="Name"
                />
                <TextField
                    sx={{
                        paddingBlockEnd: '1rem',
                    }}
                    multiline={true}
                    fullWidth={true}
                    value={macroContent}
                    onChange={(e) => setMacroContent(e.target.value)}
                    minRows={5}
                    maxRows={15}
                    label="Content"
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="contained" type="submit">
                        Save Changes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setIsConfirmDeleteDialogOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </form>
            <Dialog
                open={isConfirmDeleteDialogOpen}
                onClose={() => setIsConfirmDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the current macro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsConfirmDeleteDialogOpen(false)}
                        autoFocus
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteClick}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={isErrorSnackbarVisible}
                autoHideDuration={5000}
                onClose={() => setIsErrorSnackbarVisible(false)}
            >
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
        </div>
    );
};

export default EditMacro;
