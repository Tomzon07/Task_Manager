import React, { useState } from 'react';
import "./NavBar.css";
import Dashboard from './Dashboard';
import { ReactComponent as DashIcon } from '../assets/dashboard.svg';
import { ReactComponent as TaskIcon } from '../assets/tasks-svgrepo-com.svg';
import TaskTable from './Tasks';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <header></header>
      <div style={{ display: 'flex' }}>
      <div className="sidebar-header"></div>
        <div className="sidebar">
          
          <div 
            className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`} 
            onClick={() => handleItemClick('dashboard')}
          >
            <DashIcon width="24" height="24" fill="white" /> &nbsp;&nbsp;
            <span>Dashboard</span>
          </div>
          <div 
            className={`sidebar-item ${activeItem === 'task' ? 'active' : ''}`} 
            onClick={() => handleItemClick('task')}
          >
            <TaskIcon width="24" height="24" fill="white" />
            <span>Tasks</span>
          </div>
        </div>
        <div className="content">
          {activeItem === 'dashboard' && <Dashboard />}
          {activeItem === 'task' && <TaskTable />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
