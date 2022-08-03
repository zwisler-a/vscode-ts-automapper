import * as vscode from 'vscode';
import { fillMapperMethod } from './actions/fill-mapper-method';

export function activate(context: vscode.ExtensionContext) {
	console.log('Activated automapper extension');
	let disposable = vscode.commands.registerCommand('vs-automapper.generateMappingBody', () => {
		fillMapperMethod(vscode.window.activeTextEditor);
	});
	context.subscriptions.push(disposable);

}

export function deactivate() { }
