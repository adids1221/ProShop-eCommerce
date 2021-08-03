import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To ProShop",
  description: "We deliver the best Ecommerce experience you can ask for!",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;
