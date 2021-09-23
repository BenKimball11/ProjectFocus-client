import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ProjectFocus = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("PF_token")) {
            return (
              <>
                <h2 className="ProjectFocus">Project Focus</h2>
                 
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );
  
