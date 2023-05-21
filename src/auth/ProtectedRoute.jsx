/* eslint-disable react/prop-types */
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </>
  );
}

export default ProtectedRoute;
