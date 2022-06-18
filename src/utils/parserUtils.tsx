import React from 'react';
import {
    DiceNode,
    NodeType,
    ParseNode,
    QueryNode,
    QueryValues,
    TextNode,
    Token,
    TokenType,
} from '../types';

const composeRegexes = (regexes: RegExp[]) =>
    new RegExp(`(${regexes.map((regex) => regex.source).join('|')})`);

const beginExpressionRegex = /(?:\[\[)/g;
const endExpressionRegex = /(?:\]\])/g;
const queryRegex = /(?:\?\{.+?(?=\|[0-9]+)?\})/g;
const queryCaptureRegex =
    /(?:\?\{(?<queryId>.+?)(?:\|(?<defaultValue>[0-9]+))?\})/g;

const diceRegex = /(?:[0-9]*?d[0-9]+)/g;
const diceCapturingRegex = /(?<count>[0-9]+)?d(?<sides>[0-9]+)/g;

const tokenizerRegex = composeRegexes([
    beginExpressionRegex,
    endExpressionRegex,
    queryRegex,
    diceRegex,
]);

const buildToken = (tokenContent: string): Token => {
    const beginExpressionMatch = beginExpressionRegex.exec(tokenContent);
    if (beginExpressionMatch) {
        return {
            type: TokenType.BeginExpression,
            content: tokenContent,
        };
    }

    const endExpressionMatch = endExpressionRegex.exec(tokenContent);
    if (endExpressionMatch) {
        return {
            type: TokenType.EndExpression,
            content: tokenContent,
        };
    }

    const diceMatch = diceCapturingRegex.exec(tokenContent);
    if (diceMatch) {
        return {
            type: TokenType.Dice,
            content: tokenContent,
            groups: diceMatch.groups,
        };
    }

    const queryMatch = queryCaptureRegex.exec(tokenContent);
    if (queryMatch) {
        return {
            type: TokenType.Query,
            content: tokenContent,
            groups: queryMatch.groups,
        };
    }

    return { type: TokenType.Text, content: tokenContent };
};

const buildTokens = (rawTokens: string[]) => {
    return rawTokens.map((tokenContent: string) => buildToken(tokenContent));
};

const tokenize = (macroContent: string) => {
    return buildTokens(macroContent.split(tokenizerRegex).filter(Boolean));
};

const buildTextNode = (content: string): TextNode => {
    return {
        type: NodeType.Text,
        content,
        render: () => <React.Fragment>{content}</React.Fragment>,
    };
};

const buildDiceNode = (sides: number, count: number): DiceNode => {
    return {
        type: NodeType.Dice,
        sides,
        count,
        render: () => (
            <React.Fragment>
                {[...Array(count)].reduce(
                    (prevSum: number) =>
                        prevSum + Math.floor(Math.random() * sides) + 1,
                    0
                )}
            </React.Fragment>
        ),
    };
};

const buildQueryNode = (queryId: string, defaultValue: number): QueryNode => {
    return {
        type: NodeType.Query,
        queryId,
        defaultValue,
        render: (queryValues: QueryValues) => (
            <React.Fragment>
                {queryValues[queryId] ?? defaultValue}
            </React.Fragment>
        ),
    };
};

const createNode = (token: Token): ParseNode => {
    switch (token.type) {
        case TokenType.Text:
            return buildTextNode(token.content);
        case TokenType.Dice:
            if (!token.groups?.sides) {
                throw Error(
                    `Failed to build dice node, could not find required match value 'sides' ${token.groups}`
                );
            }
            const count = parseInt(token.groups.count || '1');
            const sides = parseInt(token.groups.sides);
            return buildDiceNode(sides, count);
        case TokenType.Query:
            if (!token.groups?.queryId) {
                throw Error(
                    `Failed to build query node, could not find required match value 'queryId' ${token.groups}`
                );
            }
            const queryId = token.groups.queryId;
            const defaultValue = parseInt(token.groups.defaultValue || '0');
            return buildQueryNode(queryId, defaultValue);
    }
    throw Error(`Unrecognized token type: ${token.type}`);
};

export { tokenize };
