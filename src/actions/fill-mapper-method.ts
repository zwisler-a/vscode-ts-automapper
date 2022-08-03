import * as vscode from 'vscode';
import { TypescriptFunctionGenerator } from '../automapper/generators/typescript-function.generator';
import { PropertyNameMatcher } from '../automapper/matchers/property-name.matcher';
import { PropertyTypeMatcher } from '../automapper/matchers/property-type.matcher';
import { WightedMatchPicker } from '../automapper/ranking/default-picker';
import { compileProgramm } from "../helper/compile-programm";
import { extractParams } from "../helper/extract-parameters";
import { extractReturn } from "../helper/extract-return";
import { getFunction } from "../helper/get-function";

export const fillMapperMethod = async (editor: vscode.TextEditor | undefined): Promise<any> => {
    if (!editor || !vscode.workspace.workspaceFolders) {
        return;
    }
    editor.document.save();
    const project = compileProgramm();
    if (!project) {
        return;
    }

    const func = getFunction(project, editor);
    if (!func) {
        return;
    }

    const signature = func.getSignature();
    const typeChecker = project.getTypeChecker();

    const returnEntity = extractReturn(signature, func, typeChecker);
    const paramEntities = extractParams(signature, func, typeChecker);

    if (paramEntities.length !== 1) { return; }
    const paramEntity = paramEntities[0];

    const nameMatcher = new PropertyNameMatcher();
    const typeMatcher = new PropertyTypeMatcher();

    const picker = new WightedMatchPicker();
    const tsFuncGenerator = new TypescriptFunctionGenerator();
    const nameCandidates = nameMatcher.match(paramEntity, returnEntity);
    const typeCandidates = typeMatcher.match(paramEntity, returnEntity);
    const matches = picker.pick(returnEntity, [{
        weight: 1,
        matches: nameCandidates
    }, {
        weight: 10,
        matches: typeCandidates
    }]);

    const mapperCode = tsFuncGenerator.genearate(paramEntity, returnEntity, matches);


    const file = project.getSourceFile(editor.document.fileName);
    if (!file) { return; }


    editor.edit(editBuilder => {

        editBuilder.replace(new vscode.Range(
            new vscode.Position(
                file.getLineAndColumnAtPos(func.getBody()?.getPos() ?? 0).line - 1,
                file.getLineAndColumnAtPos(func.getBody()?.getPos() ?? 0).column + 1,
            ),
            new vscode.Position(
                file.getLineAndColumnAtPos(func.getBody()?.getEnd() ?? 0).line - 1,
                file.getLineAndColumnAtPos(func.getBody()?.getEnd() ?? 0).column - 2,
            )
        )
            , mapperCode);
    });

    editor.selection = new vscode.Selection(
        file.getLineAndColumnAtPos(func.getBody()?.getPos() ?? 0).line - 1,
        file.getLineAndColumnAtPos(func.getBody()?.getPos() ?? 0).column + 1,
        file.getLineAndColumnAtPos(func.getBody()?.getEnd() ?? 0).line - 1,
        file.getLineAndColumnAtPos(func.getBody()?.getEnd() ?? 0).column - 2,
    );

};

