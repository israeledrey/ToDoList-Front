import { useMemo, useState } from 'react';
import { useTasksContext } from "../providers/TasksContext";

import NavBar from '../components/NavBar';
import TaskDealog from '../components/TaskDealog';
import AddTask from '../components/taskAction/AddTask';
import EditTask from '../components/taskAction/EditTask';

import { makeStyles } from '@mui/styles';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




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
});

const TasksTable = () => {
  const classes = useStyles();
  const { tasksList, filteredTasks, setFilteredTasks } = useTasksContext();


  const data = useMemo(() => filteredTasks, [filteredTasks]);
  const columns = useMemo(() => [
    { header: "Task Name ", accessorKey: "taskName" },
    { header: "Task Subject", accessorKey: "taskSobject" },
    { header: "Day To Complete", accessorKey: "dayToComplete" },
    { header: "Priority", accessorKey: "priority" },
    { header: "Completed", accessorKey: "completed" },
    {
      header: "Edit",
      id: "edit",
      cell: ({ row }) => (
        <EditTask
          task={row.original}
          setSelectedTask={setSelectedTask}
          setShowPopup={setShowPopup}
        />
      )
    },
  ], []);

  const [sorting, setSortng] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSortng,
  });

  if (!tasksList || tasksList.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <>   
      <NavBar setFilteredTasks={setFilteredTasks} />
      <TableContainer component={Paper} className={classes.tableContainer} sx={{ mt: '90px' }}>
        <Table>

          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    className={classes.headCell}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{ sec: <KeyboardArrowDownIcon />, desc: <KeyboardArrowUpIcon /> }[header.column.getIsSorted() ?? null]}
                      </div>
                    )}
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

      <AddTask setShowPopup={setShowPopup} />

      {showPopup && <TaskDealog showAddtPopUp={showPopup} task={selectedTask} onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default TasksTable