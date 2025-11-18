import React, { useState } from 'react';
import { GoogleIcon } from '../components/icons';
import type { User } from '../types';

interface LoginViewProps {
  onLogin: (user?: Partial<User>) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('coach@volleyapp.com');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulasi loading network
    setTimeout(() => {
      if (isRegistering) {
        // Validasi sederhana untuk registrasi
        if (!name || !email || !password || !confirmPassword) {
          setError("Semua kolom harus diisi.");
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Password tidak cocok.");
          setIsLoading(false);
          return;
        }
        
        // Simulasi registrasi berhasil
        onLogin({ name, email });
      } else {
        // Simulasi login berhasil (credential mock diabaikan untuk demo)
        if (!email || !password) {
             setError("Email dan password harus diisi.");
             setIsLoading(false);
             return;
        }
        onLogin();
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError(null);
    // Reset fields conditionally if needed, or keep them for UX
    if (!isRegistering) {
        setName('');
        setConfirmPassword('');
        setEmail('');
        setPassword('');
    } else {
        // Back to login, restore defaults for demo convenience
        setEmail('coach@volleyapp.com');
        setPassword('password');
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-900 text-gray-200 flex flex-col justify-center items-center p-4">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.014 5.683a.75.75 0 011.972 0l3.334 2.035a.75.75 0 010 1.282l-3.334 2.035a.75.75 0 01-1.972 0L5.68 9.001a.75.75 0 010-1.282l3.334-2.035z" clipRule="evenodd" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">VolleyApp</h1>
          <h2 className="text-lg font-medium text-indigo-400">
            {isRegistering ? 'Buat Akun Baru' : 'Selamat Datang Kembali'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isRegistering 
              ? 'Kelola tim volimu dengan lebih profesional.' 
              : 'Login untuk mengelola tim dan strategi.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 space-y-4">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg text-center">
                    {error}
                </div>
            )}

            {isRegistering && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap</label>
                    <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        required={isRegistering}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-slate-600 bg-slate-900/50 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                        placeholder="Nama Pelatih" 
                    />
                </div>
            )}

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">Alamat Email</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-600 bg-slate-900/50 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                placeholder="coach@email.com" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-600 bg-slate-900/50 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            {isRegistering && (
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">Konfirmasi Password</label>
                    <input 
                        id="confirm-password" 
                        name="confirm-password" 
                        type="password" 
                        required={isRegistering}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-slate-600 bg-slate-900/50 placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                        placeholder="••••••••" 
                    />
                </div>
            )}

            {!isRegistering && (
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-slate-700 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                        Ingat saya
                    </label>
                    </div>
                    <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                    Lupa password?
                    </a>
                </div>
            )}

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-500/30"
              >
                {isLoading ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                    </span>
                ) : (
                    isRegistering ? 'Daftar Sekarang' : 'Masuk Aplikasi'
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
                {isRegistering ? 'Sudah punya akun?' : 'Belum punya akun?'}
                <button 
                    onClick={toggleMode}
                    className="ml-2 font-medium text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none underline decoration-2 decoration-transparent hover:decoration-indigo-400"
                >
                    {isRegistering ? 'Login di sini' : 'Daftar di sini'}
                </button>
            </p>
        </div>

         <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-slate-900 text-gray-500 font-semibold tracking-wide">
              Atau lanjutkan dengan
            </span>
          </div>
        </div>
        
        <div>
          <button type="button" onClick={() => onLogin()} className="group relative w-full flex justify-center items-center py-2.5 px-4 border border-slate-600 text-sm font-medium rounded-lg text-gray-200 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors">
            <GoogleIcon className="mr-3" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;