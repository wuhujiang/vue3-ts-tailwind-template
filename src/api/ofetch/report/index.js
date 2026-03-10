import api from '../api';

export const reportApi = {
  // 导出简写函数（类似你原来的 testGet / testPost，方便调用）
  testGet() {
    return api('/api/test', {
      method: 'GET',
    });
  },
  // get请求带入参
  testGetWithParams(params) {
    return api('/api/test', {
      method: 'GET',
      query: params,
    });
  },
  testPost(data) {
    return api('/api/test', {
      method: 'POST',
      body: data, // ofetch 自动 JSON.stringify + 加 Content-Type
    });
  },
};
