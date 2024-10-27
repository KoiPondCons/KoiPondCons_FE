import React from "react";
import CommonTemplate from '../../../components/common-page-template';
import { Carousel, ConfigProvider } from "antd";
import { Link } from 'react-scroll';
import "./index.css"

const title = 'Dịch vụ';
const context = 'Trang chủ »  Dịch vụ';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';
const contentStyle = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  textAlign: 'center'
};




function Service() {
  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 60,          // Kích thước của mũi tên
                arrowOffset: 50,        // Khoảng cách của mũi tên từ mép
                dotWidth: 12,           // Độ rộng của dot
                dotHeight: 30,           // Chiều cao của dot
                dotActiveWidth: 32,     // Độ rộng của dot khi đang hoạt động
                dotGap: 6,              // Khoảng cách giữa các dot
                dotOffset: 16,          // Khoảng cách của dot từ mép
              },
            },
          }}
        >
          <Carousel arrows="true" autoplay="true" dotPosition="left"  >
            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/mason-c-rPJ6l43NCoQ-unsplash.jpg?alt=media&token=eb4605c3-f26e-4f5d-8758-9742fa241894" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Thiết kế</h3>
                  <p>Dịch vụ thiết kế hồ cá koi của chúng tôi không chỉ đơn thuần là xây dựng một khu vực nuôi cá mà còn là tạo ra một tác phẩm nghệ thuật sống động, kết hợp hài hòa giữa yếu tố nước, cá koi và cảnh quan xung quanh. Với kinh nghiệm lâu năm trong ngành thiết kế kiến trúc và cảnh quan, chúng tôi cam kết mang đến những giải pháp thiết kế sáng tạo, chất lượng cao và phù hợp với nhu cầu của từng khách hàng.</p>
                  <Link
                    className="learn-more-link"
                    to="section-thiet-ke"
                    smooth={true}
                    duration={500}
                    color="white"
                  >TÌM HIỂU THÊM</Link>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/l-intro-1652355268.jpg?alt=media&token=ebb58d3a-d86c-4c1b-9ea5-84843cf33d05" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Xây dựng</h3>
                  <p>Dịch vụ thiết kế hồ cá koi của chúng tôi không chỉ đơn thuần là xây dựng một khu vực nuôi cá mà còn là tạo ra một tác phẩm nghệ thuật sống động, kết hợp hài hòa giữa yếu tố nước, cá koi và cảnh quan xung quanh. Với kinh nghiệm lâu năm trong ngành thiết kế kiến trúc và cảnh quan, chúng tôi cam kết mang đến những giải pháp thiết kế sáng tạo, chất lượng cao và phù hợp với nhu cầu của từng khách hàng.</p>
                  <Link
                    className="learn-more-link"
                    to="section-xay-dung"
                    smooth={true}
                    duration={500}
                    color="white"
                  >TÌM HIỂU THÊM</Link>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/joshua-j-cotten--6Ogj29idsw-unsplash.jpg?alt=media&token=469cd94c-74d8-4d46-8038-747a700d95ec" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Bảo dưỡng</h3>
                  <p>Dịch vụ thiết kế hồ cá koi của chúng tôi không chỉ đơn thuần là xây dựng một khu vực nuôi cá mà còn là tạo ra một tác phẩm nghệ thuật sống động, kết hợp hài hòa giữa yếu tố nước, cá koi và cảnh quan xung quanh. Với kinh nghiệm lâu năm trong ngành thiết kế kiến trúc và cảnh quan, chúng tôi cam kết mang đến những giải pháp thiết kế sáng tạo, chất lượng cao và phù hợp với nhu cầu của từng khách hàng.</p>
                  <Link
                    className="learn-more-link"
                    to="section-bao-duong"
                    smooth={true}
                    duration={500}
                    color="white"
                  >TÌM HIỂU THÊM</Link>
                </div>
              </div>
            </div>
          </Carousel>
          <Carousel arrows="true" id="section-thiet-ke">
            <div >
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/courtney-vitale-A8Q8NTxLIdc-unsplash.jpg?alt=media&token=5868a729-fa89-4016-9e44-a05bf71d424c" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Thiết kế</h3>
                  <p>Với sự duyên dáng, tuổi thọ và màu sắc tuyệt đẹp của cá Koi, thật dễ dàng để biết lý do tại sao những khu vườn được thiết kế theo phong cách Nhật Bản không thể thiếu hồ cá Koi.
                    Thiết kế hồ cá Koi đẹp trong vườn không những mang lại vẻ đẹp thanh bình, may mắn và tài lộc mà còn mang vẻ đẹp thẩm mỹ riêng cho không gian nhà ở của gia chủ.
                    Khi xây dựng hồ cá koi, tùy thuộc vào không gian và diện tích sân vườn để xác định các thông số kỹ thuật độc đáo trong sân, tăng cường không gian cảnh quan cho gia chủ.
                    {/* <br />
                  <strong>Hãy để Koi Team với đội ngũ kỹ sư nhiều năm kinh nghiệm thiết kế thi công hồ cá koi nhiều dự án lớn nhỏ, cam kết sẽ mang lại cho gia chủ một sản phẩm chất lượng, độc đáo.</strong> */}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/sonya-tyler-LTmQlqfnYb4-unsplash.jpg?alt=media&token=065d35ee-0eea-4ec0-bce3-5fb888faaaba" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>1. Hình dáng hồ</h3>
                  <p>Hình dáng hồ sẽ phụ thuộc và sở thích cá nhân của bạn và diện tích tổng thể của sân vườn. Nếu cần thiết, hãy liên hệ một đơn vị chuyên nghiệp để họ có thể giúp bạn tư vấn thiết kế hồ cá koi theo mong muốn và sở thích của bạn.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/japanese-garden-koi-1385312.jpg?alt=media&token=ece717b1-3f0a-44a5-b036-f6f7c68b0f0a" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>2. Vị trí đặt hồ</h3>
                  <p>Hồ cá Koi có thể đặt được rất nhiều vị trí như: thiết kế hồ cá koi ngoài trời, trong nhà, ban công, sân thượng,… Tùy vào vị trí bạn muốn đặt hồ cá mà sẽ có những yêu cầu và kỹ thuật thi công khác nhau và phải đảm bảo: đầy đủ công năng, phù hợp với cảnh quan và đảm bảo chuẩn phong thủy.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/brice-cooper-UhmpFV76vIY-unsplash.jpg?alt=media&token=0593d926-e021-46fc-b7eb-59b309388f9e" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>3. Kích thước hồ</h3>
                  <p>Kích thước hồ cá koi cũng phải đảm bảo đạt được một số tiêu chuẩn nhất định như sau:</p>

                  <ul>
                    <li>
                      <strong>Chiều dài tối thiểu của hồ cá Koi:</strong>
                      <p>Chiều dài hồ cá Koi ít nhất là 2m mới đủ để thiết kế đầy đủ hệ thống cho hồ cá.</p>
                    </li>

                    <li>
                      <strong>Chiều rộng tối thiểu của hồ cá Koi:</strong>
                      <p>Ít nhất cũng phải đạt mức từ 0,8m đến 1m.</p>
                    </li>

                    <li>
                      <strong>Chiều sâu để thi công hồ cá Koi:</strong>
                      <p>Tùy mỗi dòng cá Koi để thiết kế độ sâu cho hồ cá.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/dylan-patterson-inqgHWchkHA-unsplash.jpg?alt=media&token=c9491029-e121-4e05-bb2f-0bc5adecb717" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>4. Mực nước trong hồ</h3>
                  <p>Mỗi vị trí đặt hồ sẽ có yêu cầu về mực nước khác nhau. Cụ thể như sau:</p>
                  <ul>
                    <li>
                      <strong>Hồ cá Koi trong nhà:</strong>
                      <p>Mực nước tối thiểu là 40 cm</p>
                    </li>

                    <li>
                      <strong>Hồ cá Koi ngoài trời:</strong>
                      <p>Mực nước tối thiểu là 60 cm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/koi-pond-creative-zen-inc-landscape-designer-and-contractor-img~85c1a687054c0df6_14-1741-1-6de8c3c.jpg?alt=media&token=fd36b6ab-2017-4ddb-a471-501fff9d1ea7" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>5. Hệ thống lọc nước và chất lượng nước</h3>
                  <p>Bên cạnh đó mực nước cần chú ý đến chất lượng nước trong hồ. Một hồ cá Koi đạt chuẩn sẽ được thiết kế thi công bằng hệ thống phụ kiện chất lượng cao như drum filter inox 304… giúp nước trong, không tảo và không có mầm bệnh, độ pH từ 7 – 7.5. Đồng thời cần đảm bảo luôn có dòng nước tuần hoàn để giúp cá vận động và tăng trưởng tốt hơn.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/tim-meyer-7I_TukSpSd0-unsplash.jpg?alt=media&token=4551ff21-1ad7-4163-bd9c-257a6776588c" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>6. Cá koi</h3>
                  <p>Hồ cá koi tất nhiên là phải có cá koi, tùy vào ngân sách bạn có thể chọn cá koi Nhật hoặc cá koi Việt. Tuy nhiên, cá koi đẹp phải có mảng màu sắc nét và màu sắc rõ ràng, dáng thon dài và đặc biệt không mang các mầm bệnh.</p>
                </div>
              </div>
            </div>
          </Carousel>


          <Carousel arrows="true" id="section-xay-dung">
            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/GettyImages-1321882531.jpg?alt=media&token=2218a1e6-adaf-4087-b8f0-d4770803bf61" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Thi công</h3>
                  <p>Thi công hồ cá koi là một bước quan trọng trong việc biến ý tưởng thiết kế thành hiện thực. Quá trình này đòi hỏi sự chính xác, kỹ thuật cao và kinh nghiệm để đảm bảo hồ cá không chỉ đẹp về thẩm mỹ mà còn đạt tiêu chuẩn về kỹ thuật, đảm bảo môi trường sống tốt nhất cho cá koi. Chúng tôi cam kết mang đến dịch vụ thi công hồ cá koi chất lượng cao, đảm bảo mọi yếu tố từ độ bền của hồ đến hệ thống lọc nước đều đạt chuẩn.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/sue-winston-t3cOkwbRcDs-unsplash.jpg?alt=media&token=db9aa0e7-f142-4fd4-9d22-1cb1e6fcb55a" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>1.  Chuẩn Bị Mặt Bằng Và Định Hình Hồ</h3>
                  <p>Trước khi bắt đầu thi công, chúng tôi tiến hành chuẩn bị mặt bằng, bao gồm dọn dẹp và xử lý địa hình. Quá trình này giúp định hình khu vực thi công, đánh dấu vị trí của hồ và các khu vực cảnh quan xung quanh.
                    <br />
                    {/* <br /> */}
                    Đào hố hồ cá với kích thước và hình dáng theo thiết kế. Tùy thuộc vào yêu cầu và không gian của khách hàng, hồ có thể có độ sâu khác nhau để phù hợp với sự phát triển của cá koi.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/ifrah-akhter-zj3sU-aHGjI-unsplash.jpg?alt=media&token=a81293bc-3cbf-40d7-86c4-92f347bbf0af" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>2.  Lắp Đặt Hệ Thống Chống Thấm</h3>
                  <p>Sử dụng các vật liệu chống thấm chất lượng cao như bạt chống thấm hoặc bê tông cốt thép để đảm bảo không xảy ra hiện tượng thấm nước ra ngoài. Đây là bước quan trọng để duy trì chất lượng nước trong hồ và bảo vệ kết cấu hồ.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/diane-picchiottino-rIcCOIe5bC8-unsplash.jpg?alt=media&token=739f7beb-0017-4c6a-a0af-61597e0d2bba" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>3.  Xây Dựng Hệ Thống Lọc Nước</h3>
                  <p>Hệ thống lọc nước là yếu tố cốt lõi trong thi công hồ cá koi, đảm bảo nước trong hồ luôn sạch sẽ và an toàn cho cá. Chúng tôi sử dụng các thiết bị lọc chuyên nghiệp, bao gồm bộ lọc cơ học và sinh học để loại bỏ cặn bẩn, tạp chất và duy trì sự cân bằng sinh học cho hồ.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/louie-martinez-LhcLxWURYHE-unsplash.jpg?alt=media&token=52398a29-d5db-44cc-9adc-7d9d33326b0d" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>4.  Trang Trí Cảnh Quan</h3>
                  <p>Bố trí các yếu tố cảnh quan như đá tự nhiên, cây cảnh, thác nước và các vật dụng trang trí khác để tạo sự hài hòa và tăng tính thẩm mỹ cho hồ cá koi.
                    <br />
                    {/* <br /> */}
                    Tùy thuộc vào phong cách thiết kế (nhật bản, hiện đại, tự nhiên...), các yếu tố cảnh quan sẽ được bố trí sao cho phù hợp và mang lại cảm giác thư giãn, gần gũi với thiên nhiên.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/ch-photography-MGALXTlCLiQ-unsplash.jpg?alt=media&token=368cb96e-a433-40e8-8a33-2a3061f4ae2d" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>5. Kiểm Tra Và Chạy Thử Hệ Thống</h3>
                  <p>Trước khi bàn giao, chúng tôi tiến hành kiểm tra tổng thể hệ thống, từ hệ thống lọc nước, máy bơm, hệ thống thoát nước đến tình trạng chống thấm của hồ.
                    <br />
                    Chạy thử hệ thống để đảm bảo mọi thứ hoạt động ổn định, điều chỉnh nếu cần thiết và kiểm tra chất lượng nước trước khi thả cá vào hồ.</p>
                </div>
              </div>
            </div>
          </Carousel>


          <Carousel arrows="true" id="section-bao-duong">
            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/huanshi-ognuxKmT5WA-unsplash.webp?alt=media&token=d98aeb3f-dc8f-4f9c-86fc-d891f29c503d" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>Bảo dưỡng & Bảo hành</h3>
                  <p>Bảo dưỡng hồ cá koi là một phần quan trọng để duy trì vẻ đẹp của hồ và đảm bảo sức khỏe tốt nhất cho cá. Với kinh nghiệm trong thiết kế và thi công hồ cá koi, chúng tôi cung cấp dịch vụ bảo dưỡng chuyên nghiệp, giúp hồ cá của bạn luôn trong tình trạng tối ưu. Dịch vụ bảo dưỡng không chỉ bao gồm việc làm sạch hồ mà còn kiểm tra, điều chỉnh các yếu tố như chất lượng nước, hệ thống lọc và môi trường sống của cá.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/adolfo-felix-yc08OYLQJyg-unsplash.jpg?alt=media&token=c3069e55-7e94-4b04-b673-a020263ba94f" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>1.  Kiểm Tra Và Điều Chỉnh Chất Lượng Nước</h3>
                  <p>Thường xuyên kiểm tra các chỉ số chất lượng nước như pH, nồng độ amoniac, nitrit, nitrat, và độ cứng của nước để đảm bảo môi trường sống lý tưởng cho cá koi.
                    Nếu phát hiện các chỉ số không đạt yêu cầu, chúng tôi sẽ thực hiện các biện pháp điều chỉnh như thay nước, thêm hóa chất an toàn hoặc cải thiện hệ thống lọc.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/kouji-tsuru-og5_eG9B4Gs-unsplash.jpg?alt=media&token=e193a85d-ad81-42bc-a9ef-a10cbf752c4a" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>2.  Làm Sạch Hồ Và Hệ Thống Lọc</h3>
                  <p>Vệ sinh hồ để loại bỏ các cặn bẩn, rêu tảo, và lá cây rụng. Điều này giúp duy trì tính thẩm mỹ và giảm nguy cơ phát sinh các bệnh về nước.
                    <br />
                    Kiểm tra và vệ sinh hệ thống lọc nước, bao gồm việc thay thế hoặc làm sạch các vật liệu lọc như bông lọc, than hoạt tính, và bộ lọc sinh học.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/pandhuya-niking-xkkivu_Wa7E-unsplash.jpg?alt=media&token=32398b41-5211-438f-9f7d-1c42f8cc1d4f" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>3.  Kiểm Tra Hệ Thống Máy Bơm Và Thiết Bị Khác</h3>
                  <p>Kiểm tra tình trạng hoạt động của máy bơm, hệ thống thổi khí, và các thiết bị điện khác để đảm bảo chúng hoạt động ổn định và hiệu quả.
                    <br />
                    Điều chỉnh lại các thiết bị nếu cần thiết và thay thế những bộ phận đã bị mòn hoặc hỏng.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/pandhuya-niking-ZQYZ2osTS3E-unsplash.jpg?alt=media&token=b08a32cc-ce1a-4a44-b6fb-0d84e141e9b8" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>4.  Làm Sạch Hồ Và Hệ Thống Lọc</h3>
                  <p>Quan sát tình trạng sức khỏe của cá koi để phát hiện sớm các dấu hiệu bất thường như chậm chạp, mất màu, hoặc có dấu hiệu bệnh tật.
                    <br />
                    Hướng dẫn khách hàng cách chăm sóc cá koi đúng cách, bao gồm chế độ ăn uống, số lượng thức ăn, và thời gian cho ăn.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="service-homepage" style={contentStyle}>
                <img className="service-image" src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/elliot-gouy-kVjsshQxnCQ-unsplash.jpg?alt=media&token=5525b80a-dec7-4aaf-8cc8-7442eacc0307" alt="" />
                <div className="image-overlay"></div>
                <div className="service-content">
                  <h3>5.  Kiểm Tra Và Bảo Trì Hệ Thống Trang Trí</h3>
                  <p>Kiểm tra các yếu tố trang trí như thác nước, đá cảnh, cây thủy sinh, để đảm bảo chúng không gây cản trở hoặc làm hại đến hệ thống lọc nước và cá.
                    <br />
                    Vệ sinh, cắt tỉa cây cảnh, hoặc điều chỉnh bố cục nếu cần để duy trì sự hài hòa cho không gian hồ.</p>
                </div>
              </div>
            </div>
          </Carousel>
        </ConfigProvider>
      </CommonTemplate>
    </div>
  );
}

export default Service;
