import AuthAware from './AuthAware';

export default class LikeService extends AuthAware {
    async like(userId: string, vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/likes/like/${vacationId}`, { userId });
        return data;
    }

    async unlike(userId: string, vacationId: string): Promise<boolean> {
        const { data } = await this.axiosInstance.post<boolean>(`/likes/unlike/${vacationId}`, { userId });
        return data;
    }

    async getUsersLikes(userId: string): Promise<[]> {
        const { data } = await this.axiosInstance.get<[]>(`/likes/liked/${userId}`);
        return data;
    }

    async getLikesDistribution(): Promise<[]> {
        const { data } = await this.axiosInstance.get<[]>('/likes/all');
        return data;
    }
}
