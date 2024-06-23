import { useState, useEffect } from "react";
import "./CardMoviePage.css";
import dataMovie from "../../cards/Movie";
import { CaretLeft, CrownSimple, ArrowUpLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function CardMoviePage() {
  const [clickedTipIndices, setClickedTipIndices] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);

  const getRandomNumber = (min, max) => {
    const range = max - min + 1;
    const bytes = Math.ceil(Math.log2(range) / 8);
    const maxValid = 256 ** bytes - (256 ** bytes) % range;
    let random;
    do {
      random = parseInt(Array.from(crypto.getRandomValues(new Uint8Array(bytes))).map(byte => byte.toString(16).padStart(2, '0')).join(''), 16);
    } while (random >= maxValid);
    return min + (random % range);
  };

  useEffect(() => {
    setRandomNumber(getRandomNumber(0, dataMovie.length - 1));
  }, []);

  if (randomNumber === null) {
    return null;
  }

  const handleTipClick = (index) => {
    setClickedTipIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  const TipsList = ({ tips }) => {
    return (
      <ul>
        {tips.map((tip, index) => (
          <li
            key={index}
            className={`${
              index % 2 === 0 ? "even-tip-movie" : "odd-tip-movie"
            } ${clickedTipIndices.includes(index) ? "clicked-tip" : ""}`}
            onClick={() => handleTipClick(index)}
          >
            <span className="tip-index">{index + 1} </span> {tip}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Link to={"/gamemode"}>
        <button className="backButton">
          <ArrowUpLeft size={26} />
        </button>
      </Link>

      <div className="cardMovieContainer">
        {dataMovie[randomNumber].answer && (
          <>
            <h4>FILME & TV</h4>
            <h2>
              {dataMovie[randomNumber].answer}{" "}
              <span className="suportAnswer">
                {dataMovie[randomNumber].suport}
              </span>
            </h2>

            <div className="tipsBox">
              <TipsList tips={dataMovie[randomNumber].tips} />
            </div>
          </>
        )}

        {dataMovie[randomNumber].power && (
          <div className="cardPower">
            <div>
              <CrownSimple size={32} />
              <h4>CARD ESPECIAL</h4>
            </div>

            <h3>{dataMovie[randomNumber].power}</h3>
            <p>{dataMovie[randomNumber].powerInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
