import "./logo.scss"
import imagePaths from "../../utils/images"

const Logo = () => {
  return (
    <div className="logo-wrapper">
        <img src={imagePaths.logo} alt="" className="logo" />
        <h1>Eatify</h1>
    </div>
  )
}

export default Logo