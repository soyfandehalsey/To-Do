import { useState, FormEvent } from 'react';
import { CheckCircle, Circle, Trash2, Plus, LogOut } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { user, logout } = useAuth();

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    await addTodo(newTodoText);
    setNewTodoText('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando tus tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Mis Tareas
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Bienvenido, {user?.email}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={logout}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formulario para nueva tarea */}
        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!newTodoText.trim()}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar</span>
            </button>
          </div>
        </form>

        {/* Lista de tareas */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No tienes tareas pendientes 🎉
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                ¡Agrega una nueva tarea para comenzar!
              </p>
            </div>
          ) : (
            <>
              {todos.map((todo) => {
                const textClass = todo.completed 
                  ? "line-through text-gray-500 dark:text-gray-400" 
                  : "text-gray-900 dark:text-white";
                  return (
                  <div
                    key={todo.id}
                    className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id, !todo.completed)}
                      className="flex-shrink-0 focus:outline-none"
                    >
                      {todo.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                      )}
                    </button>
                    
                    <span className={"flex-1 transition-all " + textClass}>
                      {todo.text}
                    </span>
                    
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      title="Eliminar tarea"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Estadísticas */}
        {todos.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            {todos.filter(t => t.completed).length} de {todos.length} tareas completadas
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;