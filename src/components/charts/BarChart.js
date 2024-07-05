import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChartComponent = () => {
  const tasks = useSelector((state) => state.tasks.tasks); // Fetch data from Redux store

  console.log('Tasks:', tasks);  // Debugging line to check tasks data

  const projectLabels = [...new Set(tasks.map(task => task.project))];

  const taskStatusCounts = projectLabels.map(project => ({
    todo: tasks.filter(task => task.project === project && task.status === 'Todo').length,
    halted: tasks.filter(task => task.project === project && task.status === 'Halted').length,
    completed: tasks.filter(task => task.project === project && task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.project === project && task.status === 'In Progress').length,
  }));

  console.log('Project Labels:', projectLabels);
  console.log('Task Status Counts:', taskStatusCounts);

  const chartData = {
    labels: projectLabels,
    datasets: [
      {
        label: 'Todo',
        data: taskStatusCounts.map(task => task.todo),
        backgroundColor: 'purple',
      },
      {
        label: 'Halted',
        data: taskStatusCounts.map(task => task.halted),
        backgroundColor: 'red',
      },
      {
        label: 'Completed',
        data: taskStatusCounts.map(task => task.completed),
        backgroundColor: 'green',
      },
      {
        label: 'In Progress',
        data: taskStatusCounts.map(task => task.inProgress),
        backgroundColor: 'orange',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;
