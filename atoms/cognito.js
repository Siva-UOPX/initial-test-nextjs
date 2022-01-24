import { atom, selector } from "recoil";
import axios from "axios";

const cognitoQuery = selector({
  key: "cognito",
  default: "yabba dabba do",
  get: async ({ get }) => {
    let cognitoData = new URLSearchParams();
    cognitoData.append("grant_type", "client_credentials");
    const cognitoResponse = await axios.post(
      "https://uopxauth-stufac-st.auth.us-east-1.amazoncognito.com/oauth2/token",
      cognitoData,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic NHJjMGloY2xsY3RnMGFkYXQybDRzcTBzcWg6ODVta2hmNmFmaGpiNnBhcDU5b2U5YTdza2pnZ3Z2dDIzbWQxa2hkZ2llZm9iczczY3Jq",
        },
      }
    );
    if (cognitoResponse.error) {
      throw cognitoResponse.error;
    }
    return cognitoResponse.data.access_token;
  },
});

const contactsQuery = selector({
  key: "getContacts",
  default: {},
  get: async ({ get }) => {
    // const cognito = get(cognitoQuery);
    // console.log("cognito", cognito);
    const address = await axios.get(
      "http://localhost:4000/address5"
      // "https://api.st.uopx.io/api/contacts/v1/addresses?linkId=695515961418371072",
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${cognito}`,
      //   },
      // }
    );
    if (address.error) {
      throw address.error;
    }
    return address.data;
  },
});

export { cognitoQuery, contactsQuery };
