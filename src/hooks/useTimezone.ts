import { useMemo } from "react";
import { getTimezoneOptions } from "../utils/timeConversion";

export const useTimezoneOptions = () => {
  return useMemo(() => getTimezoneOptions(), []);
};
