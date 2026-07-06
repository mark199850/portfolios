import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../kernel/context/OSStore";
import { useEffect } from "react";
import { setTime } from "../../kernel/context/hardwareSlice";

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
