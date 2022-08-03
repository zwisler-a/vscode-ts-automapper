import { Property } from "./property";

export interface MatchingCandidate {
    source: Property;
    target: Property;
    confidence: number;
}