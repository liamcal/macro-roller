import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { evaluate } from 'mathjs';

import {
    DiceNode,
    ExpressionNode,
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
        render: () => content,
    };
};

const buildDiceNode = (sides: number, count: number): DiceNode => {
    return {
        type: NodeType.Dice,
        sides,
        count,
        render: () => {
            const rolls = [...Array(count)].map(
                () => Math.floor(Math.random() * sides) + 1
            );
            return `(${rolls.join(' + ')})`;
        },
    };
};

const buildExpressionNode = (children: ParseNode[]): ExpressionNode => {
    return {
        type: NodeType.Expression,
        children,
        render: (queryValues: QueryValues) => {
            const renderedChildren = children
                .map((child: ParseNode, i: number) => child.render(queryValues))
                .join('');
            return (
                <Tooltip
                    disableFocusListener={true}
                    placement="top"
                    title={renderedChildren}
                    enterTouchDelay={100}
                >
                    <Button
                        sx={{
                            textAlign: 'start',
                            fontSize: '1.25rem',
                            minHeight: 0,
                            minWidth: 0,
                            padding: '0 0.25rem',
                            lineHeight: '1.5rem',
                        }}
                        variant="outlined"
                    >
                        {evaluate(renderedChildren)}
                    </Button>
                </Tooltip>
            );
        },
    };
};

const buildQueryNode = (queryId: string, defaultValue: number): QueryNode => {
    return {
        type: NodeType.Query,
        queryId,
        defaultValue,
        render: (queryValues: QueryValues) =>
            queryValues[queryId] ?? defaultValue,
    };
};

const parseInner = (tokenQueue: Token[], parentNodeType?: NodeType) => {
    const result: ParseNode[] = [];
    let currentToken = tokenQueue.shift();
    while (currentToken) {
        switch (currentToken.type) {
            case TokenType.Text:
                result.push(buildTextNode(currentToken.content));
                break;
            case TokenType.Dice:
                if (parentNodeType !== NodeType.Expression) {
                    throw Error(
                        `Parse error, dice expression with invalid parent node type: ${
                            parentNodeType ?? 'None'
                        }`
                    );
                }
                if (!currentToken.groups?.sides) {
                    throw Error(
                        `Failed to parse dice expression, could not find required match value 'sides' ${currentToken.groups}`
                    );
                }
                const count = parseInt(currentToken.groups.count || '1');
                const sides = parseInt(currentToken.groups.sides);
                result.push(buildDiceNode(sides, count));
                break;
            case TokenType.Query:
                if (parentNodeType !== NodeType.Expression) {
                    throw Error(
                        `Parse error, query expression with invalid parent node type: ${
                            parentNodeType ?? 'None'
                        }`
                    );
                }
                if (!currentToken.groups?.queryId) {
                    throw Error(
                        `Failed to parse query expression, could not find required match value 'queryId' ${currentToken.groups}`
                    );
                }
                const queryId = currentToken.groups.queryId;
                const defaultValue = parseInt(
                    currentToken.groups.defaultValue || '0'
                );
                result.push(buildQueryNode(queryId, defaultValue));
                break;
            case TokenType.BeginExpression:
                const children = parseInner(tokenQueue, NodeType.Expression);
                result.push(buildExpressionNode(children));
                break;
            case TokenType.EndExpression:
                if (parentNodeType !== NodeType.Expression) {
                    throw Error(
                        `Parse error, close expression tag without corresponding open tag`
                    );
                }
                return result;
            default:
                throw Error(`Unrecognized token type: ${currentToken.type}`);
        }
        currentToken = tokenQueue.shift();
    }
    if (parentNodeType === NodeType.Expression) {
        throw Error(`Parse error, unclosed expression tag`);
    }
    return result;
};

const parseTokens = (tokens: Token[]) => {
    const tokensCopy = [...tokens];
    return parseInner(tokensCopy);
};

const compileMacro = (macroContent: string) => {
    return parseTokens(tokenize(macroContent));
};

const renderCompiledMacro = (nodes: ParseNode[], queryValues: QueryValues) => {
    return (
        <React.Fragment>
            {nodes.map((node: ParseNode, i: number) => (
                <React.Fragment key={i}>
                    {node.render(queryValues)}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};
export { tokenize, parseTokens, compileMacro, renderCompiledMacro };
