import Index from './pages/Index';
import Month from './pages/Month';
import Overview from './pages/Overview';
import SecretFAQ from './pages/SecretFAQ';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Index": Index,
    "Month": Month,
    "Overview": Overview,
    "SecretFAQ": SecretFAQ,
}

export const pagesConfig = {
    mainPage: "Overview",
    Pages: PAGES,
    Layout: __Layout,
};
