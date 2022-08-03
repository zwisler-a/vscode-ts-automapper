import { TypescriptFunctionGenerator } from "../../automapper/generators/typescript-function.generator";
import { PropertyNameMatcher } from "../../automapper/matchers/property-name.matcher";
import { Entity } from "../../automapper/models/entity";
import { WightedMatchPicker } from "../../automapper/ranking/default-picker";





// You can import and use all API from the 'vscode' module
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
    test('Sample test', () => {
        const nameMatcher = new PropertyNameMatcher();
        const picker = new WightedMatchPicker();
        const tsFuncGenerator = new TypescriptFunctionGenerator();

        const p1: Entity = {
            name: 'P1',
            type: 'Person',
            properties: [
                { name: 'vorname', type: 'string' },
                { name: 'surname', type: 'string' },
                { name: 'tele', type: 'string' },
                { name: 'gender', type: 'string' },
            ]
        };

        const p2: Entity = {
            name: 'P2',
            type: 'PersonDto',
            properties: [
                { name: 'name', type: 'string' },
                { name: 'surname', type: 'string' },
                { name: 'telfon', type: 'string' },
                { name: 'gender', type: 'string' },
            ]
        };

        const candidates = nameMatcher.match(p1, p2);
        const matches = picker.pick(p2, [{ matches: candidates, weight: 1 }]);
        console.log(matches);

        console.log(tsFuncGenerator.genearate(p1, p2, matches));
    });
});








