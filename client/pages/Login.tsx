import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, Eye, EyeOff, Loader } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Login successful, redirect based on role will happen in App.tsx
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'teacher' | 'student') => {
    const credentials = {
      admin: { email: 'admin@erp.com', password: 'admin123' },
      teacher: { email: 'teacher@erp.com', password: 'teacher123' },
      student: { email: 'student@erp.com', password: 'student123' },
    };
    const cred = credentials[role];
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-block rounded-lg bg-primary/10 p-3 mb-4">
              <div className="text-3xl font-bold text-primary">ERP</div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Educational ERP</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 pr-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-2 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors mt-6 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-4 text-center text-sm font-medium text-foreground">Demo Credentials</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="rounded-lg bg-secondary p-3 text-center text-sm hover:bg-secondary/80 transition-colors"
              >
                <div className="font-semibold text-foreground text-xs">Admin</div>
                <div className="text-xs text-muted-foreground mt-1">admin@erp.com</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('teacher')}
                className="rounded-lg bg-secondary p-3 text-center text-sm hover:bg-secondary/80 transition-colors"
              >
                <div className="font-semibold text-foreground text-xs">Teacher</div>
                <div className="text-xs text-muted-foreground mt-1">teacher@erp.com</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('student')}
                className="rounded-lg bg-secondary p-3 text-center text-sm hover:bg-secondary/80 transition-colors"
              >
                <div className="font-semibold text-foreground text-xs">Student</div>
                <div className="text-xs text-muted-foreground mt-1">student@erp.com</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Educational ERP System • Demo Mode
        </p>
      </div>
    </div>
  );
};

export default Login;
