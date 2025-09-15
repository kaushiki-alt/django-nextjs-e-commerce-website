"use client"
import React, {useState, useEffect} from 'react';
import useRequestState from "@/hooks/useRequestState";
import authApi from '@/utils/authApi';
import { useRouter } from 'next/navigation';

const Page = () => {
  const {run, error, loading, success} = useRequestState();
  const [formData, setFormData] = useState({
    email : '',
    password: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [success, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email_address: formData.email,
      password: formData.password,
    }

    try {
      await run(() => authApi.post('/token/', data));
      console.log('Form submitted:', data);
      setFormData({email : '',
    password: '',
  })
    } catch (err) {
      console.error("Error", err);

    }
  };

  return (
    <main className="flex items-center justify-center bg-bg-primary/100 min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card-bg rounded-lg shadow-lg border border-card-border ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary">Sign In</h1>
          <p className="text-text-muted mt-2">Welcome back! Please sign in to your account.</p>
        </div>

        {success && <p className="text-green-500 text-center">Sign in successful! Redirecting to homepage...</p>}
        {error && <p className="text-red-500 text-center">Error: {error?.message || 'Something went wrong'}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-input-bg border border-input-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-input-bg border border-input-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-accent hover:underline">Sign Up</a>
        </p>
      </div>
    </main>
  );
};

export default Page;