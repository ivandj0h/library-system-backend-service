const encodedToken = "bXktc3RhdGljLXRva2VuLTEyMw==";

export const getDecodedToken = (): string => {
  return Buffer.from(encodedToken, "base64").toString("utf-8");
};
