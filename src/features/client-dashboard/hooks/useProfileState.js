import { useCallback, useState } from "react";
import { CLIENT } from "../mock/mockClient";
import { readState, writeState } from "../utils/storage";

const STORAGE_KEY = "pathToMexico.clientDashboard.profile.v1";
const STORAGE_VERSION = 1;

export function useProfileState() {
  const [overrides, setOverrides] = useState(() => readState(STORAGE_KEY, STORAGE_VERSION, {}));

  const updateProfile = useCallback(
    (partial) => {
      const next = { ...overrides, ...partial };
      setOverrides(next);
      writeState(STORAGE_KEY, STORAGE_VERSION, next);
    },
    [overrides]
  );

  return { profile: { ...CLIENT, ...overrides }, updateProfile };
}
