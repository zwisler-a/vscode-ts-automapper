import { Entity } from "../models/entity";
import { Match } from "../models/entity-matching";
import { IGenerator } from "./generator";

export class TypescriptFunctionGenerator implements IGenerator {

    genearate(source: Entity, target: Entity, matches: Match[]): string {
        return `
                return {
                ${matches.map(match => `${match.property.name}: ${source.name}.${match.source.name}`).join(",\n")}
                }
`
    }

}