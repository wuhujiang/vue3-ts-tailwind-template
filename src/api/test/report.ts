import type {
  ReportListParams,
  ReportListResponse,
  TestGetResponse,
  TestPostResponse,
} from '../types/report';
import api from '../axios';

export const reportApi = {
  testGet: () =>
    api<TestGetResponse>({
      url: '/api/test',
      method: 'get',
    }),
  testPost: (data: Record<string, unknown>) =>
    api<TestPostResponse>({
      url: '/api/testPost',
      method: 'post',
      data,
    }),
  getReportList: (data: ReportListParams = {}) =>
    api<ReportListResponse>({
      url: '/web/report/list',
      method: 'post',
      data,
    }),
};
