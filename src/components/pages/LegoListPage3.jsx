import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

//https://cotak.tistory.com/112

//라이브러리 사용
// 1. npm i react-js-pagination

const LegoListPage3 = () => {
    //https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10
    //https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10
    let paging = {
        activePage: 1, // 현재 페이지
        limit: 10, // 한 페이지 당 보여질 게시물 갯수
        pageCount: 10, //    1 ,2,3,4,5,6,7,8,9,10
        totalCount: 0, //총갯수
        data: [], // 데이타
    };

    const [contacts, setContacts] = useState(paging);

    useEffect(() => {
        console.log(`${contacts.limit}`);

        axios
            .get(
                `https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=${contacts.limit}`
            )
            .then((res) => {
                //console.log(response);

                setContacts((prev) => ({
                    ...prev,
                    data: res.data.contacts,
                    totalCount: res.data.totalcount,
                }));

                console.log(contacts);
            })
            .catch((error) => console.log(error));
    }, []);

    const handlePageChange = (pageNumber) => {
        console.log(pageNumber);
        console.log(typeof pageNumber);

        setContacts((prev) => ({ ...prev, activePage: pageNumber }));

        axios
            .get(
                `https://sample.bmaster.kro.kr/contacts?pageno=${pageNumber}&pagesize=${contacts.limit}`
            )
            .then((res) => {
                console.log(res);

                setContacts((prev) => ({
                    ...prev,
                    data: res.data.contacts,
                    totalCount: res.data.totalcount,
                }));

                console.log(contacts);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="App">
                <h2 className="mt-5 px-4">
                    React Bootstrap pagination example
                </h2>

                <ul className="list-group p-4">
                    {contacts.data.map((item) => {
                        return (
                            <li key={item.no} className="list-group-item">
                                <span className="font-weight-bold pr-2">
                                    {item.name}.
                                </span>{' '}
                                {item.tel}
                            </li>
                        );
                    })}
                </ul>

                {/* <Pagination
                    // 현제 보고있는 페이지
                    activePage={1}
                    // 한페이지에 출력할 아이템수
                    itemsCountPerPage={5}
                    // 총 아이템수
                    totalItemsCount={300}
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
                    // 함수
                    onChange={handlePageChange}
                ></Pagination> */}
                <PaginationBox>
                    <Pagination
                        activePage={contacts.activePage}
                        itemsCountPerPage={contacts.limit}
                        totalItemsCount={contacts.totalCount}
                        pageRangeDisplayed={contacts.pageCount}
                        onChange={handlePageChange}
                    ></Pagination>
                </PaginationBox>
            </div>
        </>
    );
};

const PaginationBox = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
    }
    ul.pagination li:first-child {
        border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
        border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
        text-decoration: none;
        color: #337ab7;
        font-size: 1rem;
    }
    ul.pagination li.active a {
        color: white;
    }
    ul.pagination li.active {
        background-color: #337ab7;
    }
    ul.pagination li a:hover,
    ul.pagination li a.active {
        color: blue;
    }
`;
export default LegoListPage3;
