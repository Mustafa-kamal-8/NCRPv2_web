import API from "./axios";

export async function getTCDetails(TCId: any) {
  const res = await API.post("/tcDetails", { TCId });
  return res.data;
}

export async function fecthTrainingCenters(body: TrainingCenterBody): Promise<{
  data: TrainingCenterBody[];
  length: number;
}> {
  const res = await API.post("/filterTC", body);
  return res.data;
}
