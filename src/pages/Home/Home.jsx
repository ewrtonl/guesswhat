import "./Home.css";
import logo from "../../assets/rclogo.svg";
import { Link } from "react-router-dom";
import { Globe, GithubLogo } from "@phosphor-icons/react";
import githubwhite from "../../assets/githubwhite.svg";

export default function Home() {
  return (
    <div className="home">
      <img className="logo" src={logo} alt="" />

      <div className="buttons-main">
        <Link to={"/gamemode"}>
          <button>iniciar</button>
        </Link>

        <Link to={"/howtoplay"}>
          <button>como jogar</button>
        </Link>
      </div>

      <div className="footer">
        <a href="https://github.com/ewrtonl" target="_blank">
          <img src={githubwhite} alt="" />
        </a>

        <div className="lang">
          <Globe size={22} />
          <p>Portuguese</p>
        </div>
      </div>
    </div>
  );
}
