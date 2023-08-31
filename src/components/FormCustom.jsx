import { Button, Checkbox, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GeneralContextInfo } from "../context";

import classic1 from "../assets/images/классик1.jpg";
import classic2 from "../assets/images/классик2.jpg";
import dvubortniy1 from "../assets/images/двубортный1.jpg";
import dvubortniy2 from "../assets/images/двубортный2.jpg";
import odnobortniy1 from "../assets/images/однобортные1.jpg";
import odnobortniy2 from "../assets/images/однобортные2.jpg";
import smoking from "../assets/images/смокинги.jpg";

import rubashka from "../assets/images/рубашка.jpg";

import bryuk1 from "../assets/images/брюки1.jpg";
import bryuk2 from "../assets/images/брюки2.jpg";
import karman from "../assets/images/карманы.jpg";

import stil1 from "../assets/images/стиль1.jpg";
import stil2 from "../assets/images/стиль2.jpg";
import stil3 from "../assets/images/стиль3.jpg";

import jecket1 from "../assets/images/жилеты1.jpg";
import jecket2 from "../assets/images/жилеты2.jpg";
import jecket3 from "../assets/images/жилеты3.jpg";

import galstuk from "../assets/images/галстук.jpg";
import babochka from "../assets/images/бабочка.jpg";
import poyas from "../assets/images/пояс.jpg";

import { useOrders } from "../states/orders";
import "./formStyle.scss";

