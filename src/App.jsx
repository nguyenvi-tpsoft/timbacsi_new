import { useEffect, useRef, useState } from "react";
import phongkhamApi from "./api/phongkhamApi";
import PhongKhamItem from "./components/PhongKhamItem";
import logo from "./vendor/img/logo.png";
import logo_timbs from "./vendor/img/Logo_TimBS_W.png";
import { Row, Col } from "react-bootstrap";

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
      <div className="header">
        <Row>
          <Col sm={4}>
            <img src={logo} alt="tpsoft-logo" />
          </Col>
        </Row>
      </div>

      <div className="relative bg-[url('src/vendor/img/bgdoctor.jpg')] h-[200px] bg-center">
        <div className="absolute bg-center flex flex-col items-center justify-center w-[100%] h-[100%]">
          <img src={logo_timbs} alt="" />
          <div className="relative mt-4">
            <form onSubmit={searchpk}>
              <input
                onChange={(e) => setSearchkey(e.target.value)}
                ref={inputRef}
                type="text"
                className="input_search_home w-[800px]"
                placeholder="Tìm Bác sĩ/Phòng khám/Chuyên khoa"
              />
              <button
                type="submit"
                className="absolute bg-[#e9ecef] py-[6px] px-4 top-0 right-0 rounded-r-2xl"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {phongkham.map((pk_item, key) => (
          <PhongKhamItem
            key={key}
            msdv={pk_item.msdv}
            tendv={pk_item.tendv}
            tendaidien={pk_item.tendaidien}
            diachi={pk_item.diachi}
          />
        ))}
      </div>
    </>
  );
}

export default App;
