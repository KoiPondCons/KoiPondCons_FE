import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Spin } from "antd";
import LoadingPage from "../../../components/loading";
import { useNavigate } from "react-router-dom";
function Combo() {
  const [combos, setCombos] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchCombos = async () => {
    setLoading(true);
    try {
      const response = await api.get("combos");
      console.log(response.data);
      setCombos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCombos();
  }, []);
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: 100,
    },
    {
      title: "Gói",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Mô  tả",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Chi tiết",
      key: "detail",
      render: (record) => {
        return (
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <AiOutlineUnorderedList
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/combo/${record.id}`, {
                  state: {
                    actor: "manager",
                    comboName: record.name,
                  },
                });
              }}
            ></AiOutlineUnorderedList>
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>
              Chi tiết gói
            </p>
          </div>
        );
      },
    },
  ];
  const title = "Quản lý báo giá";
  return (
    <Spin spinning={loading} indicator={<LoadingPage />}>
      <TableTemplate
        actor="manager"
        title={title}
        requests={combos}
        columns={columns}
      />
    </Spin>
  );
}

export default Combo;
