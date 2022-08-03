import { Entity } from "../models/entity";
import { MatchingCandidate } from "../models/matching-candidate";
import { IMatcher } from "./matcher.interface";

export class PropertyTypeMatcher implements IMatcher {
    constructor() { }
    public match(soruce: Entity, target: Entity): MatchingCandidate[] {
        const matches: MatchingCandidate[] = [];
        soruce.properties.forEach(sourceProperty => {
            target.properties.forEach(targetProperty => {
                matches.push({
                    source: sourceProperty,
                    target: targetProperty,
                    confidence: sourceProperty.type === targetProperty.type ? 1 : 0
                });
            });
        }
        );
        return matches.sort((a, b) => b.confidence - a.confidence);
    }

}