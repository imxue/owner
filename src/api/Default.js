import request from "../util/request";

/*
  注册用户
*/
export function regist(info) {
  const data = {
    mobile_phone: info.phone,
    email: info.email,
    password: info.password,
    name: info.name,
    area_id: info.id,
    type: 1 // 1 是业主
  };
  return request({
    url: "/center/user/regist",
    method: "POST",
    data
  });
}
export function logout() {
  return request({
    url: "/center/user/logout",
    method: "POST"
  });
}
export function disable(data) {
  return request({
    url: `/owner/bar_owner/disable`,
    method: "post",
    data
  });
}
export function enable(data) {
  return request({
    url: `/owner/bar_owner/enable`,
    method: "post",
    data
  });
}
export function resetPassword(info) {
  const data = {
    account: info.phone,
    password: info.password
  };
  return request({
    url: "/center/user/resetPassword",
    method: "POST",
    data
  });
}
export function getBarInfo() {
  return request({
    url: `/owner/bar_owner/`,
    method: "GET"
  });
}

export function getBaseBarInfo() {
  return request({
    url: `/owner/bar_owner/getBaseBarInfo`,
    method: "GET"
  });
}
export function login(info) {
  const data = {
    account: info.Account,
    password: info.Password
  };
  return request({
    url: `/center/user/login`,
    method: "POST",
    data
  });
}

export function getAddress() {
  return request({
    url: `/center/area/getAllArea`,
    method: "GET"
  });
}
export function createBar(data) {
  data.name = data.bar_name;
  return request({
    url: `/owner/bar_owner/createBar`,
    method: "POST",
    data
  });
}
export function getAllBar(info) {
  return request({
    url: `/owner/bar_owner/getAllBar?offset=${info.offset}&limit=${info.limit}&orderby="${info.orderby}"`,
    method: "get"
  });
}
// 托管网吧
export function trustNetbar(info) {
  const data = {
    account: info.mobilephone,
    barid: Number(info.barId),
    name: info.name
  };
  return request({
    url: `/owner/bar_owner/trustNetbar`,
    method: "post",
    data
  });
}
// export function getVerifyCode (info) {
//   const data = {
//     'MobilePhone': info
//   }

//   let x = qs.stringify(data)
//   return request({
//     url: `/center/verifycode/getVerifyCode`,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     method: 'post',
//     data: x
//   })
// }
// 手机验证
export function getVerifyCode(data) {
  return request({
    url: `/center/verifycode/getVerifyCode`,
    method: "post",
    data
  });
}

export function validVerifyCode(data) {
  return request({
    url: `/center/verifycode/validVerifyCode`,
    method: "post",
    data
  });
}

export function getUserInfoByphone(phone) {
  return request({
    url: `/center/user/getUserInfo?account=${phone}`,
    method: "get"
  });
}
export function editBar(data) {
  data.name = data.bar_name;
  return request({
    url: `/owner/bar_owner/editBar`,
    method: "post",
    data
  });
}
/**
 * 取消网吧托管
 */
export function cancelTrustNetbar(id) {
  let data = {
    barid: id
  };
  return request({
    url: `/owner/bar_owner/cancelTrustNetbar`,
    method: "post",
    data
  });
}
/**
 * 解绑
 */
export function unbind(data) {
  return request({
    url: `/diskless/bar_ext/unbind`,
    method: "post",
    data
  });
}
/**
 * 修改网吧密码
 */
export function changePassword(data) {
  return request({
    url: `/owner/bar_owner/changePassword`,
    method: "post",
    data
  });
}
export const validMail = data =>
  request({
    url: "/center/verifycode/validMail",
    method: "post",
    data
  });
///admin/oem/getall

export const getOem = () =>
  request({
    url: "/admin/oem/getallenabled",
    method: "get"
  });
