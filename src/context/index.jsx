import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import { Form } from "antd";
import { request } from "../server/request";
import { toast } from "react-toastify";
import { useOrders } from "../states/orders";

export const GeneralContextInfo = createContext();

const GeneralContext = ({ children }) => {
  const { postOrder, getOrders, putOrder } = useOrders();

  const [loadingBtn, setLoadingBtn] = useState();
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [show, setShow] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(
    +localStorage.getItem("pageLimit") || 10
  );
  const [search, setSearch] = useState("");
  const customerInfo = {
    name: "",
    phone1: "",
    phone2: "",
    notes: "",
  };
  const [customerValues, setCustomerValues] = useState(customerInfo);
  const [dropdownData, setDropdownData] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [dropdownShow, setDropdownShow] = useState(false);
  const [costumeValue, setCostumeValue] = useState("");
  const [trouthersValue, setTrouthersValue] = useState("");
  const [jacketValue, setJacketValue] = useState("");
  const [form] = Form.useForm();

  const closeModal = () => {
    setShow(false);
    setCostumeValue("");
    setJacketValue("");
    setTrouthersValue("");
    form.resetFields();
    setSelected(null);
    setCustomerId(null);
    setEndDate("");
    setCreatedAt("");
  };

  const closeCustomerModal = () => {
    setCustomerValues(customerInfo);
    setShowCustomerModal(false);
  };

  const handlePage = (current) => {
    setPage(current);
  };

  const handleChange = (e) => {
    if (e.target.value.length < 1) setSearch("");
    else {
      handlePage(1);
      setSearch(e.target.value);
    }
  };

  const onShowSizeChange = (current, size) => {
    setPageLimit(size);
    localStorage.setItem("pageLimit", size);
  };

  const addNewCustomer = async (values) => {
    try {
      setLoadingBtn(true);
      const { data } = await request.post("customers", values);
      setCustomerId(data);
      form.setFieldValue("customer", values.name);
      closeCustomerModal();
      toast.success("Yangi mijoz qo'shildi");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  const order = {};

  const getProduct = () => {
    let res = "";
    res += (costumeValue ? costumeValue : "_") + ",";
    res += (trouthersValue ? trouthersValue : "_") + ",";
    res += jacketValue ? jacketValue : "_";
    return res;
  };

  const setCustomer = (customerInfo) => {
    setCustomerId(customerInfo.id);
    form.setFieldValue("customer", customerInfo.name);
    setDropdownShow(false);
  };

  const submit = async () => {
    const values = await form.getFieldsValue();
    let arr = [];
    let res = { ...values };
    order.customerId = customerId;
    order.products = getProduct();
    delete res.customer;
    order.toPay = res.price;
    delete res.price;
    order.notes = res.notes ? res.notes : "";
    delete res.notes;
    order.priority = res.priority;
    delete res.priority;
    order.endDate = endDate;
    delete res.endDate;
    for (let i in res) {
      arr.push({ name: i, value: res[i] });
    }
    order.params = arr;
    if (selected) {
      const id = selected;
      putOrder({ id, order });
    } else {
      postOrder(order);
    }
    setShow(false);
    getOrders({ page, pageLimit, search });
  };

  const onChangeCostume = (e) => {
    setCostumeValue(e.target.value);
  };

  const onChangeTrouthers = (e) => {
    setTrouthersValue(e.target.value);
  };

  const onChangeJacket = (e) => {
    setJacketValue(e.target.value);
  };

  const editOrder = async (id) => {
    setSelected(id);
    try {
      const { data } = await request(`customers/${id}`);
      setCostumeValue(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    try {
      const obj = {};
      const { data } = await request(`orders/${id}`);
      const res = { ...data.item };
      setCustomerId(res.customerId);
      obj.customer = res.customer;
      setEndDate(res.endDate.split("T")[0]);
      setCreatedAt(res.createdAt.split("T")[0]);
      obj.price = role === "admin" ? res.toPay : "";
      obj.notes = res.notes;
      obj.priority = res.priority;
      const splitArr = res.products.split(",");
      setCostumeValue(splitArr[0] !== "_" ? splitArr[0] : "");
      setTrouthersValue(splitArr[1] !== "_" ? splitArr[1] : "");
      setJacketValue(splitArr[2] !== "_" ? splitArr[2] : "");
      res.params.map((el) => {
        const { name, value } = el;
        obj[name] = +value;
      });
      form.setFieldsValue(obj);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeDate = (e) => {
    setEndDate(e.target.value);
  };

  const autoComplete = async (e) => {
    const text = e.target.value;
    if (text.length > 2) {
      try {
        setDropdownShow(true);
        const { data } = await request.post("customers/get", {
          searchText: text,
        });
        console.log(data);
        setDropdownData(data.page.items);
      } catch {
        console.log("Error");
      }
    } else {
      setDropdownShow(false);
    }
  };

  const cancelOrder = async () => {
    const checkCancel = prompt("Nima sabab buyurtmani bekor qilmoqchisiz!");
    if (checkCancel) {
      try {
        setLoadingBtn(true);
        await request.put(`orders/${selected}/cancel`, {
          reason: checkCancel,
        });
        toast.success("Buyurtma bekor qilindi!");
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  const complete = async () => {
    const checkComplete = prompt("Izoh qoldiring!");
    try {
      setLoadingBtn(true);
      await request.put(`orders/${selected}/complete`, {
        notes: checkComplete,
      });
      toast.success("Buyurtma bajarildi!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingBtn(false);
    }
    // if (checkComplete) {
    // }
  };

  const newState = {
    form,
    setShowCustomerModal,
    dropdownData,
    cancelOrder,
    complete,
    costumeValue,
    onChangeCostume,
    jacketValue,
    onChangeJacket,
    dropdownShow,
    onChangeDate,
    setLoadingBtn,
    onChangeTrouthers,
    endDate,
    closeModal,
    closeCustomerModal,
    trouthersValue,
    createdAt,
    autoComplete,
    submit,
    editOrder,
    setCustomer,
    selected,
    customerId,
    showCustomerModal,
    addNewCustomer,
    customerValues,
    setCustomerId,
    setSelected,
    onShowSizeChange,
    show,
    setShow,
    loadingBtn,
    handlePage,
    role,
    setRole,
    page,
    search,
    handleChange,
    pageLimit,
  };

  return (
    <GeneralContextInfo.Provider value={newState}>
      {children}
    </GeneralContextInfo.Provider>
  );
};

GeneralContext.propTypes = {
  children: PropTypes.node,
};

export default GeneralContext;
