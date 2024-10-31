import React from "react";
import { useNavigate } from 'react-router-dom';
import "./price.css";
import CommonTemplate from '../../../components/common-page-template';
import { Link } from 'react-router-dom';
const title = 'Báo giá';
const context = 'Trang chủ » Báo giá';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';

function ListProject() {
  const navigate = useNavigate();


  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div className="pricing-body">
          <div class="card">
            <Link class="card1" to="/">
              <p>Gói cơ bản</p>
              <p class="small">Gói Cơ Bản: Phù hợp cho hồ Koi nhỏ, trang trí đơn giản. Bao gồm bê tông đáy, 1 lớp kè đá cuối vân mây, lọc thô 4 ngăn, thiết bị và bơm từ Đài Loan. Giá từ 7.100.000 – 10.000.000 đ/m³ tùy dung tích hồ.</p>
              <div class="go-corner">
                <div class="go-arrow">
                  →
                </div>
              </div>
            </Link>
            <Link class="card1" to="/">
              <p>Gói phổ thông</p>
              <p class="small">Gói Phổ Thông: Phù hợp cho hồ Koi cỡ trung bình, cảnh quan phức tạp hơn. Có chống thấm Epoxy, 2 lớp kè đá, lọc Drum sạch 90%, thiết bị và bơm từ Nhật Bản. Giá từ 8.000.000 – 12.000.000 đ/m³.</p>
              <div class="go-corner">
                <div class="go-arrow">
                  →
                </div>
              </div>
            </Link>
            <Link class="card1" to="/">
              <p>Gói cao cấp</p>
              <p class="small">Gói Phổ Thông: Phù hợp cho hồ Koi cỡ trung bình, cảnh quan phức tạp hơn. Có chống thấm Epoxy, 2 lớp kè đá, lọc Drum sạch 90%, thiết bị và bơm từ Nhật Bản. Giá từ 8.000.000 – 12.000.000 đ/m³.</p>
              <div class="go-corner">
                <div class="go-arrow">
                  →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </CommonTemplate>
    </div>
  );
}

export default ListProject;
