import React, { useEffect, useState } from "react";
import TableTemplate from "../../components/table";
import { RiDraftLine, RiUpload2Fill } from "react-icons/ri";
import { Button, Modal, Popconfirm, Upload } from "antd";
import uploadFile from "../../utils/file";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

function Designer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [listDrawings, setListDrawings] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileData, setFileData] = useState([]);

  const handleChangeImage =
    async (id) =>
    async ({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (fileList.length > 0) {
        const file = fileList[0];
        const url = await uploadFile(file.originFileObj);
        setFileList([]);
        console.log(url);
      }
    };

  const fetchDrawings = async () => {
    try {
      const response = await api.get("design-drawings/designer");
      console.log(response.data);
      setListDrawings(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDrawings();
  }, []);

  // useEffect(() => {
  //   fetchDrawings();
  // }, [listDrawings]);

  const handleUploadDrawing =
    (drawingId) =>
    async ({ fileList: newFileList }) => {
      const updatedFileData = fileData.map((item) => {
        if (item.id === drawingId) {
          return { ...item, fileList: newFileList }; // Cập nhật fileList cho dòng này
        }
        return item; // Không thay đổi các dòng khác
      });
      setFileData(updatedFileData);
      if (newFileList.length > 0) {
        const file = newFileList[0];
        const url = await uploadFile(file.originFileObj);
        console.log(url);
        try {
          const response = await api.get(`design-drawings/${drawingId}`);
          console.log(response.data);
          const updatedData = {
            designerAccount: response.data.designerAccount.id,
            status: "MANAGER_PENDING",
            designFile: url,
          };
          console.log(updatedData);

          await api.put(`design-drawings/${drawingId}`, updatedData);
          toast.success("Nộp bản vẽ thành công!");
          fetchDrawings();
        } catch (error) {
          console.log(error.response);
        }
      }
    };

  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteFile = async (drawingId) => {
    try {
      const response = await api.get(`design-drawings/${drawingId}`);
      console.log(response.data);
      const updatedData = {
        designerAccount: response.data.designerAccount.id,
        status: "DESIGNING",
        designFile: "N/A",
      };
      console.log(updatedData);

      await api.put(`design-drawings/${drawingId}`, updatedData);
      toast.success("Xóa bản vẽ thành công!");
      fetchDrawings();
    } catch (error) {
      console.log(error.response);
    }
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: ["orderCustomerResponse", "orderId"],
      key: "orderCustomerResponse.orderId",
      width: "150px",
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["orderCustomerResponse", "customerName"],
      key: "orderCustomerResponse.customerName",
      width: "250px",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["orderCustomerResponse", "customerPhone"],
      key: "orderCustomerResponse.customerPhone",
      width: "250px",
    },
    {
      title: "Trạng thái bản vẽ",
      dataIndex: "statusDescription",
      key: "statusDescription",
    },
    {
      title: "Bản vẽ",
      dataIndex: "status",
      key: "status",
      width: "150px",
      align: "center",
      render: (status, record) => (
        <>
          {status !== "DESIGNING" ? (
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => showModal(`${record.designFile}`)}
            >
              <RiDraftLine size={30} />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Xem file thiết kế
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <Upload
                fileList={
                  fileData.find((item) => item.id === record.id)?.fileList || []
                }
                onChange={handleUploadDrawing(record.id)}
                maxCount={1}
                showUploadList={{
                  showRemoveIcon: true,
                  showDownloadIcon: true,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <RiUpload2Fill size={30} />
                  <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                    Upload file thiết kế
                  </p>
                </div>
              </Upload>
            </div>
          )}
        </>
      ),
    },
    {
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (id, record) => (
        <>
          {record.status !== "DESIGNING" ? (
            <div>
              <Popconfirm
                title="Xóa bản vẽ"
                description="Bạn có chắc muốn xóa bản vẽ?"
                onConfirm={() => handleDeleteFile(id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              >
                <Button
                  icon={<DeleteOutlined />}
                  danger // Tùy chọn để làm nút đỏ
                >
                  Xóa
                </Button>
              </Popconfirm>
            </div>
          ) : (
            <div></div>
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
        requests={listDrawings}
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
        <Button>Download</Button>
      </Modal>
    </>
  );
}

export default Designer;
