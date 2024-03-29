import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { Macro, MacroQuery, QueryLookup } from '../types';
import { extractQueries } from '../utils/macroUtils';
import { compileMacro } from '../utils/parserUtils';

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

    const createMacro = (name: string, content: string) => {
        const macroId = uuidv4();
        const queries = extractQueries(content);
        const compiledMacro = compileMacro(content);
        const newMacro: Macro = {
            macroId,
            name,
            content,
            queries,
            compiledMacro,
        };
        upsertMacro(newMacro);
        return newMacro;
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

    const mergeQueries = (oldQueries: QueryLookup, newQueries: QueryLookup) => {
        // preserve old saved values for queries that still exist
        const mergedQueries = Object.fromEntries(
            Object.keys(newQueries).map((queryId: string) => {
                const newQuery = newQueries[queryId];
                return [
                    queryId,
                    { ...newQuery, value: oldQueries[queryId]?.value },
                ];
            })
        ) as QueryLookup;

        return mergedQueries;
    };

    const updateMacroName = (macroId: string, newName: string) => {
        const currentMacro = getMacro(macroId);
        if (currentMacro) {
            const newMacro: Macro = {
                ...currentMacro,
                name: newName,
            };
            upsertMacro(newMacro);
        }
    };

    interface UpdateMacroByIdProps {
        macroId: string;
        name?: string;
        content?: string;
    }

    const updateMacroById = ({
        macroId,
        name,
        content,
    }: UpdateMacroByIdProps) => {
        const currentMacro = getMacro(macroId);
        if (currentMacro) {
            const newQueries =
                content === undefined ? undefined : extractQueries(content);
            const newCompiled =
                content === undefined ? undefined : compileMacro(content);

            const newMacro: Macro = {
                ...currentMacro,
                name: name ?? currentMacro.name,
                content: content ?? currentMacro.content,
                queries: newQueries
                    ? mergeQueries(currentMacro.queries, newQueries)
                    : currentMacro.queries,
                compiledMacro: newCompiled ?? currentMacro.compiledMacro,
            };
            upsertMacro(newMacro);
        }
    };

    const upsertMacroQuery = (macroId: string, query: MacroQuery) => {
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
            setMacros((previous: Macro[]) => {
                const updated = [...previous];
                updated.splice(existingIndex, 1);
                return updated;
            });
        }
    };

    return {
        macros,
        getMacro,
        createMacro,
        upsertMacro,
        upsertMacroQuery,
        updateMacroName,
        updateMacroById,
        deleteMacro,
    };
};

export { useMacros };
