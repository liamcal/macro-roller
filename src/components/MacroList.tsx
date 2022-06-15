import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';

const MacroList = () => {
    return (
        <List
            sx={{
                width: '100%',
                maxHeight: 480,
                bgcolor: 'background.paper',
                overflow: 'auto',
            }}
        >
            {[...Array(100).keys()].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <IconButton edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        }
                        disablePadding={true}
                        divider={true}
                    >
                        <ListItemButton
                            role="button"
                            component={RouterLink}
                            to={`/${value}`}
                        >
                            <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default MacroList;
