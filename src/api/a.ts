import request from "@/utils/request";

export const queryOfTempMaterialList = (
  data?: tempMaterialAPI.QuerylistParams,
  options?: { [key: string]: any }
) => {
  return request<API.Result<API.ListResult<tempMaterialAPI.tempMaterialLtem>>>(
    "/material_center/manage/temp_material_bill/page",
    {
      method: "POST",
      data,
      ...(options || {}),
    }
  );
};
export const queryOfTempMaterialList = (
  data?: tempMaterialAPI.QuerylistParams,
  options?: { [key: string]: any }
) => {
  return request<API.Result<tempMaterialAPI.tempMaterialLtem>>(
    "/material_center/manage/temp_material_bill/page",
    {
      method: "POST",
      data,
      ...(options || {}),
    }
  );
};
