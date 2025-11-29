import { useAppDispatcher } from '../../../../redux/hooks';
import { useForm } from 'react-hook-form';
import type VacationDraft from '../../../../models/vacations/Vacation-draft';
import { newVacation } from '../../../../redux/vacation-slice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useService from '../../../../hooks/use-service';
import AdminService from '../../../../services/auth-aware/AdminService';

export default function AddVacation() {
    const { register, handleSubmit, reset, formState } = useForm<VacationDraft>();
    const dispatch = useAppDispatcher();
    const navigate = useNavigate();
    const adminService = useService(AdminService);
    const [imgSrc, setImgSrc] = useState<string>();

    async function submit(draft: VacationDraft) {
        try {
            const file = (draft.image as unknown as FileList)?.[0];
            const payload = { ...draft, image: file };

            const vacation = await adminService.createVacation(payload);

            reset();
            dispatch(newVacation(vacation));
            navigate('/admin');
        } catch (e) {
            console.error('Create error:', e);
            alert(e);
        }
    }

    return (
        <div className="w-full flex justify-center pt-10">
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 text-gray-200">
                <input
                    placeholder="Where are we flying to?"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    {...register('destination', {
                        required: 'Destination is required',
                        minLength: { value: 3, message: 'Destination must be at least 3 characters long' },
                        maxLength: { value: 50, message: 'Destination must be under 50 characters long' },
                    })}
                />
                <div className="text-red-400 text-sm">{formState.errors.destination?.message}</div>

                <textarea
                    placeholder="Add content"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition h-28 resize-none"
                    {...register('description', {
                        required: 'Description is required',
                        minLength: { value: 10, message: 'Description must be at least 10 characters long' },
                    })}
                ></textarea>
                <div className="text-red-400 text-sm">{formState.errors.description?.message}</div>

                <input type="date" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition" {...register('startDate', { required: 'Start date is required' })} />
                <div className="text-red-400 text-sm">{formState.errors.startDate?.message}</div>

                <input type="date" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition" {...register('endDate', { required: 'End date is required' })} />
                <div className="text-red-400 text-sm">{formState.errors.endDate?.message}</div>

                <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' },
                    })}
                />
                <div className="text-red-400 text-sm">{formState.errors.price?.message}</div>

                <div>
                    <label className="block text-gray-300 mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        {...register('image')}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setImgSrc(URL.createObjectURL(file));
                        }}
                    />
                </div>

                {imgSrc && (
                    <div>
                        <p className="text-gray-300 text-sm mb-2">Image Preview:</p>
                        <img src={imgSrc} className="w-full h-48 object-cover rounded-lg" alt="Preview" />
                    </div>
                )}
                <div className="text-red-400 text-sm">{formState.errors.image?.message}</div>

                <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
                    Add Vacation
                </button>
            </form>
        </div>
    );
}
