import React, { useEffect, useState } from "react";
import NavDashboard from "../../components/navbar-dashboard";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import api from "../../config/axios";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useParams } from "react-router-dom";
function ComboDetail() {
  const location = useLocation();
  const { actor, comboName } = location.state;
  const { comboId } = useParams();
  const [comboPriceList, setComboPriceList] = useState();
  const [comboConstructionItems, setComboConstructionItems] = useState();
  const [loadingComboPriceList, setLoadingComboPriceList] = useState(false);
  const [loadingComboConstructionItems, setLoadingComboConstructionItems] =
    useState(false);
  const [selectedComboPrice, setSelectedComboPrice] = useState();
  const [showModalUpdateComboPrice, setShowModalUpdateComboPrice] = useState();
  const [showModalDeleteComboPrice, setShowModalDeleteComboPrice] = useState();
  const [showModalCreateComboPrice, setShowModalCreateComboPrice] = useState();
  const [selectedComboItem, setSelectedComboItem] = useState();
  const [showModalUpdateComboItem, setShowModalUpdateComboItem] = useState();
  const [showModalDeleteComboItem, setShowModalDeleteComboItem] = useState();
  const [showModalCreateComboItem, setShowModalCreateComboItem] = useState();
  const [formUpdateComboPrice] = Form.useForm();
  const [formCreateComboPrice] = Form.useForm();
  const [formUpdateComboItem] = Form.useForm();
  const [formCreateComboItem] = Form.useForm();
  const fetchComboPriceList = async () => {
    setLoadingComboPriceList(true);
    try {
      const response = await api.get(`comboprices/combo/${comboId}`);
      setComboPriceList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComboPriceList(false);
    }
  };
  const fetchConstructionItems = async () => {
    setLoadingComboConstructionItems(true);
    try {
      const response = await api.get(`comboconstructionitems/combo/${comboId}`);
      setComboConstructionItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fetchConstructionItems, " + error);
    } finally {
      setLoadingComboConstructionItems(false);
    }
  };
  useEffect(() => {
    fetchConstructionItems();
    fetchComboPriceList();
  }, []);
  const handleCreateComboPrice = async () => {
    const formData = formCreateComboPrice.getFieldsValue();
    const valueInfo = {
      combo: comboId,
      minVolume: formData.minVolume,
      maxVolume: formData.maxVolume,
      unitPrice: formData.unitPrice,
    };
    try {
      await api.post(`comboprices`, valueInfo);
      setShowModalCreateComboPrice(false);
      fetchComboPriceList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateComboPrice = async () => {
    const formData = formUpdateComboPrice.getFieldsValue();
    const valueInfo = {
      combo: comboId,
      minVolume: formData.minVolume,
      maxVolume: formData.maxVolume,
      unitPrice: formData.unitPrice,
    };
    try {
      await api.put(`comboprices/${selectedComboPrice.id}`, valueInfo);
      setShowModalUpdateComboPrice(false);
      fetchComboPriceList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteComboPrice = async () => {
    try {
      await api.delete(`comboprices/${selectedComboPrice.id}`);
      setShowModalDeleteComboPrice(false);
      fetchComboPriceList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateComboItem = async () => {
    const formData = formUpdateComboItem.getFieldsValue();
    const valueInfo = {
      combo: comboId,
      duration: formData.duration,
      itemContent: formData.itemContent,
    };
    try {
      await api.post(`comboconstructionitems`, valueInfo);
      setShowModalCreateComboItem(false);
      fetchConstructionItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComboItem = async () => {
    const formData = formUpdateComboItem.getFieldsValue();
    const valueInfo = {
      combo: comboId,
      duration: formData.duration,
      itemContent: formData.itemContent,
    };
    try {
      await api.put(
        `comboconstructionitems/${selectedComboItem.id}`,
        valueInfo
      );
      setShowModalUpdateComboItem(false);
      fetchConstructionItems();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteComboItem = async () => {
    try {
      await api.delete(`comboconstructionitems/${selectedComboItem.id}`);
      setShowModalDeleteComboItem(false);
      fetchConstructionItems();
    } catch (error) {
      console.error(error);
    }
  };
  const columnsComboConstructionItems = [
    {
      title: "STT",
      key: "index",
      width: 100,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Đặc tả",
      dataIndex: "itemContent",
      key: "itemContent",
      align: "center",
    },
    {
      title: "Thời lượng thi công",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (text) => <span>{text} giờ</span>,
    },
    {
      title: "",
      render: (record) => {
        if (actor === "manager") {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <GrUpdate
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedComboItem(record);
                    setShowModalUpdateComboItem(true);
                    formUpdateComboItem.setFieldsValue({
                      duration: record.duration,
                      itemContent: record.itemContent,
                    });
                  }}
                ></GrUpdate>
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Cập nhật hạng mục
                </p>
              </div>
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <MdDeleteOutline
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedComboItem(record);
                    setShowModalDeleteComboItem(true);
                  }}
                ></MdDeleteOutline>
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>Xóa</p>
              </div>
            </div>
          );
        }
      },
    },
  ];
  const columnsComboPriceList = [
    {
      title: "Thể tích",
      key: "pondVolume",
      align: "center",
      render: (record) => {
        return (
          <p>
            Từ {record.minVolume}m<sup>3</sup> đến {record.maxVolume}m
            <sup>3</sup>
          </p>
        );
      },
    },
    {
      title: (
        <p>
          Đơn giá (VNĐ/m<sup>3</sup>)
        </p>
      ),
      key: "unitPrice",
      dataIndex: "unitPrice",
      align: "center",
    },
    {
      title: "",
      render: (record) => {
        if (actor === "manager") {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <GrUpdate
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedComboPrice(record);
                    setShowModalUpdateComboPrice(true);
                    formUpdateComboPrice.setFieldsValue({
                      minVolume: record.minVolume,
                      maxVolume: record.maxVolume,
                      unitPrice: record.unitPrice,
                    });
                  }}
                ></GrUpdate>
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Cập nhật giá
                </p>
              </div>
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <MdDeleteOutline
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedComboPrice(record);
                    setShowModalDeleteComboPrice(true);
                  }}
                ></MdDeleteOutline>
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>Xóa</p>
              </div>
            </div>
          );
        }
      },
    },
  ];
  return (
    <NavDashboard actor={actor}>
      <h1 style={{ textAlign: "center" }}>Bảng giá gói - {comboName}</h1>
      <Spin spinning={loadingComboPriceList} indicator={Spin}>
        <Table
          columns={columnsComboPriceList}
          dataSource={comboPriceList}
          pagination={false}
        />
      </Spin>
      {actor === "manager" && (
        <Button
          onClick={() => {
            setShowModalCreateComboPrice(true);
          }}
        >
          Tạo thêm giá
        </Button>
      )}
      <h1 style={{ textAlign: "center" }}>Chi tiết hạng mục</h1>
      <Spin spinning={loadingComboPriceList} indicator={Spin}>
        <Table
          columns={columnsComboConstructionItems}
          dataSource={comboConstructionItems}
          pagination={false}
        />
      </Spin>
      {actor === "manager" && (
        <Button
          onClick={() => {
            setShowModalCreateComboItem(true);
          }}
        >
          Tạo thêm hạng mục
        </Button>
      )}
      <Modal
        title="Xác nhận xóa giá gói"
        open={showModalDeleteComboPrice}
        onCancel={() => setShowModalDeleteComboPrice(false)}
        onOk={handleDeleteComboPrice}
      >
        <p>Bạn có chắc chắn muốn xóa giá gói này?</p>
      </Modal>
      <Modal
        title="Xác nhận xóa hạng mục"
        open={showModalDeleteComboItem}
        onCancel={() => setShowModalDeleteComboItem(false)}
        onOk={handleDeleteComboItem}
      >
        <p>Bạn có chắc chắn muốn xóa hạng mục này?</p>
      </Modal>
      <Modal
        open={showModalCreateComboPrice}
        footer={null}
        onCancel={() => setShowModalCreateComboPrice(false)}
      >
        <Form form={formCreateComboPrice} onFinish={handleCreateComboPrice}>
          <h3>Tạo giá</h3>
          <FormItem
            label="Thể tích hồ nhỏ nhất"
            name="minVolume"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={8}
              max={10000}
              placeholder="Nhập thể tích nhỏ nhất"
            ></Input>
          </FormItem>
          <FormItem
            label="Thể tích hồ lớn nhất"
            name="maxVolume"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={8}
              max={10000}
              placeholder="Nhập thể tích lớn nhất"
            ></Input>
          </FormItem>
          <FormItem label="Đơn giá" name="unitPrice" labelCol={{ span: 24 }}>
            <Input type="Number" min={0} placeholder="Nhập đơn giá"></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Tạo giá
          </Button>
        </Form>
      </Modal>

      <Modal
        open={showModalUpdateComboPrice}
        footer={null}
        onCancel={() => setShowModalUpdateComboPrice(false)}
      >
        <Form
          initialValues={{
            minVolume: selectedComboPrice?.minVolume,
            maxVolume: selectedComboPrice?.maxVolume,
            unitPrice: selectedComboPrice?.unitPrice,
          }}
          form={formUpdateComboPrice}
          onFinish={handleUpdateComboPrice}
        >
          <h3>Cập nhật giá</h3>
          <FormItem
            label="Thể tích hồ nhỏ nhất"
            name="minVolume"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={8}
              max={10000}
              placeholder="Nhập thể tích nhỏ nhất"
            ></Input>
          </FormItem>
          <FormItem
            label="Thể tích hồ lớn nhất"
            name="maxVolume"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={8}
              max={10000}
              placeholder="Nhập thể tích lớn nhất"
            ></Input>
          </FormItem>
          <FormItem label="Đơn giá" name="unitPrice" labelCol={{ span: 24 }}>
            <Input type="Number" min={0} placeholder="Nhập đơn giá"></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal>
      <Modal
        open={showModalCreateComboItem}
        footer={null}
        onCancel={() => setShowModalCreateComboItem(false)}
      >
        <Form form={formUpdateComboItem} onFinish={handleCreateComboItem}>
          <h3>Thêm hạng mục</h3>
          <FormItem label="Hạng mục" name="itemContent" labelCol={{ span: 24 }}>
            <Input placeholder="Nhập hạng mục"></Input>
          </FormItem>
          <FormItem
            label="Thời lượng thi công"
            name="duration"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={5}
              step={0.1}
              placeholder="Nhập ngày thi công"
            ></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal>
      <Modal
        open={showModalUpdateComboItem}
        footer={null}
        onCancel={() => setShowModalUpdateComboItem(false)}
      >
        <Form
          initialValues={{
            duration: selectedComboItem?.duration,
            itemContent: selectedComboItem?.itemContent,
          }}
          form={formUpdateComboItem}
          onFinish={handleUpdateComboItem}
        >
          <h3>Cập nhật hạng mục</h3>
          <FormItem label="Hạng mục" name="itemContent" labelCol={{ span: 24 }}>
            <Input placeholder="Nhập hạng mục"></Input>
          </FormItem>
          <FormItem
            label="Thời lượng thi công"
            name="duration"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={5}
              step={0.1}
              placeholder="Nhập ngày thi công"
            ></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal>
    </NavDashboard>
  );
}

export default ComboDetail;
