import {Status} from './status';

export class User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    status: Status;
    token?: string;
    user: User;
}
