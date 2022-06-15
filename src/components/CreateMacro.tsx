import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
} from '@mui/material';

const CreateMacro = () => {
    const [macroText, setMacroText] = useState('');
    const [isConfirmClearDialogOpen, setIsConfirmClearDialogOpen] =
        useState(false);

    const handleMacroTextFieldChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacroText(event.target.value);
    };

    const handleCreateButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setMacroText('');
    };

    const handleClearButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setMacroText('');
    };

    return (
        <div>
            <div style={{ paddingBottom: '1.5rem' }}>
                <TextField
                    multiline={true}
                    fullWidth={true}
                    value={macroText}
                    onChange={handleMacroTextFieldChange}
                    rows={5}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreateButtonClick}
                >
                    Create Macro
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearButtonClick}
                >
                    Clear
                </Button>
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
                        <Button
                            onClick={() => setIsConfirmClearDialogOpen(false)}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setMacroText('');
                                setIsConfirmClearDialogOpen(false);
                            }}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default CreateMacro;
