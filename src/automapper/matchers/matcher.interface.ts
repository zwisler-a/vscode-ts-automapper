import { Entity } from "../models/entity";
import { MatchingCandidate } from "../models/matching-candidate";

export interface IMatcher {
    match(from: Entity, to: Entity): MatchingCandidate[];
}