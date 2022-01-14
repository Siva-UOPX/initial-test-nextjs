import { atom, selector } from "recoil";
import axios from "axios";

const tokenQuery = selector({
  key: "token",
  default: "standard message",
  get: async ({ get }) => {
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
    if (emsiResponse.error) {
      throw emsiResponse.error;
    }
    return emsiResponse.data.access_token;
  },
});

const jobsQuery = selector({
  key: "jobs",
  default: [],
  get: async ({ get }) => {
    const token = get(tokenQuery);
    const mbaProgram = ["13-1151.00", "11-2033.00"];
    const currentProgram = mbaProgram;

    let postingsForm = {
      filter: {
        onet: currentProgram,
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
      limit: 10,
    };

    const res = await axios.post(
      `https://emsiservices.com/jpa/postings`,
      postingsForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res;
    return data;
  },
});

export { tokenQuery, jobsQuery };
