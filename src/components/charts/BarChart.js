import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChartComponent = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const projectLabels = [...new Set(tasks.map(task => task.project))];

  const taskStatusCounts = projectLabels.map(project => ({
    todo: tasks.filter(task => task.project === project && task.status === 'Todo').length,
    halted: tasks.filter(task => task.project === project && task.status === 'Halted').length,
    completed: tasks.filter(task => task.project === project && task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.project === project && task.status === 'In Progress').length,
  }));

  const chartData = {
    labels: projectLabels,
    datasets: [
      {
        label: 'Todo',
        data: taskStatusCounts.map(task => task.todo),
        backgroundColor: 'purple',
        stack: 'stack 0',
        barThickness: 30,
      },
      {
        label: 'Halted',
        data: taskStatusCounts.map(task => task.halted),
        backgroundColor: 'red',
        stack: 'stack 0',
        barThickness: 30,
      },
      {
        label: 'Completed',
        data: taskStatusCounts.map(task => task.completed),
        backgroundColor: 'green',
        stack: 'stack 0',
        barThickness: 30,
      },
      {
        label: 'In Progress',
        data: taskStatusCounts.map(task => task.inProgress),
        backgroundColor: 'orange',
        stack: 'stack 0',
        barThickness: 30,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Projects',
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Bugs',
          font: {
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;
