import { FunctionDeclaration, Signature, TypeChecker } from "ts-morph";
import { Entity } from "../automapper/models/entity";

export function extractParams(signature: Signature, func: FunctionDeclaration, typeChecker: TypeChecker): Entity[] {
    const params = signature.getParameters();
    const paramEntities = params.map(param => {
        const paramType = typeChecker.getTypeOfSymbolAtLocation(param, func)
        return {
            name: param.getName(),
            type: paramType.getSymbolOrThrow().getName(),
            properties: paramType.getProperties().map(prop => ({
                name: prop.getName(),
                type: typeChecker.getTypeOfSymbolAtLocation(prop, func).getApparentType().getText()
            }))
        };
    });
    return paramEntities;
}