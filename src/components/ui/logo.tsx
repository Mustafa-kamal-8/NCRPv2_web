import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoIcon from "../../assets/asdm-logo.jpg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <List>
      <ListItem>
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
        
          
          <img  style={{width:'100px' , height:'100px'}}src={LogoIcon} alt="" />
        
          <ListItemText
  primaryTypographyProps={{
    color: "primary.main",
    fontWeight: "bold",     
    fontSize: "1.3rem",     
  }}
  secondaryTypographyProps={{
    color: "grey.700",  
    fontWeight: "bold",     
    fontSize: "1.2rem",       
  }}
  primary="ASSAM SKILL DEVELOPMENT MISSION"
  secondary="Government of Assam"
/>

        </ListItemButton>
      </ListItem>
    </List>
  );
}
