// Navbar.js

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { NAVITEMS, CANDIDATE_NAVITEMS } from "../../data/constants";
import Logo from "./logo";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidateCourses } from "../../api/candidate-api";
import { useQuery } from "@tanstack/react-query";
import { getCoursesCountFromCookies } from "../../utils";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
  const closeDrawer = () => setMobileOpen(false);
  const candidateId = localStorage.getItem("candidateId");

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const getAllCookies = () => {
    function isCookieStorageEmpty() {
      return document.cookie === "";
    }
    if (isCookieStorageEmpty()) {
      return 0;
    } else {
      let cookies = document.cookie.split(";");
      let values = cookies.map((cookie) => cookie.trim().split("=")[1]);
      return values.length;
    }
  };

  const [totalCoursesInBasket, setTotalCoursesInBasket] = useState(0);

  useEffect(() => {
    let cookies = document.cookie.split(";");
    if (cookies.length !== 0) {
      const cookiesLengthValue = getAllCookies();
      setTotalCoursesInBasket(cookiesLengthValue);
    }
  }, []);

  useEffect(() => {
    const count = getCoursesCountFromCookies();
    setTotalCoursesInBasket(count);
  }, []);

  // useEffect(() => {
  //   console.log("Candidate ID:", candidateId);
  //   console.log("Candidate Courses Data:", candidateCoursesData);
  //   console.log("Total Courses in Basket:", totalCoursesInBasket);
  // }, [candidateId, totalCoursesInBasket]);

  const [show, setShow] = useState(true);

  const { data: candidateCoursesData, isLoading } = useQuery({
    queryFn: () => getCandidateCourses(candidateId!),
    queryKey: ["candidate_courses", candidateId!],
    enabled: !!candidateId,
    onSuccess(data) {
      console.log("Query Success Data:", data);
      if (data?.isAccess === "denied edit") {
        console.log("showwwwwww", show);

        setShow(false);
      } else {
        setShow(true);
      }
    },
  });

  return (
    <>
      <AppBar
        component="header"
        elevation={ 1 }
        position="sticky"
        sx={ {
         
          backgroundColor: "background.paper",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        } }
      >
        <Toolbar component="nav">
          <IconButton
            sx={ {
              display: { sm: "none" },
            
            } }
            size="small"
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={ handleDrawerToggle }
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" flex={ 1 }>
            <Logo />
          </Stack>
          { candidateId ? (
            <Box sx={ { display: { xs: "none", sm: "block" } } }>
              { CANDIDATE_NAVITEMS.map(
                (item) =>
                  (item.label !== "My Courses" || show) && (
                    <Button
                      key={ item.id }
                      component={ Link }
                      to={ item.path }
                      sx={ { mr: 1, color: theme.palette.text.secondary } }
                      onClick={
                        item.label === "Logout" ? handleLogoutClick : undefined
                      }
                    >
                      { item.label }
                      { item.label === "My Courses" && show && (
                        <Stack
                          position="relative"
                          sx={ { display: "inline-block" } }
                        >
                          <AddShoppingCartOutlinedIcon
                            color="primary"
                            fontSize="large"
                          />
                          { totalCoursesInBasket > 0 && (
                            <Typography
                              variant="body2"
                              sx={ {
                                position: "absolute",
                                top: 0,
                                right: 1,
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "50%",
                                padding: "2px 6px",
                              } }
                            >
                              { totalCoursesInBasket }
                            </Typography>
                          ) }
                          { candidateCoursesData?.basket?.length > 0 && (
                            <Typography
                              variant="body2"
                              sx={ {
                                position: "absolute",
                                top: 0,
                                right: 1,
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "50%",
                                padding: "2px 6px",
                              } }
                            >
                              { candidateCoursesData?.basket?.length }
                            </Typography>
                          ) }
                        </Stack>
                      ) }
                      { item.label === "Login" && (
                        <LoginOutlinedIcon color="primary" />
                      ) }
                      { item.label === "Register" && (
                        <PersonAddAltOutlinedIcon color="action" />
                      ) }
                      { item.label === "Logout" && (
                        <LogoutOutlinedIcon color="action" />
                      ) }
                    </Button>
                  )
              ) }
            </Box>
          ) : (
            <Box sx={ { display: { xs: "none", sm: "block" } } }>
              { NAVITEMS.map((item) => (
                <Button
                  key={ item.id }
                  component={ Link }
                  to={ item.path }
                  sx={ { mr: 1, color: theme.palette.text.secondary } }
                >
                  { item.label }
                  { item.label === "My Courses" && (
                    <Stack position="relative" sx={ { display: "inline-block" } }>
                      <AddShoppingCartOutlinedIcon
                        color="primary"
                        fontSize="large"
                      />
                      { candidateCoursesData?.basket?.length > 0 && (
                        <Typography
                          variant="body2"
                          sx={ {
                            position: "absolute",
                            top: 0,
                            right: 1,
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                          } }
                        >
                          { candidateCoursesData?.basket?.length }
                        </Typography>
                      ) }
                    </Stack>
                  ) }
                  { item.label === "Login" && (
                    <LoginOutlinedIcon color="primary" />
                  ) }
                  { item.label === "Register" && (
                    <PersonAddAltOutlinedIcon color="action" />
                  ) }
                </Button>
              )) }
            </Box>
          ) }
        </Toolbar>
      </AppBar>
      <Box component="header">
        <Drawer
          component="nav"
          anchor="top"
          variant="temporary"
          open={ mobileOpen }
          onClose={ handleDrawerToggle }
          ModalProps={ {
            keepMounted: true,
          } }
          sx={ {
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              height: "100vh",
              position: "static",
              zIndex: (theme) => theme.zIndex.drawer + 2,
            },
          } }
        >
          <Stack pt={ 22 } pb={ 4 } margin={ 1 } height="100vh">
            { candidateId ? (
              <List>
                { CANDIDATE_NAVITEMS.map((item) => (
                  <ListItem key={ item.id } disablePadding>
                    <ListItemButton
                      sx={ { textAlign: "center" } }
                      color="primary.main"
                      component={ Link }
                      to={ item.path }
                      onClick={ closeDrawer }
                    >
                      <ListItemText
                        primary={ item.label }
                        primaryTypographyProps={ {
                          fontWeight: 500,
                        } }
                      />
                    </ListItemButton>
                  </ListItem>
                )) }
              </List>
            ) : (
              <List>
                { NAVITEMS.map((item) => (
                  <ListItem key={ item.id } disablePadding>
                    <ListItemButton
                      sx={ { textAlign: "center" } }
                      color="primary.main"
                      component={ Link }
                      to={ item.path }
                      onClick={ closeDrawer }
                    >
                      <ListItemText
                        primary={ item.label }
                        primaryTypographyProps={ {
                          fontWeight: 500,
                        } }
                      />
                    </ListItemButton>
                  </ListItem>
                )) }
              </List>
            ) }
          </Stack>
        </Drawer>
      </Box>
    </>
  );
}
