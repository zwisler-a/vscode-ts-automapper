import * as ts from 'typescript';
import * as vscode from 'vscode';
import { FunctionDeclaration, Node, Project } from "ts-morph";

export function getFunction(project: Project, editor: vscode.TextEditor | undefined) {
    if (!editor || !vscode.workspace.workspaceFolders) {
        return;
    }
    
    const file = project.getSourceFile(editor.document.fileName);
    if (!file) {return;}
    console.log(editor.selection.start.line, editor.selection.start.character)
    const pos = file.compilerNode.getPositionOfLineAndCharacter(editor.selection.start.line, editor.selection.start.character);

    const childPath = getChildPath(file, pos);
    if (!childPath) {return;}
    const func: FunctionDeclaration = childPath?.reverse().find(node => (node.getKind() === ts.SyntaxKind.FunctionDeclaration || node.getKind() === ts.SyntaxKind.MethodDeclaration)) as any;
    return func;
}



function getChildPath(node: Node<ts.Node>, pos: number): Node<ts.Node>[] | null {
    const child = node.getChildAtPos(pos);
    if (child) {
        const nextChild = getChildPath(child, pos)
        if (nextChild) {
            return [child, ...nextChild];
        } else {
            return [child];
        }
    } else {
        return null;
    }
}
