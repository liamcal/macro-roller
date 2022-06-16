import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
    const { macroId } = useParams();
    const { macros, updateMacroContent, deleteMacro } = useMacros(
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
    const [isSavedSnackbarVisible, setIsSavedSnackbarVisible] = useState(false);
    const [macroContent, setMacroContent] = useState(
        currentMacro?.content ?? ''
    );

    if (!currentMacro) {
        return null;
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateMacroContent(currentMacro.macroId, macroContent);
        navigate(-1);
        // setIsSavedSnackbarVisible(true);
    };

    const handleConfirmDeleteClick = () => {
        setIsConfirmDeleteDialogOpen(false);
        deleteMacro(currentMacro.macroId);
        navigate('/', { replace: true });
    };

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSavedSnackbarVisible(false);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingBlockEnd: '1rem',
                }}
            >
                <h2 style={{ margin: 0 }}>Editing: {currentMacro.name}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div style={{ paddingBlockEnd: '1rem' }}>
                    <TextField
                        multiline={true}
                        fullWidth={true}
                        value={macroContent}
                        onChange={(e) => setMacroContent(e.target.value)}
                        minRows={5}
                        maxRows={15}
                    />
                </div>
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
                open={isSavedSnackbarVisible}
                autoHideDuration={2500}
                onClose={handleSnackbarClose}
                message="Macro updated"
            />
        </div>
    );
};

export default EditMacro;
