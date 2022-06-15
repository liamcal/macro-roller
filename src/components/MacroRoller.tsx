import React, { useCallback, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
} from '@mui/material';
import { QueryLookup } from '../types';
import { useMacros } from '../hooks';
import { extractQueries, parseMacro } from '../utils/macroUtils';

const MacroEditer = () => {
    const { macros, upsertMacro } = useMacros('macro-roller-macrolist');
    // Just for now
    const macro = macros.length > 0 ? macros[0] : undefined;
    const [parsedMacro, setParsedMacro] = useState('');
    const [isConfirmClearDialogOpen, setIsConfirmClearDialogOpen] =
        useState(false);

    const getQueryValue = useCallback(
        (queryId: string) => {
            if (macro) {
                const query = macro.queries[queryId];
                return query?.value;
            }
        },
        [macro]
    );

    const mergeQueries = useCallback(
        (newQueries: QueryLookup) => {
            const mergedQueries = Object.fromEntries(
                Object.keys(newQueries).map((queryId: string) => {
                    const newQuery = newQueries[queryId];
                    return [
                        queryId,
                        { ...newQuery, value: getQueryValue(queryId) },
                    ];
                })
            ) as QueryLookup;

            return mergedQueries;
        },
        [getQueryValue]
    );

    const updateQueryValue = (queryId: string, value: string) => {
        if (macro) {
            upsertMacro({
                ...macro,
                queries: {
                    ...macro.queries,
                    [queryId]: { ...macro.queries[queryId], value },
                },
            });
        }
    };

    const getQueryDefaultValue = (queryId: string) => {
        if (macro) {
            const query = macro.queries[queryId];
            return query?.defaultValue;
        }
        return '';
    };

    const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newQueries = extractQueries(event.target.value);
        upsertMacro({
            macroId: 'default',
            name: 'default',
            content: event.target.value,
            queries: macro ? mergeQueries(newQueries) : newQueries,
        });
    };

    const handleRunButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (macro) {
            setParsedMacro(parseMacro(macro));
        }
    };

    const handleClearButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setIsConfirmClearDialogOpen(true);
    };

    const clearMacro = () => {
        setParsedMacro('');
        if (macro) {
            upsertMacro({ ...macro, content: '', queries: {} });
        }
    };

    return (
        <div>
            <div style={{ paddingBottom: '1.5rem' }}>
                <TextField
                    multiline={true}
                    fullWidth={true}
                    value={macro?.content ?? ''}
                    onChange={handleTextAreaChange}
                    rows={5}
                />
            </div>

            <div
                style={{
                    display: 'grid',
                    columnGap: '1rem',
                    rowGap: '0.75rem',
                    gridTemplateColumns: '1fr 1fr',
                    paddingBottom: '1rem',
                }}
            >
                {macro &&
                    Object.keys(macro.queries).map((queryId) => (
                        <React.Fragment key={`query-textfield-${queryId}`}>
                            {macro.queries[queryId] && (
                                <TextField
                                    key={queryId}
                                    label={queryId}
                                    value={getQueryValue(queryId) ?? ''}
                                    onChange={(e) =>
                                        updateQueryValue(
                                            queryId,
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    helperText={
                                        getQueryDefaultValue(queryId)
                                            ? `Default: ${getQueryDefaultValue(
                                                  queryId
                                              )}`
                                            : ' '
                                    }
                                />
                            )}
                        </React.Fragment>
                    ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
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
                                clearMacro();
                                setIsConfirmClearDialogOpen(false);
                            }}
                            autoFocus
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {parsedMacro && (
                <p
                    style={{
                        whiteSpace: 'pre-line',
                        textAlign: 'start',
                        fontSize: '1.25rem',
                    }}
                >
                    {parsedMacro}
                </p>
            )}
        </div>
    );
};

export default MacroEditer;
