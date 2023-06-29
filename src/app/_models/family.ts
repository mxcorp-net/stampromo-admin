import {Status} from './enums/status';
import {FamilyAttribute} from './family.attribute';

export class Family {
    id: number;
    name: string;
    description: string;
    attributes: FamilyAttribute[];
    status: Status;
}
