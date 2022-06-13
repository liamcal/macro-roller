import { evaluate } from 'mathjs';

const rollReplacer = (match: string, ...args: any) => {
    // console.log({"Expr": match, args});

    const maxValue = parseInt(match.slice(1));
    const rollValue = Math.floor(Math.random() * maxValue) + 1;
    return `(${rollValue})`;
};

const expressionReplacer = (match: string, expr: string, ...args: any) => {
    // console.log({"Expr": match, args});
    return evaluate(expr.replaceAll(/d[0-9]+/gi, rollReplacer)).toString();
};

const parseMacro = (macro: string) => {
    return macro.replaceAll(/\[\[(.*?)\]\]/g, expressionReplacer);
};

export { parseMacro };
