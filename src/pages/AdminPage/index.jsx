import { Fragment, useContext, useEffect, useState } from "react";
import { useOrders } from "../../states/orders";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { Input } from "antd";
import { Form, Button, Dropdown } from "antd";
import { GeneralContextInfo } from "../../context";
import FormCustom from "../../components/FormCustom";

import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search.svg";
import hamburger from "../../assets/images/hamburger.svg";
import account from "../../assets/images/userIcon.svg";

import "../style.scss";
import "./admin.scss";
import { useAuth } from "../../states/auth";

const AdminPage = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [accountShow, setAccountShow] = useState(false);
  const { getOrders } = useOrders();
  const {
    search,
    page,
    showCustomerModal,
    setShow,
    show,
    setShowCustomerModal,
    addNewCustomer,
    setName,
    selected,
    closeModal,
    handleChange,
    loadingBtn,
    setRole,
    setPageLimit,
  } = useContext(GeneralContextInfo);

  useEffect(() => {
    const pageLimit = Math.ceil(window.innerHeight / 50);
    setPageLimit(pageLimit);
    setRole("admin");
    getOrders({ page, pageLimit, search });
  }, [page, getOrders, search, setRole, setPageLimit]);

  const finish = async () => {
    const value = await form.getFieldsValue();
    setName(value.name);
    addNewCustomer(value);
    closeCustomerModal();
  };

  const controlAccount = () => {
    setAccountShow(!accountShow);
  };

  const closeCustomerModal = () => {
    setShowCustomerModal(false);
    form.resetFields();
  };

  const setCustomerName = (value) => {
    form.setFieldValue("name", value);
  };

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
        <Link to={`/${user}`}>
          <img src={logo} alt="hero" className="hero" />
        </Link>
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

        <div className="account">
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
          <div className="user">
            <img src={account} alt="" onClick={controlAccount} />

            <div
              style={
                accountShow
                  ? { visibility: "visible", opacity: "1" }
                  : { visibility: "hidden", opacity: "0" }
              }
              className="logOut"
            >
              <img src={account} alt="" />
              <h4>{user[0].toUpperCase() + user.slice(1).toLowerCase()}</h4>
              <div onClick={() => logOut(navigate)}>
                <p>Chiqish</p>
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
            </div>
          </div>
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

      <Table />
      <div
        style={
          show
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
        className="close-btn"
      >
        <i onClick={closeModal} className="fa-solid fa-xmark"></i>
      </div>
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
        {!selected ? <h2>BUYURTMA</h2> : null}
        <FormCustom check="admin" setName={setCustomerName} />
      </div>

      <div
        onClick={closeCustomerModal}
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
        <Form form={form} onFinish={finish} className="customerForm">
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
