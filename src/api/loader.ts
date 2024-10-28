import API from "./axios";

export async function getInitialData(): Promise<InitialData> {
  const data = await API.get("/get");
  return data?.data;
}
