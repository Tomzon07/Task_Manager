import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: '#f8f9fa',  
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 2,
  p: 4,
};

const TaskModal = ({ showModal, closeModal, currentTask, addTask, updateTask }) => {
  const { register, handleSubmit, setValue, formState: { errors },clearErrors } = useForm();

  useEffect(() => {
    if (currentTask) {
      Object.entries(currentTask).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      setValue('description', '');
      setValue('project', '');
      setValue('progress', '');
      setValue('status', '');
    }
  }, [currentTask, setValue]);

  const onSubmit = data => {
    const status = data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase();
    const taskData = {
      id: currentTask ? currentTask.id : undefined,
      description: data.description,
      project: data.project,
      progress: data.progress,
      status: status,
    };

    if (currentTask) {
      updateTask(taskData);
      toast.success("Task updated successfully");
    } else {
      addTask(taskData);
      toast.success("Task added successfully");
    }
    closeModal();
  };

  return (
    <Modal
      open={showModal}
      onClose={()=>{
        closeModal();
        clearErrors()
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6">
          {currentTask ? "Edit Task" : "Add New Task"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Task Description"
                multiline
                rows={3}
                {...register('description', { required: "Task description is required." })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Project Name"
                {...register('project', { required: "Project name is required." })}
                error={!!errors.project}
                helperText={errors.project?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Progress (%)"
                {...register('progress', { required: "Progress is required.", min: 0, max: 100 })}
                error={!!errors.progress}
                helperText={errors.progress?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Status"
                {...register('status', { required: "Status is required." })}
                error={!!errors.status}
                helperText={errors.status?.message}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button onClick={closeModal} variant="contained" sx={{ bgcolor: '#c0c0c0', mr: 2, color: "black" }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#1976d2' }}>
                {currentTask ? "Update Task" : "+ Add New Task"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;
