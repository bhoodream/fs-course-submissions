import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";

export const useAlert = (params) => {
  const { delay = 3000 } = params || {};
  const timerRef = useRef(null);
  const [state, setState] = useState(INITIAL_STATE);

  const show = useCallback(
    (message, type) => {
      clearTimeout(timerRef.current);

      setState({ type, message, visible: true });

      timerRef.current = setTimeout(() => setState(INITIAL_STATE), delay);
    },
    [delay]
  );

  return { state, show };
};

const INITIAL_STATE = {
  visible: false,
  message: "",
  type: null,
};
