import { StatusCodes } from "http-status-codes";

const internalServerError = () => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
    success: false,
  };
};
const badRequest = (message: string) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: message,
    success: false,
  };
};
const successRequest = (data?: any, message?: string) => {
  let obj = {
    statusCode: StatusCodes.OK,
    data: data,
    success: true,
  };
  if (message)
    obj = {
      statusCode: StatusCodes.OK,
      data: { message },
      success: true,
    };
  return obj;
};
export default { internalServerError, badRequest, successRequest };
