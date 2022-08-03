import { Project } from "ts-morph";
import * as vscode from 'vscode';

export function compileProgramm() {
    if (!vscode.workspace.workspaceFolders) {
        return;
    }
    const wsuri = vscode.workspace.workspaceFolders[0].uri;
    const project = new Project({
        tsConfigFilePath: wsuri.toString().replace('file:', '') + '/tsconfig.json'
    });
    return project;
}