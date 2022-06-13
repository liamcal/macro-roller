import { parseMacro } from "./macroUtils"

describe('parseMacro', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });
    
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('should parse basic expressions', () => {
        const macro = 'Hello, [[6*9]] World! [[42]]';
        expect(parseMacro(macro)).toEqual('Hello, 54 World! 42');
    });

    it.each([['[[d4]]', '3'],['[[d6]]', '4'],['[[d8]]', '5'],['[[d10]]', '6'],['[[d20]]', '11']])('should parse dice expressions: %s -> %s', (macro: string, expected: string) => {
        expect(parseMacro(macro)).toEqual(expected);
    });


    it.each([['[[2d4]]', '6'],['[[4d6]]', '16'],['[[0d8]]', '0'],['[[1d10]]', '6'],['[[(1+1)d20]]', '22']])('should parse multi-dice expressions: %s -> %s', (macro: string, expected: string) => {
        expect(parseMacro(macro)).toEqual(expected);
    });

})