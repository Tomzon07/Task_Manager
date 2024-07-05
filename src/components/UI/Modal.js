import React from 'react';
import { useForm } from 'react-hook-form';
import './Modal.css';

const TaskModal = ({ showModal, closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    closeModal();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Task Description</label>
          <input
            type="text"
            placeholder="Enter task description..."
            {...register('taskDescription', { required: true })}
          />
          {errors.taskDescription && <p className="error">Task description is required.</p>}

          <label>Project Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            {...register('projectName', { required: true })}
          />
          {errors.projectName && <p className="error">Project name is required.</p>}

          <label>Progress (%)</label>
          <input
            type="number"
            placeholder="Update Progress"
            {...register('progress', { required: true, min: 0, max: 100 })}
          />
          {errors.progress && <p className="error">Progress must be between 0 and 100.</p>}

          <label>Status</label>
          <input
            type="text"
            placeholder="Update Project Status"
            {...register('status', { required: true })}
          />
          {errors.status && <p className="error">Status is required.</p>}

          <div className="modal-buttons">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit">+ Add New Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
