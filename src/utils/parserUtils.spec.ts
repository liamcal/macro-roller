import { NodeType, Token, TokenType } from '../types';
import { parseTokens, tokenize } from './parserUtils';

describe('tokenize', () => {
    it('should tokenize', () => {
        const macroContent =
            'Hello world d8 foo 2d10 bar [[2 + 5]] baz ?{e1} [[d20 + 10]] ?{e2|10}[[0d20 + [[2*10]] -5]] 000';
        const expectedTokens: Token[] = [
            {
                content: 'Hello world ',
                type: TokenType.Text,
            },
            {
                content: 'd8',
                type: TokenType.Dice,
                groups: { count: undefined, sides: '8' },
            },
            { content: ' foo ', type: TokenType.Text },
            {
                content: '2d10',
                type: TokenType.Dice,
                groups: { count: '2', sides: '10' },
            },
            { content: ' bar ', type: TokenType.Text },
            { content: '[[', type: TokenType.BeginExpression },
            { content: '2 + 5', type: TokenType.Text },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' baz ', type: TokenType.Text },
            {
                content: '?{e1}',
                type: TokenType.Query,
                groups: { queryId: 'e1', defaultValue: undefined },
            },
            { content: ' ', type: TokenType.Text },
            { content: '[[', type: TokenType.BeginExpression },
            {
                content: 'd20',
                type: TokenType.Dice,
                groups: { count: undefined, sides: '20' },
            },
            { content: ' + 10', type: TokenType.Text },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' ', type: TokenType.Text },
            {
                content: '?{e2|10}',
                type: TokenType.Query,
                groups: { queryId: 'e2', defaultValue: '10' },
            },
            { content: '[[', type: TokenType.BeginExpression },
            {
                content: '0d20',
                type: TokenType.Dice,
                groups: { count: '0', sides: '20' },
            },
            { content: ' + ', type: TokenType.Text },
            { content: '[[', type: TokenType.BeginExpression },
            { content: '2*10', type: TokenType.Text },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' -5', type: TokenType.Text },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' 000', type: TokenType.Text },
        ];
        expect(tokenize(macroContent)).toEqual(expectedTokens);
    });
});

describe('parser', () => {
    it('should parse a token list', () => {
        const tokens: Token[] = [
            {
                content: 'Hello world ',
                type: TokenType.Text,
            },
            { content: '[[', type: TokenType.BeginExpression },
            {
                content: 'd8',
                type: TokenType.Dice,
                groups: { count: undefined, sides: '8' },
            },
            { content: '+ 2 + 5 +', type: TokenType.Text },
            {
                content: '2d10',
                type: TokenType.Dice,
                groups: { count: '2', sides: '10' },
            },
            { content: ' + ', type: TokenType.Text },
            {
                content: '?{e1}',
                type: TokenType.Query,
                groups: { queryId: 'e1', defaultValue: undefined },
            },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' baz', type: TokenType.Text },
        ];

        const expectedNodes = [
            expect.objectContaining({
                type: NodeType.Text,
                content: 'Hello world ',
            }),
            expect.objectContaining({
                type: NodeType.Expression,
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: NodeType.Dice,
                        count: 1,
                        sides: 8,
                    }),
                    expect.objectContaining({
                        type: NodeType.Text,
                        content: '+ 2 + 5 +',
                    }),
                    expect.objectContaining({
                        type: NodeType.Dice,
                        count: 2,
                        sides: 10,
                    }),
                    expect.objectContaining({
                        type: NodeType.Text,
                        content: ' + ',
                    }),
                    expect.objectContaining({
                        type: NodeType.Query,
                        queryId: 'e1',
                        defaultValue: 0,
                    }),
                ]),
            }),
            expect.objectContaining({
                type: NodeType.Text,
                content: ' baz',
            }),
        ];

        const nodes = parseTokens(tokens);
        expect(nodes).toEqual(expectedNodes);
    });

    it('should parse nested expressions', () => {
        const tokens: Token[] = [
            {
                content: 'Hello world ',
                type: TokenType.Text,
            },
            { content: '[[', type: TokenType.BeginExpression },
            {
                content: 'd8',
                type: TokenType.Dice,
                groups: { count: undefined, sides: '8' },
            },
            { content: '+ 2 + 5 +', type: TokenType.Text },
            { content: '[[', type: TokenType.BeginExpression },

            {
                content: '2d10',
                type: TokenType.Dice,
                groups: { count: '2', sides: '10' },
            },
            { content: ']]', type: TokenType.EndExpression },

            { content: ' + ', type: TokenType.Text },
            {
                content: '?{e1}',
                type: TokenType.Query,
                groups: { queryId: 'e1', defaultValue: undefined },
            },
            { content: ']]', type: TokenType.EndExpression },
            { content: ' baz', type: TokenType.Text },
        ];

        const expectedNodes = [
            expect.objectContaining({
                type: NodeType.Text,
                content: 'Hello world ',
            }),
            expect.objectContaining({
                type: NodeType.Expression,
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: NodeType.Dice,
                        count: 1,
                        sides: 8,
                    }),
                    expect.objectContaining({
                        type: NodeType.Text,
                        content: '+ 2 + 5 +',
                    }),
                    expect.objectContaining({
                        type: NodeType.Expression,
                        children: expect.arrayContaining([
                            expect.objectContaining({
                                type: NodeType.Dice,
                                count: 2,
                                sides: 10,
                            }),
                        ]),
                    }),
                    expect.objectContaining({
                        type: NodeType.Text,
                        content: ' + ',
                    }),
                    expect.objectContaining({
                        type: NodeType.Query,
                        queryId: 'e1',
                        defaultValue: 0,
                    }),
                ]),
            }),
            expect.objectContaining({
                type: NodeType.Text,
                content: ' baz',
            }),
        ];

        const nodes = parseTokens(tokens);
        expect(nodes).toEqual(expectedNodes);
    });

    it('should throw with unclosed expression', () => {
        const tokens: Token[] = [
            { content: '[[', type: TokenType.BeginExpression },
            { content: '[[', type: TokenType.BeginExpression },
            { content: '[[', type: TokenType.BeginExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: '[[', type: TokenType.BeginExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: ']]', type: TokenType.EndExpression },
        ];

        expect(() => parseTokens(tokens)).toThrowError(
            'Parse error, unclosed expression tag'
        );
    });

    it('should throw with mismatched close expression', () => {
        const tokens: Token[] = [
            { content: '[[', type: TokenType.BeginExpression },
            { content: '[[', type: TokenType.BeginExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: '[[', type: TokenType.BeginExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: ']]', type: TokenType.EndExpression },
            { content: '[[', type: TokenType.BeginExpression },
        ];

        expect(() => parseTokens(tokens)).toThrowError(
            'Parse error, close expression tag without corresponding open tag'
        );
    });

    it('should throw with dice outside an expression', () => {
        const tokens: Token[] = [
            {
                content: 'Hello world ',
                type: TokenType.Text,
            },
            {
                content: 'd8',
                type: TokenType.Dice,
                groups: { count: undefined, sides: '8' },
            },
        ];

        expect(() => parseTokens(tokens)).toThrowError(
            'Parse error, dice expression with invalid parent node type: None'
        );
    });

    it('should throw with query outside an expression', () => {
        const tokens: Token[] = [
            {
                content: 'Hello world ',
                type: TokenType.Text,
            },
            {
                content: '?{e1}',
                type: TokenType.Query,
                groups: { queryId: 'e1', defaultValue: undefined },
            },
        ];

        expect(() => parseTokens(tokens)).toThrowError(
            'Parse error, query expression with invalid parent node type: None'
        );
    });
});
