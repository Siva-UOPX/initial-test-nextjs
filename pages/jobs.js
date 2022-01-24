import { Typography, Container } from "@material-ui/core";
import JobCard from "@/components/job-card/JobCard";
import { useRecoilValueLoadable } from "recoil";
import { jobsQuery } from "../atoms/emsi";
import JobCardDetailsMobile from "@/components/job-card/jobCardDetailsMobile";
import { useState, useEffect } from "react";

const Jobs = () => {
  const [detailRender, setDetailRender] = useState({
    display: false,
    render: <JobCardDetailsMobile />,
  });
  const jobs = useRecoilValueLoadable(jobsQuery);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [detailRender]);

  const handleClick = (e) => {
    e.preventDefault();
    let selectedId = e.currentTarget.id;
    let selectedCard;

    if (postingList) {
      selectedCard = postingList.filter((x) => x.id === selectedId)[0];
    }
    setDetailRender({
      display: true,
      render: (
        <JobCardDetailsMobile
          {...selectedCard}
          onClick={() =>
            setDetailRender({
              display: false,
              render: <JobCardDetailsMobile />,
            })
          }
        />
      ),
    });
  };

  switch (jobs.state) {
    case "hasValue":
      const postingList = jobs.contents.postings;

      if (detailRender.display) {
        return detailRender.render;
      }

      return (
        <>
          <Container style={{ padding: "20px" }}>
            <Typography variant="h1" className="header">
              Recommended Jobs
            </Typography>

            {postingList.map((posting) => {
              return (
                <JobCard
                  key={posting.id}
                  id={posting.id}
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
                  onClick={handleClick}
                />
              );
            })}
          </Container>
        </>
      );
    case "loading":
      return <h1>Loading</h1>;
    case "hasError":
      return <h1>Error {jobs.contents}</h1>;
  }
};

export default Jobs;
