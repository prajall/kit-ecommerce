export const ApiResponse = (message: String, data: any, status: Number) => {
  return { success: true, message: message, data: data, status: status };
};
export const ApiError = (message: String, status: Number) => {
  return { success: false, message: message, status: status };
};
