import { Status } from "./enums/status";
import {Family} from './family';

export class Product {
    id: number;
    name: string;
    description: string;
    provider_id: number;
    family_id: number;
    status: Status;

    image_default: string;
    family: Family;
}
