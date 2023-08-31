import { Pagination, Spin } from "antd";
import PropTypes from "prop-types";
import { useOrders } from "../states/orders";
import "./table.scss";
import { useContext } from "react";
import { GeneralContextInfo } from "../context";

const Table = ({ checkArchive }) => {
  const { loading, ordersData, ordersArchive, total, totalArchive } =
    useOrders();
  const { page, pageLimit, editOrder, handlePage, role } =
    useContext(GeneralContextInfo);
  const getColorDate = (date) => {
    let nowDate = new Date();
    let nowMonth = nowDate.getMonth();
    let nowDay = nowDate.getDate();
    let endDate = date.split("T")[0].split("-");
    if (+nowMonth + 1 === +endDate[1]) {
      if (+endDate[2] - +nowDay < 4 && +endDate[2] - +nowDay > 0) {
        return "red";
      } else if (+endDate[2] - +nowDay < 8 && +endDate[2] - +nowDay > 0) {
        return "orange";
      } else {
        return "black";
      }
    }
  };
  return (
    <section className="table-wrapper">
      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        <table id="table">
          <thead>
            <tr className="th-tr">
              <th className="first-th" scope="col">
                #
              </th>
              <th className="name-th" scope="col">
                MIJOZLAR
              </th>
              <th className="phone-th" scope="col">
                TELEFON
              </th>
              <th className="order-th" scope="col">
                BUYURTMA
              </th>
              <th className="didline-th" scope="col">
                MUDDAT
              </th>
              <th className="getOrder-th" scope="col">
                OLINGAN VAQTI
              </th>
              {role === "admin" ? (
                <th className="price-th" scope="col">
                  NARX
                </th>
              ) : null}
              <th className="last-th" scope="col">
                BICHILDI
              </th>
            </tr>
          </thead>
          <tbody className="table-row">
            {checkArchive !== "archive"
              ? ordersData.map((el, i) => (
                  <tr
                    onClick={() => editOrder(el.id)}
                    key={el.id}
                    className="tb-tr"
                  >
                    <td className="first-td">
                      {(page - 1) * pageLimit + i + 1}
                    </td>
                    <td>
                      {el?.customer.charAt(0).toUpperCase() +
                        el?.customer.slice(1)}
                    </td>
                    <td>{el?.phone1}</td>
                    <td>
                      {el?.products}
                      {/* {el?.products?.split(",").slice(0, -1).join(",") + " "} */}
                      {/* {el?.products?.length > 6
                        ? el?.products
                            ?.split(",")
                            .slice(5, el?.products?.length < 10 ? -1 : 10)
                            .join(",") + " "
                        : ""}
                      {el?.products?.length > 10
                        ? el?.products
                            ?.split(",")
                            .slice(10, el?.products?.length < 15 ? -1 : 15)
                            .join(",") + " "
                        : ""}
                      {el?.products?.length > 10
                        ? el?.products
                            ?.split(",")
                            .slice(15, el?.products?.length < 20 ? -1 : 20)
                            .join(",")
                        : ""} */}
                    </td>
                    <td style={{ color: getColorDate(el?.endDate) }}>
                      {el?.endDate?.split("T")[0]}
                    </td>
                    <td>{el?.createdAt?.split("T")[0]}</td>
                    {role === "admin" ? <td>{el?.toPay}</td> : null}
                    <td className="last-td">
                      {
                        el.products.split(",")[
                          el.products.split(",").length - 1
                        ]==="true"?"✅":"❌"
                      }
                    </td>
                  </tr>
                ))
              : ordersArchive?.map((el, i) => (
                  <tr
                    onClick={() => editOrder(el.id)}
                    key={el.id}
                    className="tb-tr"
                  >
                    <td className="first-td">
                      {(page - 1) * pageLimit + i + 1}
                    </td>
                    <td>
                      {el?.customer.charAt(0).toUpperCase() +
                        el?.customer.slice(1)}
                    </td>
                    <td>{el?.phone1}</td>
                    <td>
                      {el?.products?.split(",").splice(0, 5).join(",") + " "}
                      {el?.products?.length > 6
                        ? el?.products?.split(",").splice(5, 5).join(",") + " "
                        : ""}
                      {el?.products?.length > 10
                        ? el?.products?.split(",").splice(10, 5).join(",") + " "
                        : ""}
                      {el?.products?.length > 10
                        ? el?.products?.split(",").splice(15, 5).join(",")
                        : ""}
                    </td>
                    <td>{el?.endDate?.split("T")[0]}</td>
                    <td>{el?.createdAt?.split("T")[0]}</td>
                    {role === "admin" ? <td>{el?.toPay}</td> : null}
                    {console.log(el?.products)}
                  </tr>
                ))}
          </tbody>
        </table>
      )}
      {!loading && (totalArchive > 0 || total > 0) ? (
        <Pagination
          current={page}
          defaultCurrent={page}
          showSizeChanger={false}
          onChange={handlePage}
          total={checkArchive === "archive" ? totalArchive : total}
          defaultPageSize={pageLimit}
          className="pagination"
        />
      ) : null}
    </section>
  );
};

Table.propTypes = {
  checkArchive: PropTypes.string,
};

export default Table;
