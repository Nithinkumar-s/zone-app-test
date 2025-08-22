import { useState } from 'react';

// Simple mock data (could later come from context or props)
const workOrder = {
  id: 'SR-243',
  title: 'Loose electrical wires near park',
  status: 'IN_PROGRESS',
  dueDate: '2025-01-06',
  priority: 'High',
  description: 'I noticed some loose electrical wires hanging near the park entrance. It could be a danger for everyone.',
  categories: ['Adhoc service request','Repairs','Water leaks','Pipe repairs'],
  assignees: [ 'Samuel Alex (Me)', 'Jane Doe' ],
  relations: { parent: ['1 parent'], linked: ['1 linked'], child: ['2 child'] },
  observers: ['Gerald S Smith','Michael Chen'],
  insights: { totalWorkHours: '00:02:09', totalCost: 13.50 },
  location: {
    room: 'Arora Room, Room No. 101',
    note: 'Near Cooler',
    spaces: [
      { id:'loc1', label:'Floor 3, Building 2, Edinburg office' },
      { id:'loc2', label:'Section B, Aisle 5, Near Loading Dock 3' }
    ]
  },
  assets: [ { id:'a1', name:'Equipment' }, { id:'a2', name:'Assembly line A1' } ],
  attachments: [ { id:'att1', type:'image', name:'screenshot.png' }, { id:'att2', type:'pdf', name:'manual.pdf' } ],
  activity: [
    { id:'act1', type:'comment', user:'Samuel Alex', message:'Received request for restroom plumbing issue. Leak located at sink valve. Temporary fix applied; permanent part ordered (ETA: 2 days).', time:'10:45 PM', day:'Today' },
    { id:'act2', type:'update', user:'John Fitzgerald', message:'Changed action to Send to technician', time:'5:00 PM', day:'Yesterday' },
    { id:'act3', type:'update', user:'Samuel Alex', message:'Set priority to High', time:'1:15 PM', day:'Yesterday' }
  ]
};

