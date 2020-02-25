const env = process.env.REACT_APP_STAGE || "development";

const config: any = {
  development: {
    api: "https://asia-northeast1-api-jorvinbook.cloudfunctions.net/api",
    tinyApiKey: "ie2kmlymwmfynqgpaz0ek8idfetmf0y35ddgpucsmb74cbzn"
  },
  production: {
    api: "https://asia-northeast1-api-jorvinbook.cloudfunctions.net/api",
    tinyApiKey: "ie2kmlymwmfynqgpaz0ek8idfetmf0y35ddgpucsmb74cbzn"
  }
};

export default config[env];
