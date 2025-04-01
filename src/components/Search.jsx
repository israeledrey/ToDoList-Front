import { useAtom } from 'jotai';
import { searchInputAtom } from '../atoms/tasksAtoms';

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

const Search = () => {

    const classes = useStyles();
    const [searchInput, setSearchInput] = useAtom(searchInputAtom);

    const onChange = (event) => {
        setSearchInput(event.target.value);
    };

      

    return (
        <div className={classes.search}>
            <div className={classes.searchIconWrapper}>
                <SearchIcon />
            </div>
            <InputBase
                value={searchInput}
                onChange={onChange}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                classes={{ root: classes.inputBase }}
            />
        </div>
    );
}

export default Search