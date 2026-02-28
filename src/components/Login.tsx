import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError('');
setIsLoading(true);

try {
const success = await login(email, password);
if (!success) {
setError('Credenciales inválidas. Usa demo@demo.com / demo123');
}
} catch (err) {
setError('Error al iniciar sesión');
} finally {
setIsLoading(false);
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors">
{/* Fondo con partículas */}
<div className="absolute inset-0 overflow-hidden">
<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
<div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
</div>

{/* Card principal */}
<div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 dark:border-gray-700/30">
{/* Decoración superior */}
<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
<div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
<Sparkles className="w-3 h-3" />
<span>Nuevo</span>
</div>
</div>

{/* Logo */}
<div className="flex justify-center mb-8">
<div className="relative">
<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
<div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
<LogIn className="w-12 h-12 text-white" />
</div>
</div>
</div>

{/* Título */}
<h2 className="text-3xl font-bold text-center mb-2">
<span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-black">
Bienvenido de vuelta
</span>
</h2>

<p className="text-center text-gray-600 dark:text-gray-300 mb-8">
Ingresa tus credenciales para continuar
</p>

{/* Demo credentials */}
<div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-blue-100 dark:border-gray-700">
<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
<Mail className="w-4 h-4 text-blue-500" />
Credenciales de demo:
</p>
<div className="space-y-1 text-sm">
<code className="block p-2 bg-white/50 dark:bg-gray-900/50 rounded-lg text-gray-600 dark:text-gray-400">
demo@demo.com / demo123
</code>
</div>
</div>

<form onSubmit={handleSubmit} className="space-y-6">
<div className="space-y-2">
<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
Email
</label>
<div className="relative group">
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full px-4 py-3 pl-11 border-2 border-gray-200 dark:border-gray-600 
rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 
dark:focus:ring-blue-900/30 bg-white/50 dark:bg-gray-800/50 
backdrop-blur-sm text-gray-900 dark:text-white
transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500"
placeholder="tu@email.com"
required
/>
<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
</div>
</div>

<div className="space-y-2">
<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
Contraseña
</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 
rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 
dark:focus:ring-blue-900/30 bg-white/50 dark:bg-gray-800/50 
backdrop-blur-sm text-gray-900 dark:text-white
transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500"
placeholder="••••••••"
required
/>
</div>

{error && (
<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
text-red-600 dark:text-red-400 rounded-xl text-sm animate-shake flex items-center gap-2">
<AlertCircle className="w-4 h-4" />
{error}
</div>
)}

<button
type="submit"
disabled={isLoading}
className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r 
from-blue-500 to-purple-600 p-[2px] hover:from-blue-600 hover:to-purple-700
transition-all duration-300 disabled:opacity-50"
>
<div className="relative flex items-center justify-center gap-2 bg-white dark:bg-gray-900 
rounded-xl px-6 py-3 transition-all duration-300 
group-hover:bg-opacity-90 group-hover:gap-3">
{isLoading ? (
<>
<div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
Iniciando sesión...
</span>
</>
) : (
<>
<LogIn className="w-5 h-5 text-blue-500 group-hover:text-purple-500 transition-colors" />
<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
Iniciar Sesión
</span>
</>
)}
</div>
</button>
</form>

<p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
Al iniciar sesión, aceptas nuestros Términos y Condiciones
</p>
</div>
</div>
);
};

export default Login;
