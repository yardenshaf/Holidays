import { useEffect, useState } from 'react';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import { like, unlike, userLikes } from '../../../redux/likes-slice';
import { init, updateLikesCount } from '../../../redux/vacation-slice';
import useUser from '../../../hooks/use-user';
import useService from '../../../hooks/use-service';
import VacationService from '../../../services/auth-aware/VacationService';
import LikeService from '../../../services/auth-aware/LikeService';
import useTitle from '../../../hooks/use-title';

export default function Vacations() {
    const user = useUser();
    const dispatch = useAppDispatcher();
    const likedVacations = useAppSelector((state) => state.likesSlice.likedVacations);
    const vacations = useAppSelector((state) => state.vacationSlice.vacations);
    const vacationService = useService(VacationService);
    const likeService = useService(LikeService);

    useTitle('Vacations');

    const [filter, setFilter] = useState<'all' | 'liked' | 'upcoming' | 'active'>('all');
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        (async () => {
            const vacationsData = await vacationService.getVacations();
            dispatch(init(vacationsData));

            const likedIds = await likeService.getUsersLikes(user.userId);
            dispatch(userLikes(likedIds));
        })();
    }, [user.userId, dispatch]);

    async function handleLike(vacationId: string) {
        const isLiked = likedVacations.includes(vacationId);
        let response;

        if (isLiked) dispatch(unlike(vacationId));
        else dispatch(like(vacationId));

        try {
            response = isLiked ? await likeService.unlike(user.userId, vacationId) : await likeService.like(user.userId, vacationId);

            dispatch(updateLikesCount({ vacationId, likesCount: response.likesCount }));
        } catch (err) {
            console.error('Like/Unlike API call failed, rolling back UI state.', err);
            if (isLiked) dispatch(like(vacationId));
            else dispatch(unlike(vacationId));
        }
    }

    const filteredVacations = vacations.filter((vacation) => {
        const now = new Date();
        if (filter === 'liked') return likedVacations.includes(vacation.id);
        if (filter === 'upcoming') return new Date(vacation.startDate) > now;
        if (filter === 'active') return new Date(vacation.startDate) <= now && new Date(vacation.endDate) >= now;
        return true;
    });

    const visibleVacations = filteredVacations.slice(0, visibleCount);

    const S3_URL = import.meta.env.VITE_S3_URL;
    const BUCKET = 'holidays.images.weezer.com';

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Filters */}
            <div className="mb-6 flex justify-center gap-4 flex-wrap">
                {['all', 'liked', 'upcoming', 'active'].map((f) => (
                    <button
                        key={f}
                        onClick={() => {
                            setFilter(f as typeof filter);
                            setVisibleCount(6); // reset when changing filter
                        }}
                        className={`px-4 py-2 rounded-lg transition ${filter === f ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleVacations.map((vacation) => {
                    const isLiked = likedVacations.includes(vacation.id);

                    const imageUrl = vacation.file ? (vacation.file.startsWith('/') ? `${S3_URL}${vacation.file}` : `${S3_URL}/${BUCKET}/seed/${vacation.file}`) : null;

                    return (
                        <div key={vacation.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            {imageUrl && (
                                <div className="w-full h-48 overflow-hidden rounded-t-xl">
                                    <img src={imageUrl} alt={vacation.destination} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                                </div>
                            )}

                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{vacation.destination}</h2>
                                <p className="text-gray-600 flex-1">{vacation.description}</p>
                                <p className="text-gray-500 mt-2 text-sm">
                                    {new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-800 font-semibold mt-1">${vacation.price.toFixed(2)}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-gray-700 font-medium">{vacation.likesCount} Likes</div>
                                    <button onClick={() => handleLike(vacation.id)} aria-label={isLiked ? 'Unlike this vacation' : 'Like this vacation'} className={`px-3 py-1 rounded-lg transition ${isLiked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                        {isLiked ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Load More button */}
            {visibleCount < filteredVacations.length && (
                <div className="flex justify-center mt-6">
                    <button onClick={() => setVisibleCount((prev) => prev + 6)} className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
