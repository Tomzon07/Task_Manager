import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, description: 'abc project', project: 'Project 1', progress: '10', status: 'In Progress' },
    { id: 2, description: 'task manager', project: 'Project 1', progress: '20', status: 'Completed' },
    { id: 3, description: 'chart task', project: 'Project 1', progress: '50', status: 'Halted' },
    { id: 5, description: 'redux task', project: 'Project 2', progress: '20', status: 'Todo' },
    { id: 6, description: 'ui task', project: 'Project 3', progress: '60', status: 'Todo' },
    { id: 7, description: 'ui-ux task', project: 'Project 4', progress: '60', status: 'Halted' },
    { id: 8, description: 'ux task', project: 'Project 3', progress: '60', status: 'Completed' },


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
