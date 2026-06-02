import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../core/context/OSStore";
import { useEffect } from "react";
import { setTime } from "../../core/context/SystemSlice";

export function Clockd() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(setTime({ time: Date.now() }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return null;
}
