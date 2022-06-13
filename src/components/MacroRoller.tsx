import React, { useCallback, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useLocalStorage } from '../hooks';
import { extractQueries, parseMacro, QueryLookup } from '../utils/macroUtils';

const MacroEditer = () => {
    const [macro, setMacro] = useLocalStorage('macro-roller-macro', '');
    const [parsedMacro, setParsedMacro] = useState('');
    const [queries, setQueries] = useLocalStorage(
        'macro-roller-queries',
        extractQueries(macro)
    );

    const getQueryValue = useCallback(
        (queryId: string) => {
            const query = queries[queryId];
            return query?.value;
        },
        [queries]
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

            // const mergedQueries = newQueries.reduce<QueryLookup>(
            //     (obj: QueryLookup, query: MacroQuery) => ({
            //         ...obj,
            //         [query.queryId]: {
            //             ...query,
            //             value: getQueryValue(query.queryId),
            //         },
            //     }),
            //     {}
            // );
            setQueries(mergedQueries);
        },
        [getQueryValue, setQueries]
    );

    const updateQueryValue = (queryId: string, value: string) => {
        setQueries((currentQueries) => ({
            ...currentQueries,
            [queryId]: { ...queries[queryId], value },
        }));
    };

    const getQueryDefaultValue = (queryId: string) => {
        const query = queries[queryId];
        return query?.defaultValue;
    };

    const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacro(event.target.value);
    };

    const handleRunButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro(parseMacro(macro, queries));
    };

    const handleClearButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro('');
        setMacro('');
    };

    useEffect(() => {
        const newQueries = extractQueries(macro);
        mergeQueries(newQueries);
    }, [macro, mergeQueries]);

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

            <div
                style={{
                    display: 'grid',
                    columnGap: '1rem',
                    rowGap: '0.5rem',
                    gridTemplateColumns: '1fr 1fr',
                    paddingBottom: '1.5rem',
                }}
            >
                {Object.keys(queries).map((queryId) => {
                    const queryValue = queries[queryId];
                    return (
                        <React.Fragment>
                            {queryValue && (
                                <TextField
                                    key={queryValue.queryId}
                                    label={queryValue.queryId}
                                    value={
                                        getQueryValue(queryValue.queryId) ?? ''
                                    }
                                    onChange={(e) =>
                                        updateQueryValue(
                                            queryValue.queryId,
                                            e.target.value
                                        )
                                    }
                                    type="number"
                                    helperText={
                                        getQueryDefaultValue(queryValue.queryId)
                                            ? `Default: ${getQueryDefaultValue(
                                                  queryValue.queryId
                                              )}`
                                            : ' '
                                    }
                                />
                            )}
                        </React.Fragment>
                    );
                })}
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
                <p style={{ whiteSpace: 'pre-line' }}>{parsedMacro}</p>
            )}
        </div>
    );
};

export default MacroEditer;
