import ErrorPage from "./components/PageNotFound";
import "./App.css";
import Login from "./components/user/LoginPage";
import Search from "./components/Search";
import axios from "axios";
import SignUp from "./components/user/SignUp";
import Home from "./components/HomePage";
import Layout from "./components/Layout";
import About from "./components/About";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/cart/Cart";
import Profile from "./components/Profile";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import AdminPage from "./components/admin/AdminPage";
// import ProductTable from "./components/Admin/product";
import { useLocation, useRoutes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";

const { OpenAIApi } = require("openai");

export const UserContext = createContext({});
function App() {
  const apiPath = process.env.REACT_APP_SERVER_URL;

  // for Langugage change
  const lang = window.localStorage.getItem("lang");
  const translate = (text, options) => {
    // const openaiConfig = {
    //   apiKey: "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",
    // };
    // const openaiApi = new OpenAIApi(openaiConfig);
    // openaiApi
    //   .createCompletion(
    //     {
    //       engine: "davinci-002",
    //       prompt: text,
    //       lang: lang,
    //       temperature: 0.5,
    //       max_tokens: 4000,
    //     },
    //     options
    //   )
    //   .then((res) => {
    //     return res.choices[0].text;
    //   });
  };

  const [state, setState] = useState({
    lang,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // validate current user token with server for each path change
  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  const clearContext = () => {
    setState({});
  };

  const setContext = (c) => {
    setState((prevState) => {
      return { ...prevState, ...c };
    });
  };

  const checkSession = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .get(`${apiPath}/users/session`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => {
          console.log("user not authenticated ==>> ", err);
        });
    }
  };
  const getHomeComponent = () => {
    if (state?.role === "admin") navigate("/admin");
    else return <Layout />;
  };

  const adminComponent = (Component) => {
    if (state.role === "admin") {
      return <Component />;
    } else {
      return <ErrorPage />;
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      element: getHomeComponent(),
      children: [
        { index: true, element: <Home /> },
        { path: "/search", element: <Search /> },
        { path: "/about", element: <About /> },
        { path: "/products/details", element: <ProductDetails /> },
        { path: "/products/carts", element: <Cart /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/admin", element: adminComponent(AdminPage) },

    { path: "*", element: <ErrorPage /> },
  ]);

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: require("./locales/en.json") },
      ne: { translation: require("./locales/ne.json") },
      // Add more language translations as needed...
    },
    lng: lang || "en", // Default language
    fallbackLng: "en", // Fallback language if translation is not available
    interpolation: {
      escapeValue: false, // React already escapes values, so no need for this
    },
  });

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <UserContext.Provider
          value={{ userContext: state, clearContext, setContext, translate }}
        >
          {routes}
        </UserContext.Provider>
      </I18nextProvider>
    </div>
  );
}

export default App;
//<Login />
// <HomePage />
// <NavPage/>
//<SignUp />
//<ProductTable />
