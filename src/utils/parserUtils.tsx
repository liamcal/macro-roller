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

export { tokenize };
