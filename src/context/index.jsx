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
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");
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

  const setName = (name) => {
    form.setFieldValue(name);
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

  const addNewCustomer = async (values) => {
    try {
      setLoadingBtn(true);
      const { data } = await request.post("customers", values);
      setCustomerId(data);
      form.setFieldValue("customer", values.name);
      setShowCustomerModal(false);
      setDropdownShow(false);
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
    console.log(res);
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
    console.log(res);
    for (let i in res) {
      arr.push({ name: i, value: res[i] });
    }
    order.params = arr;
    console.log(order);
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
        obj[name] = value;
      })
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
    const checkCancel = prompt("Nima sabab buyurtmani bekor qilmoqchisiz?");
    if (checkCancel) {
      try {
        setLoadingBtn(true);
        await request.put(`orders/${selected}/cancel`, {
          reason: checkCancel,
        });
        toast.success("Buyurtma bekor qilindi!");
        getOrders(page, pageLimit, search);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBtn(false);
      }
    }
    setShow(false);
  };

  const complete = async () => {
    const checkComplete = prompt("Izoh qoldiring!");
    
    if (checkComplete) {
      try {
        setLoadingBtn(true);
        await request.put(`orders/${selected}/complete`, {
          notes: checkComplete,
        });
        toast.success("Buyurtma tugallandi!");
        getOrders(page, pageLimit, search);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingBtn(false);
      }
    }
    setShow(false)
  };

  const newState = {
    form,
    setShowCustomerModal,
    dropdownData,
    setName,
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
    trouthersValue,
    createdAt,
    setPageLimit,
    autoComplete,
    submit,
    editOrder,
    setCustomer,
    selected,
    customerId,
    setDropdownShow,
    showCustomerModal,
    addNewCustomer,
    setCustomerId,
    setSelected,
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
