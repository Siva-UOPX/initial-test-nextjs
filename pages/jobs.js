import useSWR from "swr";
import axios from "axios";
import {
  Card,
  Typography,
  createTheme,
  Container,
  ThemeProvider,
  Grid,
  Stack,
  Item,
} from "@material-ui/core";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import JobCard from "../src/components/job-card/JobCard";
import { useState } from "react";

const fetcher = async () => {
  let tokenData = new URLSearchParams();
  tokenData.append("client_id", "phoenix");
  tokenData.append("client_secret", "7299ba896cec4860bd122e709cb58ea1");
  tokenData.append("grant_type", "client_credentials");
  tokenData.append("scope", "postings:us");

  const emsiResponse = await axios.post(
    "https://auth.emsicloud.com/connect/token",
    tokenData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const emsiToken = await emsiResponse.data.access_token;

  let postingsForm = {
    filter: {
      onet: ["11-1021.00", "11-3011.00"],
      when: {
        start: "2021-01",
        end: "2021-12",
      },
      city_name: ["Phoenix, AZ"],
      employment_type_name: ["Full-time (> 32 hours)"],
    },
    fields: [
      "id",
      "posted",
      "expired",
      "body",
      "city_name",
      "company_name",
      "title_raw",
      "url",
      "score",
      "onet",
      "skills_name",
      "salary",
      "employment_type_name",
    ],
    order: ["score"],
    limit: 5,
  };

  const res = await axios.post(
    `https://emsiservices.com/jpa/postings`,
    postingsForm,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${emsiToken}`,
      },
    }
  );

  const data = await res;
  return data;
};

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: "1rem",
  },
});

const Jobs = () => {
  const { data, error } = useSWR("job-postings", fetcher);
  const [expandable, setExpandable] = useState(() => false);

  if (error) return error;
  if (!data) return "Loading";
  const postingList = data.data.data.postings;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container style={{ padding: "20px" }}>
          <Typography variant="h1" className="header">
            Recommended Jobs
          </Typography>

          {postingList.map((posting) => {
            return (
              <JobCard
                key={posting.id}
                skills={posting.skills_name}
                jobTitle={posting.title_raw}
                company={posting.company_name}
                location={posting.city_name}
                // onClick={(e) => {
                //   e.preventDefault();
                //   setExpandable(!expandable);
                // }}
                // expandable={expandable}
                empType={posting.employment_type_name}
                salary={posting.salary ? posting.salary : "Unavailable"}
                postedDate={posting.posted}
              />
            );
          })}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Jobs;
