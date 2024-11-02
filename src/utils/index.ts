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

export const getCourseDataFromCookies = (): string[] => {
        const cookies = document.cookie;

        const courseRegex = /#\d+Course=([^;]*)/g;
        let courseDataArray: string[] = [];
        let match;

        while ((match = courseRegex.exec(cookies)) !== null) {
            courseDataArray.push(match[1]);
        }
        return courseDataArray;
};


export const getCourseIdsFromCookies = () => {
    const courseDataArray = getCourseDataFromCookies();

    if (courseDataArray.length === 0) {
      console.error("No course data found in cookies.");
      return [];
    }

    return courseDataArray.map((courseData) => {
      const courseDetails = courseData.split(',');
      return courseDetails[0];
    });
};
  
export const getMissingPriorityLevels = (): number[] => {
        const courseDataArray = getCourseDataFromCookies();
        const firstThreeRows = courseDataArray.slice(0, 3);
        const storedLevels: number[] = [];

        firstThreeRows.forEach((courseData, index) => {
            const courseArray = courseData.split(",");

            if (courseArray.length > 8) {
                const level = parseInt(courseArray[8], 10);

                if (!isNaN(level) && level >= 1 && level <= 3 && !storedLevels.includes(level)) {
                    storedLevels.push(level);
                }
            } else {
                console.log(`Course ${index + 1} does not have enough data or no valid value at index 8.`);
            }
        });


        const possiblePriorityLevels = [1, 2, 3];
        const missingLevels = possiblePriorityLevels.filter((level) => !storedLevels.includes(level));

        return missingLevels;
    };