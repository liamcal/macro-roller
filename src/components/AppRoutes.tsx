import { Route, Routes } from 'react-router-dom';
import MacroRoller from './MacroRoller';
import Home from './Home';
import CreateMacro from './CreateMacro';
import ViewMacro from './ViewMacro';
import EditMacro from './EditMacro';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index={true} element={<Home />} />
                <Route path="roll" element={<MacroRoller />} />
                <Route path="macro/create" element={<CreateMacro />} />
                <Route path="macro/:macroId" element={<ViewMacro />} />
                <Route path="macro/:macroId/edit" element={<EditMacro />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
