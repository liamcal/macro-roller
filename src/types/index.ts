export interface Macro {
    macroId: string;
    name: string;
    content: string;
    queries: QueryLookup;
}

export interface QueryLookup {
    [k: string]: MacroQuery;
}

export interface MacroQuery {
    queryId: string;
    defaultValue?: string;
    value?: string;
}
