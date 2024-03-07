import request from '../request'

// admin 登录
export const adminlogin = (params) =>{
  return request({
    url: '/springbootho5g5/users/login',
    method: 'post',
    params
  })
}

export const userlogin = (params) =>{
  return request({
    url: '/springbootho5g5/yonghu/login',
    method: 'post',
    params
  })
}

export const getUserList = (params) =>{
  return request({
    url: `/springbootho5g5/yonghu/page`,
    method: 'get',
    params
  })
}

export const addUser = (data) =>{
  return request({
    url: `/springbootho5g5/yonghu/save`,
    method: 'post',
    data
  })
}

export const updateUser = (data) =>{
  return request({
    url: `/springbootho5g5/yonghu/update`,
    method: 'post',
    data
  })
}

export const deleteUser = (ids) =>{
  return request({
    url: `springbootho5g5/yonghu/delete`,
    method: 'post',
    data: ids
  })
}



// 人员登记
export const getRegistrationList = (data) =>{
  return request({
    url: `springbootho5g5/renyuandengji/page`,
    method: 'post',
    data
  })
}

export const addRegistration = (data) =>{
  return request({
    url: `springbootho5g5/renyuandengji/save`,
    method: 'post',
    data
  })
}

export const updateRegistration = (data) =>{
  return request({
    url: `springbootho5g5/renyuandengji/update`,
    method: 'post',
    data
  })
}

export const deleteRegistration = (ids) =>{
  return request({
    url: `springbootho5g5/renyuandengji/delete`,
    method: 'post',
    data: ids
  })
}


// 食物管理
export const getFoodList = (data) =>{
  return request({
    url: `springbootho5g5/shiwu/page`,
    method: 'post',
    data
  })
}

export const addFood = (data) =>{
  return request({
    url: `springbootho5g5/shiwu/save`,
    method: 'post',
    data
  })
}

export const updateFood = (data) =>{
  return request({
    url: `springbootho5g5/shiwu/update`,
    method: 'post',
    data
  })
}

export const deleteFood = (ids) =>{
  return request({
    url: `springbootho5g5/shiwu/delete`,
    method: 'post',
    data: ids
  })
}

// 建材管理
export const getMaterialsList = (data) =>{
  return request({
    url: `springbootho5g5/jiancai/page`,
    method: 'post',
    data
  })
}

export const addMaterials = (data) =>{
  return request({
    url: `springbootho5g5/jiancai/save`,
    method: 'post',
    data
  })
}

export const updateMaterials = (data) =>{
  return request({
    url: `springbootho5g5/jiancai/update`,
    method: 'post',
    data
  })
}

export const deleteMaterials = (ids) =>{
  return request({
    url: `springbootho5g5/jiancai/delete`,
    method: 'post',
    data: ids
  })
}



// 淡水管理
export const getFreshwaterList = (data) =>{
  return request({
    url: `springbootho5g5/danshui/page`,
    method: 'post',
    data
  })
}

export const addFreshwater = (data) =>{
  return request({
    url: `springbootho5g5/danshui/save`,
    method: 'post',
    data
  })
}

export const updateFreshwater = (data) =>{
  return request({
    url: `springbootho5g5/danshui/update`,
    method: 'post',
    data
  })
}

export const deleteFreshwater = (ids) =>{
  return request({
    url: `springbootho5g5/danshui/delete`,
    method: 'post',
    data: ids
  })
}


// 药品管理
export const getMedicineList = (data) =>{
  return request({
    url: `springbootho5g5/yaopin/page`,
    method: 'post',
    data
  })
}

export const addMedicine = (data) =>{
  return request({
    url: `springbootho5g5/yaopin/save`,
    method: 'post',
    data
  })
}

export const updateMedicine = (data) =>{
  return request({
    url: `springbootho5g5/yaopin/update`,
    method: 'post',
    data
  })
}

export const deleteMedicine = (ids) =>{
  return request({
    url: `springbootho5g5/yaopin/delete`,
    method: 'post',
    data: ids
  })
}

// 物流管理
export const goodsByType = () =>{
  return request({
    url: `springbootho5g5/option/shangpinfenlei/shangpinfenlei`,
    method: 'get',
  })
}

export const getLogisticsList = (params) =>{
  return request({
    url: `springbootho5g5/wuliuyunshu/page`,
    method: 'get',
    params
  })
}

export const addLogistics = (data) =>{
  return request({
    url: `/springbootho5g5/wuliuyunshu/save`,
    method: 'post',
    data
  })
}

export const updateLogistics = (data) =>{
  return request({
    url: `/springbootho5g5/wuliuyunshu/update`,
    method: 'post',
    data
  })
}

export const deleteLogistics = (ids) =>{
  return request({
    url: `springbootho5g5/wuliuyunshu/delete`,
    method: 'post',
    data: ids
  })
}

// 供应商
export const getSupplierList = (params) =>{
  return request({
    url: `springbootho5g5/gongyingshang/page`,
    method: 'get',
    params
  })
}

export const addSupplier = (data) =>{
  return request({
    url: `/springbootho5g5/gongyingshang/save`,
    method: 'post',
    data
  })
}

export const updateSupplier = (data) =>{
  return request({
    url: `/springbootho5g5/gongyingshang/update`,
    method: 'post',
    data
  })
}

export const deleteSupplier = (ids) =>{
  return request({
    url: `springbootho5g5/gongyingshang/delete`,
    method: 'post',
    data: ids
  })
}


export const getUserInfos = (username) =>{
  return request({
    url: `springbootho5g5/yonghu/info`,
    method: 'post',
    data: {
      yonghuming: username
    }
  })
}

export const updateUserInfos = (data) =>{
  return request({
    url: `springbootho5g5/yonghu/update`,
    method: 'post',
    data
  })
}

export const updatePas = (data) =>{
  return request({
    url: `springbootho5g5/users/resetPass`,
    method: 'post',
    data
  })
}

export const updatePassword = (data) =>{
  return request({
    url: `springbootho5g5/yonghu/resetPass`,
    method: 'post',
    data
  })
}


