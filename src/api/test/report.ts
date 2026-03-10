import api from '../axios';

interface TestGetResponse {
  code: string;
  message: string;
  data: {
    id: number;
    name: string;
    value: number;
  };
}

interface TestPostResponse {
  code: string;
  message: string;
  data: Record<string, unknown> & { id: number };
}

interface ReportItem {
  id: number;
  title: string;
  content: string;
  createTime: string;
}

interface ReportListParams {
  page?: number;
  pageSize?: number;
}

interface ReportListResponse {
  code: string;
  message: string;
  data: {
    list: ReportItem[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export const reportApi = {
  testGet: () => api<TestGetResponse>({
    url: '/api/test',
    method: 'get',
  }),
  testPost: (data: Record<string, unknown>) => api<TestPostResponse>({
    url: '/api/testPost',
    method: 'post',
    data,
  }),
  getReportList: (data: ReportListParams = {}) => api<ReportListResponse>({
    url: '/web/report/list',
    method: 'post',
    data,
  }),
};
