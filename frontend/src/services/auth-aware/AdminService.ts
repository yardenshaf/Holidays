import type VacationDraft from '../../models/vacations/Vacation-draft';
import type Vacation from '../../models/vacations/Vacation';
import AuthAware from './AuthAware';

export default class AdminService extends AuthAware {
    async createVacation(draft: VacationDraft): Promise<Vacation> {
        const response = await this.axiosInstance.post<Vacation>(`/admin`, draft, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async updateVacation(vacationId: string, vacation: VacationDraft): Promise<Vacation> {
        const { data } = await this.axiosInstance.patch<Vacation>(`/admin/${vacationId}`, vacation, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    }
    async deleteVacation(vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.delete<boolean>(`/admin/${vacationId}`);
        return data;
    }
}
