import { atom } from "recoil";

export const districtState = atom({
  key: "District",
  default: undefined as District | undefined,
});

export const qualificationState = atom({
  key: "Qualification",
  default: undefined as Qualification | undefined,
});

export const casteState = atom({
  key: "caste",
  default: [] as Caste[],
});
