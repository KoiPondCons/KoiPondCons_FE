import React from "react";
import CommonPageTemplate from "../../../components/common-page-template";
import ProgressConstruction from "../../../components/progress-construction";

function ProgressConstructionCustomer() {
  const banner =
    "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/banner-design-review.avif?alt=media&token=28f3cafe-4c84-4ea7-8fc9-f918d72c9919";
  const title = "Chi tiết tiến độ";
  return (
    <CommonPageTemplate banner={banner} title={title}>
      <ProgressConstruction />
    </CommonPageTemplate>
  );
}

export default ProgressConstructionCustomer;
