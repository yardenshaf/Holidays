import VacationDraft from './Vacation-draft';

export default class Vacation extends VacationDraft {
    id: string;
    likesCount: number;
    file: string | null;
}
