import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { evaluate } from 'mathjs';
import {
    Adjustment,
    DiceNode,
    ExpressionNode,
    NodeType,
    ParseNode,
    QueryNode,
    QueryValues,
    RenderResult,
    TextNode,
    Token,
    TokenType,
} from '../types';

const composeRegexes = (regexes: RegExp[]) =>
    new RegExp(`(${regexes.map((regex) => regex.source).join('|')})`);

const beginExpressionRegex = /(?:\[\[)/;
const endExpressionRegex = /(?:\]\])/;
const queryRegex = /(?:\?\{.+?(?=\|[0-9]+)?\})/;
const queryCaptureRegex =
    /(?:\?\{(?<queryId>.+?)(?:\|(?<defaultValue>[0-9]+))?\})/;

const diceRegex = /(?:[0-9]*?d[0-9]+(?:cs>[0-9]+)?(?:cf<[0-9]+)?)/;
const diceCapturingRegex =
    /(?<count>[0-9]+)?d(?<sides>[0-9]+)(?:cs>(?<successRange>[0-9]+))?(?:cf<(?<failRange>[0-9]+))?/;

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
    };
};

const renderTextNode = ({ content }: TextNode): RenderResult => {
    return { result: content };
};

const buildDiceNode = (
    sides: number,
    count: number,
    successRange?: number,
    failRange?: number
): DiceNode => {
    return {
        type: NodeType.Dice,
        sides,
        count,
        successRange,
        failRange,
    };
};

enum CritStatus {
    None = 'None',
    Success = 'Success',
    Failure = 'Failure',
    Mixed = 'Mixed',
}

interface DiceState {
    rolls: number[];
    critStatus: CritStatus;
}

const getCritStatus = (hasSuccess: boolean, hasFailure: boolean) => {
    if (hasSuccess && hasFailure) {
        return CritStatus.Mixed;
    }
    if (!hasSuccess && hasFailure) {
        return CritStatus.Failure;
    }
    if (hasSuccess && !hasFailure) {
        return CritStatus.Success;
    }
    return CritStatus.None;
};

const renderDiceNode = ({
    sides,
    count,
    successRange,
    failRange,
}: DiceNode): RenderResult<DiceState> => {
    const rolls = [...Array(count)].map(
        () => Math.floor(Math.random() * sides) + 1
    );
    const hasCritSuccess = Boolean(
        rolls.find((roll) => roll >= (successRange ?? sides))
    );
    const hasCritFailure = Boolean(
        rolls.find((roll) => roll <= (failRange ?? 1))
    );
    const critStatus = getCritStatus(hasCritSuccess, hasCritFailure);
    return {
        result: `(${rolls.join(' + ')})`,
        state: { rolls, critStatus },
    };
};

const buildExpressionNode = (children: ParseNode[]): ExpressionNode => {
    return {
        type: NodeType.Expression,
        children,
    };
};

const combineCritStatuses = (statuses: CritStatus[]) => {
    const unique = [...new Set(statuses)];
    if (unique.length === 0) {
        return CritStatus.None;
    }
    if (unique.length === 1) {
        return unique[0];
    }
    if (unique.length === 2) {
        const withoutNone = unique.filter(
            (status) => status !== CritStatus.None
        );
        if (withoutNone.length === 1) {
            return withoutNone[0];
        }
    }
    return CritStatus.Mixed;
};

const getButtonColorFromCritStatus = (critStatus: CritStatus) => {
    switch (critStatus) {
        case CritStatus.Success:
            return 'success';
        case CritStatus.Failure:
            return 'error';
        case CritStatus.Mixed:
            return 'secondary';
        default:
            return 'primary';
    }
};

const getAdjustmentText = (adjustment: Adjustment) => {
    switch (adjustment) {
        case Adjustment.Elite:
            return '+2';
        case Adjustment.Weak:
            return '-2';
        default:
            return '';
    }
};

const renderExpressionNode = (
    { children }: ExpressionNode,
    queryValues: QueryValues,
    adjustment: Adjustment = Adjustment.None
): RenderResult => {
    const renderedChildren = children.map((child: ParseNode, i: number) =>
        renderNode(child, queryValues)
    );
    const renderedChildrenResult = renderedChildren
        .map((result) => result.result)
        .join('')
        .concat(getAdjustmentText(adjustment));

    const critStatus = combineCritStatuses(
        renderedChildren
            .map((result) => result.state?.critStatus)
            .filter((status) => status !== undefined) as CritStatus[]
    );

    return {
        result: (
            <Tooltip
                disableFocusListener={true}
                placement="top"
                title={renderedChildrenResult}
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
                    color={getButtonColorFromCritStatus(critStatus)}
                >
                    {evaluate(renderedChildrenResult)}
                </Button>
            </Tooltip>
        ),
    };
};

const buildQueryNode = (queryId: string, defaultValue: number): QueryNode => {
    return {
        type: NodeType.Query,
        queryId,
        defaultValue,
    };
};

const renderQueryNode = (
    { queryId, defaultValue }: QueryNode,
    queryValues: QueryValues
): RenderResult => {
    return { result: queryValues[queryId] ?? defaultValue };
};

const renderNode = (
    node: ParseNode,
    queryValues: QueryValues,
    adjustment: Adjustment = Adjustment.None
) => {
    switch (node.type) {
        case NodeType.Text:
            return renderTextNode(node);
        case NodeType.Dice:
            return renderDiceNode(node);
        case NodeType.Expression:
            return renderExpressionNode(node, queryValues, adjustment);
        case NodeType.Query:
            return renderQueryNode(node, queryValues);
    }
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
                if (!currentToken.groups?.sides) {
                    throw Error(
                        `Failed to parse dice expression, could not find required match value 'sides' ${currentToken.groups}`
                    );
                }
                if (parentNodeType !== NodeType.Expression) {
                    result.push(buildTextNode(currentToken.content));
                    break;
                }
                const count = parseInt(currentToken.groups.count || '1');
                const sides = parseInt(currentToken.groups.sides);
                const successRange = currentToken.groups.successRange
                    ? parseInt(currentToken.groups.successRange)
                    : undefined;
                const failRange = currentToken.groups.failRange
                    ? parseInt(currentToken.groups.failRange)
                    : undefined;

                result.push(
                    buildDiceNode(sides, count, successRange, failRange)
                );
                break;
            case TokenType.Query:
                if (parentNodeType !== NodeType.Expression) {
                    throw Error(
                        `Invalid macro, query expression found outside expression tag`
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
                        `Invalid macro, close expression tag without corresponding open tag`
                    );
                }
                return result;
            default:
                throw Error(`Unrecognized token type: ${currentToken.type}`);
        }
        currentToken = tokenQueue.shift();
    }
    if (parentNodeType === NodeType.Expression) {
        throw Error(
            `Invalid macro, open expression tag without corresponding close tag`
        );
    }
    return result;
};

const parseTokens = (tokens: Token[]) => {
    const tokensCopy = [...tokens];
    const parseResult = parseInner(tokensCopy);
    return parseResult;
};

const compileMacro = (macroContent: string) => {
    return parseTokens(tokenize(macroContent));
};

const renderCompiledMacro = (
    nodes: ParseNode[],
    queryValues: QueryValues,
    adjustment: Adjustment = Adjustment.None
) => {
    return (
        <React.Fragment>
            {nodes.map((node: ParseNode, i: number) => (
                <React.Fragment key={i}>
                    {renderNode(node, queryValues, adjustment).result}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};
export { tokenize, parseTokens, compileMacro, renderCompiledMacro };
