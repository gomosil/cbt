import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from 'react-cookie';

// pages
import DashboardOverview from "./DashboardOverview";
import Signin from "./SignIn";
import MidAttendenceAdmin from './MidAttendenceAdmin';
import MidAttendenceStudent from './MidAttendenceStudent';

import NotFoundPage from "./NotFound.js";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

/**
 * A component that checks if the user is logged in using cookie.
 * @returns Redirect
 */
export const CheckLogin = () => {
  const [cookies] = useCookies(['credentials']);
  try {
    if (cookies.credentials.isLoggedIn === false || cookies.credentials.isLoggedIn === undefined) {
      console.log("not logged in, redirecting to login page");
      return(<Redirect to={Routes.Signin.path} />);
    } else {
      return("");
    }
  } catch (TypeError) {
    console.log("not logged in, redirecting to login page");
    return(<Redirect to={Routes.Signin.path} />);
  }
}

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.MidAttendenceAdmin.path} component={MidAttendenceAdmin} />
    <RouteWithSidebar exact path={Routes.MidAttendenceStudent.path} component={MidAttendenceStudent} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);