export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, str, array = false) => {
  if (array) {
    return ["all", ...new Set(data.map((item) => item[str]).flat())];
  }
  return ["all", ...new Set(data.map((item) => item[str]))];
};
