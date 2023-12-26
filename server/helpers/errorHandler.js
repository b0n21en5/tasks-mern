export const notFound = (res, message) => {
  return res.status(400).send({ success: false, message: message });
};

export const serverError = (res, error, message) => {
  console.log(error);
  return res.status(500).send({ success: false, message: message });
};