const FormCustom = ({ check, setName }) => {
  const { loadingBtn } = useOrders();
  const {
    form,
    dropdownData,
    dropdownShow,
    endDate,
    autoComplete,
    submit,
    selected,
    onChangeDate,
    createdAt,
    setCustomer,
    setShowCustomerModal,
    customerInfo,
    handleCustomerInfo,
    role,
    cancelOrder,
    complete,
  } = useContext(GeneralContextInfo);

  const openModal = () => {
    setShowCustomerModal(true);
    setName(form.getFieldValue("customer"));
  };

  return (
    <Form
      form={form}
      onFinish={submit}
      initialValues={{
        bichish: false,
        knee: "",
        gulfik: "",
        pocha: "",
        priority: false,
        Классические1: false,
        Классические2: false,
        Двубортные1: false,
        Двубортные2: false,
        Однобортные1: false,
        Однобортные2: false,
        Смокинги: false,
        Галстук: false,
        Бабочка: false,
        Пояс: false,
        Карман: false,
        Брюки1: false,
        Брюки2: false,
        Жилеты1: false,
        Жилеты2: false,
        Жилеты3: false,
        Рубашки: false,
        Ёқа1: false,
        Ёқа2: false,
        Ёқа3: false,
      }}
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
            <div>
              <div className="phoneNumber1">
                <label htmlFor="phone1">Telefon nomer - 1</label>
                <input
                  type="text"
                  name="phone1"
                  value={customerInfo.phone1}
                  id="phone1"
                  onChange={handleCustomerInfo}
                />
              </div>
              <div className="phoneNumber2">
                <label htmlFor="phone2">Telefon nomer - 2</label>
                <input
                  type="text"
                  name="phone2"
                  value={customerInfo.phone2 ? customerInfo.phone2 : ""}
                  id="phone2"
                  placeholder="ikkinchi nomer yo'q"
                />
              </div>
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
            <div className="orderSize">
              <label htmlFor="stomach">Qorin</label>
              <Form.Item
                name="stomach"
                hasFeedback
                id="stomach"
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
            <div className="orderSize">
              <label htmlFor="backFront">Oldi-orqa</label>
              <Form.Item
                name="backFront"
                id="backFront"
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
            <div className="orderSize">
              <label htmlFor="shoulder">Yelka</label>
              <Form.Item
                name="shoulder"
                id="shoulder"
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
            <div className="orderSize">
              <label htmlFor="arm">{"Qo'l"}</label>
              <Form.Item
                name="arm"
                hasFeedback
                id="arm"
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
            <div className="orderSize">
              <label htmlFor="lenHeight">Uzunligi</label>
              <Form.Item
                name="lenHeight"
                id="lenHeight"
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
            <div className="orderSize">
              <label htmlFor="waist">Bel</label>
              <Form.Item
                name="waist"
                id="waist"
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
            <div className="orderSize">
              <label htmlFor="bosom">{"Bo'ksa"}</label>
              <Form.Item
                name="bosom"
                id="bosom"
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
            <div className="orderSize">
              <label htmlFor="leg">Son</label>
              <Form.Item
                name="leg"
                id="leg"
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
            <div className="orderSize">
              <label htmlFor="knee">Tizza</label>
              <Form.Item name="knee" id="knee" hasFeedback>
                <Input />
              </Form.Item>
            </div>
            <div className="orderSize">
              <label htmlFor="pocha">Pocha</label>
              <Form.Item name="pocha" id="pocha" hasFeedback>
                <Input />
              </Form.Item>
            </div>
            <div className="orderSize">
              <label htmlFor="gulfik">Gulfik</label>
              <Form.Item name="gulfik" id="gulfik" hasFeedback>
                <Input />
              </Form.Item>
            </div>
            <div className="orderSize">
              <label htmlFor="lenTrouthers">Uzunligi</label>
              <Form.Item
                name="lenTrouthers"
                id="lenTrouthers"
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

          <div className="form-right">
            <div className="img">
              <div className="img-top">
                <Form.Item name="Классические1" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={classic1} alt="eskiz" />
                      <p>Классические костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Классические2" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={classic2} alt="eskiz" />
                      <p>Классические костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Двубортные1" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={dvubortniy1} alt="eskiz" />
                      <p>Двубортные костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Двубортные2" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={dvubortniy2} alt="eskiz" />
                      <p>Двубортные костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Смокинги" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={smoking} alt="eskiz" />
                      <p>Смокинги</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Однобортные1" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={odnobortniy1} alt="eskiz" />
                      <p>Однобортные костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Однобортные2" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={odnobortniy2} alt="eskiz" />
                      <p>Однобортные костюмы</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Галстук" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={galstuk} alt="eskiz" />
                      <p>Галстук</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <div className="flex flex-col babochka">
                  <Form.Item name="Бабочка" valuePropName="checked">
                    <Checkbox>
                      <div>
                        <img src={babochka} alt="eskiz" />
                        <p>Бабочка</p>
                      </div>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name="Пояс" valuePropName="checked">
                    <Checkbox>
                      <div>
                        <img src={poyas} alt="eskiz" />
                        <p>Пояс</p>
                      </div>
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>

              <div className="img-top">
                <Form.Item name="Брюки1" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={bryuk1} alt="eskiz" />
                      <p>Классические брюки</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Брюки2" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={bryuk2} alt="eskiz" />
                      <p>Классические брюки</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Карман" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={karman} alt="eskiz" />
                      <p>Карман</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Жилеты1" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={jecket1} alt="eskiz" />
                      <p>Жилеты</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Жилеты2" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={jecket2} alt="eskiz" />
                      <p>Жилеты</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Жилеты3" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={jecket3} alt="eskiz" />
                      <p>Жилеты</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <Form.Item name="Рубашки" valuePropName="checked">
                  <Checkbox>
                    <div>
                      <img src={rubashka} alt="eskiz" />
                      <p>Рубашки</p>
                    </div>
                  </Checkbox>
                </Form.Item>
                <div className="flex flex-col">
                  <Form.Item
                    className="yoqalar"
                    name="Ёқа1"
                    valuePropName="checked"
                  >
                    <Checkbox>
                      <img src={stil1} alt="eskiz" />
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    className="yoqalar"
                    name="Ёқа2"
                    valuePropName="checked"
                  >
                    <Checkbox>
                      <img src={stil2} alt="eskiz" />
                    </Checkbox>
                  </Form.Item>
                </div>
                <Form.Item className="yoqa" name="Ёқа3" valuePropName="checked">
                  <Checkbox>
                    <img src={stil3} alt="eskiz" />
                  </Checkbox>
                </Form.Item>
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
              <div className="bichish">
                <Form.Item name="bichish" valuePropName="checked">
                  <Checkbox>Bichildi</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>

      {role === "admin" && !selected ? (
        <Form.Item>
          <Button loading={loadingBtn} className="confirmBtn" htmlType="submit">
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
  );
};

FormCustom.propTypes = {
  check: PropTypes.string,
  setName: PropTypes.func,
};

export default FormCustom;
