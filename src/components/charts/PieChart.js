import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = () => {
  const tasks = useSelector((state) => state.tasks.tasks); 

  const taskCounts = {
    todo: tasks.filter(task => task.status === 'Todo').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    halted: tasks.filter(task => task.status === 'Halted').length,
  };

  console.log('Task Counts for Pie Chart:', taskCounts);  

  const chartData = {
    labels: ['Todo', 'In Progress', 'Completed', 'Halted'],
    datasets: [
      {
        data: [taskCounts.todo, taskCounts.inProgress, taskCounts.completed, taskCounts.halted],
        backgroundColor: ['purple', 'orange', 'green', 'red'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;

