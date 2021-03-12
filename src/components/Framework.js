import { useEffect } from "react";
import run from "../framework/main";

const Framework = () => {
  useEffect(() => {
    const canvas = document.querySelector("#c");
    run(canvas);
  });

  return <canvas id="c"></canvas>;
};

export default Framework;
