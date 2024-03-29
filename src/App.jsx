import { useEffect, useRef, useState } from "react";
import phongkhamApi from "./api/phongkhamApi";
import PhongKhamItem from "./components/PhongKhamItem";
import logo from "./vendor/img/logo.png";
import logo_timbs from "./vendor/img/Logo_TimBS_W.png";
import { Row, Col, Form, Container } from "react-bootstrap";

function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [searchkey, setSearchkey] = useState("");
  const [phongkham, setPhongkham] = useState([]);

  const searchpk = async (e) => {
    e.preventDefault();
    if (searchkey.length > 2) {
      try {
        const params = {
          key: searchkey,
        };
        const response = await phongkhamApi.getpk(params);
        setPhongkham(response.data);
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="logo">
        <Row>
          <Col sm={4}>
            <img src={logo} alt="tpsoft-logo" />
          </Col>
        </Row>
      </div>

      <div className="header">
        <div className="title">
          <img src={logo_timbs} alt="" />
          <div className="title_child">
            <Form onSubmit={searchpk}>
              <Form.Control
                onChange={(e) => setSearchkey(e.target.value)}
                ref={inputRef}
                type="text"
                className="search_input"
                placeholder="Tìm Bác sĩ/Phòng khám/Chuyên khoa"
              />
              <button type="submit">Tìm</button>
            </Form>
          </div>
        </div>
      </div>
      <Container>
        {phongkham.map((pk_item, key) => (
          <PhongKhamItem
            key={key}
            msdv={pk_item.msdv}
            tendv={pk_item.tendv}
            tendaidien={pk_item.tendaidien}
            diachi={pk_item.diachi}
          />
        ))}
      </Container>
    </>
  );
}

export default App;
