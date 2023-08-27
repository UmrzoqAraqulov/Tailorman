import { Fragment, useContext, useEffect } from "react";
import { useOrders } from "../../states/orders";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { Input } from "antd";
import { Form, Button, Dropdown } from "antd";
import { GeneralContextInfo } from "../../context";
import FormCustom from "../../components/FormCustom";

import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search.svg";
import hamburger from "../../assets/images/hamburger.svg";

import "../style.scss";
import "./admin.scss";

const AdminPage = () => {
  const navigate = useNavigate();
  const { getOrders } = useOrders();
  const {
    search,
    page,
    showCustomerModal,
    setShow,
    show,
    closeCustomerModal,
    addNewCustomer,
    customerValues,selected,
    closeModal,
    handleChange,
    loadingBtn,
    setRole,
    pageLimit,
  } = useContext(GeneralContextInfo);

  useEffect(() => {
    setRole("admin");
    getOrders({ page, pageLimit, search });
  }, [page, getOrders, search, pageLimit,setRole]);

  const items = [
    {
      key: "1",
      label: (
        <Button onClick={() => navigate("/history")} type="primary">
          Tarix
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button onClick={() => setShow(true)} type="primary">
          +Buyurtma
        </Button>
      ),
    },
  ];

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
            <img width="30px" src={searchIcon} alt="searchIcon" />
          </label>
        </div>

        <div className="nav-right">
          <button
            onClick={() => navigate("/history")}
            className="nav-right_btn historyBtn"
          >
            Tarix
          </button>
          <button
            onClick={() => setShow(true)}
            className="nav-right_btn getOrderBtn"
          >
            + Buyurtma
          </button>
        </div>
        {/* -----------------Dropdown------------------- */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          className="dropdown"
        >
          <Button>
            <img width="30px" src={hamburger} alt="hambuger" id="hamburger" />
          </Button>
        </Dropdown>
        {/* ---------------------------------------------- */}
      </nav>
      
      <Table/>

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
        {selected?<h2>BUYURTMA</h2>:null}
        <div className="close-btn">
          <i onClick={closeModal} className="fa-solid fa-xmark"></i>
        </div>
        <FormCustom check="admin"/>
      </div>

      <div
        onClick={() => closeCustomerModal}
        style={
          showCustomerModal
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
        className="customerModalClose"
      ></div>

      <div
        style={
          showCustomerModal
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
        className="customerModal"
      >
        <Form
          onFinish={addNewCustomer}
          className="customerForm"
          initialValues={customerValues}
        >
          <div>
            <label htmlFor="name">Ism</label>
            <Form.Item
              name="name"
              id="name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Iltimos Mijozni  kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="phone1">Telefon(1)</label>
            <Form.Item
              name="phone1"
              id="phone1"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Iltimos Tell Nomer  kiriting!",
                },
              ]}
            >
              <Input placeholder="+998 91 123 45 67" />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="phone2">Telefon(2)</label>
            <Form.Item name="phone2" id="phone2">
              <Input placeholder="+998 91 123 45 67" />
            </Form.Item>
          </div>
          <div>
            <label htmlFor="notes">Qo’shimcha ma’lumot</label>
            <Form.Item name="notes" id="notes">
              <Input.TextArea />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              loading={loadingBtn}
              type="primary"
              htmlType="submit"
              className="customerBtn"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
        <div className="close-btn">
          <i onClick={closeCustomerModal} className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminPage;
