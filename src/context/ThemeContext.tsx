import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextType {
theme: 'light' | 'dark';
toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
const context = useContext(ThemeContext);
if (!context) {
throw new Error('useTheme debe usarse dentro de un ThemeProvider');
}
return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
// Verificar localStorage
const savedTheme = localStorage.getItem('todo-theme') as 'light' | 'dark' | null;

if (savedTheme) {
return savedTheme;
}

// Verificar preferencia del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
return 'dark';
}

return 'light';
});

useEffect(() => {
// Guardar en localStorage
localStorage.setItem('todo-theme', theme);

// Aplicar clase dark al elemento html
const root = document.documentElement;

if (theme === 'dark') {
root.classList.add('dark');
root.style.colorScheme = 'dark';
} else {
root.classList.remove('dark');
root.style.colorScheme = 'light';
}

// Debug: verificar que la clase se aplicó
console.log('🌓 Tema cambiado a:', theme);
console.log('📋 Clases en html:', root.classList.toString());

}, [theme]);

const toggleTheme = () => {
setTheme(prev => prev === 'light' ? 'dark' : 'light');
};

return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
{children}
</ThemeContext.Provider>
);
};