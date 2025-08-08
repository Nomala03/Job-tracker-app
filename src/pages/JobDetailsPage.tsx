import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type {Job,} from '../types/job'

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('jobs');
    if (stored) {
      const jobs: Job[] = JSON.parse(stored);
      const found = jobs.find((j) => j.id === id);
      if (found) {
        setJob(found);
      } else {
        navigate('/404');
      }
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!job) return;
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const save = () => {
    if (!job) return;
    const stored = localStorage.getItem('jobs');
    if (stored) {
      const jobs: Job[] = JSON.parse(stored);
      const updated = jobs.map((j) => (j.id === job.id ? job : j));
      localStorage.setItem('jobs', JSON.stringify(updated));
      alert('Changes saved!');
      navigate('/home');
    }
  };

  if (!job) return null;

  return (
    <section className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Edit Job Application</h1>

        <div className="space-y-4">
          <input
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="role"
            placeholder="Role"
            value={job.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
          <input
            type="date"
            name="dateApplied"
            value={job.dateApplied}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="duties"
            placeholder="Job Duties"
            value={job.duties || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="requirements"
            placeholder="Job Requirements"
            value={job.requirements || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={job.notes || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={save}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsPage;
