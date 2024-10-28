import { Avatar, Paper, Typography } from "@mui/material";

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <Paper
      key={testimonial.id}
      sx={{
        maxWidth: 300,
        minWidth: 200,
        px: 2,
        pt: 3,
        pb: 1,
      }}
    >
      <Avatar
        sx={{ width: 60, height: 60 }}
        src={testimonial.profileImage}
      ></Avatar>
      <Typography fontWeight={700} mt={2} gutterBottom>
        {testimonial.name}
      </Typography>
      <Typography color="text.secondary" variant="body2" gutterBottom>
        {testimonial.description}
      </Typography>
    </Paper>
  );
}
