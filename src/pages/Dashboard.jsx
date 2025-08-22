import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';
import { Badge, Button } from '../components/ui.jsx';

export const Dashboard = () => {
  const { tasks } = useTasks();
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Tasks</h1>
        <Button as={Link} to="/add">Add Task</Button>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map(t => (
          <li key={t.id} className="group rounded-lg border bg-white p-4 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-indigo-200">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600"><Link to={`/task/${t.id}`}>{t.title}</Link></h2>
              <Badge color={t.status==='IN_PROGRESS'?'yellow':t.status==='COMPLETED'?'green':'gray'}>{t.status.replace('_',' ')}</Badge>
            </div>
            <p className="mt-2 line-clamp-3 text-[11px] text-gray-600">{t.description}</p>
            <Link className="mt-3 inline-block text-xs font-medium text-indigo-600 hover:underline" to={`/task/${t.id}`}>Open →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
