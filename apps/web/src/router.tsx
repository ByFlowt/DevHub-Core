// Create routes for the pages
import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Projects from "./pages/Projects.tsx";
import Pipelines from "./pages/Pipelines.tsx";
import Repos from "./pages/Repos.tsx";
import Environments from "./pages/Environments.tsx";
import Agents from "./pages/Agents.tsx";
import Automations from "./pages/Automations.tsx";
import Security from "./pages/Security.tsx";
import Extensions from "./pages/Extensions.tsx";
import Landing from "./pages/Landing.tsx";

export const router = createBrowserRouter([
    {path: "/", element: <Landing />},
    {path: "/dashboard", element: <Dashboard />},
    {path: "/projects", element: <Projects />},
    {path: "/pipelines", element: <Pipelines />},
    {path: "/repos", element: <Repos />},
    {path: "/environments", element: <Environments />},
    {path: "/agents", element: <Agents />},
    {path: "/automations", element: <Automations />},
    {path: "/security", element: <Security />},
    {path: "/extensions", element: <Extensions />},

])