import React from 'react';
import { useSelector } from 'react-redux';
import './DashBoard.css';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';

const Card = ({ header, count }) => (
  <div className="card">
    <div className="card-header">{header}</div>
    <div className="card-content">
      <h1>{count}</h1>
      <p>Tasks</p>
    </div>
  </div>
);

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const taskCounts = {
    Todo: tasks.filter(task => task.status === 'Todo').length,
    InProgress: tasks.filter(task => task.status === 'In Progress').length,
    Completed: tasks.filter(task => task.status === 'Completed').length,
    Halted: tasks.filter(task => task.status === 'Halted').length,
  };

  return (
    <div className="main-dashboard">
      <div className="card-section">
        {Object.entries(taskCounts).map(([status, count], index) => (
          <Card key={index} header={status.replace(/([A-Z])/g, ' $1')} count={count} />
        ))}
      </div>
      <div className="chart-section">
        <div className="chart">
          <h4 className='pie-chartTH'>Project Wise Bug Status</h4>
          <BarChart data={tasks} />
        </div>
        <div className="Pie-chart">
          <h4>Total Bug Status %</h4>
          <PieChart data={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
