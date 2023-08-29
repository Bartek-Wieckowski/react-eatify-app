import imagePaths from "../../utils/images";
import "./error-msg.scss";

const ErrorMsg = ({ children }) => {
  return (
    <div className="error">
      <img src={imagePaths.warning} alt="" />
      <p>{children}</p>
    </div>
  );
};

export default ErrorMsg;
