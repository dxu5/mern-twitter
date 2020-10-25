import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util.js";
import { Switch } from "react-router-dom";

import MainPage from "./main/main_page";

const App = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  );
};

export default App;
