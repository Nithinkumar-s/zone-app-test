import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import { Button, TextArea, TextInput } from '../components/ui.jsx';

export const AddTask = () => {
  const { addTask } = useTasks();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', priority: 'MEDIUM', status: 'IN_PROGRESS', dueDate: '', assignees: [], assets: [], attachments: [], activity: [], observers: [], relations: { parent:[], linked:[], child:[] }, category: [], spaces: [], insights:{ totalWorkHours:0, totalCost:0}});

  const submit = e => {
    e.preventDefault();
    if(!form.title) return;
    addTask({ ...form });
    nav('/');
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 p-6">
      <h1 className="text-lg font-semibold text-gray-900">Add Task</h1>
      <TextInput label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
      <TextArea label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <TextInput label="Priority" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} />
      <TextInput label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})} />
      <TextInput label="Due Date" type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})} />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={()=>nav(-1)}>Cancel</Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};
