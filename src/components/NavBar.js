import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./NavBar.css";
import { ReactComponent as DashIcon } from '../assets/dashboard.svg';
import { ReactComponent as TaskIcon } from '../assets/tasks-svgrepo-com.svg';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const getActiveItem = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div>
      <header></header>
      <div style={{ display: 'flex' }}>
        <div className="sidebar-header"></div>
        <div className="sidebar">
          <div 
            className={`sidebar-item ${getActiveItem('/')}`} 
            onClick={() => handleItemClick('/')}
          >
            <DashIcon width="24" height="24" fill="white" />
            <span>Dashboard</span>
          </div>
          <div 
            className={`sidebar-item ${getActiveItem('/tasks')}`} 
            onClick={() => handleItemClick('/tasks')}
          >
            <TaskIcon width="24" height="24" fill="white" />
            <span>Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;


