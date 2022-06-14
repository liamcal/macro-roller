import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { QueryLookup } from '../types';
import { useMacros } from '../hooks';
import { extractQueries, parseMacro } from '../utils/macroUtils';

const MacroEditer = () => {
    const { macros, upsertMacro } = useMacros('macro-roller-macrolist');
    // Just for now
    const macro = macros.length > 0 ? macros[0] : undefined;
    const [parsedMacro, setParsedMacro] = useState('');

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
        setParsedMacro('');
        if (macro) {
            upsertMacro({ ...macro, content: '' });
        }
    };

    return (
        <div className="App" style={{ margin: '1rem' }}>
            <h1>Macro Roller</h1>
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
                    rowGap: '0.5rem',
                    gridTemplateColumns: '1fr 1fr',
                    paddingBottom: '1.5rem',
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
                    paddingBottom: '1.5rem',
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
