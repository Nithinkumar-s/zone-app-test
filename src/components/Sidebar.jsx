import { Badge, Button, TextArea, TextInput } from './ui.jsx';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

export const Sidebar = ({ task }) => {
  const { updateTask, modifyCollection } = useTasks();
  const [local, setLocal] = useState(task);
  const [editing, setEditing] = useState(false);

  const save = () => {
    updateTask(task.id, local);
    setEditing(false);
  };

  const badgeColor = task.status === 'IN_PROGRESS' ? 'yellow' : task.status === 'COMPLETED' ? 'green' : 'gray';

  return (
    <aside className="flex flex-col gap-6 p-4 text-xs text-gray-700" aria-label="Task details sidebar">
      <div>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-sm font-semibold text-gray-900 leading-snug">{task.title}</h1>
            <Badge color={badgeColor}>{task.status.replace('_',' ')}</Badge>
          </div>
          {!editing && <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>Edit</Button>}
          {editing && <div className="flex gap-2"><Button size="sm" onClick={save}>Save</Button><Button size="sm" variant="ghost" onClick={()=>{setLocal(task);setEditing(false);}}>Cancel</Button></div>}
        </div>
        <div className="mt-3 space-y-2 text-[11px]">
          {!editing && <p className="text-gray-600 whitespace-pre-line">{task.description}</p>}
          {editing && <TextArea label="Description" value={local.description} onChange={e=>setLocal({...local, description:e.target.value})} />}
          <div className="flex flex-wrap gap-1 pt-1">
            {task.category.map(c => <Badge key={c} color="gray">{c}</Badge>)}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-2 font-medium text-gray-900">Assigned to</h2>
        <ul className="space-y-1">
          {task.assignees.map(a => <li key={a.id} className="flex items-center gap-2"><span className="h-6 w-6 rounded-full bg-indigo-100 text-[10px] flex items-center justify-center font-semibold text-indigo-700">{a.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</span><span className="text-[11px]">{a.name}{a.me && ' (Me)'}</span></li>)}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 font-medium text-gray-900">Relations</h2>
        <div className="space-y-2">
          {['parent','linked','child'].map(key => (
            <div key={key}>
              <p className="mb-1 capitalize text-[11px] font-medium text-gray-500">{key}</p>
              <ul className="space-y-0.5">
                {task.relations[key].map(r => <li key={r.id} className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px]">{r.title}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-2 font-medium text-gray-900">Observers</h2>
        <ul className="space-y-1">
          {task.observers.map(o => <li key={o.id} className="text-[11px]">{o.name}</li>)}
        </ul>
      </div>
      <div>
        <h2 className="mb-2 font-medium text-gray-900">Insights</h2>
        <dl className="grid grid-cols-2 gap-2 text-[11px]">
          <div><dt className="text-gray-500">Total work hours</dt><dd className="font-medium">{Math.floor(task.insights.totalWorkHours/60).toString().padStart(2,'0')}:{(task.insights.totalWorkHours%60).toString().padStart(2,'0')}</dd></div>
          <div><dt className="text-gray-500">Total cost</dt><dd className="font-medium">${task.insights.totalCost.toFixed(2)}</dd></div>
        </dl>
      </div>
    </aside>
  );
};
