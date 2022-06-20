export enum TokenType {
    Text = 'Text',
    Dice = 'Dice',
    BeginExpression = 'BeginExpression',
    EndExpression = 'EndExpression',
    Query = 'Query',
}

export interface Token {
    type: TokenType;
    content: string;
    groups?: {
        [key: string]: string | undefined;
    };
}

export enum NodeType {
    Text = 'Text',
    Dice = 'Dice',
    Expression = 'Expression',
    Query = 'Query',
}

export interface QueryValues {
    [queryId: string]: number;
}

export interface ParseNode {
    type: NodeType;
    render: (
        queryValues: QueryValues
    ) => React.ReactNode | React.ReactNode[] | string;
}

export interface TextNode extends ParseNode {
    type: NodeType.Text;
    content: string;
}

export interface DiceNode extends ParseNode {
    type: NodeType.Dice;
    sides: number;
    count: number;
}

export interface ExpressionNode extends ParseNode {
    type: NodeType.Expression;
    children: ParseNode[];
}

export interface QueryNode extends ParseNode {
    type: NodeType.Query;
    queryId: string;
    defaultValue?: number;
}

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
