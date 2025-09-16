import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:8000/store",
});

// ✅ Fetch all products
export const getProducts = async () => {
  const response = await publicApi.get("/products/");
  return response.data;
};

// ✅ Fetch single product by ID
export const getProduct = async (id) => {
  const response = await publicApi.get(`/products/${id}`);
  return response.data;
};

export default publicApi;
