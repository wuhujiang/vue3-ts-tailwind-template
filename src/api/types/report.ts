import type { ApiResponse } from './common';

export interface ReportItem {
  id: number;
  title: string;
  content: string;
  createTime: string;
}

export interface ReportListParams {
  page?: number;
  pageSize?: number;
}

export interface ReportListData {
  list: ReportItem[];
  total: number;
  page: number;
  pageSize: number;
}

export type TestGetResponse = ApiResponse<{
  id: number;
  name: string;
  value: number;
}>;

export type TestPostResponse = ApiResponse<Record<string, unknown> & { id: number }>;

export type ReportListResponse = ApiResponse<ReportListData>;
