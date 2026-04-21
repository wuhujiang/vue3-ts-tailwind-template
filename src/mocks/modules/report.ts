import { http, HttpResponse } from "msw";

const BASE_URL = "https://api.example.com";

interface TestData {
  id: number;
  name: string;
  value: number;
}

interface ReportItem {
  id: number;
  title: string;
  content: string;
  createTime: string;
}

interface ReportListResponse {
  list: ReportItem[];
  total: number;
  page: number;
  pageSize: number;
}

interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  data: T;
}

export const report = [
  http.get(`${BASE_URL}/api/test`, () => {
    return HttpResponse.json<ApiResponse<TestData>>(
      {
        code: "00000",
        message: "GET请求成功",
        data: {
          id: 1,
          name: "测试数据",
          value: 123,
        },
      },
      { status: 200 },
    );
  }),

  http.post(`${BASE_URL}/api/testPost`, async ({ request }) => {
    const data = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json<ApiResponse<Record<string, unknown> & { id: number }>>(
      {
        code: "00000",
        message: "POST请求成功",
        data: {
          ...data,
          id: Date.now(),
        },
      },
      { status: 200 },
    );
  }),

  http.post(`${BASE_URL}/web/report/list`, async ({ request }) => {
    const data = (await request.json()) as { page?: number; pageSize?: number };
    return HttpResponse.json<ApiResponse<ReportListResponse>>(
      {
        code: "00000",
        message: "获取报告列表成功",
        data: {
          list: [
            {
              id: 1,
              title: "测试报告1",
              content: "这是测试报告1的内容",
              createTime: "2024-01-01 10:00:00",
            },
            {
              id: 2,
              title: "测试报告2",
              content: "这是测试报告2的内容",
              createTime: "2024-01-02 10:00:00",
            },
          ],
          total: 2,
          page: data.page || 1,
          pageSize: data.pageSize || 10,
        },
      },
      { status: 200 },
    );
  }),
];
