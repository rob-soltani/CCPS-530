import { withRouter } from "react-router-dom";
import { useEffect } from "react";

const SignOut = ({ history, SignOutAction }) => {
  useEffect(() => {
    SignOutAction(function () {
      // history.push("/");
      // This history way is not needed because of routing in the main app
    });
  });

  return null;
};

export default withRouter(SignOut);
