import { atom, selector } from "recoil";
import axios from "axios";
import { contactsQuery } from "./cognito";
// import states from "@/components/utils/states";
import { smartyStreetsQuery } from "./smartyStreets";

const emsiRequest = async (postingsForm, token) => {
  const data = await axios.post(
    `https://emsiservices.com/jpa/postings`,
    postingsForm,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (data.error) {
    throw data.error;
  }
  return data.data.data;
};

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

    const address = get(contactsQuery);
    const city = address.city;
    const stateProvince = address.stateProvince;

    let postingList = [];
    let postingsForm = {
      filter: {
        onet: currentProgram,
        when: "active",
        city_name: [`${city}, ${stateProvince}`],
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
// First checks based on city and state from contacts MS
    console.log("Level 1");
    const cityRes = await emsiRequest(postingsForm, token);
    let data = await cityRes;
    postingList = data.postings;
// If less than 3 postings check SmartyStreets API for fips code 
    if (postingList.length < 3) {

      delete postingsForm.filter.city_name;
      const smarty = get(smartyStreetsQuery);
      let fips = smarty.county_fips;
      postingsForm.filter.fips = [`${fips}`];

      let newForm = JSON.stringify(postingsForm);
      console.log("Level 2");
      const fipsRes = await emsiRequest(newForm, token);
      data = await fipsRes;
      postingList = data.postings;
// If less than 3 postings check SmartyStreets API for state name   
      if (postingList.length < 3) {

        delete postingsForm.filter.fips;
        // const stateArray = states.filter(
        //   (state) => state.value === stateProvince
        // );
        const stateName = smarty.state;
        postingsForm.filter.state_name = [`${stateName}`];
        let newForm = JSON.stringify(postingsForm);
        console.log("Level 3");
        const stateRes = await emsiRequest(newForm, token);
        data = await stateRes;

      }
    }
    return data;
  },
});

export { tokenQuery, jobsQuery };
