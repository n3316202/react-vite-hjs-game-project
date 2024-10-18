import React from "react";
import { Link } from "react-router-dom";

//https://getbootstrap.com/docs/5.0/components/pagination/

const Pagingnation = ({ paging }) => {
  console.log(paging);

  const startQuery =
    "/boards/list" +
    "?pageNum=" +
    (paging.startPage - 1) +
    "&" +
    "amount=" +
    paging.criteria.amount;
  //const endQuery =  '/boards/list' + '?pageNum=' + (paging.endPage + 1) + '&' + 'amount=' +  paging.cri.amount

  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {paging.prev == true && (
          <li className="page-item">
            {/* <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a> */}
            <Link
              to={
                "/boards/list" +
                "?pageNum=" +
                (paging.startPage - 1) +
                "&" +
                "amount=" +
                paging.criteria.amount
              }
              onClick={onClickPaging}
              className="page-link"
              aria-label="Previous"
            >
              {/* <span aria-hidden="true">&laquo;</span> */}
              &laquo;
            </Link>
          </li>
        )}
        <li class="page-item">
          <a class="page-link" href="#">
            1
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            2
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            3
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagingnation;
