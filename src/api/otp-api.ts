import API from "./axios";

export const sendOTP = async (mobile: string): Promise<OTPResponse> => {
  const response = await API.post("/login", {
    mobile,
  });

  return response.data;
};

export const submitOTP = async (otp: string): Promise<OTPResponse> => {
  const response = await API.post("/login", {
    otp,
  });

  return response.data;
};

export const getCandidate = async (candidateId: number): Promise<Candidate> => {
  const response = await API.post("/modify/get", {
    candidateId,
  });
  return response.data;
};

export const fetchOTPCourses = async ({
  qualificationId,
  districtId,
}: {
  qualificationId: number;
  districtId: number;
}): Promise<Courses> => {
  const response = await API.post("/modify/getCourse", {
    qualificationId,
    districtId,
  });
  return response.data;
};

export const updateOTPCourse = ({ candidateId, courseId }: any) => {
  return API.post("/modify/update", {
    candidateId,
    courseId,
  });
};

type Courses = {
  status: string;
  data: {
    pklCourseId: number;
    vsCourseName: string;
  }[];
};

type Candidate = {
  message: string;
  status: string;
  data: {
    name: string;
    referenceNumber: string;
    qualification: string;
    qualificationId: number;
    courseId: number;
    courseName: string;
    mobile: string;
    districtId: number;
    districtName: string;
  };
};

interface OTPResponse {
  status: Status;
  message: string;
  otp: number;
  candidateId: number;
}

type Status = "success" | "error";
