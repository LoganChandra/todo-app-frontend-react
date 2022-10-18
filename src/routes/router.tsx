import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

// PAGES
import TaskList from "../pages/tasks/container";
const AppRouter: React.FC<{}> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskList />} />
                {/* GUARD TO PREVENT ACCESS TO UNHANDLED ROUTES */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
