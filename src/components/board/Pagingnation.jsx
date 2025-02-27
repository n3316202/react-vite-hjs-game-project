import React from "react";
import { Link } from "react-router-dom";

//https://getbootstrap.com/docs/5.0/components/pagination/
//    /* 생성자 */
    public PageMakerDTO(Criteria cri, int total) {
        
        this.cri = cri;
        this.total = total;
        
        /* 마지막 페이지 */
        this.endPage = (int)(Math.ceil(cri.getPageNum()/10.0))*10;
        /* 시작 페이지 */
        this.startPage = this.endPage - 9;
        
        /* 전체 마지막 페이지 */
        int realEnd = (int)(Math.ceil(total * 1.0/cri.getAmount()));
        
        /* 전체 마지막 페이지(realend)가 화면에 보이는 마지막페이지(endPage)보다 작은 경우, 보이는 페이지(endPage) 값 조정 */
        if(realEnd < this.endPage) {
            this.endPage = realEnd;
        }
        
        /* 시작 페이지(startPage)값이 1보다 큰 경우 true */
        this.prev = this.startPage > 1;
        
        /* 마지막 페이지(endPage)값이 1보다 큰 경우 true */
        this.next = this.endPage < realEnd;
        
        
    }
const Pagingnation = ({ paging, onClickPaging }) => {
  console.log(paging);

  const startQuery =
    "/boards/list" +
    "?pageNum=" +
    (paging.startPage - 1) +
    "&" +
    "amount=" +
    paging.criteria.amount;

  const endQuery =
    "/boards/list" +
    "?pageNum=" +
    (paging.endPage + 1) +
    "&" +
    "amount=" +
    paging.criteria.amount;

  console.log(startQuery);

  const rendering = () => {
    const row = [];

    for (let i = paging.startPage; i <= paging.endPage; i++) {
      console.log(
        "/list/" + "?pageNum=" + i + "&" + "amount=" + paging.criteria.amount
      );

      const query =
        "/boards/list" +
        "?pageNum=" +
        i +
        "&" +
        "amount=" +
        paging.criteria.amount;

      row.push(
        <li className="page-item">
          <Link to={query} onClick={onClickPaging} className="page-link">
            {i}
          </Link>
        </li>
      );
    }

    return row;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {paging.prev == true && (
          <li className="page-item">
            <Link
              to={startQuery}
              onClick={onClickPaging}
              className="page-link"
              aria-label="Previous"
            >
              &laquo;
            </Link>
          </li>
        )}

        {rendering()}
        {/* <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li> */}

        {paging.next == true && paging.endPage > 0 && (
          <li className="page-item">
            <Link
              to={endQuery}
              onClick={onClickPaging}
              className="page-link"
              aria-label="Next"
            >
              &raquo;
              {/* <span aria-hidden="true">&raquo;</span> */}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagingnation;
