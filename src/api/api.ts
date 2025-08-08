const BASE_URL = 'http://localhost:3000';

// Helper to check HTTP response status
async function checkResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}



export async function fetchJobs(): Promise<any[]> {
 
  const cached = localStorage.getItem('jobs');
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(`${BASE_URL}/jobs`);
  const jobs = await checkResponse(response);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  return jobs;
}

export async function createJob(jobData: any) {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  const newJob = await checkResponse(response);


  const cached = localStorage.getItem('jobs');
  const jobs = cached ? JSON.parse(cached) : [];
  localStorage.setItem('jobs', JSON.stringify([newJob, ...jobs]));

  return newJob;
}

export async function updateJob(id: number | string, jobData: any) {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  const updatedJob = await checkResponse(response);


  const cached = localStorage.getItem('jobs');
  if (cached) {
    const jobs = JSON.parse(cached).map((j: any) => (j.id === id ? updatedJob : j));
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  return updatedJob;
}

export async function deleteJob(id: number | string) {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, { method: 'DELETE' });
  await checkResponse(response);


  const cached = localStorage.getItem('jobs');
  if (cached) {
    const jobs = JSON.parse(cached).filter((j: any) => j.id !== id);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
}



export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return checkResponse(response);
}

export async function createUser(userData: { username: string; password: string }) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return checkResponse(response);
}

export async function loginUser(username: string, password: string) {

  const users = await fetchUsers();
  const user = users.find(
    (u: any) => u.username === username && u.password === password
  );
  if (!user) throw new Error('Invalid username or password');

  const token = btoa(`${username}:${password}`);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { token, user };
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getAuthToken() {
  return localStorage.getItem('token');
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
