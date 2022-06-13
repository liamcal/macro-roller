import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useLocalStorage } from '../hooks';
import { parseMacro } from '../utils/macroUtils';

const MacroEditer = () => {
    const [macro, setMacro] = useLocalStorage('macro-roller-macro', '');
    const [parsedMacro, setParsedMacro] = useState('');

    const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacro(event.target.value);
    };

    const handleRunButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro(parseMacro(macro));
    };

    const handleClearButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro('');
        setMacro('');
    };

    return (
        <div className="App" style={{ margin: '1rem' }}>
            <h1>Macro Roller</h1>
            <div style={{ paddingBottom: '1.5rem' }}>
                <TextField
                    multiline={true}
                    fullWidth={true}
                    value={macro}
                    onChange={handleTextAreaChange}
                    rows={5}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={handleRunButtonClick}>
                    Run Macro
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearButtonClick}
                >
                    Clear
                </Button>
            </div>
            {parsedMacro && (
                <p style={{ whiteSpace: 'pre-line' }}>{parsedMacro}</p>
            )}
        </div>
    );
};

export default MacroEditer;
