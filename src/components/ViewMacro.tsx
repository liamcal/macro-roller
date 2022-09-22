import React, { useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';
import { useMacros } from '../hooks';
import { compileMacro, renderCompiledMacro } from '../utils/parserUtils';
import MacroQueryValues from './MacroQueryValues';

const ViewMacro = () => {
    const { macroId } = useParams();
    const { macros, upsertMacroQuery } = useMacros(MACROS_LOCAL_STORAGE_KEY);
    const currentMacro = useMemo(
        () =>
            macroId
                ? macros.find((macro) => macro.macroId === macroId)
                : undefined,
        [macros, macroId]
    );

    const compiledMacro = useMemo(() => {
        if (currentMacro?.content) {
            if (currentMacro.compiledMacro?.length > 0) {
                return currentMacro.compiledMacro;
            }
            try {
                // The compiled macro should already exist...
                // But if it doesn't - compile it on the fly for now
                return compileMacro(currentMacro.content);
            } catch {
                return [];
            }
        }
        return [];
    }, [currentMacro]);

    const [parsedMacro, setParsedMacro] = useState<React.ReactNode | null>(
        null
    );

    if (!currentMacro) {
        return null;
    }

    const getCurrentQueryValues = () => {
        return Object.fromEntries(
            Object.keys(currentMacro.queries).map((queryId: string) => [
                queryId,
                parseInt(
                    currentMacro.queries[queryId].value ||
                        currentMacro.queries[queryId].defaultValue ||
                        '0'
                ),
            ])
        );
    };

    const populateMacroLog = (preserveLog: boolean) => {
        setParsedMacro((previousLog) => {
            const newLog = renderCompiledMacro(
                compiledMacro,
                getCurrentQueryValues()
            );

            return preserveLog ? (
                <React.Fragment>
                    {previousLog}
                    <br />
                    {newLog}
                </React.Fragment>
            ) : (
                <React.Fragment>{newLog}</React.Fragment>
            );
        });
    };

    return currentMacro ? (
        <div>
            <div style={{ paddingBottom: '1rem' }}>
                <Accordion disableGutters={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <IconButton
                                aria-label="edit"
                                component={RouterLink}
                                to={`edit`}
                                state={{ back: `/macro/${macroId}` }}
                                sx={{ alignSelf: 'top' }}
                            >
                                <EditIcon />
                            </IconButton>
                            <h2
                                style={{
                                    marginBlock: 0,
                                    marginInlineStart: '1rem',
                                }}
                            >
                                {currentMacro.name}
                            </h2>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            align="left"
                            sx={{
                                fontSize: '1rem',
                                whiteSpace: 'pre',
                                maxHeight: 120,
                                overflow: 'auto',
                            }}
                        >
                            {currentMacro.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <MacroQueryValues
                macro={currentMacro}
                upsertMacroQuery={upsertMacroQuery}
            />
            <div
                style={{
                    display: 'flex',
                    marginBlockEnd: '1rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => populateMacroLog(false)}
                >
                    Run Macro
                </Button>
                {parsedMacro && (
                    <Button
                        variant="outlined"
                        onClick={() => populateMacroLog(true)}
                    >
                        Re-run
                    </Button>
                )}
            </div>
            {parsedMacro && (
                <Paper
                    elevation={6}
                    sx={{
                        padding: '1rem',
                        whiteSpace: 'pre',
                        textAlign: 'start',
                        fontSize: '1.25rem',
                    }}
                >
                    {parsedMacro}
                </Paper>
            )}
        </div>
    ) : null;
};

export default ViewMacro;
