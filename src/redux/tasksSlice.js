import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, description: 'Task Description', project: 'Project 1', progress: 'Progress', status: 'In Progress' },
    { id: 2, description: 'Task Description', project: 'Project 2', progress: 'Progress', status: 'Completed' },
    { id: 3, description: 'Task Description', project: 'Project 3', progress: 'Progress', status: 'Halted' },
    { id: 4, description: 'Task Description', project: 'Project 4', progress: 'Progress', status: 'Todo' },
    { id: 5, description: 'Task Description', project: 'Project 5', progress: 'Progress', status: 'Todo' },
    { id: 6, description: 'Task Description', project: 'Project 6', progress: 'Progress', status: 'Todo' },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, id: state.tasks.length + 1 });
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
