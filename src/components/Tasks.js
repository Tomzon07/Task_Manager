import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/tasksSlice';
import TaskModal from './UI/Modal';
import "./Tasks.css"


const Tasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAdd = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log("delete")
    dispatch(deleteTask(id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='main-body'>
      <button className='button' onClick={handleAdd}> + Add Task</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Project</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.project}</td>
              <td>{task.progress}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit(task.id)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TaskModal showModal={showModal} closeModal={closeModal} currentTask={currentTask} />
    </div>
  );
};

export default Tasks;
