import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function Guest({ children, ...rest }){

  const generateView = () => {
    return(
      <Route
        {...rest}
        render={({ location }) =>
            !localStorage.access_token ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/prediksi",
                  state: { from: location }
                }}
              />
            )
          }
      >
      </Route>
    )
  }

  return(
    <>
      {generateView() }
    </>
  );

}