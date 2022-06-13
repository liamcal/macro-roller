import React, { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks';
import { parseMacro } from './utils/macroUtils';
import './App.css';

function App() {
    const [macro, setMacro] = useLocalStorage('macro-roller-macro', '');
    const [parsedMacro, setParsedMacro] = useState('');

    const handleTextAreaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMacro(event.target.value);
    };

    const handleRunButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setParsedMacro(parseMacro(macro));
    };

    useEffect(() => {
        console.log({ macro });
    }, [macro]);

    return (
        <div className="App">
            <h1>Macro Roller</h1>
            <div>
                <textarea
                    value={macro}
                    onChange={handleTextAreaChange}
                    cols={40}
                    rows={10}
                />
            </div>
            <div>
                <button onClick={handleRunButtonClick}>Run Macro</button>
            </div>
            {parsedMacro && (
                <p style={{ whiteSpace: 'pre-line' }}>{parsedMacro}</p>
            )}
        </div>
    );
}

export default App;
