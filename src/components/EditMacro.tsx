import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';
import { useMacros } from '../hooks';

const EditMacro = () => {
    const { macroId } = useParams();
    const { macros } = useMacros(MACROS_LOCAL_STORAGE_KEY);
    const currentMacro = useMemo(
        () =>
            macroId
                ? macros.find((macro) => macro.macroId === macroId)
                : undefined,
        [macros, macroId]
    );
    const [macroContent, setMacroContent] = useState(
        currentMacro?.content ?? ''
    );

    if (!currentMacro) {
        return null;
    }
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h2 style={{ display: 'inline' }}>Edit: {currentMacro.name}</h2>
                <Button
                    sx={{ height: '100%' }}
                    variant="outlined"
                    color="error"
                >
                    Delete
                </Button>
            </div>
            <TextField
                multiline={true}
                fullWidth={true}
                value={macroContent}
                onChange={(e) => setMacroContent(e.target.value)}
                rows={5}
            />
            <div>
                <Button variant="contained" color="success">
                    Save
                </Button>
                <Button
                    component={RouterLink}
                    to={`/macro/${macroId}`}
                    variant="outlined"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default EditMacro;
