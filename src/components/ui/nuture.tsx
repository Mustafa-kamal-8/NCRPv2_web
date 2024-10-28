import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoIcon from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Nurture() {
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
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#fff" }}>
              <LogoIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              color: "primary.main",
              fontWeight: 500,
            }}
            //   primary="ASSAM SKILL DEVELOPMENT MISSION"
            //   secondary="Government of Assam"
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
