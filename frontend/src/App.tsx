import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import { RecoilRoot } from 'recoil';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index
                    element={
                        <RecoilRoot>
                            <DashboardPage />
                        </RecoilRoot>
                    } />
            </Routes>
        </BrowserRouter>
    );
}
