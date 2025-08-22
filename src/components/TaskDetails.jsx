import { useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import { Sidebar } from './Sidebar.jsx';
import { ActivityFeed } from './ActivityFeed.jsx';
import { MapPreview } from './MapPreview.jsx';
import { AssetsList } from './AssetsList.jsx';
import { AttachmentsList } from './AttachmentsList.jsx';
import { useState } from 'react';

export const TaskDetails = () => {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find(t => t.id === id) || tasks[0];
  const [tab, setTab] = useState('overview');

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      <div className="hidden w-72 shrink-0 border-r bg-gray-50 lg:block overflow-auto">
        <Sidebar task={task} />
      </div>
      <main className="flex-1 overflow-auto" aria-label="Main content">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-6 border-b px-6">
            {['overview','work','cost','division'].map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`relative pb-3 text-xs font-medium uppercase tracking-wide transition-colors ${tab===t?'text-indigo-600':'text-gray-500 hover:text-gray-700'}`}>{t}
                {tab===t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-indigo-600" />}
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-8 overflow-auto px-6 py-6">
            {tab === 'overview' && (
              <div className="space-y-10">
                <section aria-labelledby="location-heading" className="space-y-3">
                  <header className="flex items-center justify-between">
                    <h3 id="location-heading" className="text-xs font-semibold text-gray-800">Location & space <span className="font-normal text-gray-400">({task.spaces.length})</span></h3>
                  </header>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {task.spaces.map(s => <MapPreview key={s.id} space={s} />)}
                  </div>
                </section>
                <AssetsList task={task} />
                <AttachmentsList task={task} />
              </div>
            )}
            {tab !== 'overview' && <p className="text-xs text-gray-500">No data for this tab yet.</p>}
          </div>
        </div>
      </main>
      <div className="hidden w-96 shrink-0 lg:flex flex-col bg-gray-50">
        <ActivityFeed task={task} />
      </div>
    </div>
  );
};
