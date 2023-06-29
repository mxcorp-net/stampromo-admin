import {Status} from './enums/status';

export class Provider {
    id: number;
    name: string;
    businessName: string;
    rfc: string;

    status: Status;
}
