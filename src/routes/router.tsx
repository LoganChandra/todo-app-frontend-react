import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// PAGES
import TaskList from "../pages/tasks/container";
const AppRouter: React.FC<{}> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
