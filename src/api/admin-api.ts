import API from "./axios";

export async function getAdminCourses({
  courseId,
  districtId,
}: {
  courseId: string;
  districtId: string;
}): Promise<AdminCourses> {
  const res = await API.post("/admin/get", {
    courseId,
    districtId,
  });
  return res.data;
}

export async function updateAdminCourses({
  courseId,
  districtId,
  experience,
  target,
  residential,
  id,
}: UpdateData) {
  const res = await API.post("/admin/edit", {
    courseId,
    districtId,
    experience,
    target,
    residential,
    id,
  });
  return res.data;
}

export async function deleteAdminCourses(id: string) {
  const res = await API.post("/admin/delete", {
    id,
  });
  return res.data;
}

export async function addAdminCourses({
  courseId,
  districtId,
  experience,
  target,
  residential,
  id,
}: UpdateData) {
  const res = await API.post("/admin/add", {
    courseId,
    districtId,
    experience,
    target,
    residential,
    id,
  });
  return res.data;
}

export type AdminCourses = {
  status: "success" | "error";
  district: {
    districtId: number;
    districtName: string;
  }[];
  course: {
    courseId: number;
    courseName: string;
    type: {
      name: "STT" | "RTD";
      value: number;
    };
  }[];
  data: Data[];
};

export type Data = {
  pklLogId: number;
  vsCourseName: string;
  vsDistrictName: string;
  vsQualificationExperience: string;
  iTarget: number;
  bResidential: 1 | 0;
  pklCourseId: number;
  pklDistrictId: number;
};

type UpdateData = {
  courseId: string;
  districtId: string;
  experience: string;
  target: string;
  residential: string;
  id?: string;
};
