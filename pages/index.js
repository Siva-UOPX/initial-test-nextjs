import { Container, Typography } from "@material-ui/core";
import Tasks from "@/components/checkbox/tasks";

export default function Home() {
  return (
    <>
      <Container style={{ padding: "20px" }}>
        <Typography variant="h1" className="header">
          My Plan
        </Typography>
        <Tasks />
      </Container>
    </>
  );
}
