import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3000';

export const useTodos = () => {
const [todos, setTodos] = useState<Todo[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const { user } = useAuth();

const fetchTodos = useCallback(async () => {
if (!user) {
setTodos([]);
setLoading(false);
return;
}

try {
setLoading(true);
setError(null);

const response = await fetch(`${API_URL}/todos?userId=${user.id}`);

if (!response.ok) {
throw new Error(`Error HTTP: ${response.status}`);
}

const data = await response.json();

// Ordenar por fecha (más recientes primero)
const sorted = data.sort((a: Todo, b: Todo) => 
new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

setTodos(sorted);
} catch (err) {
setError(err instanceof Error ? err.message : 'Error al cargar tareas');
console.error('Error fetching todos:', err);
} finally {
setLoading(false);
}
}, [user]);

useEffect(() => {
fetchTodos();
}, [fetchTodos]);

const addTodo = async (text: string) => {
if (!user || !text.trim()) return;

const newTodo = {
userId: user.id,
text: text.trim(),
completed: false,
createdAt: new Date().toISOString()
};

try {
const response = await fetch(`${API_URL}/todos`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(newTodo)
});

if (!response.ok) {
throw new Error(`Error HTTP: ${response.status}`);
}

const savedTodo = await response.json();
setTodos(prev => [savedTodo, ...prev]);

} catch (err) {
console.error('Error adding todo:', err);
alert('Error al agregar tarea. Verifica que JSON Server esté corriendo en el puerto 3000');
}
};

const toggleTodo = async (id: number, completed: boolean) => {
try {
const response = await fetch(`${API_URL}/todos/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ completed })
});

if (!response.ok) {
throw new Error(`Error HTTP: ${response.status}`);
}

setTodos(prev => prev.map(todo => 
todo.id === id ? { ...todo, completed } : todo
));
} catch (err) {
console.error('Error toggling todo:', err);
}
};

const deleteTodo = async (id: number) => {
try {
const response = await fetch(`${API_URL}/todos/${id}`, {
method: 'DELETE'
});

if (!response.ok) {
throw new Error(`Error HTTP: ${response.status}`);
}

setTodos(prev => prev.filter(todo => todo.id !== id));
} catch (err) {
console.error('Error deleting todo:', err);
}
};

return { 
todos, 
loading, 
error,
addTodo, 
toggleTodo, 
deleteTodo,
refreshTodos: fetchTodos 
};
};