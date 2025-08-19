import "./Button.css";

const Button: React.FC<{
  type: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
}> = (props) => {
  return (
    <button type={props.type} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
