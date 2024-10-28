import { StringSchema } from "yup";

type InitialData = {
  status: string;
  message: string;
  data: {
    time: [
      {
        serverTime: string;
      }
    ];
    highlightedCourses: Course[];
    testimonials: Testimonial[];
    districts?: {
      districtId: number;
      districtName: string;
    }[];
  };
};

type Course = {
  id: number;
  courseId: number;
  courseName: string;
  courseDescription: string;
  courseLevel: string;
  courseMode: string;
  totalHours: number;
  districtName: string;
  districtId: number;
  qualification: string;
  experience: string;
  residential: number;
  seatsAvailable: number;
  districts: any;
};

// type TC = {
//   TCId: number;
//   name: string;
//   mobile: number;
//   address: string;
//   area: string;
//   latitude: string;
//   vsLongitude: string;
//   PIN: string;
//   district: string;
// };

type CookieCourses = {
  courseId: number;
  courseName: string;
  preferred_district1: string;
  preferred_district2: string;
  preferred_district3: string;
  priorityLevel: number;
  hostelPreference: number;
  employementPreference: number;
};

type RegistrationStatistics = {
  // id: number;
  // date: string;
  // districtName: string;
  // courseName: string;
  // total: number;

  id: number;
  district: string;
  total: number;
};

type Testimonial = {
  id: number;
  name: string;
  description: string;
  profileImage: string;
};

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
type CourseMode = "Full Time" | "Part Time";
type TotalHours = 120 | 240 | 400;

type CourseBody = {
  lowLim?: number;
  hiLim?: number;
  courseLevel?: CourseLevel[];
  courseMode?: CourseMode[];
  totalHours?: TotalHours[];
  searchCriteria?: string;
  qualificationId: number;
  districtId: number;
};

type CourseData = {
  district: District[];
  data: {
    district: string;
    courseId: number;
    courseName: string;
    courseDescription: string;
    courseLevel: string;
    courseMode: string;
    totalHours: number;
  };
  qualification: Qualification[];
  gender: Gender[];
  qualificationMin: Qualification;
  location: TLocation[];
};

type TLocation = {
  lat: number;
  lng: number;
};

type District = {
  districtID: number;
  districtName: string;
};

type State = {
  stateId: number;
  stateName: string;
};

type Qualification = {
  qualificationID: number;
  qualificationName: string;
};

type Gender = {
  id: number;
  gender: string;
};

type Caste = { casteId: number; castName: string };
