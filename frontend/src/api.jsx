import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchPrediction = async (city, soilData = null) => {
  try {
    let url = `${BASE_URL}/predict/${city}`;

    if (soilData) {
      const params = new URLSearchParams({
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium,
        ph: soilData.ph,
        soil_type: soilData.soilType,
      });
      url += `?${params.toString()}`;
    }

    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      error:
        error.response?.data?.detail ||
        error.message ||
        "Failed to fetch prediction",
    };
  }
};
