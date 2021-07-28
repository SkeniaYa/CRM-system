import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signOut } from "../../redux/actions/userAction";

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(signOut());
    history.push("/");
  }, []);

  return null;
};

export default SignOut;

// import React from "react";
// function SignOut() {
//   return <p>Goodbye</p>;
// }
// export default SignOut;
