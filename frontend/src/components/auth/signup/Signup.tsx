import { useForm } from 'react-hook-form';
import type SignupModel from '../../../models/user/Register';
import { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import authService from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/use-title';

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupModel>();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [apiError, setApiError] = useState<string>('');

    useTitle('Signup');

    async function submit(signup: SignupModel) {
        setApiError('');
        try {
            const { jwt } = await authService.signup(signup);
            authContext.newJwt(jwt);
            navigate('/vacations');
        } catch (error: any) {
            console.error('Signup failed:', error);
            if (error.response?.status === 409) {
                setApiError('This email is already registered. Please login instead.');
            } else if (error.response?.data?.message) {
                setApiError(error.response.data.message);
            } else {
                setApiError('Signup failed. Please try again.');
            }
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
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center select-none mb-6">Create Account</h2>

                    {apiError && <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl">⚠️ {apiError}</div>}

                    <div className="space-y-4">
                        <div>
                            <input
                                placeholder="First Name"
                                {...register('firstName', {
                                    required: 'First name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'First name must be at least 2 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'First name cannot exceed 30 characters',
                                    },
                                })}
                                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName.message}</p>}
                        </div>

                        <div>
                            <input
                                placeholder="Last Name"
                                {...register('lastName', {
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Last name must be at least 2 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Last name cannot exceed 30 characters',
                                    },
                                })}
                                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.lastName.message}</p>}
                        </div>

                        <div>
                            <input
                                placeholder="Email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    minLength: {
                                        value: 7,
                                        message: 'Email must be at least 7 characters',
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Email cannot exceed 255 characters',
                                    },
                                })}
                                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input
                                placeholder="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be at least 4 characters',
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Password cannot exceed 255 characters',
                                    },
                                })}
                                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-transform">
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
