const env = process.env.REACT_APP_STAGE || "development";

const config: any = {
  development: {
    api: "https://asia-northeast1-api-jorvinbook.cloudfunctions.net/api"
  },
  production: {
    api: "https://asia-northeast1-api-jorvinbook.cloudfunctions.net/apiÎ"
  }
};

export default config[env];
