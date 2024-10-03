import React, { useState, useEffect } from 'react'; // Giữ lại khai báo này
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.css'; // Assuming you have a CSS file for styles
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import { Carousel } from 'antd';

function HomePage() {
  const images = [ // Danh sách hình ảnh
    "https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1671456557525-fc9744617d91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1617908833148-6f81dc10d881?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const captions = [ // Danh sách văn bản
    "THIẾT KẾ KIẾN TRÚC CẢNH QUAN",
    "DESIGN & BUILD",
    "KIẾN TẠO CUỘC SỐNG"
  ];
  const text = [ // Danh sách văn bản phụ
    "Chúng tôi tự hào mang đến những không gian sống nghệ thuật qua từng thiết kế hồ cá koi. Với tầm nhìn sâu sắc về kiến trúc cảnh quan, mỗi công trình không chỉ là một hồ cá đơn thuần mà còn là tác phẩm kiến tạo không gian hài hòa, nơi con người và thiên nhiên hòa quyện, mang lại sự bình yên và thẩm mỹ cao nhất cho ngôi nhà của bạn.",
    "Với phương châm Design & Build, Koi Team dẫn đầu trong việc cung cấp giải pháp toàn diện từ thiết kế đến thi công, giúp khách hàng an tâm về chất lượng và tiến độ. Mỗi hồ cá koi là sự kết hợp hoàn hảo giữa sáng tạo và kỹ thuật, được chúng tôi chăm chút đến từng chi tiết, tạo nên những không gian nước tinh tế và đẳng cấp.",
    "Chúng tôi không chỉ xây dựng những công trình, chúng tôi kiến tạo lối sống. Mỗi hồ cá koi mà chúng tôi thực hiện là một phần của giấc mơ, mang đến sự cân bằng, thư giãn và niềm vui trong cuộc sống. Với lòng đam mê và sự tận tâm, Koi Team cam kết tạo ra không gian sống mà mọi khách hàng đều tự hào."
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Trạng thái cho chỉ số hình ảnh hiện tại
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
    };
  return (
    <div>
      <Header />

      <Carousel afterChange={onChange} className='carousel-container' autoplay effect="fade">
        <div className="image-container">
          <img src={images[0]} alt={`Image ${0}`} />
          <div className="image-overlay"></div> 
          <div className="caption">
            <h2 className="caption-text">{captions[0]}</h2>
            <p className="caption-text-small">{text[0]}</p>
          </div>
        </div>
        <div className="image-container">
          <img src={images[1]} alt={`Image ${1}`} />
          <div className="image-overlay"></div> 
          <div className="caption">
            <h2 className="caption-text">{captions[1]}</h2>
            <p className="caption-text-small">{text[1]}</p>
          </div>
        </div>
        <div className="image-container">
          <img src={images[2]} alt={`Image ${2}`} />
          <div className="image-overlay"></div> 
          <div className="caption">
            <h2 className="caption-text">{captions[2]}</h2>
            <p className="caption-text-small">{text[2]}</p>
          </div>
        </div>
    </Carousel>
      {/* <div className="image-slider">
        <div className="image-container">
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
          <div className="image-overlay"></div> 
          <div className="caption">
            <h2 className="caption-text">{captions[currentImageIndex]}</h2>
            <p className="caption-text-small">{text[currentImageIndex]}</p>
          </div>
        </div>
        <div className="navigation">
          <button onClick={handlePrev}><FaChevronLeft /></button> 
          <button onClick={handleNext}><FaChevronRight /></button> 
        </div>
      </div> */}

      <div className="koi-team">
        <h1>KOI TEAM - CHUYÊN CUNG CẤP</h1>
        <div className="services">
          <div className="service-item">Thiết kế thi công hồ cá Koi</div>
          <div className="separator"></div>
          <div className="service-item">Chăm sóc & Bảo dưỡng hồ cá Koi</div>
          <div className="separator"></div>
          <div className="service-item">Thiết kế thi công sân vườn</div>
          <div className="separator"></div>
          <div className="service-item">Thiết kế thi công hồ cá trọn gói</div>
        </div>
      </div>

      <div className='project'>
        <div>
          <a className='project-header'>DỰ ÁN TIÊU BIỂU</a>
          <div className="view-all-button"><button >XEM TẤT CẢ</button></div>
        </div>
        <div className="project-gallery">
          <div className="project-item">
            <img src="https://images.unsplash.com/photo-1654225718758-79c6f724183a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 1" />
            <h2 className="project-title">VIEN LE JARDIN</h2>
          </div>
          <div className="project-item">
            <img src="https://images.unsplash.com/photo-1654225718758-79c6f724183a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 2" />
            <h2 className="project-title">OPAL TOWER</h2>
          </div>
          <div className="project-item">
            <img src="https://images.unsplash.com/photo-1654225718758-79c6f724183a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 3" />
            <h2 className="project-title">ONSEN GÒ VẤP</h2>
          </div>
          <div className="project-item">
            <img src="https://images.unsplash.com/photo-1654225718758-79c6f724183a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project 4" />
            <h2 className="project-title">LÀNG THÔNG DONG</h2>
          </div>
        </div>
      </div>
      <div className="project-process">
        <h1>QUY TRÌNH THỰC HIỆN DỰ ÁN</h1>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-title">Tư vấn</div>
            <div className="step-description">Khách hàng được tư vấn mẫu thiết kế và nhận báo giá</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-title">Thiết kế</div>
            <div className="step-description">Bao gồm: Hình ảnh diễn họa 2D & 3D</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-title">Lập hồ sơ</div>
            <div className="step-description">Bao gồm hồ sơ thiết kế cơ sở và thiết kế thi công</div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-title">Thi công</div>
            <div className="step-description">Tổ chức thi công từ thô đến hoàn thiện</div>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-title">Nghiệm thu & Bàn giao</div>
            <div className="step-description">Nghiệm thu và bàn giao công trình</div>
          </div>
          <div className="step">
            <div className="step-number">6</div>
            <div className="step-title">Bảo dưỡng & Bảo hành</div>
            <div className="step-description">Bảo dưỡng và bảo hành công trình</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;