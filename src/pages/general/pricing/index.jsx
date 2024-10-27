import React from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css"
import CommonTemplate from '../../../components/common-page-template';
import price from '../../../images/baogia.png'

const title = 'Báo giá';
const context = 'Trang chủ » Báo giá';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';

function ListProject() {
  const navigate = useNavigate(); 
  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "white", padding: "100px 40px" }}>
          <img style={{ width: "60%", height: "auto" }} src={price} alt="" />
          <div style={{ marginTop: "2%" }}>
            <div className="notfound404-shape" style={{ display: "flex", justifyContent: "center",boxShadow:"none" }}>
                <button onClick={() => navigate('/contact')}>NHẬN TƯ VẤN NGAY</button>
            </div>
          </div>
        </div>

      </CommonTemplate>
    </div>
  );
}

export default ListProject;
