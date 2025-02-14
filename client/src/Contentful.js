const contentful = require("contentful");

const space = process.env.REACT_APP_API_SPACE;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

if (!space || !accessToken) {
  throw new Error("Contentful space or access token not defined");
}

export default contentful.createClient({
  space,
  accessToken
});
