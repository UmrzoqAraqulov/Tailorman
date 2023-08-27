import { Fragment, useContext, useEffect } from "react";
import { useOrders } from "../../states/orders";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";

import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/icons8-search.svg";
import "../style.scss";
import { GeneralContextInfo } from "../../context";
import FormCustom from "../../components/FormCustom";

const TailorPage = () => {
  const navigate = useNavigate();
  const { getOrders } = useOrders();
  const { page, pageLimit, search, handleChange, show, closeModal,setRole } =
    useContext(GeneralContextInfo);

  useEffect(() => {
    getOrders({ page, pageLimit, search });
    setRole("tailor");
  }, [page, getOrders, search, pageLimit,setRole]);

  return (
    <Fragment>
      <nav className="nav">
        <img src={logo} alt="hero" className="hero" />
        <div className="searchBox">
          <input
            type="text"
            placeholder="Qidirish..."
            onChange={handleChange}
            id="search"
          />
          <label className="searchIcon" htmlFor="search">
            <img src={searchIcon} alt="searchIcon" />
          </label>
        </div>

        <div className="nav-right">
          <button
            onClick={() => navigate("/history")}
            className="nav-right_btn historyBtn"
          >
            Tarix
          </button>
        </div>
      </nav>

      <Table />

      <div
        style={
          show
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
        onClick={closeModal}
        className="modal-close"
      ></div>

      <div
        style={
          show
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
        className="modal"
      >
        <div className="close-btn">
          <i onClick={closeModal} className="fa-solid fa-xmark"></i>
        </div>
        <FormCustom/>
      </div>
    </Fragment>
  );
};

export default TailorPage;
