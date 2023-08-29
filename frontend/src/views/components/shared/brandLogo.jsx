import { Link } from "react-router-dom";
import { publicURL } from "../../../shared/helper";

export default function BrandLogo({ image }) {
  return (
    <div className="brand-logo">
      <Link to="/">
        <img
          src={image ? image : publicURL("images/logo.png")}
          alt="Befriendz Logo"
        />
      </Link>
    </div>
  );
}
