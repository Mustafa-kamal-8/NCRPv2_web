import API from "./axios";

export async function registerCandidate(CandidateData: any) {
  const response = await API.post("/register", CandidateData);
  return response.data;
}

export async function modifyCandidate(CandidateData: any) {
  const response = await API.post("/modify", CandidateData);
  return response.data;
}

export async function sendOTP(phone: any) {
  const response = await API.post("/modify/otp", phone);
  return response.data;
}

export async function submitOTP(mobile: any , password: any) {
  const response = await API.post("/loginNew", mobile , password);
  return response.data;
}

export async function getCandidate(candidateId: string) {
  const res = await API.post("/getCandidate", { candidateId });
  return res.data;
}

export async function getCandidateCourses(candidateId: string) {
  const res = await API.post("/basket/get", { candidateId });
  return res.data;
}

// export async function loginCandidate({
//   contactNumber,
//   password,
// }: CandidateLoginData) {
//   const response = await API.post("candidate/login", {
//     contactNumber,
//     password,
//   });
//   return response.data;
// }

interface CandidateRegisterData {
  name: string;
  password: string;
  contactNumber: string;
}

interface CandidateLoginData {
  contactNumber: string;
  password: string;
}
