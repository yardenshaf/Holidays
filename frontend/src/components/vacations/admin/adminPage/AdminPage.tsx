import { useAppDispatcher, useAppSelector } from '../../../../redux/hooks';
import { deleteVacation as deleteVacationAction, init } from '../../../../redux/vacation-slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import useService from '../../../../hooks/use-service';
import AdminService from '../../../../services/auth-aware/AdminService';
import VacationService from '../../../../services/auth-aware/VacationService';
import useTitle from '../../../../hooks/use-title';

export default function AdminPage() {
    const vacations = useAppSelector((state) => state.vacationSlice.vacations);
    const dispatch = useAppDispatcher();
    const navigate = useNavigate();
    const adminService = useService(AdminService);
    const vacationService = useService(VacationService);

    useTitle('Admin Dashboard');

    const S3_URL = import.meta.env.VITE_S3_URL;
    const BUCKET = 'holidays.images.weezer.com';

    async function deleteVacation(id: string) {
        if (!confirm('Are you sure you want to delete this vacation?')) return;

        try {
            await adminService.deleteVacation(id);
            dispatch(deleteVacationAction(id));
        } catch (error) {
            console.error('Failed to delete vacation:', error);
            alert('Failed to delete vacation. Please try again.');
        }
    }

    function editVacation(id: string) {
        navigate(`/admin/edit/${id}`);
    }

    useEffect(() => {
        (async () => {
            const allVacations = await vacationService.getVacations();
            dispatch(init(allVacations));
        })();
    }, [dispatch]);

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacations.map((vacation) => {
                    const imageUrl = vacation.file ? (vacation.file.startsWith('/') ? `${S3_URL}${vacation.file}` : `${S3_URL}/${BUCKET}/seed/${vacation.file}`) : null;

                    return (
                        <div key={vacation.id} className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition flex flex-col">
                            <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
                                {imageUrl && <img src={imageUrl} alt={vacation.destination} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />}

                                <div className="absolute right-3 top-3 flex gap-3 z-10">
                                    <button onClick={() => editVacation(vacation.id)} className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition">
                                        <PencilIcon className="h-5 w-5 text-blue-600" />
                                    </button>

                                    <button onClick={() => deleteVacation(vacation.id)} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition">
                                        <TrashIcon className="h-5 w-5 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{vacation.destination}</h2>

                            <p className="text-gray-700 mb-4">{vacation.description}</p>

                            <p className="text-sm text-gray-500 mb-1">
                                {new Date(vacation.startDate).toLocaleDateString()} → {new Date(vacation.endDate).toLocaleDateString()}
                            </p>

                            <p className="text-lg font-bold text-blue-600">${vacation.price.toFixed(2)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
