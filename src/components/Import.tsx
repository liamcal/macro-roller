import { useEffect, useState } from 'react';

interface MacroImport {
    name: string;
    macro: string;
}

const Import = () => {
    const [macrosForImport, setMacrosForImport] = useState<MacroImport[]>([]);

    const loadMacros = async () => {
        const res = await fetch('/macro-roller/imports/pf2e.json');
        const data = await res.json();
        setMacrosForImport(data);
    };

    useEffect(() => {
        loadMacros();
    }, []);

    return (
        <>
            {macrosForImport
                .map((macro) => macro.name)
                .slice(0, 10)
                .join('\n')}
        </>
    );
};

export { Import };
