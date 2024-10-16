import http from "./HttpCommon";

const getPagingList = (path = "/boards/list", search = "") => {
  return http.get(path + search);
};

//http://192.168.0.10:8282/boards/64
const remove = (id) => {
  return http.delete(`boards/${id}`);
};

const write = (data) => {
  console.log(data);
  return http.post("/boards/", data);
};

export default {
  getPagingList,
  remove,
  write,
};
