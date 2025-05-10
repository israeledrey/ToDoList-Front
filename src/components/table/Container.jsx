import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";

import Header from '../table/Header';
import BodyRows from '../table/BodyRows';
import EditTask from '../taskAction/EditTask';
import DeleteTask from '../taskAction/DeleteTask';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';



const useStyles = makeStyles({
  headCell: {
    backgroundColor: "#A0A0A0",
    color: "#fff",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  bodyCell: {
    fontSize: 14,
  },
  oddRow: {
    backgroundColor: "#f5f5f5",
  },
})

const Container = ({ tasks, setShowDialog, setSelectedTask }) => {
  const classes = useStyles();
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => [
    { header: "Task Name ", accessorKey: "name" },
    { header: "Task Subject", accessorKey: "subject" },
    { header: "Day To Complete", accessorKey: "dayToComplete" },
    { header: "Priority", accessorKey: "priority" },
    { header: "Completed", accessorKey: "completed" },
    {
      header: "Edit",
      id: "edit",
      cell: ({ row }) => (
        <EditTask task={row.original} setSelectedTask={setSelectedTask} setShowDialog={setShowDialog} />
      )
    },
    {
      header: "Delete",
      id: "delete",
      cell: ({ row }) => (
        <DeleteTask task={row.original} />
      )
    }
  ], [setSelectedTask, setShowDialog]);



  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <TableContainer component={Paper} className={classes.tableContainer} sx={{ mt: '90px' }}>
      <Table>
        <Header table={table} classes={classes} />
        <BodyRows table={table} classes={classes} />
      </Table>
    </TableContainer>
  );
};

export default Container;