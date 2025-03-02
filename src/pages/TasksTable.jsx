import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useTasksContext } from "../providers/TasksContext";
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
  headCell: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
  },
  bodyCell: {
    fontSize: 14,
  },
  oddRow: {
    backgroundColor: "#f5f5f5",
  },
});

export default function TasksTable() {
  const classes = useStyles();
  const { tasksList } = useTasksContext();

  const data = useMemo(() => tasksList, [tasksList]);
  const columns = useMemo(() => [
    { header: "Task Subject", accessorKey: "taskSobject" },
    { header: "Task Content", accessorKey: "taskContent" },
    { header: "Day To Complete", accessorKey: "dayToComplete" },
    { header: "Priority", accessorKey: "priority" },
    { header: "Completed", accessorKey: "completed" }
  ], []);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  if (!tasksList || tasksList.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id} className={classes.headCell}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow key={row.id} className={index % 2 === 0 ? classes.oddRow : ""}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className={classes.bodyCell}>
                  {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}