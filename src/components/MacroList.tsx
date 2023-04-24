import { lazyWithPreload } from 'react-lazy-with-preload';
import {
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import { useMacros } from '../hooks';
import { Macro } from '../types';
import { MACROS_LOCAL_STORAGE_KEY } from '../constants';

const EditMacro = lazyWithPreload(() => import('./EditMacro'));
const ViewMacro = lazyWithPreload(() => import('./ViewMacro'));

const MacroList = () => {
    const { macros } = useMacros(MACROS_LOCAL_STORAGE_KEY);

    return macros.length > 0 ? (
        <List
            sx={{
                width: '100%',
                maxHeight: 480,
                bgcolor: 'background.paper',
                overflow: 'auto',
            }}
        >
            {macros.map((macro: Macro) => {
                const labelId = `checkbox-list-label-${macro.macroId}`;

                return (
                    <ListItem
                        key={macro.macroId}
                        secondaryAction={
                            <IconButton
                                component={RouterLink}
                                to={`macro/${macro.macroId}/edit`}
                                state={{ back: '/' }}
                                edge="end"
                                aria-label="edit"
                            >
                                <EditIcon />
                            </IconButton>
                        }
                        disablePadding={true}
                        divider={true}
                    >
                        <ListItemButton
                            role="button"
                            component={RouterLink}
                            to={`macro/${macro.macroId}`}
                            state={{ back: '/' }}
                        >
                            <ListItemText id={labelId} primary={macro.name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    ) : (
        <p>
            You don't have any macros yet, let's{' '}
            <Link
                component={RouterLink}
                to="macro/create"
                state={{ back: '/' }}
            >
                create one!
            </Link>
        </p>
    );
};

export default MacroList;