export default function WorkOrderDetails(){
  const [activityTab, setActivityTab] = useState('All');
  const tabs = ['All','Comments','Updates','Actions'];

  const filteredActivity = workOrder.activity.filter(a => {
    if(activityTab==='All') return true;
    if(activityTab==='Comments') return a.type==='comment';
    if(activityTab==='Updates') return a.type==='update';
    if(activityTab==='Actions') return a.type==='action';
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-2.75rem)] bg-white text-gray-800">
      {/* LEFT COLUMN */}
      <div className="w-72 shrink-0 border-r bg-gray-50 overflow-y-auto p-4 text-[11px] leading-relaxed">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-600" aria-hidden /> SR-243
          </div>
          <h1 className="text-sm font-semibold text-gray-900">{workOrder.title}</h1>
          <div className="flex flex-wrap gap-1 pt-1">
            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">IN PROGRESS</span>
            <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">High</span>
            <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700">Due {workOrder.dueDate}</span>
          </div>
        </div>
        <section className="mt-6 space-y-2">
          <h2 className="text-[11px] font-semibold text-gray-900">Description & category</h2>
          <p className="text-gray-600">{workOrder.description}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {workOrder.categories.map(c => <span key={c} className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px]">{c}</span>)}
          </div>
        </section>
        <section className="mt-6 space-y-2">
          <h2 className="text-[11px] font-semibold text-gray-900">Assigned to</h2>
          {workOrder.assignees.map(a => <p key={a}>{a}</p>)}
        </section>
        <section className="mt-6 space-y-3">
          <h2 className="text-[11px] font-semibold text-gray-900">Relations</h2>
          {Object.entries(workOrder.relations).map(([k,v]) => (
            <div key={k} className="flex items-center gap-1 text-gray-600"><span className="rounded border bg-white px-1 text-[10px]">{v[0]}</span></div>
          ))}
        </section>
        <section className="mt-6 space-y-1">
          <h2 className="text-[11px] font-semibold text-gray-900">Observers</h2>
          {workOrder.observers.map(o => <p key={o}>{o}</p>)}
        </section>
        <section className="mt-6 grid grid-cols-2 gap-3 text-[10px]">
          <div>
            <p className="text-gray-500">Total work hours</p>
            <p className="font-medium text-gray-900">{workOrder.insights.totalWorkHours}</p>
          </div>
          <div>
            <p className="text-gray-500">Total cost</p>
            <p className="font-medium text-gray-900">${workOrder.insights.totalCost.toFixed(2)}</p>
          </div>
        </section>
      </div>

      {/* MIDDLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-8 py-5">
        <div className="flex gap-6 border-b text-[11px] font-medium uppercase tracking-wide">
          {['Overview','Work','Cost','Division'].map(t => (
            <button key={t} className="relative py-3 text-gray-600 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full hover:text-gray-900 focus:outline-none data-[active=true]:text-gray-900 data-[active=true]:after:bg-gray-900" data-active={t==='Overview'}>{t}</button>
          ))}
        </div>
        <div className="pt-6 space-y-10">
          {/* Location & space */}
          <section className="space-y-3" aria-labelledby="loc-heading">
            <div className="flex items-center justify-between">
              <h2 id="loc-heading" className="text-xs font-semibold text-gray-900">Location & space <span className="font-normal text-gray-400">({workOrder.location.spaces.length})</span></h2>
              <button className="text-xs font-medium text-indigo-600 hover:underline">Add</button>
            </div>
            <p className="text-[11px] font-medium text-gray-800">{workOrder.location.room} <span className="font-normal text-gray-500">{workOrder.location.note}</span></p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workOrder.location.spaces.map(s => (
                <div key={s.id} className="rounded-lg border bg-white p-3">
                  <div className="mb-2 aspect-[5/3] w-full rounded bg-gradient-to-br from-sky-200 via-sky-300 to-sky-100" />
                  <p className="truncate text-[11px] text-gray-700" title={s.label}>{s.label}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Assets */}
          <section className="space-y-3" aria-labelledby="assets-heading">
            <div className="flex items-center justify-between">
              <h2 id="assets-heading" className="text-xs font-semibold text-gray-900">Assets <span className="font-normal text-gray-400">({workOrder.assets.length})</span></h2>
              <button className="text-xs font-medium text-indigo-600 hover:underline">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {workOrder.assets.map(a => <span key={a.id} className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-700">{a.name}</span>)}
            </div>
          </section>
          {/* Attachments */}
            <section className="space-y-3" aria-labelledby="attachments-heading">
              <div className="flex items-center justify-between">
                <h2 id="attachments-heading" className="text-xs font-semibold text-gray-900">Attachments <span className="font-normal text-gray-400">({workOrder.attachments.length})</span></h2>
                <button className="text-xs font-medium text-indigo-600 hover:underline">Add</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {workOrder.attachments.map(att => (
                  <div key={att.id} className="flex aspect-[4/3] flex-col items-center justify-center rounded border bg-white text-[10px] text-gray-500">
                    {att.type.toUpperCase()}<span className="mt-1 text-[9px] font-medium text-gray-600">{att.name}</span>
                  </div>
                ))}
              </div>
            </section>
        </div>
      </div>

      {/* RIGHT ACTIVITY FEED */}
      <div className="w-80 shrink-0 border-l bg-gray-50 flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xs font-semibold text-gray-800 tracking-wide">ACTIVITY</h2>
          <button className="rounded p-1 text-gray-500 hover:bg-white">⋯</button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 text-[11px]">
          {tabs.map(t => (
            <button key={t} onClick={()=>setActivityTab(t)} className={`rounded-full px-3 py-1 font-medium ${activityTab===t? 'bg-gray-900 text-white':'bg-white text-gray-600 hover:bg-gray-100'}`}>{t}</button>
          ))}
        </div>
        <ol className="flex-1 space-y-5 overflow-y-auto px-4 py-5 text-[11px]">
          {filteredActivity.map(a => (
            <li key={a.id} className="flex gap-2">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700">{a.user.split(' ').map(p=>p[0]).join('')}</span>
              <div className="space-y-1">
                <p className="text-gray-700"><span className="font-medium text-gray-900">{a.user}</span> {a.message}</p>
                <p className="text-[10px] text-gray-400">{a.day} • {a.time}</p>
              </div>
            </li>
          ))}
        </ol>
        <form onSubmit={e=>{e.preventDefault();/* submit stub */}} className="border-t p-3 text-[11px]">
          <label className="flex items-center gap-2 rounded border bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <input aria-label="Add comment" placeholder="Add Comment..." className="w-full bg-transparent text-[11px] text-gray-700 placeholder-gray-400 focus:outline-none" />
            <button type="submit" className="rounded bg-indigo-600 px-3 py-1 text-[11px] font-medium text-white hover:bg-indigo-500">Submit</button>
          </label>
        </form>
      </div>
    </div>
  );
}
