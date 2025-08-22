import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';
import { Button, TextArea } from './ui.jsx';

export const ActivityFeed = ({ task }) => {
  const { addActivity } = useTasks();
  const [comment, setComment] = useState('');

  const submit = () => {
    if (!comment.trim()) return;
    addActivity(task.id, { type: 'comment', user: 'Samuel Alex', message: comment.trim() });
    setComment('');
  };

  return (
    <section className="flex h-full flex-col border-l" aria-label="Activity feed">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Activity</h2>
      </header>
      <ol className="flex-1 space-y-4 overflow-auto px-4 py-4 text-xs">
        {task.activity.map(a => (
          <li key={a.id} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600">{a.user.split(' ').map(p=>p[0]).slice(0,2).join('')}</span>
            <div className="space-y-0.5">
              <p className="text-[11px] leading-snug"><span className="font-medium text-gray-800">{a.user}</span> <span className="text-gray-500">{a.message}</span></p>
              <time className="block text-[10px] text-gray-400" dateTime={new Date(a.timestamp).toISOString()}>{new Date(a.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</time>
            </div>
          </li>
        ))}
      </ol>
      <form onSubmit={e => {e.preventDefault(); submit();}} className="border-t p-3">
        <div className="flex items-end gap-2">
          <TextArea label="Add Comment" rows={2} value={comment} onChange={e=>setComment(e.target.value)} className="flex-1" />
          <Button type="submit" size="sm">Submit</Button>
        </div>
      </form>
    </section>
  );
};
