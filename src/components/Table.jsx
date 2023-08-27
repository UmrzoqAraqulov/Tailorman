import { Pagination, Spin } from "antd";
import PropTypes from "prop-types";
import { useOrders } from "../states/orders";
import "./table.scss";
import moreBtn from "../assets/images/more.svg";
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
    if (+nowMonth+1 === +endDate[1]) {
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
                {"KO'PROQ"}
              </th>
            </tr>
          </thead>
          <tbody className="table-row">
            {checkArchive !== "archive"
              ? ordersData.map((el, i) => (
                  <tr key={el.id} className="tb-tr">
                    <td className="first-td">
                      {(page - 1) * pageLimit + i + 1}
                    </td>
                    <td>
                      {el?.customer.charAt(0).toUpperCase() +
                        el?.customer.slice(1)}
                    </td>
                    <td>{el?.products}</td>
                    <td style={{ color: getColorDate(el?.endDate) }}>
                      {el?.endDate?.split("T")[0]}
                    </td>
                    <td>{el?.createdAt?.split("T")[0]}</td>
                    {role === "admin" ? <td>{el?.toPay}</td> : null}
                    <td onClick={() => editOrder(el.id)} className="last-td">
                      <img src={moreBtn} alt="" />
                    </td>
                  </tr>
                ))
              : ordersArchive?.map((el, i) => (
                  <tr key={el.id} className="tb-tr">
                    <td className="first-td">
                      {(page - 1) * pageLimit + i + 1}
                    </td>
                    <td>
                      {el?.customer.charAt(0).toUpperCase() +
                        el?.customer.slice(1)}
                    </td>
                    <td>{el?.products}</td>
                    <td>{el?.endDate?.split("T")[0]}</td>
                    <td>{el?.createdAt?.split("T")[0]}</td>
                    {role === "admin" ? <td>{el?.toPay}</td> : null}
                    <td onClick={() => editOrder(el.id)} className="last-td">
                      <img src={moreBtn} alt="" />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
      {!loading && (totalArchive>0 || total>0) ? (
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
