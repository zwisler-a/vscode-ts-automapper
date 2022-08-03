import { Entity } from "../models/entity";
import { Match } from "../models/entity-matching";

export interface IGenerator {

    genearate(source: Entity, target: Entity, matches: Match[]): string;

}