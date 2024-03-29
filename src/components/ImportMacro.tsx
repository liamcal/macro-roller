import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, Button, Paper, TextField } from '@mui/material';

export interface MacroImport {
    id: string;
    name: string;
    macro: string;
}

interface ImportMacroProps {
    onImport: (macroImport: MacroImport) => void;
}

const ImportMacro = ({ onImport }: ImportMacroProps) => {
    const [selectedMacro, setSelectedMacro] = useState<MacroImport | null>(
        null
    );
    const [macrosForImport, setMacrosForImport] = useState<MacroImport[]>([]);

    const loadMacros = async () => {
        const res = await fetch('/macro-roller/imports/pf2e.json');
        const data = (await res.json()) as Omit<MacroImport, 'id'>[];

        data.sort((a, b) => a.name.localeCompare(b.name));

        // TODO: Export these as part of the source data
        const taggedData = data.map((d) => ({ ...d, id: uuidv4() }));

        setMacrosForImport(taggedData);
    };

    const handleImportButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (selectedMacro) {
            onImport(selectedMacro);
        }
    };

    useEffect(() => {
        loadMacros();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                }}
            >
                <Autocomplete
                    id="macro-import-autocomplete"
                    sx={{ width: 300 }}
                    options={macrosForImport}
                    value={selectedMacro}
                    onChange={(event, newValue) => {
                        setSelectedMacro(newValue);
                    }}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label="PF2e Creature" />
                    )}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                />
                <Button
                    variant="outlined"
                    disabled={!selectedMacro}
                    onClick={handleImportButtonClick}
                >
                    Import
                </Button>
            </div>

            <div>
                {selectedMacro && (
                    <Paper
                        elevation={6}
                        sx={{
                            padding: '1rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            textAlign: 'start',
                            fontSize: '1.25rem',
                        }}
                    >
                        {selectedMacro.macro}
                    </Paper>
                )}
            </div>
        </div>
    );
};

export { ImportMacro };
