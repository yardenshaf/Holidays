import { Routes, Route, Navigate } from 'react-router-dom';
import Vacations from '../../vacations/vacations/Vacations';
import AddVacation from '../../vacations/admin/addVacation/AddVacation';
import EditVacation from '../../vacations/admin/editVacation/EditVacation';
import AdminPage from '../../vacations/admin/adminPage/AdminPage';
import NotFound from '../not-found/NotFound';
import useUser from '../../../hooks/use-user';
import Stats from '../../stats/Stats';

export default function Main() {
    const user = useUser();
    const ADMIN_ROLE_ID = 'd3b77620-bf28-11f0-b771-8ae0895f41e6';
    const isAdmin = user.roleId === ADMIN_ROLE_ID;

    return (
        <Routes>
            <Route path="/" element={user === null ? null : user.roleId === ADMIN_ROLE_ID ? <Navigate to="/admin" replace /> : <Navigate to="/vacations" replace />} />
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/vacations" replace />} />
            <Route path="/admin/create" element={isAdmin ? <AddVacation /> : <Navigate to="/vacations" replace />} />
            <Route path="/admin/stats" element={isAdmin ? <Stats /> : <Navigate to="/vacations" replace />} />
            <Route path="/admin/edit/:id" element={isAdmin ? <EditVacation /> : <Navigate to="/vacations" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
