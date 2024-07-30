import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import './TaskManager.css';
import BackButton from './BackButton';  // Import BackButton

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      checkDueDates();
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const checkDueDates = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const currentTasks = response.data;
      currentTasks.forEach((task: any) => {
        if (new Date(task.dueDate) < new Date()) {
          handleDeleteTask(task._id);
        }
      });
    } catch (error) {
      toast.error('Failed to check due dates');
    }
  };

  const handleAddTask = async () => {
    if (!taskName.trim() || !dueDate) {
      toast.error('Task name and due date are required');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      if (editingTaskId) {
        // Editing existing task
        await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, { taskName, description, status, dueDate }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Task updated successfully');
        setEditingTaskId(null);
      } else {
        // Adding new task
        await axios.post('http://localhost:5000/api/tasks', { taskName, description, status, dueDate }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Task added successfully');
      }
      setTaskName('');
      setDescription('');
      setStatus('In Progress');
      setDueDate('');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTaskId(task._id);
    setTaskName(task.taskName);
    setDescription(task.description);
    setStatus(task.status);
    setDueDate(task.dueDate.substring(0, 10)); // Set date in yyyy-mm-dd format
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Task List', 20, 10);
    doc.setFontSize(12);
    let y = 20;
    tasks.forEach((task: any, index: number) => {
      doc.text(`${index + 1}. ${task.taskName} - ${task.description} - ${task.status} - ${task.dueDate}`, 20, y);
      y += 10;
    });
    doc.save('tasks.pdf');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="task-manager">
      <div className="header">
        <h2>Task Manager</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <BackButton />  {/* Add BackButton here */}
      <div className="actions">
        <button onClick={() => navigate('/change-password')} className="action-button">Change Password</button>
        <button onClick={() => navigate('/change-email')} className="action-button">Change Email</button>
      </div>
      <div>
        <label htmlFor="taskName">Task Name</label>
        <input 
          id="taskName"
          type="text" 
          placeholder="Task Name" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input 
          id="description"
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input 
          id="dueDate"
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </div>
      <button onClick={handleAddTask}>{editingTaskId ? 'Update Task' : 'Add Task'}</button>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task._id} className={task.status === 'Completed' ? 'completed-task' : ''}>
              <td>{task.taskName}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                <button onClick={() => alert(JSON.stringify(task, null, 2))}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
