import { useEffect, useState } from 'react';
import type { Job, JobStatus } from '../types/job';
import { createJob, fetchJobs, deleteJob } from '../api/api';
import { v4 as uuidv4 } from 'uuid';
import { Link, useSearchParams } from 'react-router-dom';


const statusColors: Record<JobStatus, string> = {
  applied: 'bg-yellow-100 text-yellow-700',
  interviewed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState<Omit<Job, 'id'>>({
    company: '',
    role: '',
    status: 'applied',
    dateApplied: '',
    duties: '',
    requirements: '',
    notes: '',
  });

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
    fetchJobs()
      .then(saveJobs)
      .catch(console.error);
  }, []);

  const saveJobs = (updated: Job[]) => {
    setJobs(updated);
    localStorage.setItem('jobs', JSON.stringify(updated));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newJob = await createJob({
        id: uuidv4(),
        ...form,
      });
      saveJobs([newJob, ...jobs]);
      setForm({
        company: '',
        role: '',
        status: 'applied',
        dateApplied: '',
        duties: '',
        requirements: '',
        notes: '',
      });
    } catch {
      alert('Failed to add job');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      saveJobs(jobs.filter((job) => job.id !== id));
    } catch {
      alert('Failed to delete job');
    }
  };

  // Filtering, searching, sorting from URL params
  const query = searchParams.get('q')?.toLowerCase() || '';
  const filterStatus = searchParams.get('status') as JobStatus | null;
  const sort = searchParams.get('sort') || 'desc';

  const filteredJobs = jobs
    .filter((job) =>
      job.company.toLowerCase().includes(query) || job.role.toLowerCase().includes(query)
    )
    .filter((job) => (filterStatus ? job.status === filterStatus : true))
    .sort((a, b) =>
      sort === 'asc'
        ? new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        : new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
    );

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  return (
    <section className="min-h-screen bg-gray-200 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 tracking-tight text-center text-gray-800 drop-shadow-lg">My Job Applications</h1>

        <form
          onSubmit={handleAdd}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40 mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as JobStatus })}
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          >
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="date"
            value={form.dateApplied}
            onChange={(e) => setForm({ ...form, dateApplied: e.target.value })}
            required
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />
          <input
            type="text"
            placeholder="Duties (optional)"
            value={form.duties}
            onChange={(e) => setForm({ ...form, duties: e.target.value })}
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />
          <input
            type="text"
            placeholder="Requirements (optional)"
            value={form.requirements}
            onChange={(e) => setForm({ ...form, requirements: e.target.value })}
            className="p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="p-3 border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition border md:col-span-2 lg:col-span-3"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:opacity-90 transition text-white py-2 rounded md:col-span-2 lg:col-span-3"
          >
            Add Job
          </button>
        </form>

        <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search company or role..."
            className="p-2 border rounded-lg focus:border-purple-400 w-full md:w-60"
            onChange={(e) => updateSearchParam('q', e.target.value)}
            defaultValue={searchParams.get('q') || ''}
          />

          <div className="flex gap-2">
            {['applied', 'interviewed', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => updateSearchParam('status', status)}
                className={`px-3 py-1 rounded text-sm capitalize font-medium shadow-sm transition ${
                  filterStatus === status ? 'bg-purple-500 text-white' : 'bg-white/70 border border-gray-200 text-gray-700 hover:bg-purple-50'
                }`}
              >
                {status}
              </button>
            ))}
            <button
              onClick={() => updateSearchParam('status', '')}
              className="text-sm underline text-gray-600 hover:text-gray-800"
            >
              Clear Filter
            </button>
          </div>

          <div>
            <select
              value={sort}
              onChange={(e) => updateSearchParam('sort', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:ring-purple-400 focus:border-purple-400 transition"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredJobs.length === 0 && (
            <p className="text-gray-600 text-center">No jobs match your search/filter.</p>
          )}

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white/80 backdrop-blur-sm border border-white/40 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start gap-3"
            >
              <div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-purple-600 font-semibold text-lg hover:underline"
                >
                  {job.role} @ {job.company}
                </Link>
                <p className="text-sm text-gray-500">
                  Applied on {new Date(job.dateApplied).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${statusColors[job.status]}`}
                >
                  {job.status}
                </span>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
