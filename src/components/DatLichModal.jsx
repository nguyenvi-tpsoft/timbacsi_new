import vi from "date-fns/locale/vi"; // the locale you want
import { useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import benhnhanApi from "../api/benhnhanApi";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { createGiokham, hideModal } from "../redux/actions";
import {
  giokhamState$,
  modalState$,
  phongkhamInfoState$,
} from "../redux/selectors";
registerLocale("vi", vi);
export default function DatLichModal() {
  const [data, setData] = useState({
    title: "",
    content: "",
    attachment: "",
  });
  //todo Date
  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [ngaydat, setNgaydat] = useState(new Date());
  //todo Modal show/hide
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const phongkham_info = useSelector(phongkhamInfoState$);
  const onClose = useCallback(() => {
    dispatch(hideModal());
    setData({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  // const onSubmit = useCallback(() => {
  //   dispatch(createPost.createPostRequest(data));
  //   onClose();
  // }, [data, dispatch, onClose]);
  //todo format ngay
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  //todo Data Modal
  const [msbn, setMsbn] = useState("");
  const [dienthoai, setDienthoai] = useState("");
  const [hoten, setHoten] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [diachi, setDiachi] = useState("");
  const [trieuchung, setTrieuchung] = useState("");

  //time
  const [giokhamsang, setGiokhamsang] = useState("");
  const [giokhamtrua, setGiokhamtrua] = useState("");
  const [giokhamchieu, setGiokhamchieu] = useState("");
  //soluong
  const [soluongsang, setSoluongsang] = useState(0);
  const [soluongtrua, setSoluongtrua] = useState(0);
  const [soluongchieu, setSoluongchieu] = useState(0);

  const [mabuoiselect, setMabuoiselect] = useState("");
  const [giokhamselect, setGiokhamselect] = useState("");
  const [danhsachbenhnhan, setDanhsachbenhnhan] = useState([]);
  const [danhsachbenhnhan_hidden, setDanhsachbenhnhan_hidden] =
    useState("hidden");

  const searchbenhnhanHandle = async (e) => {
    setDanhsachbenhnhan_hidden("hidden");
    setDienthoai(e.target.value);
    if (e.target.value.length > 9 && e.target.value.length < 12) {
      try {
        const params = {
          sdt: e.target.value,
        };

        const response = await benhnhanApi.getbenhnhan(params);
        const data_benhnhan = response.data;
        switch (data_benhnhan.length) {
          case 0:
            setDanhsachbenhnhan_hidden("");
            break;
          case 1:
            setMsbn(data_benhnhan[0].msbn);
            setHoten(data_benhnhan[0].hoten);
            setNgaysinh(new Date(data_benhnhan[0].ngaysinh));
            setGioitinh(data_benhnhan[0].gioitinh);
            setDiachi(data_benhnhan[0].diachi);
            break;

          default:
            setDanhsachbenhnhan(data_benhnhan);
            setDanhsachbenhnhan_hidden("");
            break;
        }
      } catch (error) {}
    }
  };

  //todo Gio kham benh
  const giokham = useSelector(giokhamState$);
  useEffect(() => {
    const getkhunggio = () => {
      setGiokhamsang("");
      setGiokhamtrua("");
      setGiokhamchieu("");
      try {
        if (giokham.khunggio_sa != "") {
          setGiokhamsang(
            giokham.khunggio_sa[0].sangtu +
              " - " +
              giokham.khunggio_sa[0].sangden
          );
          setSoluongsang(
            giokham.soluong_sa + "/" + giokham.khunggio_sa[0].soluongsang
          );
        }
        if (giokham.khunggio_tr != "") {
          setGiokhamtrua(
            giokham.khunggio_tr[0].truatu +
              " - " +
              giokham.khunggio_tr[0].truaden
          );
          setSoluongtrua(
            giokham.soluong_tr + "/" + giokham.khunggio_tr[0].soluongtrua
          );
        }
        if (giokham.khunggio_ch != "") {
          setGiokhamchieu(
            giokham.khunggio_ch[0].chieutu +
              " - " +
              giokham.khunggio_ch[0].chieuden
          );
          setSoluongchieu(
            giokham.soluong_ch + "/" + giokham.khunggio_ch[0].soluongchieu
          );
        }
      } catch (error) {}
    };
    getkhunggio();
  }, [giokham]);
  const change_date = (e) => {
    setMabuoiselect("");
    setNgaydat(e);
    const data_giokham = {
      msdv: phongkham_info.msdv,
      ngay: formatDate(e),
    };
    dispatch(createGiokham.createGiokhamRequest(data_giokham));
  };
  return (
    <>
      <Modal
        className="phongkham_modal"
        show={isShow}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal_header">
          <Modal.Title>
            <div>
              <h5 className="tendv">{phongkham_info.tendv}</h5>
              <h5 className="tenbs">{phongkham_info.tendaidien}</h5>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          {/* Group Info */}
          <div className="group_info ">
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Điện thoại</p>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={dienthoai}
                    onChange={searchbenhnhanHandle}
                    type="text"
                    className="form-control"
                  />
                  <ul className={"danhsachbenhnhan " + danhsachbenhnhan_hidden}>
                    {danhsachbenhnhan.map((dsbn, key) => (
                      <li key={key} msbn={dsbn.msbn}>
                        {dsbn.hoten}
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Họ tên</p>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={hoten}
                    onChange={(e) => setHoten(e.target.value)}
                    type="text"
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Ngày sinh</p>
                </Col>
                <Col sm={9}>
                  <DatePicker
                    onChange={(date) => setNgaysinh(date)}
                    id="ngay"
                    dateFormat="dd/MM/yyyy"
                    locale="vi"
                    className="form-control"
                    selected={ngaysinh}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Giới tính</p>
                </Col>
                <Col sm={9}>
                  <div className="gioitinh">
                    <div className="item">
                      <input
                        checked={gioitinh == "NAM"}
                        onChange={(e) => setGioitinh(e.target.value)}
                        type="radio"
                        name="inlineRadioOptions"
                        id="gioitinh_label"
                        value="NAM"
                      />
                      <label htmlFor="gioitinh_label">Nam</label>
                    </div>
                    <div className="item">
                      <input
                        checked={gioitinh == "NỮ"}
                        onChange={(e) => setGioitinh(e.target.value)}
                        type="radio"
                        name="inlineRadioOptions"
                        id="gioitinh_label"
                        value="NỮ"
                      />
                      <label htmlFor="gioitinh_label">Nữ</label>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Địa chỉ</p>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={diachi}
                    onChange={(e) => setDiachi(e.target.value)}
                    type="text"
                  />
                </Col>
              </Row>
            </Col>
          </div>

          {/* Group ngày đặt */}
          <div className="group_ngaygio">
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p>Triệu chứng</p>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    value={trieuchung}
                    onChange={(e) => setTrieuchung(e.target.value)}
                    type="text"
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p className="text-right mr-4 mt-[5px]">Ngày khám</p>
                </Col>
                <Col sm={9}>
                  <DatePicker
                    onChange={(date) => change_date(date)}
                    id="ngay"
                    dateFormat="dd/MM/yyyy"
                    locale="vi"
                    minDate={new Date()}
                    className="form-control font-roboto_medium focus:shadow-none"
                    selected={ngaydat}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row>
                <Col sm={3}>
                  <p></p>
                </Col>
                <Col sm={9}>
                  <ul className="khunggio_ul">
                    <li
                      onClick={(e) => setMabuoiselect("SA")}
                      className={
                        (giokhamsang ? "" : "hidden ") +
                        (mabuoiselect == "SA" ? "li_selected" : "")
                      }
                    >
                      <div className="time_div">
                        <p>Sáng</p>
                        <p>{giokhamsang}</p>
                      </div>
                      <p>{soluongsang}</p>
                    </li>
                    <li
                      onClick={(e) => setMabuoiselect("TR")}
                      className={
                        (giokhamtrua ? "" : "hidden ") +
                        (mabuoiselect == "TR" ? "li_selected" : "")
                      }
                    >
                      <div className="time_div">
                        <p>Trưa</p>
                        <p>{giokhamtrua}</p>
                      </div>
                      <p>{soluongtrua}</p>
                    </li>
                    <li
                      onClick={(e) => setMabuoiselect("CH")}
                      className={
                        (giokhamchieu ? "" : "hidden ") +
                        (mabuoiselect == "CH" ? "li_selected" : "")
                      }
                    >
                      <div className="time_div">
                        <p>Chiều</p>
                        <p>{giokhamchieu}</p>
                      </div>
                      <p>{soluongchieu}</p>
                    </li>
                  </ul>
                </Col>
              </Row>
              <div className="col-span-9"></div>
            </Col>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onClose}
            type="button"
            className="btn-light font-roboto_medium"
          >
            Hủy
          </Button>
          <Button type="button" className="btn-primary font-roboto_medium ml-2">
            Đặt lịch
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
