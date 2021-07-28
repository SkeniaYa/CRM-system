// import { useState } from "react";
import GoogleButton from "react-google-button";

export default function Fail() {
  // const [fail, setFail] = useState("");
  // try {
  //   const response = await fetch("http://localhost:3001/google/failure");
  //   if (response.status === 200) {
  //     setFail("Вам придется обратиться к администратору =/");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  const signinHandler = () => {
    window.open("http://localhost:3001/auth/signinwithgoogle");
    // dispatch(getUserFromServer(history));
  };
  return (
    <div className="fail" style={{ display: "flex", flexDirection: 'column', alignItems: "center", marginTop: '200px' }}>
      <h4 style={{ color: "white", marginBottom: '30px' }}>
        Возможно, у Вас нет прав доступа :( <br></br> Обратитесь к
        администратору
      </h4>
      <GoogleButton onClick={() => signinHandler()} />
    </div>
  );
}
