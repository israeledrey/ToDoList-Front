import { useMemo } from 'react';

import { TableHead, TableRow, TableCell } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



const Header = ({ table, classes }) => {

  const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);

  
  const renderHeaderRows = (headerGroups, classes) =>
    headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell
            key={header.id}
            className={classes.headCell}
            onClick={header.column.getToggleSortingHandler()}
          >
            {!header.isPlaceholder && (
              <div>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {getSortingIcon(header.column.getIsSorted())}
              </div>
            )}
          </TableCell>
        ))}
      </TableRow>
    ));


  const getSortingIcon = (sorting) => {
    if (sorting === "asc") return <KeyboardArrowUpIcon />;
    if (sorting === "desc") return <KeyboardArrowDownIcon />;
    return null;
  };



  return (
    <TableHead>
      {renderHeaderRows(headerGroups, classes)}
    </TableHead>
  )
};


export default Header;
