import { Container, Typography, Stack, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  description: string;
  courseName: string;
}

export default function EditPreferencesLayout({
  children,
  description,
  courseName,
  subTitle,
  title,
}: Props) {

  return (
    <Container maxWidth="lg" sx={ { my: 6 } }>
      <Stack direction="row" justifyContent={ "center" } spacing={ 2 }>
        <Typography align="center" variant="h4" fontWeight={ 500 }>
          { title }
        </Typography>
        <Stack direction="row" spacing={ 2 } pt={ 0.7 }>
          <Avatar
            sx={ {
              width: 30,
              height: 30,
              bgcolor: (theme) => theme.palette.primary.dark,
            } }
          >
            <SchoolIcon fontSize="small" />
          </Avatar>
          <Typography
            align="center"
            variant="h6"
            color="primary"
            fontWeight={ 500 }
          >
            { courseName }
          </Typography>
        </Stack>
      </Stack>

      {/* <Stack
        direction="row"
        justifyItems="center"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: (theme) => theme.palette.primary.dark,
          }}
        >
          <SchoolIcon fontSize="small" />
        </Avatar>
        <Stack>
          <Typography align="center" variant="h6">
            {courseName}
          </Typography>
        </Stack>
      </Stack> */}
      <Typography
        align="center"
        variant="body1"
        color="text.secondary"
        pb={ 2 }
        pt={ 1 }
      >
        { description }
      </Typography>
      <Typography align="center" color="primary.dark" variant="body2" pb={ 1 }>
        { subTitle }
      </Typography>

      { children }
    </Container>
  );
}
