import { Skeleton, Stack } from "@mui/material";

export default function TestimonialsSkeleton() {
  return (
    <>
      {Array.from(Array(3).keys()).map((value) => (
        <Stack key={value}>
          <Skeleton variant="circular" width={40} height={60} />

          <Skeleton variant="text" height={30} width={250} />
          <Skeleton variant="text" height={30} width={250} />
        </Stack>
      ))}
    </>
  );
}
