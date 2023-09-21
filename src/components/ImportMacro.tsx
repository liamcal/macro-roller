import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, TextField } from '@mui/material';

interface MacroImport {
    id: string;
    name: string;
    macro: string;
}

const ImportMacro = () => {
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

    useEffect(() => {
        loadMacros();
    }, []);

    return (
        <div
            style={{
                marginTop: '10rem',
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column',
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
                    <TextField {...params} label="Macro" />
                )}
                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    );
                }}
            />
            <div>
                {selectedMacro && (
                    <TextField
                        value={selectedMacro.macro}
                        disabled={true}
                        multiline={true}
                        fullWidth={true}
                    />
                )}
            </div>
        </div>
    );
};

export { ImportMacro };
