import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('./Home'));
const MacroRoller = lazy(() => import('./MacroRoller'));
const CreateMacro = lazy(() => import('./CreateMacro'));
const ViewMacro = lazy(() => import('./ViewMacro'));
const EditMacro = lazy(() => import('./EditMacro'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/">
                    <Route index={true} element={<Home />} />
                    <Route path="roll" element={<MacroRoller />} />
                    <Route path="macro">
                        <Route path="create" element={<CreateMacro />} />
                        <Route path=":macroId">
                            <Route index={true} element={<ViewMacro />} />
                            <Route path="edit" element={<EditMacro />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
