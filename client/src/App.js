import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css';
import './Styles.css'

function App() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [editTask, setEditTask] = useState({ id: '', task: '', description: '' });
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/showList');
      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const taskHandler = (event) => {
    setTask(event.target.value);
  };

  const desHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/addTask', { task, description });
      setTask('');
      setDescription('');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteTask/${taskId}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const editTaskHandler = (task) => {
    setEditTask({ id: task._id, task: task.task, description: task.description });
  };

  const updateTask = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateTask/${editTask.id}`, { task: editTask.task, description: editTask.description });
      setEditTask({ id: '', task: '', description: '' });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <center>
        <h3 className="heading">TODO LIST</h3>
      </center>
      <div className="container">
        <div className="input_section">
          <form onSubmit={submitForm}>
            <label htmlFor="task" className="t_label">Task</label>
            <input type="text" className="t_input" placeholder="Enter Task" name="task" value={task} onChange={taskHandler} required />
            <br />
            <label htmlFor="description" className="d_label">Description</label>
            <input type="text" className="d_input" placeholder="Enter Description" name="description" value={description} onChange={desHandler} required />
            <button type="submit" className="btn">Add</button>
          </form>
        </div>
        <div className="display">
          {todo.map((data) => (
            <div className="d_content" key={data._id}>
              <div className="d_left">
                <div className="d_task">
                  <h4>{data.task}</h4>
                </div>
                <div className="d_description">
                  <span>{data.description}</span>
                </div>
              </div>
              <div className="d_right">
                <div className="edit">
                  <button className="btn-edit" onClick={() => editTaskHandler(data)}>Edit</button>
                </div>
                <div className="delete">
                  <button className="btn-delete" onClick={() => deleteTask(data._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {editTask.id && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <form onSubmit={updateTask}>
            <label htmlFor="edit-task">Task:</label>
            <input type="text" id="edit-task" value={editTask.task} onChange={(e) => setEditTask({ ...editTask, task: e.target.value })} required />
            <label htmlFor="edit-description">Description:</label>
            <input type="text" id="edit-description" value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} required />
            <button type="submit">Update</button>
            <button onClick={() => setEditTask({ id: '', task: '', description: '' })}>Cancel</button>
          </form>
        </div>
      )}
        </div>
      </div>
      
    </div>
  );
}

export default App;
