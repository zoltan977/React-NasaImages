const errorResponseHandler = (error) => {
  console.log("errorResponseHandler error: ", error);

  return Promise.reject(error);
};

export default errorResponseHandler;
