import React from 'react';
import { TextField } from '@mui/material';
import { Macro, MacroQuery } from '../types';

interface MacroQueryValuesProps {
    macro: Macro;
    upsertMacroQuery: (
        macroId: string,
        queryId: string,
        query: MacroQuery
    ) => void;
}

const MacroQueryValues = ({
    macro,
    upsertMacroQuery,
}: MacroQueryValuesProps) => {
    const updateQueryValue = (queryId: string, value: string) => {
        const currentQuery = macro.queries[queryId];
        upsertMacroQuery(macro.macroId, queryId, { ...currentQuery, value });
    };

    return (
        <div
            style={{
                display: 'grid',
                columnGap: '1rem',
                rowGap: '0.75rem',
                gridTemplateColumns: '1fr 1fr',
                paddingBottom: '1rem',
            }}
        >
            {Object.keys(macro.queries).map((queryId: string) => {
                const { value, defaultValue } = macro.queries[queryId];
                return (
                    <React.Fragment key={`query-textfield-${queryId}`}>
                        {macro.queries[queryId] && (
                            <TextField
                                key={queryId}
                                label={queryId}
                                value={value ?? ''}
                                onChange={(e) =>
                                    updateQueryValue(queryId, e.target.value)
                                }
                                type="number"
                                helperText={
                                    defaultValue
                                        ? `Default: ${defaultValue}`
                                        : ' '
                                }
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default MacroQueryValues;
