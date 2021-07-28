import { useEffect } from "react";
import "./Star.css";

export default function Star({ cl, converterStars, check }) {
  // useEffect(() => {
  //   converterStars(cl)
  //   check(cl)
  // }, [converterStars, check]);

  return (
    <div style={{ position: "absolute", left: "40%", top: "-30px" }} key={cl._id}>
      <button type="button" onClick={() => converterStars(cl)}>
        <span>
          {check(cl) ? (
            <span style={{ fontSize: "65px" }}>
              👑
            </span>
          ) : (
            <span style={{ color: "transparent", fontSize: "50px" }}>1111</span>
          )}
        </span>
      </button>
    </div>
  );
}
