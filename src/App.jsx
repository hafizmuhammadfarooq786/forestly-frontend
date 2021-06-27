import React, { useLayoutEffect, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { hot } from "react-hot-loader/root";
import Login from "./components/SignIn";
import Register from "./components/SignUp";
import ConfirmEmailAddress from "./components/ConfirmEmailAddress";
import ResetPasswordConfirmation from "./components/ResetPasswordConfirmation";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { history } from "./index";
import Loading from "./components/common/Loading";
import MessageBox from "./components/common/MessageBox";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/404";
import { initialize } from "./store/app/actions";
import EmailVerificationMessage from "./components/EmailVerificationMessage";
import ResetPasswordMessage from "./components/ResetPasswordMessage";

const App = () => {
  const isInitialized = useSelector((state) => state.app.isInitialized);
  const user = useSelector((state) => state.app.user);
  const location = useSelector((state) => state.router.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) =>
    user ? (
      <Route render={(props) => <Component {...props} />} {...rest} />
    ) : (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{
              pathname: "/login",
            }}
            {...props}
          />
        )}
      />
    );

  const MainView = React.memo(() => (
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  ));

  const Layout = () => {
    const { pathname } = location;

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!user && pathname === "/") {
      return <Redirect to="/login" />;
    }

    if ((user && pathname === "/login") || (user && pathname === "/")) {
      return <Redirect to="/dashboard/home" />;
    }

    return (
      <>
        <Switch>
          <PrivateRoute
            user={user}
            exact
            path="/dashboard/*"
            component={(props) => <Dashboard {...props} />}
          />
          <Route
            exact
            path="/login"
            component={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            component={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/email-verification-message"
            component={(props) => <EmailVerificationMessage {...props} />}
          />
          <Route
            exact
            path="/reset-password-message"
            component={(props) => <ResetPasswordMessage {...props} />}
          />
          <Route
            exact
            path="/reset-password-confirmarion"
            component={(props) => <ResetPasswordConfirmation {...props} />}
          />
          <Route
            exact
            path="/confirm-email-address"
            component={(props) => <ConfirmEmailAddress {...props} />}
          />
          <Route
            exact
            path="/forgot-password"
            component={(props) => <ForgotPassword {...props} />}
          />
          <Route
            exact
            path="/reset-password"
            component={(props) => <ResetPassword {...props} />}
          />
          <Route
            exact
            path="/support"
            component={(props) => <MessageBox {...props} />}
          />
          <Route component={() => <PageNotFound />} />
        </Switch>
      </>
    );
  };

  if (!isInitialized) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <MainView />
    </div>
  );
};

export default process.env.REACT_APP_ENV === "development" ? hot(App) : App;
