import { useAppDispatcher, useAppSelector } from '../../../../redux/hooks';
import { useForm } from 'react-hook-form';
import type VacationDraft from '../../../../models/vacations/Vacation-draft';
import { init, updateVacation } from '../../../../redux/vacation-slice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useService from '../../../../hooks/use-service';
import VacationService from '../../../../services/auth-aware/VacationService';
import AdminService from '../../../../services/auth-aware/AdminService';

export default function EditVacation() {
    const { register, handleSubmit, reset, formState } = useForm<VacationDraft>();
    const vacationService = useService(VacationService);
    const adminService = useService(AdminService);
    const [imgSrc, setImgSrc] = useState<string>();

    const { id } = useParams<'id'>();

    const dispatch = useAppDispatcher();
    const vacation = useAppSelector((state) => state.vacationSlice.vacations.find((v) => v.id === id));

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (!vacation) {
                const fetchedVacations = await vacationService.getVacations();
                dispatch(init(fetchedVacations));
            } else {
                const { destination, description, startDate, endDate, price, file } = vacation;

                const formatDate = (iso: string) => iso.split('T')[0];

                if (file) {
                    setImgSrc(`${import.meta.env.VITE_S3_URL}/holidays.images.weezer.com/seed/${file}`);
                }

                reset({
                    destination,
                    description,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    price,
                    image: undefined,
                });
            }
        })();
    }, [dispatch, vacation, reset]);

    async function submit(draft: VacationDraft) {
        try {
            // Handle the file properly like in AddVacation
            const file = (draft.image as unknown as FileList)?.[0];
            const payload = { ...draft, image: file };

            const updatedVacation = await adminService.updateVacation(id, payload);
            reset();
            dispatch(updateVacation(updatedVacation));
            navigate('/admin');
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="EditVacation min-h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-lg bg-[#1a1d23] p-6 rounded-2xl shadow-xl border border-gray-700 space-y-4">
                <input
                    placeholder="Where are we flying to?"
                    className="w-full p-3 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    {...register('destination', {
                        required: 'Destination is required',
                        minLength: { value: 3, message: 'Destination must be at least 3 characters long' },
                        maxLength: { value: 20, message: 'Destination must be under 20 characters long' },
                    })}
                />
                <div className="text-red-400 text-sm">{formState.errors.destination?.message}</div>

                <textarea
                    placeholder="Add content"
                    className="w-full p-3 rounded-lg border border-gray-700 text-white placeholder-gray-400 h-28 resize-none focus:outline-none focus:border-blue-500"
                    {...register('description', {
                        required: 'Description is required',
                        minLength: { value: 10, message: 'Description must be at least 10 characters long' },
                    })}
                />
                <div className="text-red-400 text-sm">{formState.errors.description?.message}</div>

                <input type="date" className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-500" {...register('startDate', { required: 'Start date is required' })} />
                <div className="text-red-400 text-sm">{formState.errors.startDate?.message}</div>

                <input type="date" className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-500" {...register('endDate', { required: 'End date is required' })} />
                <div className="text-red-400 text-sm">{formState.errors.endDate?.message}</div>

                <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-3 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' },
                    })}
                />
                <div className="text-red-400 text-sm">{formState.errors.price?.message}</div>

                <div>
                    <label className="block text-gray-400 mb-2">Upload New Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 rounded-lg border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        {...register('image')}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setImgSrc(URL.createObjectURL(file));
                        }}
                    />
                </div>

                {imgSrc && (
                    <div>
                        <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
                        <img src={imgSrc} className="w-full h-48 object-cover rounded-lg" alt="Preview" />
                    </div>
                )}
                <div className="text-red-400 text-sm">{formState.errors.image?.message}</div>

                <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                    Update Vacation
                </button>
            </form>
        </div>
    );
}
