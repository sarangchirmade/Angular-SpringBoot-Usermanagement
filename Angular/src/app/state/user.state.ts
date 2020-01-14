import { User } from '../models/user.model';

export interface UserState {
    readonly user: User[];
    loadData: boolean;
}