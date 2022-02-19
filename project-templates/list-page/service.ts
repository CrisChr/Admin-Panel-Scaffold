import { request, errorHandler } from "@/utils/request";

export const getList = (params) => {
  return request.get('<%= listApi %>', {params, errorHandler});
}