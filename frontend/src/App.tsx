import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";
import { RecoilRoot } from 'recoil';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    path="dashboard"
                    element={
                        <RecoilRoot>
                            <DashboardPage />
                        </RecoilRoot>
                    } />
            </Routes>
        </BrowserRouter>
    );
}
