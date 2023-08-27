import { Fragment, useContext, useEffect, useState } from "react";
import { useOrders } from "../../states/orders";
import Table from "../../components/Table";
import searchIcon from "../../assets/images/icons8-search.svg";

import logo from "../../assets/images/logo.svg";
import "./history.scss";
import "../style.scss";
import { GeneralContextInfo } from "../../context";
import FormCustom from "../../components/FormCustom";

const HistoryPage = () => {
  const { getOrdersArchive } = useOrders();
  const {
    handleChange,
    pageLimit,
    page,
    search,
    show,
    closeModal,
    selected,
  } = useContext(GeneralContextInfo);

  const [sort, setSort] = useState({ createdAt: "", endDate: "" });
  const { createdAt, endDate } = sort;

  useEffect(() => {
    getOrdersArchive({ page, pageLimit, search });
  }, [page, getOrdersArchive, search, pageLimit]);

  const initialOrders = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setSort({ ...sort, [name]: value });
  };
  return (
    <Fragment>
      <nav className="nav">
        <img src={logo} alt="hero" className="hero" />
        <div className="filter-wrapper">
          <div className="filter-input">
            <p>Boshlanish:</p>
            <input
              type="date"
              className="border"
              onChange={initialOrders}
              value={createdAt}
              name="createdAt"
            />
          </div>
          <div className="filter-input">
            <p>Tugash:</p>
            <input
              type="date"
              className="border"
              onChange={initialOrders}
              value={endDate}
              name="endDate"
            />
          </div>
        </div>
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
      </nav>

      <Table checkArchive="archive" />

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
        {selected ? <h2>BUYURTMA</h2> : null}
        <div className="close-btn">
          <i onClick={closeModal} className="fa-solid fa-xmark"></i>
        </div>
        <FormCustom />
      </div>
    </Fragment>
  );
};

export default HistoryPage;
