import api from '../axios';

// 用户类型定义
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// 查询参数类型
export interface UserListParams {
  page?: number;
  size?: number;
  keyword?: string;
}

// 创建/更新用户数据类型
export interface UserCreateData {
  name: string;
  email: string;
}

// 用户相关API封装
export const userApi = {
  // 获取用户列表
  listUser: (params?: UserListParams) => {
    return api({
      url: '/users',
      method: 'get',
      params,
    });
  },

  // 获取单个用户详情
  getUser: (id: number | string) => {
    return api({
      url: `/users/${id}`,
      method: 'get',
    });
  },

  // 添加用户
  addUser: (data: UserCreateData) => {
    return api({
      url: '/users',
      method: 'post',
      data,
    });
  },

  // 更新用户
  updateUser: (id: number | string, data: Partial<UserCreateData>) => {
    return api({
      url: `/users/${id}`,
      method: 'put',
      data,
    });
  },

  // 删除用户
  deleteUser: (id: number | string) => {
    return api({
      url: `/users/${id}`,
      method: 'delete',
    });
  },
};
