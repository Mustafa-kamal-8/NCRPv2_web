import { Grid, Skeleton, Stack } from "@mui/material";

type Props = {
  numberOfCourses?: number;
};

export default function CoursesSkeleton({ numberOfCourses = 8 }: Props) {
  return (
    <>
      {Array.from(Array(numberOfCourses).keys()).map((index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CourseSkeleton />
        </Grid>
      ))}
    </>
  );
}

function CourseSkeleton() {
  return (
    <Stack maxWidth={376} p={2} spacing={1}>
      <Stack
        direction="row"
        justifyItems="flex-start"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Skeleton variant="circular" width={40} height={40} />

        <Stack>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={150} height={15} />
        </Stack>
      </Stack>
      <Skeleton variant="text" height={30} width={250} />
      <Skeleton variant="text" height={18} width={100} />
      <Skeleton variant="text" height={18} width={180} />
    </Stack>
  );
}
