import React, { useEffect, useState } from "react";
import NavDashboard from "../../../components/navbar-dashboard";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Upload,
} from "antd";
import api from "../../../config/axios";
import "../../../utils/common.css";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useParams } from "react-router-dom";
import Bill from "../../../components/bill";
import OrderInfor from "../../../components/order-information";
import { RiDraftLine, RiUpload2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/file";
function PriceListStaff() {
  const { id } = useParams();
  const location = useLocation();
  const [form] = Form.useForm();
  const { actor } = location.state;
  const [listCombo, setListCombo] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [comboConstructionItems, setComboConstructionItems] = useState([]);
  const [comboPrice, setComboPrice] = useState();
  const [promotionList, setPromotionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [promotions, setPromotions] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [newPondVolume, setNewPondVolume] = useState();
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
    } catch (error) {
      console.log(error.response);
    }
  };
  const columnsPackage = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Đặc tả",
      dataIndex: "itemContent",
      key: "itemContent",
    },
    {
      title: "Thời lượng thi công",
      dataIndex: "duration",
      key: "duration",
      width: 200,
      render: (text, record) => (
        <span style={{ textAlign: "center" }}>{text} ngày</span>
      ),
    },
  ];

  const fecthCombo = async () => {
    setLoading(true);
    try {
      const response = await api.get("combos");
      setListCombo(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConstructionOrder = async () => {
    setLoading(true);
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fecthCombo();
    fetchConstructionOrder();
  }, []);
  const handleSelectChange = (value) => {
    setSelectedCombo(value);
    console.log("Selected combo:", value);
  };

  const fetchConstructionItems = async () => {
    setLoading(true);
    try {
      if (selectedCombo) {
        const response = await api.get(
          `comboconstructionitems/combo/${selectedCombo}`
        );
        setComboConstructionItems(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Bug at fetchConstructionItems, " + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComboPrice = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `comboprices/combo/volume/${selectedCombo}/${constructionOrder.quotationResponse.pondVolume}`
      );
      setComboPrice(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fetchComboPrice, " + error);
    } finally {
      setLoading(false);
    }
  };

  const fecthPromotionList = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `promotions/quotation/${constructionOrder.quotationResponse.id}`
      );
      setPromotionList(response.data);
      console.log("Promotion:");
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fecthPromotion, " + error);
    } finally {
      setLoading(false);
    }
  };
  const fecthPromotions = async () => {
    try {
      const response = await api.get(
        `promotions/customer/${constructionOrder.customer.id}`
      );
      setPromotions(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    fetchConstructionItems();
    fetchComboPrice();
    fecthPromotionList();
    fecthPromotions();
  }, [selectedCombo]);

  const isComboSelected = selectedCombo !== null;

  useEffect(() => {
    if (
      actor === "manager" &&
      constructionOrder &&
      constructionOrder.quotationResponse
    ) {
      setSelectedCombo(constructionOrder.quotationResponse.combo.id);
    }
  }, [actor, constructionOrder]);
  const [designed, setDesigned] = useState();
  const handleSelectChangeDesigned = async (e) => {
    const radioChoose = e.target.value === "true";
    setDesigned(radioChoose);
  };
  const handlePromotion = async (selectedPromotionIds) => {
    try {
      if (selectedPromotionIds.length !== null) {
        for (const promotionId of selectedPromotionIds) {
          await api.put(
            `quotations/promo/${constructionOrder.quotationResponse.id}/${promotionId}`
          );
        }
        console.log("Promotion updated successfully!");
      } else {
        console.log("Không thêm khuyến mãi");
      }
    } catch (error) {
      console.error("Error updating promotions:", error);
      throw error;
    }
  };
  const handlePondVolumeChange = (value) => {
    if (!isNaN(value) && value >= 0) {
      setNewPondVolume(value);
    }
  };

  const handleUpdatePondVolume = async () => {
    try {
      if (newPondVolume == null) {
        console.log("Giữ nguyên thể tích hồ");
      } else {
        const value = {
          comboId: constructionOrder.quotationResponse?.combo?.id || null,
          quotationquotationFile: "",
          pondVolume: newPondVolume,
          status: constructionOrder.quotationResponse.status,
        };
        await api.put(
          `quotation/${constructionOrder.quotationResponse.id}`,
          value
        );
        console.log("Thay đổi pondVolume thành: " + newPondVolume);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onFinish = async (values) => {
    try {
      await handleUpdatePondVolume();
      await handlePromotion(values.promotionIds || []);
      await fecthPromotionList();
      await fetchConstructionOrder();
    } catch (error) {
      console.error("Error in onFinish:", error);
    }
  };
  return (
    <NavDashboard actor={actor}>
      <OrderInfor constructionOrder={constructionOrder} />
      <Spin spinning={loading}></Spin>
      {actor === "consulting" && (
        <>
          <Form style={{ padding: "20px" }}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  name="comboId"
                  label="Chọn gói"
                  key="packages"
                  rules={[{ required: true, message: "Vui lòng chọn gói!" }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select placeholder="Chọn gói" onChange={handleSelectChange}>
                    {listCombo.map((combo) => (
                      <Select.Option key={combo.id} value={combo.id}>
                        {combo.name}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Form
            layout="vertical"
            style={{ padding: "0px 20px 20px 20px" }}
            form={form}
            onFinish={onFinish}
          >
            {selectedCombo ? (
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem
                    name="pondValue"
                    label="Thể tích hồ"
                    key="pondValue"
                    rules={[]}
                  >
                    <InputNumber
                      value={constructionOrder.quotationResponse.pondVolume}
                      min={8}
                      max={10000}
                      onChange={handlePondVolumeChange}
                    />
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem
                    name="promotionIds"
                    label="Chọn ưu đãi khuyến mãi"
                    key="promotionId"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Checkbox.Group>
                      {promotions?.length > 0 ? (
                        promotions.map((promotion) => (
                          <Checkbox key={promotion.id} value={promotion.id}>
                            {promotion.content}
                          </Checkbox>
                        ))
                      ) : (
                        <div>Không có khuyến mãi</div>
                      )}
                    </Checkbox.Group>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label="Khách hàng đã có bản vẽ thiết kế?"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Radio.Group
                      defaultValue="false"
                      onChange={handleSelectChangeDesigned}
                    >
                      <Radio.Button value="true">Có</Radio.Button>
                      <Radio.Button value="false">Chưa</Radio.Button>
                    </Radio.Group>
                  </FormItem>
                  {designed &&
                  constructionOrder &&
                  constructionOrder.designDrawingResponse ? (
                    constructionOrder.designDrawingResponse.status !==
                    "DESIGNING" ? (
                      <div
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() =>
                          showModal(
                            `${constructionOrder.designDrawingResponse?.designFile}`
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
                        <Upload
                          fileList={
                            fileData.find(
                              (item) =>
                                item.id ===
                                constructionOrder.designDrawingResponse?.id
                            )?.fileList || []
                          }
                          onChange={handleUploadDrawing(
                            constructionOrder.designDrawingResponse?.id
                          )}
                          maxCount={1}
                          showUploadList={{
                            showRemoveIcon: true,
                            showDownloadIcon: true,
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <RiUpload2Fill size={30} />
                            <p
                              style={{ fontSize: "10px", fontStyle: "italic" }}
                            >
                              Upload file thiết kế
                            </p>
                          </div>
                        </Upload>
                      </div>
                    )
                  ) : (
                    <Spin spinning={loading} />
                  )}
                </Col>
                <Button type="primary" htmlType="submit">
                  Lưu thay đổi
                </Button>
              </Row>
            ) : null}
          </Form>
        </>
      )}

      {isComboSelected && (
        <>
          <div className="price-list-staff-result">
            <h1>Chi tiết hạng mục</h1>
            <Table
              className="table-template"
              dataSource={comboConstructionItems}
              columns={columnsPackage}
              pagination={false}
            />
          </div>
          {comboPrice && constructionOrder && (
            <div className="container-bill">
              <Bill
                constructionOrderId={constructionOrder.id}
                actor={actor}
                unitPrice={comboPrice.unitPrice}
                pondVolume={constructionOrder.quotationResponse.pondVolume}
                promotionList={promotionList}
                comboId={selectedCombo}
                quotationId={constructionOrder.quotationResponse.id}
                onPromotionDeleted={fecthPromotionList}
              />
            </div>
          )}
        </>
      )}
    </NavDashboard>
  );
}

export default PriceListStaff;
