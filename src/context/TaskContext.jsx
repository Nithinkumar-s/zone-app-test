import { createContext, useContext, useState, useCallback } from 'react';
import { initialTasks } from '../data/mockData.js';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = useCallback(task => {
    setTasks(prev => [...prev, { ...task, id: task.id || crypto.randomUUID() }]);
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTask = useCallback(id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const addActivity = useCallback((taskId, entry) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, activity: [ { id: crypto.randomUUID(), timestamp: Date.now(), ...entry }, ...t.activity ] } : t));
  }, []);

  const modifyCollection = useCallback((taskId, collectionKey, action, item) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const list = t[collectionKey] || [];
      if (action === 'add') return { ...t, [collectionKey]: [...list, item] };
      if (action === 'remove') return { ...t, [collectionKey]: list.filter(x => x.id !== item.id) };
      if (action === 'update') return { ...t, [collectionKey]: list.map(x => x.id === item.id ? { ...x, ...item } : x) };
      return t;
    }));
  }, []);

  const value = { tasks, addTask, updateTask, deleteTask, addActivity, modifyCollection };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
