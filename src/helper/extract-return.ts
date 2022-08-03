import { FunctionDeclaration, Signature, TypeChecker } from "ts-morph";
import { Entity } from "../automapper/models/entity";

export function extractReturn(signature: Signature, func: FunctionDeclaration, typeChecker: TypeChecker): Entity {
    const returnType = signature.getReturnType();
    const returnTypeProps = returnType.getProperties().map(prop => ({
        name: prop.getName(),
        type: typeChecker.getTypeOfSymbolAtLocation(prop, func).getApparentType().getText()
    }));
    const returnEntity = {
        name: "",
        type: returnType.getSymbolOrThrow().getName(),
        properties: returnTypeProps
    };
    return returnEntity;
}