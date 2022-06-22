import { Macro, QueryLookup } from '../types';
import { parseMacro } from './macroUtils';

describe('parseMacro', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('should parse basic expressions', () => {
        const macro: Macro = {
            macroId: 'test',
            name: 'test',
            content: 'Hello, [[6*9]] World! [[42]]',
            queries: {},
            compiledMacro: [],
        };
        expect(parseMacro(macro)).toEqual('Hello, 54 World! 42');
    });

    it.each([
        ['[[d4]]', '3'],
        ['[[d6]]', '4'],
        ['[[d8]]', '5'],
        ['[[d10]]', '6'],
        ['[[d20]]', '11'],
    ])(
        'should parse dice expressions: %s -> %s',
        (macroContent: string, expected: string) => {
            const macro: Macro = {
                macroId: 'test',
                name: 'test',
                content: macroContent,
                queries: {},
                compiledMacro: [],
            };
            expect(parseMacro(macro)).toEqual(expected);
        }
    );

    it.each([
        ['[[2d4]]', '6'],
        ['[[4d6]]', '16'],
        ['[[0d8]]', '0'],
        ['[[1d10]]', '6'],
        ['[[(1+1)d20]]', '22'],
    ])(
        'should parse multi-dice expressions: %s -> %s',
        (macroContent: string, expected: string) => {
            const macro: Macro = {
                macroId: 'test',
                name: 'test',
                content: macroContent,
                queries: {},
                compiledMacro: [],
            };
            expect(parseMacro(macro)).toEqual(expected);
        }
    );

    it('should inject query values', () => {
        const queryValues: QueryLookup = {
            atk: { queryId: 'atk', value: '10' },
        };
        const macro: Macro = {
            macroId: 'test',
            name: 'test',
            content: 'Hello, ?{atk|5} World! [[d6 + ?{atk}]]',
            queries: queryValues,
            compiledMacro: [],
        };
        expect(parseMacro(macro)).toEqual('Hello, 10 World! 14');
    });
});
