import React from "react";

function HTMLRenderer(props) {
  const { htmlContent } = props;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default HTMLRenderer;
