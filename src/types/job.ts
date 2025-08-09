export type JobStatus = 'applied' | 'interviewed' | 'rejected';

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  dateApplied: string;
  duties?: string;
  requirements?: string;
  notes?: string;
}
