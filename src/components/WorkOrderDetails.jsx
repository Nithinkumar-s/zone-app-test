import { useState, useEffect, useRef } from 'react';
import { CircleDot, AlertTriangle, Clock, MessageSquare, RefreshCw, CheckSquare, MapPin, Layers3, Paperclip, Link2, GitBranch, GitMerge, Users, BarChart3, Plus, CheckCircle2, UserCog, Reply, PauseCircle, ClipboardCheck, XCircle, Ban, Share2 } from 'lucide-react';

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
  const [priority, setPriority] = useState(workOrder.priority || 'High');
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [dueDate, setDueDate] = useState(workOrder.dueDate);
  const [dateOpen, setDateOpen] = useState(false);
  const [nextActionOpen, setNextActionOpen] = useState(false);
  const [nextActionFocus, setNextActionFocus] = useState(0);
  const nextActionRef = useRef(null);
  const priorityStyles = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-emerald-100 text-emerald-700',
    Critical: 'bg-fuchsia-100 text-fuchsia-700'
  };

  useEffect(()=>{
    function handler(e){
      if(nextActionOpen && nextActionRef.current && !nextActionRef.current.contains(e.target)){
        setNextActionOpen(false);
      }
    }
    function esc(e){ if(e.key==='Escape') setNextActionOpen(false); }
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return ()=>{document.removeEventListener('mousedown', handler);document.removeEventListener('keydown', esc);};
  },[nextActionOpen]);

  const primaryActions = [
    { label: 'Send for verification', icon: 'CheckCircle2'},
    { label: 'Assign to technician', icon: 'UserCog'},
    { label: 'Return to requestor', icon: 'Reply'}
  ];
  const secondaryActions = [
    { label: 'Put task on hold', icon: 'PauseCircle'},
    { label: 'Complete task', icon: 'ClipboardCheck'},
    { label: 'Close task', icon: 'XCircle'},
    { label: 'Cancel task', icon: 'Ban'}
  ];

  function handleNextActionKey(e){
    if(!nextActionOpen && (e.key==='ArrowDown' || e.key==='Enter' || e.key===' ')){
      e.preventDefault();
      setNextActionOpen(true);
      setNextActionFocus(0);
      return;
    }
    if(!nextActionOpen) return;
    const total = primaryActions.length + secondaryActions.length + 1; // +1 redirect
    if(e.key==='ArrowDown'){
      e.preventDefault();
      setNextActionFocus(i => (i+1)%total);
    } else if(e.key==='ArrowUp'){
      e.preventDefault();
      setNextActionFocus(i => (i-1+total)%total);
    } else if(e.key==='Home'){ e.preventDefault(); setNextActionFocus(0); }
    else if(e.key==='End'){ e.preventDefault(); setNextActionFocus(total-1); }
    else if(e.key==='Escape'){ setNextActionOpen(false); }
    else if(e.key==='Enter'){ e.preventDefault(); /* stub: trigger action */ setNextActionOpen(false); }
  }

  const filteredActivity = workOrder.activity.filter(a => {
    if(activityTab==='All') return true;
    if(activityTab==='Comments') return a.type==='comment';
    if(activityTab==='Updates') return a.type==='update';
    if(activityTab==='Actions') return a.type==='action';
    return true;
  });

  return (
  <div className="flex min-h-[calc(100vh-2.75rem)] flex-col bg-white text-gray-800 rounded-t-lg shadow-sm">
      {/* Breadcrumb bar */}
      <div className="flex h-11 items-center border-b px-6 text-[13px]">
        <nav className="flex items-center gap-2">
          <a href="#" className="text-gray-600 hover:text-gray-900">Reactive Work Orders</a>
          <span className="text-gray-300">/</span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-gray-700">{workOrder.title}</span>
        </nav>
      </div>
      {/* Summary header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b px-6 py-4 text-sm">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-medium text-green-700"><span className="h-2 w-2 rounded-full bg-green-600" aria-hidden /> {workOrder.id} <span className="text-gray-400">▾</span></span>
          </div>
          <h1 className="text-lg font-semibold leading-snug text-gray-900">{workOrder.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex flex-wrap gap-1">
              {/* Status badge clickable (placeholder action) */}
              <button type="button" className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800 hover:ring-1 ring-amber-300"><Clock className="h-3 w-3" /> IN PROGRESS</button>
              {/* Priority dropdown */}
              <div className="relative">
                <button type="button" onClick={()=>setPriorityOpen(o=>!o)} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium hover:ring-1 ring-offset-0 ring-gray-300 ${priorityStyles[priority] ?? 'bg-gray-100 text-gray-700'}`}>{priority}</button>
                {priorityOpen && (
                  <ul className="absolute z-50 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white py-1 text-[11px] shadow-lg">
                    {['High','Medium','Low','Critical'].map(p => (
                      <li key={p}>
                        <button type="button" onClick={()=>{setPriority(p); setPriorityOpen(false);}} className={`flex w-full items-center justify-between px-2 py-1 text-left hover:bg-gray-50 ${p===priority?'font-semibold text-gray-900':'text-gray-600'}`}>{p}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Due date picker */}
              <div className="relative">
                <button type="button" onClick={()=>setDateOpen(o=>!o)} className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 hover:ring-1 ring-gray-300"><Clock className="h-3 w-3" /> Due: {new Date(dueDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</button>
                {dateOpen && (
                  <div className="absolute z-50 mt-1 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
                    <input type="date" value={dueDate} onChange={e=>{setDueDate(e.target.value);}} className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <div className="mt-2 flex justify-end gap-2">
                      <button type="button" onClick={()=>setDateOpen(false)} className="rounded px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-100">Close</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
              <span className="font-medium text-gray-500">Requested by</span>
              <div className="flex -space-x-2 overflow-hidden">
                {["GS","AB","CD"].map(k=> (
                  <span key={k} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-indigo-100 text-[10px] font-semibold text-indigo-700 shadow-sm">{k}</span>
                ))}
              </div>
              <span className="font-medium text-gray-800">Gerald S Smith <span className="font-normal text-gray-500">+ 4 Others</span></span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 pt-1" ref={nextActionRef}>
          <button type="button" className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 shadow-sm hover:bg-gray-50">+ Add new</button>
          <button
            type="button"
            onClick={()=>{setNextActionOpen(o=>!o); setNextActionFocus(0);}}
            onKeyDown={handleNextActionKey}
            aria-haspopup="menu"
            aria-expanded={nextActionOpen}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-[12px] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${nextActionOpen? 'bg-indigo-700 text-white':'bg-indigo-600 text-white hover:bg-indigo-500'}`}
          >
            Next action <span className={`transition-transform ${nextActionOpen?'rotate-180':''}`}>▾</span>
          </button>
          <button type="button" className="rounded-md border border-gray-200 bg-white p-1.5 text-gray-500 hover:bg-gray-50">⋯</button>
          {nextActionOpen && (
            <div role="menu" className="absolute right-4 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              <ul className="p-2 text-[13px]" onKeyDown={handleNextActionKey} tabIndex={-1}>
                {primaryActions.map((a,i)=>{
                  const Icon = {CheckCircle2,UserCog,Reply}[a.icon];
                  const globalIndex = i;
                  return (
                    <li key={a.label}>
                      <button data-index={globalIndex} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${nextActionFocus===globalIndex? 'bg-indigo-50 text-indigo-700':'text-gray-800 hover:bg-gray-50'}`}> <Icon className="h-4 w-4" /> {a.label}</button>
                    </li>
                  );
                })}
                <li className="my-2 border-t border-gray-200" />
                <li className="px-3 pb-1 pt-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">More actions</li>
                {secondaryActions.map((a,i)=>{
                  const Icon = {PauseCircle,ClipboardCheck,XCircle,Ban}[a.icon];
                  const globalIndex = primaryActions.length + i;
                  return (
                    <li key={a.label}>
                      <button data-index={globalIndex} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${nextActionFocus===globalIndex? 'bg-indigo-50 text-indigo-700':'text-gray-700 hover:bg-gray-50'}`}><Icon className="h-4 w-4" /> {a.label}</button>
                    </li>
                  );
                })}
                <li className="my-2 border-t border-gray-200" />
                <li>
                  <button data-index={primaryActions.length + secondaryActions.length} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium ${nextActionFocus===primaryActions.length + secondaryActions.length? 'bg-indigo-50 text-indigo-700':'text-indigo-600 hover:bg-indigo-50'}`}><Share2 className="h-4 w-4" /> Redirect workflow</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Main content area below breadcrumb */}
      <div className="flex flex-1">
      {/* LEFT COLUMN */}
      <div className="w-72 shrink-0 overflow-y-auto border-r bg-gray-50 p-4 text-[11px] leading-relaxed">
        <section className="mt-2 space-y-2">
          <h2 className="text-[11px] font-semibold text-gray-900">Description & category</h2>
          <p className="text-gray-600">{workOrder.description}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {workOrder.categories.map(c => <span key={c} className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px]">{c}</span>)}
          </div>
        </section>
        <section className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-semibold text-gray-900">Assigned to</h2>
            <button className="rounded px-2 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-100">Send reminder</button>
          </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1 overflow-hidden">
                {workOrder.assignees.map(name => {
                  const initials = name.split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase();
                  return <span key={name} title={name} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-gray-200 text-[10px] font-medium text-gray-700 shadow-sm">{initials}</span>;
                })}
              </div>
              <span className="text-[11px] font-medium text-gray-800">
                {workOrder.assignees[0]} {workOrder.assignees.length>1 && <span className="font-normal text-gray-500">& {workOrder.assignees.length-1} other{workOrder.assignees.length-1>1?'s':''}</span>}
              </span>
            </div>
            <button className="text-[10px] font-medium text-indigo-600 hover:underline">Claim task</button>
        </section>
        <section className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1 text-[11px] font-semibold text-gray-900"><GitMerge className="h-3.5 w-3.5" /> Relations</h2>
            <button className="rounded p-1 text-gray-500 hover:bg-white" aria-label="Add relation"><Plus className="h-3 w-3" /></button>
          </div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(workOrder.relations).map(([k,v]) => {
              const iconMap = { parent: GitBranch, linked: Link2, child: GitBranch };
              const Icon = iconMap[k] || Link2;
              return (
                <span key={k} className="inline-flex items-center gap-1 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-700">
                  <Icon className="h-3 w-3" /> {v[0]}
                </span>
              );
            })}
          </div>
        </section>
        <section className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1 text-[11px] font-semibold text-gray-900"><Users className="h-3.5 w-3.5" /> Observers</h2>
              <button className="rounded p-1 text-gray-500 hover:bg-white" aria-label="Add observer"><Plus className="h-3 w-3" /></button>
            </div>
            <div className="flex -space-x-2 overflow-hidden pb-1">
              {workOrder.observers.slice(0,4).map(o => (
                <span key={o} title={o} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-gray-200 text-[9px] font-medium text-gray-700">{o.split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase()}</span>
              ))}
              {workOrder.observers.length>4 && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-gray-100 text-[9px] font-medium text-gray-600">+{workOrder.observers.length-4}</span>
              )}
            </div>
            <p className="text-[10px] text-gray-600 leading-snug">
              {workOrder.observers[0]}{workOrder.observers.length>1 && <span className="text-gray-500"> + {workOrder.observers.length-1} other{workOrder.observers.length-1>1?'s':''}</span>}
            </p>
        </section>
        <section className="mt-6 space-y-3">
          <h2 className="flex items-center gap-1 text-[11px] font-semibold text-gray-900"><BarChart3 className="h-3.5 w-3.5" /> Insights</h2>
          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div className="rounded-md border border-gray-200 bg-white p-2">
              <p className="text-gray-500">Total work hours</p>
              <p className="mt-0.5 text-[11px] font-medium text-gray-900">{workOrder.insights.totalWorkHours}</p>
            </div>
            <div className="rounded-md border border-gray-200 bg-white p-2">
              <p className="text-gray-500">Total cost</p>
              <p className="mt-0.5 text-[11px] font-medium text-gray-900">${workOrder.insights.totalCost.toFixed(2)}</p>
            </div>
          </div>
        </section>
      </div>

  {/* MIDDLE CONTENT */}
  <div className="flex-1 overflow-y-auto px-8 py-5">
        <div className="flex gap-6 border-b text-[11px] font-medium uppercase tracking-wide">
          {[
            {label:'Overview', icon: CircleDot},
            {label:'Work', icon: Layers3},
            {label:'Cost', icon: Clock},
            {label:'Division', icon: Layers3}
          ].map(t => (
            <button key={t.label} className="relative flex items-center gap-1 py-3 text-gray-600 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full hover:text-gray-900 focus:outline-none data-[active=true]:text-gray-900 data-[active=true]:after:bg-gray-900" data-active={t.label==='Overview'}>
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>
        <div className="pt-6 space-y-10">
          {/* Location & space */}
          <section className="space-y-3" aria-labelledby="loc-heading">
            <div className="flex items-center justify-between">
              <h2 id="loc-heading" className="flex items-center gap-1 text-xs font-semibold text-gray-900"><MapPin className="h-3.5 w-3.5" /> Location & space <span className="font-normal text-gray-400">({workOrder.location.spaces.length})</span></h2>
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
              <h2 id="assets-heading" className="flex items-center gap-1 text-xs font-semibold text-gray-900"><Layers3 className="h-3.5 w-3.5" /> Assets <span className="font-normal text-gray-400">({workOrder.assets.length})</span></h2>
              <button className="text-xs font-medium text-indigo-600 hover:underline">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {workOrder.assets.map(a => <span key={a.id} className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-700">{a.name}</span>)}
            </div>
          </section>
          {/* Attachments */}
            <section className="space-y-3" aria-labelledby="attachments-heading">
              <div className="flex items-center justify-between">
                <h2 id="attachments-heading" className="flex items-center gap-1 text-xs font-semibold text-gray-900"><Paperclip className="h-3.5 w-3.5" /> Attachments <span className="font-normal text-gray-400">({workOrder.attachments.length})</span></h2>
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
      <div className="flex w-80 shrink-0 flex-col border-l bg-gray-50">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-xs font-semibold text-gray-800 tracking-wide">ACTIVITY</h2>
          <button className="rounded p-1 text-gray-500 hover:bg-white">⋯</button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pt-3 text-[11px]">
          {tabs.map(t => {
            const iconMap = { All: CircleDot, Comments: MessageSquare, Updates: RefreshCw, Actions: CheckSquare };
            const Icon = iconMap[t];
            return (
              <button key={t} onClick={()=>setActivityTab(t)} className={`flex items-center gap-1 rounded-full px-3 py-1 font-medium ${activityTab===t? 'bg-gray-900 text-white':'bg-white text-gray-600 hover:bg-gray-100'}`}>
                <Icon className="h-3.5 w-3.5" /> {t}
              </button>
            );
          })}
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
    </div>
  );
}
