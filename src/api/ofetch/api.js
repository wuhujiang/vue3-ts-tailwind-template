// ofetch示例，好替换
import { ofetch } from 'ofetch';

// 从环境变量读取 baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// 可选：从 localStorage / pinia / cookie 获取 token（根据你的认证方式改）
const getToken = () => localStorage.getItem('token') || '';

// 创建 ofetch 实例（类似 axios.create）
export const api = ofetch.create({
  baseURL,

  // 默认超时（毫秒）
  timeout: 10000,

  // 默认 headers（ofetch 会自动加 Content-Type: application/json 当 body 是对象时）
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // 请求拦截器：加 token / 日志 等（类似 axios request interceptor）
  async onRequest({ request, options }) {
    const token = getToken();
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }

    // 开发环境可选打印请求日志
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${options.method || 'GET'} ${request}`);
    }
  },

  // 响应成功拦截器：类似 axios 返回 response.data
  // ofetch 默认就返回解析后的 data（JSON/text 等），所以这里可以加额外处理
  async onResponse({ response }) {
    // 如果你想额外日志或修改 data，可以在这里做
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ${response.url}`);
    }
    // 无需 return response.data，因为 ofetch 已自动返回 data
  },

  // 响应错误拦截器：统一错误处理（类似 axios response error）
  async onResponseError({ response, error }) {
    let message = '请求失败，请稍后重试';

    if (response) {
      // 尝试解析错误体的 JSON（常见 { message: "xxx" } 或 { error: "xxx" }）
      try {
        const data = await response.json();
        message = data.message || data.error || `HTTP ${response.status}`;
      } catch {
        message = response.statusText || message;
      }

      if (response.status === 401) {
        message = '登录已过期，请重新登录';
        // 可选：清除 token 并跳转
        // localStorage.removeItem('token')
        // window.location.href = '/login'
      } else if (response.status === 403) {
        message = '无权限访问';
      } else if (response.status >= 500) {
        message = '服务器错误';
      }
    } else if (error) {
      message = error.message || message;
    }

    // 抛出统一错误（组件里 catch 时能拿到 message 和原始 response）
    const customError = new Error(message);
    customError.status = response?.status;
    customError.response = response;
    throw customError;
  },
});
