import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";

export const STEPS_TO_FOLLOW = [
  {
    id: 1,
    icon: ManageSearchRoundedIcon,
    title: "Find Course",
    description: "Use the 'Courses' menu to find a course of your choice.",
  },
  {
    id: 2,
    icon: SubjectRoundedIcon,
    title: "Enroll",
    description:
      "Click on the ‘Enroll’ button on the course information page to take admission for the course.",
  },
  {
    id: 3,
    icon: MenuBookRoundedIcon,

    title: "Learn",
    description: "Learn the course at the center of your choice.",
  },
  {
    id: 4,
    icon: StarBorderRoundedIcon,
    title: "Get Skilled",
    description:
      "Complete the Continuous assessments based learning process to develop job ready skills.",
  },
  {
    id: 5,
    icon: SchoolRoundedIcon,
    title: "Get Certified",
    description:
      "Get certificate upon successfully completing the course and passing the Assessments.",
  },
  {
    id: 6,
    icon: CurrencyRupeeRoundedIcon,
    title: "Get Earn",
    description: "Get placed in an organization and earn.",
  },
];

export const ROUTE_PATHS = {
  ABOUT_US: "/about-us",
  REGISTRATION_STATS: "/mega-registration-dashboard",
  COURSES: "/courses",
  COURSES_BY_DISTRICT: "/courses-by-district",
  ACKNOWLEDGE: "/acknowledge",
  ADMIN: "/maximus",
  PRFERENCE: "/preference",
  MYCOURSES: "/my-courses",
  CANDIDATE_REGISTER: "auth/candidate-register",
  CANDIDATE_LOGIN: "auth/candidate-login",
  CANDIDATE_PROFILE: "auth/candidate-profile",
  TRAINING_CENTERS: "training-centers",
} as const;

export const NAVITEMS = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "About Us",
    path: ROUTE_PATHS.ABOUT_US,
  },
  {
    id: 2,
    label: "Training Centres",
    path: ROUTE_PATHS.TRAINING_CENTERS,
  },

  {
    id: 3,
    label: "Our Courses",
    path: ROUTE_PATHS.COURSES,
  },
  {
    id: 4,
    label: "My Courses",
    path: ROUTE_PATHS.MYCOURSES,
  },
  {
    id: 5,
    label: "Login",
    path: ROUTE_PATHS.CANDIDATE_LOGIN,
  },
];

export const CANDIDATE_NAVITEMS = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "About Us",
    path: ROUTE_PATHS.ABOUT_US,
  },

  {
    id: 3,
    label: "My Profile",
    path: ROUTE_PATHS.CANDIDATE_PROFILE,
  },
  {
    id: 4,
    label: "Our Courses",
    path: ROUTE_PATHS.COURSES,
  },
  {
    id: 5,
    label: "My Courses",
    path: ROUTE_PATHS.MYCOURSES,
  },
  {
    id: 6,
    label: "Logout",
    path: "/",
  },
];

export const SETTINGS_BUTTONS = [
  { label: "Register", icon: HowToRegRoundedIcon, id: 1 },
  { label: "Login", icon: LoginRoundedIcon, id: 2 },
];

export const QUERYKEY = {
  INITAL: "initial",
  COURSES: "courses",
  COURSELOAD: "courseLoad",
  COURSE: "course",
  ADMINCOURSE: "adminCourse",
} as const;

export const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
