import { useState } from "react";

export default function useRequestState() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Helpers
  const start = () => {
    setStatus("loading");
    setError(null);
  };

  const succeed = (result) => {
    setStatus("success");
    setData(result || null);
  };

  const fail = (err) => {
    setStatus("error");
    setError(err?.message || "Something went wrong");
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setData(null);
  };

  // Wrapper to handle async calls
  const run = async (promiseFn) => {
    try {
      start();
      const result = await promiseFn();
      succeed(result);
      return result;
    } catch (err) {
      fail(err);
      throw err;
    }
  };

  return {
    status,
    loading: status === "loading",
    success: status === "success",
    error,
    data,

    start,
    succeed,
    fail,
    reset,
    run,
    setData, // in case you want to manually set/update data
  };
}
