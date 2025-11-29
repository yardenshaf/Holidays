import { NavLink, useLocation } from 'react-router-dom';
import useUsername from '../../../hooks/use-username';

export default function Header() {
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith('/admin');
    const { username } = useUsername();

    const linkClasses = 'px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-blue-600 hover:text-white';

    function handleSignOut() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }
    return (
        <div className="w-full flex gap-4 items-center bg-gray-800 text-gray-200 p-4 shadow-md">
            {isAdmin && (
                <>
                    <NavLink to="/admin/create" className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-700'}`}>
                        Create Vacation
                    </NavLink>

                    <NavLink to="/admin" className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-700'}`}>
                        Vacations
                    </NavLink>
                    <NavLink to="/admin/stats" className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-700'}`}>
                        Stats
                    </NavLink>
                </>
            )}
            {username && <span className="mr-auto font-semibold">Hello, {username}</span>}

            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
}
