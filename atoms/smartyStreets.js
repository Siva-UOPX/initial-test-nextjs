import { selector } from "recoil";
import axios from "axios";
import { contactsQuery } from "./cognito";

const smartyStreetsQuery = selector({
  key: "smartyStreets",
  default: [],
  get: async ({ get }) => {
    let address = get(contactsQuery);
    const zipcode = address.postalCode;
    let smartyURL = "https://us-zipcode.api.smartystreets.com/lookup?";
    const smartyParams = {
        params:{
            "auth-id": "5a455642-008d-3969-9892-fd22c1706fd4",
            "auth-token": "TPmVQkZVp3qvFrSOiIWL",
            zipcode
        }
    };
    const smartyStreetsResponse = await axios.get(
        smartyURL, 
        smartyParams, 
        {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Host: "us-zipcode.api.smartystreets.com",
      },
    });

    if (smartyStreetsResponse.error) {
      throw smartyStreetsResponse.error;
    }
    return smartyStreetsResponse.data[0].zipcodes[0];
  },
});

export { smartyStreetsQuery };
