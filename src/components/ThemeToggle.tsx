import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
const { theme, toggleTheme } = useTheme();

const handleClick = () => {
console.log('🎯 Botón clickeado, tema actual:', theme);
toggleTheme();
};

return (
<button
onClick={handleClick}
className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
>
{theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
</button>
);
};

export default ThemeToggle;
