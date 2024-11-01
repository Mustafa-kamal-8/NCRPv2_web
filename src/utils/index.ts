export const getCoursesCountFromCookies = () => {
    const cookies = document.cookie;
    const courseRegex = /#\d+Course=/g;
    const courses = cookies.match(courseRegex);
    return courses ? courses.length : 0;
};


export const convertToNull = (value: any) =>
              value === "null" ? null : value;


export const getAllCookies = () => {
  const cookies = document.cookie.split(";");
  const values = cookies.map((cookie) => cookie.trim().split("=")[1]);
  console.log("Cookie values:", values);
  return cookies.length;
};
