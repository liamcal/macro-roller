import React from 'react';

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

export interface TextNode {
    type: NodeType.Text;
    content: string;
}

export interface DiceNode {
    type: NodeType.Dice;
    sides: number;
    count: number;
    successRange?: number;
    failRange?: number;
}

export interface ExpressionNode {
    type: NodeType.Expression;
    children: ParseNode[];
}

export interface QueryNode {
    type: NodeType.Query;
    queryId: string;
    defaultValue?: number;
}

export type ParseNode = TextNode | DiceNode | ExpressionNode | QueryNode;

export interface RenderResult<T = undefined> {
    result: string | number | React.ReactNode;
    state?: T;
}

export interface Macro {
    macroId: string;
    name: string;
    content: string;
    queries: QueryLookup;
    compiledMacro: ParseNode[];
}

export interface QueryLookup {
    [k: string]: MacroQuery;
}

export interface MacroQuery {
    queryId: string;
    defaultValue?: string;
    value?: string;
}
