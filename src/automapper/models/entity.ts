import { Property } from "./property";

export interface Entity {
    name: string;
    type: string;
    properties: Property[];
}