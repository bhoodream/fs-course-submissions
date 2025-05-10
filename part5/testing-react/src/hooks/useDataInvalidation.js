import { useState } from "react";

export const useDataInvalidation = () => {
  const [date, setDate] = useState(() => Date.now());

  const invalidate = () => setDate(Date.now());

  return { date, invalidate };
};
