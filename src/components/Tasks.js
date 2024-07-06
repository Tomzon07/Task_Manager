import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../redux/tasksSlice';
import TaskModal from './UI/Modal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import './Tasks.css';

const Tasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAdd = useCallback(() => {
    setCurrentTask(null);
    setShowModal(true);
  }, []);

  const handleEdit = useCallback(task => {
    setCurrentTask(task);
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(id => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully")
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setCurrentTask(null);
  }, []);

  return (
    <div className='main-body'>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAdd} 
        style={{ marginBottom: '16px',float:"right" }}
      >
        + Add Task
      </Button>
      <TableContainer component={Paper}
       sx={{ maxHeight: "75vh", overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.description}</TableCell> 
                <TableCell>{task.project}</TableCell> 
                <TableCell>{task.progress}%</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEdit(task)}
                    aria-label="edit"
                    sx={{ '&:hover': { backgroundColor: 'rgba(25, 76, 141, 0.1)' }, marginRight: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(task.id)}
                    aria-label="delete"
                    sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TaskModal 
        showModal={showModal} 
        closeModal={closeModal} 
        currentTask={currentTask} 
        addTask={(task) => dispatch(addTask(task))}
        updateTask={(task) => dispatch(updateTask(task))}
      />
    </div>
  );
};

export default Tasks;
