import React from "react";
import "./index.css";
import "../homepage/index.css";
import CommonPageTemplate from "../../../components/common-page-template";

function About() {
  const title = "Giới thiệu";
  const context = "Trang chủ »  Giới thiệu";
  const banner =
    "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/jaipreet-singh-w7NUZ__mv70-unsplash.jpg?alt=media&token=c8c55d47-2f1d-4fea-bcb2-a3aa72ead9f7";
  return (
    <div style={{display:'flex'}}>
      <CommonPageTemplate title={title} context={context} banner={banner}>
        {/* Giới thiệu */}
        <div className="about-container">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/Kx.png?alt=media&token=a18e8006-c7dd-425f-8259-1e154341e4b3"
              alt=""
            />
          </div>
          <div className="about-context">
            <h1>VỀ CHÚNG TÔI</h1>
            <div className="about-text">
              <p>
                Được thành lập từ năm 2013 với tên gọi ban đầu là CÔNG TY TNHH
                TƯ VẤN THIẾT KẾ VÀ CẢNH QUAN KOI POND, chúng tôi đã trải qua
                nhiều năm tích lũy kinh nghiệm và phát triển trong lĩnh vực
                thiết kế và xây dựng hồ cá Koi. Đến năm 2019, chúng tôi đổi tên
                thành CÔNG TY TNHH KIẾN TRÚC – CẢNH QUAN KOI POND để thể hiện rõ
                hơn chuyên môn về thiết kế hồ Koi và cảnh quan của mình.
              </p>
              <br />
              <p>
                Vào năm 2021, chúng tôi đã tái cơ cấu bộ máy quản lý và vận hành
                nhằm đáp ứng tốt hơn các yêu cầu ngày càng phức tạp của thị
                trường kiến trúc và cảnh quan. Đến năm 2022, chúng tôi mở rộng
                các dịch vụ của mình, tập trung vào việc mang đến các giải pháp
                sáng tạo và chất lượng cao cho các dự án hồ cá Koi.
              </p>
              <br />
              <p>
                Năm 2023, chúng tôi kết hợp với các đối tác uy tín và thành lập
                Koi Pond Vietnam, với mục tiêu đa dạng hoá quy trình thiết kế và
                triển khai dự án, mang lại sự độc đáo cho mỗi công trình hồ Koi
                mà chúng tôi thực hiện.
              </p>
              <br />
              <p>
                Chúng tôi tự hào tích luỹ được nhiều kinh nghiệm thông qua các
                dự án hồ cá Koi lớn tại nhiều khu vực như biệt thự, nhà phố,
                resort, khu du lịch và quán café. Sứ mệnh của chúng tôi là “Thổi
                hồn vào các công trình hồ cá Koi để biến chúng trở thành tác
                phẩm nghệ thuật”. Từng chi tiết nhỏ trong mỗi công trình, từ
                những viên đá đến từng cây cỏ, đều mang theo một câu chuyện
                riêng, truyền tải thông điệp về vẻ đẹp tự nhiên và phong thủy.
              </p>
              <br />
              <p>
                Hãy đến và chia sẻ với Koi Pond về ý tưởng hồ cá Koi trong mơ
                của bạn, chúng tôi cam kết biến nó thành hiện thực, tạo nên
                không gian sống và làm việc đẳng cấp và độc đáo.
              </p>
            </div>
          </div>
        </div>

        {/*Dịch vụ  */}
        <div className="service">
          <div className="service-container">
            <h2 className="service-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <ul className="service-list">
              Chúng tôi tự hào cung cấp các dịch vụ đa dạng liên quan đến thiết
              kế và thi công hồ cá Koi:
              <li>
                <strong>Tư vấn và thiết kế hồ cá Koi:</strong> Chúng tôi thiết
                kế hồ cá Koi theo yêu cầu, phù hợp với không gian, phong thủy và
                sở thích cá nhân của từng khách hàng.
              </li>
              <li>
                <strong>Thi công và lắp đặt hồ cá Koi:</strong> Đội ngũ kỹ thuật
                viên chuyên nghiệp của chúng tôi đảm bảo thi công chính xác,
                chất lượng, mang đến không gian hoàn mỹ cho khách hàng.
              </li>
              <li>
                <strong>Dịch vụ bảo trì và chăm sóc hồ Koi:</strong> Chúng tôi
                cung cấp dịch vụ bảo trì định kỳ để hồ cá Koi của bạn luôn trong
                tình trạng tốt nhất, nước sạch, cá khỏe mạnh.
              </li>
            </ul>
          </div>
        </div>

        {/* Tầm nhìn & Sứ mệnh */}
        <div className="image-container">
          <img
            className="cover-image"
            src="https://media.discordapp.net/attachments/1119844282023555113/1292127746322993187/7792008.jpg?ex=67029b3d&is=670149bd&hm=3b3a636c06853d8c2f1482b7ad9c413c9757089312971822d1d0c7a5476592ac&=&format=webp&width=1007&height=671"
            alt=""
          />
          <div className="caption">
            <h2
              className="caption-text"
              style={{
                fontSize: "2rem",
                margin: " 20px",
                letterSpacing: "2px",
              }}
            >
              <strong style={{ fontSize: "3rem" }}>TẦM NHÌN</strong> &{" "}
              <strong style={{ fontSize: "3rem" }}>SỨ MỆNH</strong>
            </h2>
            <p className="caption-text-small" style={{ fontSize: "1.2rem" }}>
              Koi Pond Vietnam ra đời với sứ mệnh “Thổi hồn vào các công trình
              hồ cá Koi để biến chúng trở thành tác phẩm nghệ thuật”. Chúng tôi
              mong muốn tạo ra không gian sống và làm việc hòa quyện với thiên
              nhiên, mang lại giá trị thẩm mỹ và sự bình yên trong từng thiết kế
              hồ cá Koi.
            </p>
            <h2
              className="caption-text"
              style={{
                fontSize: "2rem",
                margin: "100px 20px 20px",
                letterSpacing: "2px",
              }}
            >
              <strong style={{ fontSize: "3rem" }}>ĐỘI NGŨ CHUYÊN GIA</strong>
            </h2>
            <p className="caption-text-small" style={{ fontSize: "1.2rem" }}>
              Đội ngũ của Koi Pond là những kiến trúc sư, kỹ sư và nghệ nhân có
              nhiều năm kinh nghiệm trong lĩnh vực thiết kế hồ cá Koi và cảnh
              quan. Với kiến thức chuyên sâu và tâm huyết, chúng tôi cam kết sẽ
              mang đến cho khách hàng những giải pháp sáng tạo, độc đáo và hoàn
              hảo.
            </p>
            <h2
              className="caption-text"
              style={{
                fontSize: "2rem",
                margin: "100px 20px 20px",
                letterSpacing: "2px",
              }}
            >
              <strong style={{ fontSize: "3rem" }}>DỰ ÁN TIÊU BIỂU</strong>
            </h2>
            <p className="caption-text-small" style={{ fontSize: "1.2rem" }}>
              Chúng tôi đã thực hiện thành công nhiều dự án thiết kế và thi công
              hồ cá Koi cho các biệt thự, resort, khu nghỉ dưỡng, khu dân cư cao
              cấp, nhà phố và các không gian thương mại. Mỗi công trình là một
              tác phẩm độc đáo, mang dấu ấn riêng biệt, phù hợp với không gian
              và phong cách của chủ nhân.
            </p>
          </div>
        </div>
      </CommonPageTemplate>
    </div>
  );
}
export default About;
