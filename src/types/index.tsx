export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Todo {
  id: number;
  userId: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}