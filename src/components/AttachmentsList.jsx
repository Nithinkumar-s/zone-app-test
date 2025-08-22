import { Button, TextInput } from './ui.jsx';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export const AttachmentsList = ({ task }) => {
  const { modifyCollection } = useTasks();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'image', url: '' });

  const submit = () => {
    if(!form.name) return;
    modifyCollection(task.id, 'attachments', 'add', { id: crypto.randomUUID(), ...form });
    setForm({ name: '', type: 'image', url: '' });
    setAdding(false);
  };

  return (
    <section aria-labelledby="attachments-heading" className="space-y-2">
      <header className="flex items-center justify-between">
        <h3 id="attachments-heading" className="text-xs font-semibold text-gray-800">Attachments <span className="font-normal text-gray-400">({task.attachments.length})</span></h3>
        <Button size="sm" variant="ghost" onClick={()=>setAdding(v=>!v)}>{adding ? 'Close' : 'Add'}</Button>
      </header>
      {adding && (
        <div className="grid gap-2 rounded border p-2">
          <TextInput label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <TextInput label="Type" value={form.type} onChange={e=>setForm({...form, type:e.target.value})} />
          <TextInput label="URL" value={form.url} onChange={e=>setForm({...form, url:e.target.value})} />
          <div className="flex justify-end gap-2"><Button size="sm" onClick={submit}>Save</Button></div>
        </div>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {task.attachments.map(a => (
          <li key={a.id} className="flex flex-col rounded border bg-white p-2 text-[11px] shadow-sm">
            <div className="aspect-video w-full rounded bg-gray-100 text-[10px] flex items-center justify-center text-gray-500">{a.type.toUpperCase()}</div>
            <p className="mt-1 truncate font-medium text-gray-800" title={a.name}>{a.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
