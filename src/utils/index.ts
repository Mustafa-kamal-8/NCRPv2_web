export const getCoursesCountFromCookies = () => {
    const cookies = document.cookie;
    const courseRegex = /#\d+Course=/g;
    const courses = cookies.match(courseRegex);
    return courses ? courses.length : 0;
};


export const convertToNull = (value: any) =>
              value === "null" ? null : value;