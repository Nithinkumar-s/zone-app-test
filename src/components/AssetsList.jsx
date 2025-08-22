import { Button, TextInput } from './ui.jsx';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export const AssetsList = ({ task }) => {
  const { modifyCollection } = useTasks();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', code: '' });

  const submit = () => {
    if(!form.name) return;
    modifyCollection(task.id, 'assets', 'add', { id: crypto.randomUUID(), ...form });
    setForm({ name: '', code: '' });
    setAdding(false);
  };

  return (
    <section aria-labelledby="assets-heading" className="space-y-2">
      <header className="flex items-center justify-between">
        <h3 id="assets-heading" className="text-xs font-semibold text-gray-800">Assets <span className="font-normal text-gray-400">({task.assets.length})</span></h3>
        <Button size="sm" variant="ghost" onClick={()=>setAdding(v=>!v)}>{adding ? 'Close' : 'Add'}</Button>
      </header>
      {adding && (
        <div className="grid grid-cols-2 gap-2 rounded border p-2">
          <TextInput label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <TextInput label="Code" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} />
          <div className="col-span-2 flex justify-end gap-2"><Button size="sm" onClick={submit}>Save</Button></div>
        </div>
      )}
      <ul className="grid gap-2 sm:grid-cols-2">
        {task.assets.map(a => (
          <li key={a.id} className="rounded border bg-white p-2 text-[11px] shadow-sm">
            <p className="font-medium text-gray-800">{a.name}</p>
            <p className="text-gray-500">{a.code}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
