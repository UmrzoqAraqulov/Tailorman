import { Button, Checkbox, Form, Input, InputNumber, Radio } from "antd";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GeneralContextInfo } from "../context";
import classicPants from "../assets/images/classicPants.jpg";
import classicSuit from "../assets/images/classicSuit.jpg";
import dvubortniy from "../assets/images/dvubortniy.jpg";
import odnobortniy from "../assets/images/odnobortniy.jpg";
import smoking from "../assets/images/smoking.jpg";
import poyas from "../assets/images/poyas.jpg";
import jecket1 from "../assets/images/jecket1.png";
import jecket2 from "../assets/images/jecket2.jpg";
import { useOrders } from "../states/orders";
import "./formStyle.scss";

const FormCustom = ({ check,setName }) => {
  const { loadingBtn } = useOrders();
  const {
    form,
    dropdownData,
    costumeValue,
    onChangeCostume,
    jacketValue,
    onChangeJacket,
    dropdownShow,
    onChangeTrouthers,
    trouthersValue,
    endDate,
    autoComplete,
    submit,
    selected,
    onChangeDate,
    createdAt,
    setCustomer,setShowCustomerModal,
    role,
    cancelOrder,
    complete,
  } = useContext(GeneralContextInfo);

  const openModal = () =>{
    setShowCustomerModal(true);
    setName(form.getFieldValue("customer"));
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={submit}
        initialValues={{ priority: false }}
        className="modal-forms"
        autoComplete="false"
      >
        <div className="forms">
          <div className="addOrderModal">
            <div className="customerName">
              <label htmlFor="customer">Mijoz</label>
              <div>
                <Form.Item
                  name="customer"
                  id="customer"
                  hasFeedback
                  onChange={autoComplete}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos Mijozni kiriting!",
                    },
                  ]}
                >
                  <Input placeholder="(AutoComplete)" />
                </Form.Item>
                {!selected ? (
                  <p className="addCustomerBtn" onClick={openModal}>
                    Yangi
                  </p>
                ) : null}
              </div>
              {dropdownShow ? (
                <ul className="customerDropdown">
                  {dropdownData.length < 1 ? (
                    <li>{"Bunday Mijoz yo'q"}</li>
                  ) : (
                    dropdownData?.map((el) => (
                      <li onClick={() => setCustomer(el)} key={el.id}>
                        {el.name}
                      </li>
                    ))
                  )}
                </ul>
              ) : (
                ""
              )}
            </div>
            {selected ? (
              <div className="receiveDate">
                <label htmlFor="receiveDate">Olingan vaqti</label>
                <input
                  type="date"
                  name="createdAt"
                  id="receiveDate"
                  required
                  value={createdAt}
                  disabled
                />
              </div>
            ) : null}
            <div className="endDate">
              <label htmlFor="endDate">Muddat</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                required
                value={endDate}
                onChange={onChangeDate}
              />
            </div>
            <div>
              <label htmlFor="price">Narx</label>
              <Form.Item
                name="price"
                hasFeedback
                id="price"
                rules={[
                  {
                    required: true,
                    message: "Iltimos Narxni kiriting!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="checkBox">
              <label htmlFor="priority">Ustuvorlik</label>
              <Form.Item name="priority" id="priority" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="notes">Izoh</label>
              <Form.Item name="notes" id="notes">
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>

          <div className="formSizes">
            <div className="orderSizes">
              <div className="orderSize">
                <label htmlFor="chest">{"Ko'krak"}</label>
                <Form.Item
                  name="chest"
                  min={4}
                  rules={[
                    {
                      required: true,
                      message: false,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="stomach">Qorin</label>
                <Form.Item
                  name="stomach"
                  id="stomach"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="backFront">Oldi-orqa</label>
                <Form.Item
                  name="backFront"
                  id="backFront"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="shoulder">Yelka</label>
                <Form.Item
                  name="shoulder"
                  id="shoulder"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="arm">{"Qo'l"}</label>
                <Form.Item
                  name="arm"
                  id="arm"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="lenHeight">Uzunligi</label>
                <Form.Item
                  name="lenHeight"
                  id="lenHeight"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="waist">Bel</label>
                <Form.Item
                  name="waist"
                  id="waist"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="bosom">{"Bo'ksa"}</label>
                <Form.Item
                  name="bosom"
                  id="bosom"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="leg">Son</label>
                <Form.Item
                  name="leg"
                  id="leg"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="knee">Tizza</label>
                <Form.Item
                  name="knee"
                  id="knee"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="pocha">Pocha</label>
                <Form.Item
                  name="pocha"
                  id="pocha"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="gulfik">Gulfik</label>
                <Form.Item
                  name="gulfik"
                  id="gulfik"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="orderSize">
                <label htmlFor="lenTrouthers">Uzunligi</label>
                <Form.Item
                  name="lenTrouthers"
                  id="lenTrouthers"
                  rules={[
                    {
                      required: true,
                      message: false,
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            </div>

            <div className="Radios">
              <div>
                <Radio.Group
                  onChange={onChangeCostume}
                  required
                  value={costumeValue}
                  className="costumRadio"
                >
                  <Radio className="classicSuit" value="Классик">
                    <div>
                      <img src={classicSuit} alt="" />
                      <p>Классические костюмы</p>
                    </div>
                  </Radio>
                  <Radio className="classicSuit" value="Двубортные">
                    <div>
                      <img src={dvubortniy} alt="" />
                      <p>Двубортные костюмы</p>
                    </div>
                  </Radio>
                  <Radio className="classicSuit" value="Смокинги">
                    <div>
                      <img src={smoking} alt="" />
                      <p>Смокинги</p>
                    </div>
                  </Radio>
                  <Radio value="Однобортные" className="classicSuit">
                    <div>
                      <img src={odnobortniy} alt="" />
                      <p>Однобортные костюмы</p>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>

              <div style={{ display: "flex" }}>
                <div>
                  <Radio.Group
                    style={{ display: "flex" }}
                    onChange={onChangeTrouthers}
                    value={trouthersValue}
                  >
                    <Radio value="Брюки" className="classicSuit">
                      <div>
                        <img src={classicPants} alt="" />
                        <p>Классические брюки</p>
                      </div>
                    </Radio>
                    <Radio value="Пояс" className="classicSuit">
                      <div>
                        <img src={poyas} alt="" />
                        <p>Карманы, пояс</p>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>

                <div>
                  <Radio.Group
                    style={{ display: "flex" }}
                    onChange={onChangeJacket}
                    value={jacketValue}
                  >
                    <Radio value="Жилеты-1" className="classicSuit">
                      <div>
                        <img src={jecket1} alt="" />
                        <p>Жилеты</p>
                      </div>
                    </Radio>
                    <Radio value="Жилеты-2" className="classicSuit">
                      <div>
                        <img src={jecket2} alt="" />
                        <p>Жилеты</p>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className="colorNumber">
                <div>
                  <label htmlFor="mato">Mato</label>
                  <div>
                    <Form.Item
                      name="mato"
                      id="mato"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: false,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <label htmlFor="mato">Rang</label>
                  <div>
                    <Form.Item
                      name="rang"
                      id="rang"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: false,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <label htmlFor="mato">Nomer</label>
                  <div>
                    <Form.Item
                      name="nomer"
                      id="nomer"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: false,
                        },
                      ]}
                    >
                      <Input placeholder="№_  " />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {role === "admin" && !selected ? (
          <Form.Item>
            <Button
              loading={loadingBtn}
              className="confirmBtn"
              htmlType="submit"
            >
              Tasdiqlash
            </Button>
          </Form.Item>
        ) : null}
        {check === "admin" && selected ? (
          <div className="order-buttons">
            <p className="order-btn complete-btn" onClick={complete}>
              TUGALLASH
            </p>
            <p className="order-btn cancel-btn" onClick={cancelOrder}>
              BEKOR QILISH
            </p>
            <div></div>
            <p className="order-btn edit-btn" onClick={submit}>
              SAQLASH
            </p>
          </div>
        ) : null}
      </Form>
    </div>
  );
};

FormCustom.propTypes = {
  check: PropTypes.string,
  setName:PropTypes.func
};

export default FormCustom;
