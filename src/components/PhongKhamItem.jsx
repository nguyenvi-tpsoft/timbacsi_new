import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import DatLichModal from "../components/DatLichModal";
import {
  showModal,
  createInfoPhongKham,
  createGiokham,
} from "../redux/actions";
import map_img from "../vendor/img/next.png";
export default function PhongKhamItem({ msdv, tendv, tendaidien, diachi }) {
  const data_phongkham = {
    msdv: msdv,
    tendv: tendv,
    tendaidien: tendaidien,
  };
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
  const data_giokham = {
    msdv: msdv,
    ngay: formatDate(new Date()),
  };

  const dispatch = useDispatch();

  const openCreatePostModal = useCallback(() => {
    dispatch(showModal());
    dispatch(createInfoPhongKham(data_phongkham));
    dispatch(createGiokham.createGiokhamRequest(data_giokham));
  }, [dispatch, data_phongkham, data_giokham]);
  return (
    <>
      <div className="flex items-center justify-between rounded-xl my-8 shadow-xl shadow-[#cccfd2] bg-white border-l-[10px] border-[#cccfd2]">
        <div className="flex flex-col items-start justify-start py-3 px-4">
          <h2 className="font-roboto_bold text-[#175201]">{tendv}</h2>
          <h2 className="font-roboto_regular">{tendaidien}</h2>
          <h3>{diachi}</h3>
          <div className="flex justify-start items-center">
            <img src={map_img} alt="" />
            <p>Chỉ đường</p>
          </div>
        </div>
        <button
          onClick={openCreatePostModal}
          className="bg-[#4A8E31] h-[50px] w-[150px] text-white rounded-l-3xl"
        >
          Đặt lịch khám
        </button>
      </div>
      <DatLichModal />
    </>
  );
}
