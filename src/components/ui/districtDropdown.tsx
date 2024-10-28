import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function DistrictDropdown({
  course,
  districts,
  onDistrictChange,
}) {
  const [selectedDistrict, setSelectedDistrict] = useState(course.districtId);

  const handleDistrictChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDistrict(selectedValue);
    onDistrictChange(selectedValue);
  };

  return (
    <div>
      <Select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        variant="outlined"
        sx={{ width: "100%", marginTop: 1 }}
      >
        {districts.map((district: any) => (
          <MenuItem key={district.districtId} value={district.districtId}>
            {district.districtName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

// Example usage
const course = {
  districtId: 3,
  districtName: "Kamrup Metropolitian",
  // other properties...
};

// const districts = [
//   { id: 1, name: "District 1" },
//   { id: 2, name: "District 2" },
//   { id: 3, name: "District 3" },
//   // add more districts as needed
// ];

// const App = () => {
//   const handleDistrictChange = (selectedDistrict) => {
//     // Handle the district change here
//     console.log("Selected District:", selectedDistrict);
//   };

//   return (
//     <DistrictDropdown
//       course={course}
//       districts={districts}
//       onDistrictChange={handleDistrictChange}
//     />
//   );
// };
