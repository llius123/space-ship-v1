import { useEffect, useMemo, useRef, useState } from "react";
import Game from "./Game";

function App() {
  const [ref, setRef] = useState<HTMLDivElement | null>();
  return (
    <div id="main_container" ref={(newRef) => setRef(newRef)}>
      {ref && <Game container={ref} />}
    </div>
  );
}

export default App;
