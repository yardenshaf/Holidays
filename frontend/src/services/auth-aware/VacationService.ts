import Vacation from '../../models/vacations/Vacation';
import AuthAware from './AuthAware';

export default class VacationService extends AuthAware {
    async getVacations(): Promise<Vacation[]> {
        const { data } = await this.axiosInstance.get<Vacation[]>(`/vacations`);
        return data;
    }
}
