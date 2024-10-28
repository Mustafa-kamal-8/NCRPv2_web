import axios from "axios";
import API from "./axios";

export async function fetchDashboard(): Promise<DashboardData> {
  const res = await axios.post(
    `${import.meta.env.VITE_API_DASHBOARD_URL}/dashboard/view`
  );
  return res.data;
}

export async function fetchDistrictData(id: any) {
  const res = await axios.post(
    `${import.meta.env.VITE_API_DASHBOARD_URL}/dashboard/viewCandidate`,
    {
      districtId: id,
    }
  );
  return res.data;
}

export async function fetchWaitingList(id: any, courseId: any) {
  const res = await API.post("/dashboard/waitingList", {
    districtId: id,
    courseID: courseId,
  });
  return res.data;
}

type DashboardData = {
  status: string;
  new: number;
  old: number;
  oldMega: number;
  public: number;
  district: {
    id: number;
    district: string;
    total: number;
  }[];
  ranking: { id: number; district: string; total: number }[];
  course: {
    date: string;
    id: number;
    districtName: string;
    courseName: string;
    total: number;
  }[];
  offline: { district: string; date: string; total: number }[];
  futureDataInMega: {
    courseId: number;
    courseName: string;
    date: string;
    districtName: string;
    id: number;
    total: number;
  }[];
  futureDataNotInMega: {
    courseId: number;
    courseName: string;
    date: string;
    districtName: string;
    id: number;
    total: number;
  }[];
};
