import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // <-- Add this line
import "./index.css";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import QbounceNav from "./pages/solutions/qbounce/QbounceNav";
import Calculator from "./pages/solutions/qbounce/calculator/Calculator";
import Info from "./pages/solutions/qbounce/info/Info";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="qbounce" element={<QbounceNav />}>
                <Route path="calculator" element={<Calculator />} />
                <Route index element={<Info />} />
            </Route>
        </Route>
    )
);

function App() {
    return <RouterProvider router={appRouter} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
