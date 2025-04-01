import { TableBody, TableRow, TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table";


const BodyRows = ({ table, classes }) => {

  const renderBodyRows = (rows, classes) => {
    return rows.map((row, index) => (
      <TableRow key={row.id} className={index % 2 === 0 ? classes.oddRow : ""}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className={classes.bodyCell}>
            {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {renderBodyRows(rows, classes)}
    </TableBody>
  )
};


export default BodyRows;