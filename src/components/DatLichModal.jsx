import vi from "date-fns/locale/vi"; // the locale you want
import { useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import benhnhanApi from "../api/benhnhanApi";
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

  const searchbenhnhanHandle = async (e) => {
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
            break;
          case 1:
            setMsbn(data_benhnhan[0].msbn);
            setHoten(data_benhnhan[0].hoten);
            setNgaysinh(new Date(data_benhnhan[0].ngaysinh));
            setGioitinh(data_benhnhan[0].gioitinh);
            setDiachi(data_benhnhan[0].diachi);
            break;

          default:
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
      {isShow ? (
        <div
          className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto show bg-[#0504047a]"
          id="modal_datlich"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              {/* Header Modal */}
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <div>
                  <h5
                    className="text-xl font-roboto_medium leading-normal text-red-600"
                    id="exampleModalLabel"
                  >
                    {phongkham_info.tendv}
                  </h5>
                  <h5
                    className="text-lg font-roboto_medium leading-normal text-green-700"
                    id="exampleModalLabel"
                  >
                    {phongkham_info.tendaidien}
                  </h5>
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* Body Modal */}
              <div className="modal-body relative p-4 bg-[#80808038]">
                {/* Group Info */}
                <div className="bg-white rounded-md p-2">
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Điện thoại</p>
                    </div>
                    <div className="col-span-9">
                      <input
                        value={dienthoai}
                        onChange={searchbenhnhanHandle}
                        type="text"
                        className="form-control font-roboto_medium focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Họ tên</p>
                    </div>
                    <div className="col-span-9">
                      <input
                        value={hoten}
                        onChange={(e) => setHoten(e.target.value)}
                        type="text"
                        className="form-control font-roboto_medium uppercase focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Ngày sinh</p>
                    </div>
                    <div className="col-span-9">
                      <DatePicker
                        onChange={(date) => setNgaysinh(date)}
                        id="ngay"
                        dateFormat="dd/MM/yyyy"
                        locale="vi"
                        className="form-control font-roboto_medium focus:shadow-none"
                        selected={ngaysinh}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Giới tính</p>
                    </div>
                    <div className="col-span-9">
                      <div className="flex justify-start items-center">
                        <div className="flex items-center">
                          <input
                            checked={gioitinh == "NAM"}
                            onChange={(e) => setGioitinh(e.target.value)}
                            className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-700 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="NAM"
                          />
                          <label
                            className="ml-2 mr-4 font-roboto_medium py-[6px]"
                            htmlFor="inlineRadio10"
                          >
                            Nam
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            checked={gioitinh == "NỮ"}
                            onChange={(e) => setGioitinh(e.target.value)}
                            className="form-check-input appearance-none rounded-full h-5 w-5 border border-gray-700 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="NỮ"
                          />
                          <label
                            className="ml-2 mr-4 font-roboto_medium py-[6px]"
                            htmlFor="inlineRadio20"
                          >
                            Nữ
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Địa chỉ</p>
                    </div>
                    <div className="col-span-9">
                      <input
                        value={diachi}
                        onChange={(e) => setDiachi(e.target.value)}
                        type="text"
                        className="form-control font-roboto_medium uppercase focus:shadow-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Group ngày đặt */}
                <div className="bg-white rounded-md p-2 mt-2">
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Triệu chứng</p>
                    </div>
                    <div className="col-span-9">
                      <input
                        value={trieuchung}
                        onChange={(e) => setTrieuchung(e.target.value)}
                        type="text"
                        className="form-control font-roboto_medium uppercase focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]">Ngày khám</p>
                    </div>
                    <div className="col-span-9">
                      <DatePicker
                        onChange={(date) => change_date(date)}
                        id="ngay"
                        dateFormat="dd/MM/yyyy"
                        locale="vi"
                        minDate={new Date()}
                        className="form-control font-roboto_medium focus:shadow-none"
                        selected={ngaydat}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 my-1">
                    <div className="col-span-3">
                      <p className="text-right mr-4 mt-[5px]"></p>
                    </div>
                    <div className="col-span-9">
                      <ul>
                        <li
                          onClick={(e) => setMabuoiselect("SA")}
                          className={
                            (giokhamsang ? "" : "hidden ") +
                            (mabuoiselect == "SA"
                              ? "bg-[#059817] "
                              : "bg-[#E9E9E9] ") +
                            "flex justify-between items-center py-1 px-2 mb-2 rounded-md cursor-pointer"
                          }
                        >
                          <div className="flex items-center">
                            <p className="mr-2">Sáng</p>
                            <p>{giokhamsang}</p>
                          </div>
                          <p>{soluongsang}</p>
                        </li>
                        <li
                          onClick={(e) => setMabuoiselect("TR")}
                          className={
                            (giokhamtrua ? "" : "hidden ") +
                            (mabuoiselect == "TR"
                              ? "bg-[#059817] "
                              : "bg-[#E9E9E9] ") +
                            "flex justify-between items-center py-1 px-2 mb-2 rounded-md cursor-pointer"
                          }
                        >
                          <div className="flex items-center">
                            <p className="mr-2">Trưa</p>
                            <p>{giokhamtrua}</p>
                          </div>
                          <p>{soluongtrua}</p>
                        </li>
                        <li
                          onClick={(e) => setMabuoiselect("CH")}
                          className={
                            (giokhamchieu ? "" : "hidden ") +
                            (mabuoiselect == "CH"
                              ? "bg-[#059817] "
                              : "bg-[#E9E9E9] ") +
                            "flex justify-between items-center py-1 px-2 mb-2 rounded-md cursor-pointer"
                          }
                        >
                          <div className="flex items-center">
                            <p className="mr-2">Chiều</p>
                            <p>{giokhamchieu}</p>
                          </div>
                          <p>{soluongchieu}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-light font-roboto_medium"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn-primary font-roboto_medium ml-2"
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
