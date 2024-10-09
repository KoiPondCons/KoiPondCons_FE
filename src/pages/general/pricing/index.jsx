import React from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import CommonTemplate from '../../../components/common-page-template';

const title = 'Báo giá';
const context = 'Trang chủ » Báo giá';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';

function ListProject() {
  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div>{/* nội dung ở đây */}</div>
      </CommonTemplate>
    </div>
  );
}

export default ListProject;
