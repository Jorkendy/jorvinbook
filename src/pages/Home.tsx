import React from "react";
import { Helmet } from "react-helmet";

import ImageUploader from "../components/Uploader/ImageUploader/ImageUploader";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <h1>Home page</h1>
      <ImageUploader />
    </>
  );
};

export default Home;
