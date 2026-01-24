// src/services/api.js

const BASE_URL = "http://127.0.0.1:8000/api";

const postRequest = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}/${endpoint}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Backend request failed");
  return res.json();
};

export const predictPmKisan = async (formData) => postRequest("pm-kisan", formData);
export const predictPmay = async (formData) => postRequest("pmay", formData);
export const predictNsp = async (formData) => postRequest("nsp", formData);
export const predictAyushman = async (formData) => postRequest("ayushman", formData);
