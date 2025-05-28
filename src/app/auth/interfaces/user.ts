export interface User {
  userId?: number;
  name?: string;
  login: string;
  email?: string;
  password?: string;
  avatar?: string;
  rol: 'admin' | 'physio' | 'patient';
}
