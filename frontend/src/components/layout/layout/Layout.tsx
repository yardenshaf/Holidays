import { useContext, useState } from 'react';
import AuthContext from '../../auth/auth/AuthContext';
import Signup from '../../auth/signup/Signup';
import Login from '../../auth/login/Login';
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

export default function Layout() {
    const authContext = useContext(AuthContext);
    const isLoggedIn = !!authContext?.jwt;
    const [view, setView] = useState<'login' | 'signup'>('login');

    if (isLoggedIn) {
        return (
            <div className="min-h-screen flex flex-col">
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <Header />
                </header>
                <main className="flex-1 p-4">
                    <Main />
                </main>
                <footer className="bg-gray-200 p-4 text-center">
                    <Footer />
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {view === 'login' && <Login />}
            {view === 'signup' && <Signup />}

            <div className="fixed bottom-4 right-4 z-10 w-full max-w-xs p-4 bg-white rounded-lg shadow-xl text-center">
                <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="w-full py-2 text-blue-600 font-medium hover:text-white hover:bg-blue-600 border border-blue-600 rounded-lg transition">
                    {view === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}
