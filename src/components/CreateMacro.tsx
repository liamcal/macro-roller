import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
} from '@mui/material';
import { useMacros } from '../hooks';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';
import { useNavigate } from 'react-router-dom';

const CreateMacro = () => {
    const { createMacro } = useMacros(MACROS_LOCAL_STORAGE_KEY);
    const [macroName, setMacroName] = useState('');
    const [macroContent, setMacroContent] = useState('');
    const [isConfirmClearDialogOpen, setIsConfirmClearDialogOpen] =
        useState(false);
    const navigate = useNavigate();

    const handleMacroNameChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacroName(event.target.value);
    };

    const handleMacroContentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacroContent(event.target.value);
    };

    const handleClearButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setMacroContent('');
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createMacro(macroName, macroContent);
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div
                    style={{
                        display: 'grid',
                        rowGap: '1rem',
                        gridTemplateColumns: '1fr',
                        paddingBottom: '1.5rem',
                    }}
                >
                    <TextField
                        label="Name"
                        fullWidth={true}
                        value={macroName}
                        onChange={handleMacroNameChange}
                    />
                    <TextField
                        label="Content"
                        multiline={true}
                        fullWidth={true}
                        value={macroContent}
                        onChange={handleMacroContentChange}
                        minRows={5}
                        maxRows={15}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button variant="contained" type="submit">
                        Create Macro
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClearButtonClick}
                    >
                        Clear
                    </Button>
                </div>
            </form>
            <Dialog
                open={isConfirmClearDialogOpen}
                onClose={() => setIsConfirmClearDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to clear the current macro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmClearDialogOpen(false)}>
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            setMacroContent('');
                            setIsConfirmClearDialogOpen(false);
                        }}
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateMacro;
