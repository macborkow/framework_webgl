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
        <div class="progress">
          <div class="progressbar"></div>
        </div>
      </div>
    </main>
  );
};

export default Framework;
