import API from "./axios";

export async function fetchCourses(body: CourseBody): Promise<{
  data: Course[];
  length: number;
}> {
  const res = await API.post("/course", body);
  return res.data;
}

export const fetchCourseWithDistricts = async (courseId: string) => {
  const response = await API.post(`/course-district`, {
    courseId,
  });
  return response.data;
};

export async function fetchCourse(data: {
  courseId: string;
  districtId: string;
}): Promise<CourseData> {
  const res = await API.post(`/courseDetail`, {
    courseId: data.courseId,
    districtId: data.districtId,
  });
  return res.data;
}

export async function fetchCoursesWithHighestQualification(data: {
  qualificationId: number;
  districtId: number;
  lowLim: number;
  hiLim: number;
}): Promise<CourseData> {
  const response = await API.post(`/course`, {
    qualificationId: data.qualificationId,
    districtId: data.districtId,
    lowLim: data.lowLim,
    hiLim: data.hiLim,
  });
  return response.data;
}

export async function applyCourse(data: any) {
  const res = await API.post("/register", data);
  return res.data;
}

export async function courseLoad(): Promise<CourseLoad> {
  const res = await API.post("/courseLoad");
  return res.data;
}

export async function sendOtp(mobile: string) {
  const res = await API.post("/otp", {
    mobile,
  });
  return res.data;
}

export async function addCourse(data: any) {
  const res = await API.post("/basket/add", data);

  return res.data;
}

export async function findCourse(data: any) {
  const res = await API.post("/course", data);
  return res.data;
}

export async function editCourse(data: any[]) {
  const res = await API.post("/basket/update", {
    ...data,
  });

  return res.data;
}

// export async function deleteCourse(data: any[]) {
//   const res = await API.post("/basket/remove", {
//     ...data,
//   });

export async function deleteCourse(data: any) {
  const res = await API.post("/basket/remove", data);

  return res.data;
}

interface CourseLoad {
  district: District[];
  state: State[];
  qualification: Qualification[];
  caste: Caste[];
}
