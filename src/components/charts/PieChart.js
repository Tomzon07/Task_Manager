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

  const chartData = {
    labels: ['Todo', 'In Progress', 'Completed', 'Halted'],
    datasets: [
      {
        data: [taskCounts.todo, taskCounts.inProgress, taskCounts.completed, taskCounts.halted],
        backgroundColor: ['purple', 'orange', 'green', 'red'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: false,
  };

  const styles = {
    height: '350px', 
    width: '350px', 
  };

  return <div style={styles}><Pie data={chartData} options={options} /></div>;
};

export default PieChart;
