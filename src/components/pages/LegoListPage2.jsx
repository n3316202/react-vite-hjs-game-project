import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';

// 프로젝트마다 용어는 달라질 수 있다
// offset -> start
// limit -> size

// 페이지네이션 구현
// 🧨🧨🧨 순서
// 접속 URL : "list?offset=10&limit=10"
// -> URL의 정보를 useSearchParams() 훅 이용해서 가져오고
// -> offset과 limit 변수에 값을 저장해줌
// -> fetch에 백엔드 API 호출하는 _start와 _limit의 값으로 위 두 변수 값을 넣어주고
// -> 불러온 값을 posts state에 저장한다.
// -> posts 데이터를 이용해서 map 리렌더링!!
//
//   public PageMakerDTO(Criteria cri, int total) {
//     this.cri = cri;
//     this.total = total;
//
//     this.endPage = (int)(Math.ceil(cri.getPageNum()/10.0))*10;
//     this.startPage = this.endPage - 9;

//
//     int realEnd = (int)(Math.ceil(total * 1.0/cri.getAmount()));

//     /* 전체 마지막 페이지(realend)가 화면에 보이는 마지막페이지(endPage)보다 작은 경우, 보이는 페이지(endPage) 값 조정 */
//     if(realEnd < this.endPage) {
//         this.endPage = realEnd;
//     }

//
//     this.prev = this.startPage > 1;

//
//     this.next = this.endPage < realEnd;
// }

//https://leeseohyun430.tistory.com/92

const LegoListPage2 = () => {
    //페이지네이션을 구현하기 위한 설정값은 총 4개가 필요합니다
    // currentPage: 현재 페이지
    // totalCount: 총 데이터의 갯수
    // pageCount: 화면에 나타날 페이지 갯수
    // limit: 한 페이지 당 나타낼 데이터의 갯수

    //페이징을 위하여 아래의 7개의 변수가 필요하다.
    // let paging = {
    //     pageNum: 1, //  /* 현재 페이지 */
    //     amount: 10, //  /* 한 페이지 당 보여질 게시물 갯수 */ //limit
    //     startPage: 1, //시작페이지
    //     endPage: 10,
    //     total: 0,
    //     prev: true,
    //     next: false,
    //     activePage: 1,
    //     data: [], // 데이타
    // };

    let paging = {
        activePage: 1, // 현재 페이지
        limit: 10, // 한 페이지 당 보여질 게시물 갯수
        pageCount: 10, //    1 ,2,3,4,5,6,7,8,9,10
        totalCount: 0, //총갯수
        realPage: function () {
            // ceil() 함수는 소수점 자리의 숫자를 무조건 올리는 함수이다.
            // ceil(99.2) = 100
            // ceil(0.11111) = 1
            // ceil(5.9) = 6
            // ceil(-3.22) = -3

            // 예) 101의 글 / 10 페이지 나머지가 10.1 => 올림하여 11페이지
            // 예) 21의 글 / 10 페이지 나머지가 2 => 올림하여 2 페이지
            // 예) 21의 글 / 10 페이지 나머지가 2.2 => 올림하여 3페이지

            /* 전체 마지막 페이지 */
            //int realEnd = (int)(Math.ceil(total * 1.0/cri.getAmount()));
            return Math.ceil(this.totalCount / this.limit);
        },
        pageGroup: function () {
            //현재 페이지의 그룹 계산하기
            // 11(현재 페이지) / 10 (페이지 갯수)   ceil(1.1) = 2 // 2그룹
            // 3(현재 페이지) / 10 (페이지 갯수)   ceil(0.3) = 1 // 1그룹

            return Math.ceil(this.activePage / this.pageCount);
        },
        endPage: function () {
            /* 마지막 페이지 */
            //this.endPage = int(Math.ceil(cri.getPageNum() / 10.0)) * 10;
            let endPage = this.pageGroup() * this.pageCount;

            /* 전체 마지막 페이지(realend)가 화면에 보이는 마지막페이지(endPage)보다 작은 경우, 보이는 페이지(endPage) 값 조정 */
            // [1,2,3] < [1,2,3,4,5,6,7,8,9]
            if (this.realPage() < endPage) {
                endPage = this.realPage();
            }
            return endPage;
        },
        startPage: function () {
            let endPage = this.pageGroup() * this.pageCount;
            //20 - 9 = 11,12,13~
            //10 - 9 = 1,2,3,4
            return endPage - (this.pageCount - 1);
        },

        prev: function () {
            //  시작 페이지(startPage)값이 1보다 큰 경우 true
            return this.startPage() > 1;
        },
        next: function () {
            //마지막 페이지(endPage)값이 1보다 큰 경우 true
            return this.endPage() < this.realPage();
        },
        data: [], // 데이타
    };

    //https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10
    //https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10

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
    }, [contacts.limit]);

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

                console.log(contacts.startPage());
                console.log(contacts.endPage());

                console.log(contacts.next());
                console.log(contacts.prev());
            })
            .catch((error) => console.log(error));
    };

    //크게 3가지 부분으로 나눔
    //
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

                <Pagination className="px-4">
                    {/* {contacts.data.map((_, index) => {
                        return (
                            <Pagination.Item
                                onClick={() => handlePageChange(index + 1)}
                                key={index + 1}
                                active={index + 1 === contacts.activePage}
                            >
                                {index + 1}
                            </Pagination.Item>
                        );
                    })} */}

                    {contacts.prev() && <Pagination.Prev />}

                    {
                        //첫번째 방법
                        [...Array(contacts.endPage())].map((_, index) => {
                            return (
                                <Pagination.Item
                                    onClick={() => handlePageChange(index + 1)}
                                    key={index + 1}
                                    active={index + 1 === contacts.activePage}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            );
                        })
                    }
                    {contacts.next() && (
                        <Pagination.Next
                            onClick={() =>
                                handlePageChange(contacts.endPage() + 1)
                            }
                        />
                    )}
                </Pagination>
            </div>
        </>
    );
};

export default LegoListPage2;
