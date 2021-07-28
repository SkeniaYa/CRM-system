import "./SmallModal.css";

export default function Modal({ active, setActive, children }) {
  return (
    <div
    style={{
      display: "inline-grid",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "310px",
    }}
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
      style={{
        display: "inline-grid",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "200px",
      }}
        className={active ? "modal__content active" : "modal"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
