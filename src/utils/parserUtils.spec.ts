import { Token, TokenType } from '../types';
import { tokenize } from './parserUtils';

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
