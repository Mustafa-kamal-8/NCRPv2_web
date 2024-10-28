import { Container, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  description: string;
}

export default function AuthLayout({
  children,
  description,
  subTitle,
  title,
}: Props) {
  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography align="center" color="primary.dark" variant="body2" pb={1}>
        {subTitle}
      </Typography>
      <Typography align="center" variant="h4" fontWeight={500}>
        {title}
      </Typography>
      <Typography
        align="center"
        variant="body1"
        color="text.secondary"
        pb={2}
        pt={1}
      >
        {description}
      </Typography>

      {children}
    </Container>
  );
}
