import { useState, useEffect } from 'react';
import { useTasksContext } from "../providers/TasksContext"

import { makeStyles } from '@mui/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const useStyles = makeStyles(() => ({
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
        },
        marginRight: '16px',
        marginLeft: '0px',
        width: '100%',
        '@media (min-width:600px)': {
            marginLeft: '24px',
            width: 'auto',
        },
    },
    searchIconWrapper: {
        padding: '0 16px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBase: {
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: '8px 8px 8px 0',
            paddingLeft: 'calc(1em + 32px)',
            transition: 'width 0.3s ease-in-out',
            width: '100%',
            '@media (min-width:900px)': {
                width: '20ch',
            },
        },
    },
}));

const SearchTask = ({ setFilteredTasks }) => {

    const classes = useStyles();
    const { tasksList } = useTasksContext();
    const [searchInput, setSearchInput] = useState("");

    const InputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchTask = (searchInput) => {
        if (!searchInput) {
            setFilteredTasks(tasksList)
            return;
        }

        const filtered = tasksList.filter(task =>
            task.taskName.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    useEffect(() => {
        handleSearchTask(searchInput);
    }, [searchInput, tasksList]);



    return (
        <div className={classes.search}>
            <div className={classes.searchIconWrapper}>
                <SearchIcon />
            </div>
            <InputBase
                onChange={InputChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                classes={{ root: classes.inputBase }}
            />
        </div>
    );
}

export default SearchTask