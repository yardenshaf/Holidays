import { useForm } from 'react-hook-form';
import type LoginModel from '../../../models/user/Login';
import { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import authService from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useTitle from '../../../hooks/use-title';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginModel>();
    const authContext = useContext(AuthContext);
    const adminId = 'd3b77620-bf28-11f0-b771-8ae0895f41e6';
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    useTitle('Login');

    async function submit(login: LoginModel) {
        try {
            const { jwt } = await authService.login(login);
            authContext.newJwt(jwt);

            const { roleId } = jwtDecode<{ roleId: string }>(jwt);
            navigate(roleId === adminId ? '/admin' : '/vacations', { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Incorrect email or password.');
        }
    }

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center relative overflow-hidden">
                <h1 className="text-6xl md:text-7xl font-extrabold text-white select-none leading-tight text-center animate-pulse">Holiday Planner</h1>
                <div className="absolute top-20 left-20 w-48 h-48 bg-white/10 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-20 right-40 w-64 h-64 bg-white/5 rounded-full animate-ping-slow"></div>
            </div>

            <div className="w-1/2 flex items-center justify-center px-16">
                <form onSubmit={handleSubmit(submit)} className="w-full max-w-sm md:max-w-md bg-white backdrop-blur-md bg-opacity-80 shadow-2xl rounded-3xl p-12 space-y-6 border border-gray-200">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center select-none mb-6">Welcome Back</h2>

                    {loginError && <p className="text-red-600 text-center font-medium">{loginError}</p>}

                    <div className="space-y-5">
                        <div>
                            <input
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    minLength: { value: 7, message: 'Email must be at least 7 characters' },
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input placeholder="Password" type="password" {...register('password', { required: 'Password is required' })} className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition outline-none" />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-transform">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
