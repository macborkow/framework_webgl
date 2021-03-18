import { useEffect } from "react";
import run from "../framework/main";

const Framework = () => {
  useEffect(() => {
    const canvas = document.querySelector("#c");
    run(canvas);
  });

  return (
    <main>
      <canvas id="c"></canvas>
      <div id="loading">
        <div className="progress">
          <div className="progressbar"></div>
        </div>
      </div>
    </main>
  );
};

export default Framework;
