import { Entity } from "../models/entity";
import { Match } from "../models/entity-matching";
import { MatchingCandidate } from "../models/matching-candidate";

export class WightedMatchPicker {
    pick(target: Entity, candidateWeights: { weight: number, matches: MatchingCandidate[] }[]): Match[] {
        const weightAdjustedConfidenceCandidates = candidateWeights.flatMap(
            candidatesWeight => candidatesWeight.matches.map(
                match => ({ ...match, confidence: candidatesWeight.weight * match.confidence })
            )
        );
        const aggregatedCandidates = this.aggregateCandidates(weightAdjustedConfidenceCandidates);
        const sortedCandidates = aggregatedCandidates.sort((a, b) => b.confidence - a.confidence);
        return target.properties.map(property => {
            const matchingCandidate = sortedCandidates.find(candidate => candidate.target === property);
            return {
                source: matchingCandidate?.source ?? property,
                property
            };
        });
    }

    private aggregateCandidates(candidates: MatchingCandidate[]) {
        return candidates.reduce((acc, candidate) => {
            const existing = acc.find(c => c.source === candidate.source && c.target === candidate.target);
            if (existing) {
                existing.confidence += candidate.confidence;
            } else {
                acc.push(candidate);
            }
            return acc;
        }, [] as MatchingCandidate[]);
    }

}