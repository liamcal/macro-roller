import { useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';
import { useMacros } from '../hooks';
import { parseMacro } from '../utils/macroUtils';
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
    const [parsedMacro, setParsedMacro] = useState('');

    if (!currentMacro) {
        return null;
    }

    const handleRunButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro(parseMacro(currentMacro));
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
                        <h2 style={{ margin: 0 }}>{currentMacro.name}</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            align="left"
                            sx={{
                                fontSize: '1rem',
                                whiteSpace: 'pre-line',
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
            <div>
                <Button variant="contained" onClick={handleRunButtonClick}>
                    Run Macro
                </Button>
                <Button
                    component={RouterLink}
                    to={`/macro/${macroId}/edit`}
                    variant="outlined"
                >
                    Edit
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
    ) : null;
};

export default ViewMacro;
