

// Frrom: https://github.com/franciscop/use-animation-frame/blob/master/index.js
// Based off a tweet and codesandbox:
// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useEffect, useRef } from "react";

type callBack = (args:{time: number, delta: number}) => void;

// Reusable component that also takes dependencies
export default (cb: callBack) => {
  if (typeof performance === "undefined" || typeof window === "undefined") {
    return;
  }

  const cbRef = useRef<callBack>();
  const frame = useRef<number>();
  const init = useRef(performance.now());
  const last = useRef(performance.now());

  cbRef.current = cb;

  const animate = (now:number) => {
    // In seconds ~> you can do ms or anything in userland
    if(cbRef.current) {
      cbRef.current({
        time: (now - init.current) / 1000,
        delta: (now - last.current) / 1000,
      });
    }
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    frame.current = requestAnimationFrame(animate);
  });
};
