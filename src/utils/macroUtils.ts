import { evaluate } from 'mathjs';

const rollReplacer = (match: string, ...args: any) => {
    const maxValue = parseInt(match.slice(1));
    const rollValue = Math.floor(Math.random() * maxValue) + 1;
    return `(${rollValue})`;
};

const expressionReplacer = (match: string, expr: string, ...args: any) => {
    return evaluate(expr.replaceAll(/d[0-9]+/gi, rollReplacer)).toString();
};

const queryReplacer =
    (queryValues: QueryLookup = {}) =>
    (match: string, queryId: string, defaultValue: string, ...args: any) => {
        const queryValue = queryValues[queryId];
        return queryValue?.value || queryValue?.defaultValue || '0';
    };

const queryRegex = /\?\{(?<queryId>.*?)(?:\|(?<defaultValue>[0-9]+))?\}/g;

const extractQueries = (macro: string): QueryLookup => {
    // Cast twice here to convinve typescript that the queryId really will be present
    const matchGroups = Array.from(macro.matchAll(queryRegex)).map(
        (match) => match.groups
    ) as Partial<MacroQuery>[];

    // return matchGroups.reduce(
    //     (obj, query) => ({ ...obj, [query.defaultValue!]: query }),
    //     {}
    // );

    return Object.fromEntries(
        new Map(
            matchGroups.map((matchGroups) => [
                matchGroups.queryId!,
                matchGroups as MacroQuery,
            ])
        )
    );
};

const parseMacro = (macro: string, queries: QueryLookup = {}) => {
    return macro
        .replaceAll(queryRegex, queryReplacer(queries))
        .replaceAll(/\[\[(.*?)\]\]/g, expressionReplacer);
};

export type QueryLookup = {
    [k: string]: MacroQuery;
};

export interface MacroQuery {
    queryId: string;
    defaultValue?: string;
    value?: string;
}
export { parseMacro, extractQueries };
