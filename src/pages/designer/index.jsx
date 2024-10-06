import React, { useState } from "react";
import TableTemplate from "../../components/table";
import { RiDraftLine, RiUpload2Fill } from "react-icons/ri";
import { Modal } from "antd";
function Designer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const data = [
    {
      key: "1",
      id: "001",
      customer_name: "Nguyễn Văn A",
      name: "Trần Thị B",
      phone: "0123456789",
      status: "Đang chờ",
      hasImage: true, // Hoặc false tùy thuộc vào trạng thái
    },
    {
      key: "2",
      id: "002",
      customer_name: "Lê Thị C",
      name: "Nguyễn Văn D",
      phone: "0987654321",
      status: "Hoàn thành",
      hasImage: false, // Không có hình
    },
    {
      key: "3",
      id: "003",
      customer_name: "Phạm Văn E",
      name: "Trần Văn F",
      phone: "0234567890",
      status: "Đang xử lý",
      hasImage: true, // Có hình
    },
    {
      key: "4",
      id: "004",
      customer_name: "Nguyễn Thị G",
      name: "Lê Văn H",
      phone: "0345678901",
      status: "Đã hủy",
      hasImage: false, // Không có hình
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name ",
      key: "customer_name ",
    },
    {
      title: "Tư vấn viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại tư vấn viên",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "actor",
      key: "actor",
      render: (text, record) => (
        <>
          {record.hasImage ? (
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() =>
                showModal(
                  "https://sgl.com.vn/wp-content/uploads/2020/04/ban-ve-ho-ca-koi-dep-e1599281683641-802x451.jpg"
                )
              }
            >
              <RiDraftLine size={30} />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Xem file thiết kế
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <RiUpload2Fill size={30} />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Upload file thiết kế
              </p>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <TableTemplate
        actor="designer"
        title="Xem đơn thiết kế"
        columns={columns}
        requests={data}
      ></TableTemplate>
      <Modal
        title="Hình ảnh thiết kế"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <img
          alt="Design"
          src={imageSrc}
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>
    </>
  );
}

export default Designer;
