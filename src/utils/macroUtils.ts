import { evaluate } from 'mathjs';
import { Macro, MacroQuery, QueryLookup } from '../types';

const rollReplacer = (
    match: string,
    dieCount: string,
    dieSides: string,
    ...args: any
) => {
    const parsedDieCount = parseInt(dieCount || '1');
    const parsedDieSides = parseInt(dieSides);
    const rollValue = [...Array(parsedDieCount)].reduce(
        (prevSum: number) =>
            prevSum + Math.floor(Math.random() * parsedDieSides) + 1,
        0
    );
    return `(${rollValue})`;
};

const expressionReplacer = (match: string, expr: string, ...args: any) => {
    return evaluate(
        expr.replaceAll(
            /(?<dieCount>[0-9]*)d(?<dieSides>[0-9]+)/gi,
            rollReplacer
        )
    ).toString();
};

const queryReplacer =
    (queryValues: QueryLookup = {}) =>
    (match: string, queryId: string, defaultValue: string, ...args: any) => {
        const queryValue = queryValues[queryId];
        return queryValue?.value || queryValue?.defaultValue || '0';
    };

const queryRegex = /\?\{(?<queryId>.*?)(?:\|(?<defaultValue>[0-9]+))?\}/g;

const extractQueries = (content: string): QueryLookup => {
    // Cast twice here to convinve typescript that the queryId really will be present
    const matchGroups = Array.from(content.matchAll(queryRegex)).map(
        (match) => match.groups
    ) as Partial<MacroQuery>[];

    return Object.fromEntries(
        new Map(
            matchGroups.map((matchGroups) => [
                matchGroups.queryId!,
                matchGroups as MacroQuery,
            ])
        )
    );
};

const parseMacro = (macro: Macro) => {
    return macro.content
        .replaceAll(queryRegex, queryReplacer(macro.queries))
        .replaceAll(/\[\[(.*?)\]\]/g, expressionReplacer);
};

export { parseMacro, extractQueries };
