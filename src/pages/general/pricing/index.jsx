import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./price.css";
import CommonTemplate from "../../../components/common-page-template";
import api from "../../../config/axios";
import { Link } from "react-router-dom";
const title = "Báo giá";
const context = "Trang chủ » Báo giá";
const banner =
  "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e";
function ListProject() {
  const navigate = useNavigate();
  const [combos, setCombos] = useState();
  const fetchCombos = async () => {
    try {
      const response = await api.get("combos");
      setCombos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCombos();
  }, []);
  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div className="pricing-body">
          <div className="card">
            {combos?.map((combo, index) => (
              <div
                className="card1"
                onClick={() => {
                  navigate(`/combo/${combo.id}`, {
                    state: {
                      actor: "customer",
                      comboName: combo.name,
                    },
                  });
                }}
                key={index}
              >
                <p>{combo.name}</p>
                <p className="small">
                  {combo.name}: {combo.description}
                </p>
                <div className="go-corner">
                  <div className="go-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CommonTemplate>
    </div>
  );
}

export default ListProject;
