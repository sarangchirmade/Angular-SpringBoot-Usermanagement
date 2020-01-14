import { User } from 'src/app/models/user.model';
import { Action } from '@ngrx/store';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

const initialState: User = {
    id:1,
    firstName: 'Sarang',
    lastName: 'Chirmade',
    email: 'sarang@gmail.com',
    phone: 123647890,
    role: {
        id: 1,
        name: 'Admin',
        roleid: 1
    },
    userPassword: '232323232'
}

export function addUserReducer(state:  User[] = [initialState], action) {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload];
        case DELETE_USER:
            return [...state.filter(({ id }) => id != action.id) ];


        default:
            return state;
    }
}