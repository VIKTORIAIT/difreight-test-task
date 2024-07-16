export interface Task {
  id: number;
  status: boolean;
  name: string;
  description: string;
  document: File | null;
}
