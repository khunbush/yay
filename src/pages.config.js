import Index from './pages/Index';
import Soundtrack from './pages/Soundtrack';
import Years from './pages/Years';
import Memories2023 from './pages/Memories2023';
import Memories2024 from './pages/Memories2024';
import Month from './pages/Month';
import Overview from './pages/Overview';
import SecretFAQ from './pages/SecretFAQ';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Index": Index,
    "Soundtrack": Soundtrack,
    "Years": Years,
    "Memories2023": Memories2023,
    "Memories2024": Memories2024,
    "Month": Month,
    "Overview": Overview,
    "SecretFAQ": SecretFAQ,
}

export const pagesConfig = {
    mainPage: "Years",
    Pages: PAGES,
    Layout: __Layout,
};
