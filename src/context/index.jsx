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
  const [customerInfo, setCustomerInfo] = useState({});
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [dropdownShow, setDropdownShow] = useState(false);
  const [form] = Form.useForm();

  const closeModal = () => {
    setShow(false);
    form.resetFields();
    setSelected(null);
    setCustomerInfo({});
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

  const handleCustomerInfo = (e) => {
    const { value, name } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const addNewCustomer = async (values) => {
    try {
      setLoadingBtn(true);
      const { data } = await request.post("customers", values);
      setCustomerInfo({ ...values, id: data });
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

  const editCustomer = async () => {
    console.log(customerInfo);
    try {
      await request.post("customers", customerInfo);
    } catch (err) {
      console.log(err.message);
    }
  };

  const order = {};

  const setCustomer = (customerInfo) => {
    setCustomerInfo(customerInfo);
    form.setFieldValue("customer", customerInfo.name);
    setDropdownShow(false);
  };

  const submit = async () => {
    const res = await form.getFieldsValue();
    let arr = [];
    order.customerId = customerInfo.id;
    delete res.customer;
    order.toPay = res.price;
    delete res.price;
    order.notes = res.notes ? res.notes : "";
    delete res.notes;
    order.priority = res.priority;
    delete res.priority;
    order.endDate = endDate;
    delete res.endDate;
    let products = "";
    for (let i in res) {
      if (res[i] && typeof res[i] === "boolean") {
        if (products.length > 0) {
          console.log(products);
          products += ", ";
        }
        products += i;
      }
      arr.push({ name: i, value: res[i] });
    }
    products += "," + res.bichish;
    console.log(products, res.bichish);
    order.products = products;
    order.params = arr;

    console.log(order);
    if (selected) {
      const id = selected;
      try {
        await putOrder({ id, order });
        editCustomer();
      } catch (err) {
        console.log(err);
      } finally {
        getOrders({ page, pageLimit, search });
      }
    } else {
      try {
        await postOrder(order);
      } catch (err) {
        console.log(err);
      } finally {
        getOrders({ page, pageLimit, search });
      }
    }
    closeModal();
  };

  const editOrder = async (id) => {
    setSelected(id);

    try {
      const obj = {};
      const { data } = await request(`orders/${id}`);
      const res = { ...data.item };
      try {
        const { data } = await request(`customers/${res.customerId}`);
        setCustomerInfo(data.item);
      } catch (err) {
        console.log(err);
      }
      obj.customer = res.customer;
      setEndDate(res.endDate.split("T")[0]);
      setCreatedAt(res.createdAt.split("T")[0]);
      obj.price = role === "admin" ? res.toPay : "";
      obj.notes = res.notes;
      obj.priority = res.priority;
      res.params.map((el) => {
        const { name, value } = el;
        if (value === "true") obj[name] = true;
        else if (value === "false") obj[name] = false;
        else obj[name] = value;
      });
      console.log(obj, res);
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
    setShow(false);
  };

  const newState = {
    form,
    setShowCustomerModal,
    dropdownData,
    setName,
    cancelOrder,
    complete,
    dropdownShow,
    onChangeDate,
    setLoadingBtn,
    endDate,
    closeModal,
    createdAt,
    setPageLimit,
    autoComplete,
    submit,
    editOrder,
    setCustomer,
    selected,
    customerInfo,
    setDropdownShow,
    showCustomerModal,
    addNewCustomer,
    setSelected,
    show,
    setShow,
    loadingBtn,
    handleCustomerInfo,
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
