import { Macro, MacroQuery } from '../types';
import { useLocalStorage } from './useLocalStorage';

const useMacros = (key: string) => {
    const [macros, setMacros] = useLocalStorage<Macro[]>(key, []);

    const getMacro = (macroId: string) => {
        return macros.find((macro: Macro) => macro.macroId === macroId);
    };

    const updateMacros = (
        previous: Macro[],
        index: number,
        newMacro: Macro
    ) => {
        const updated = [...previous];
        updated.splice(index, 1, newMacro);
        return updated;
    };

    const addMacro = (previous: Macro[], newMacro: Macro) => {
        const added = [...previous, newMacro];
        return added;
    };

    const upsertMacro = (newMacro: Macro) => {
        const existingIndex = macros.findIndex(
            (macro: Macro) => macro.macroId === newMacro.macroId
        );
        if (existingIndex >= 0) {
            setMacros((previous: Macro[]) =>
                updateMacros(previous, existingIndex, newMacro)
            );
        } else {
            setMacros((previous: Macro[]) => addMacro(previous, newMacro));
        }
    };

    const upsertMacroQuery = (
        macroId: string,
        queryId: string,
        query: MacroQuery
    ) => {
        const existingMacro = macros.find(
            (macro: Macro) => macro.macroId === macroId
        );
        if (existingMacro) {
            upsertMacro({
                ...existingMacro,
                queries: { ...existingMacro.queries, [query.queryId]: query },
            });
        }
    };

    const deleteMacro = (macroId: string) => {
        const existingIndex = macros.findIndex(
            (macro: Macro) => macro.macroId === macroId
        );
        if (existingIndex >= 0) {
            setMacros((previous: Macro[]) => [
                ...previous.splice(existingIndex, 1),
            ]);
        }
    };

    return { macros, getMacro, upsertMacro, upsertMacroQuery, deleteMacro };
};

export { useMacros };
