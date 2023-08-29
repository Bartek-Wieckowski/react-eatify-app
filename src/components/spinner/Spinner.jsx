import imagePaths from "../../utils/images";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner_container">
      <div className="spinner">
        <img src={imagePaths.spinner} alt="" />
      </div>
    </div>
  );
};

export default Spinner;
