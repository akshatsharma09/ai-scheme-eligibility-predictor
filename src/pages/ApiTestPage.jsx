// src/pages/ApiTestPage.jsx
import { useEffect } from "react";
import {
  predictPmKisan,
  predictPmay,
  predictNsp,
  predictAyushman,
} from "../services/api";

const ApiTestPage = () => {
  useEffect(() => {
    const testBackend = async () => {
      const sampleFormData = {
        age: 30,
        gender: "male",
        state: "Maharashtra",
        occupation: "farmer",
        income: 50000,
      };

      try {
        console.log("Testing PM-KISAN...");
        const pmKisan = await predictPmKisan({
          land_size_acres: 1.5,
          annual_income: sampleFormData.income,
          owns_land: 1,
          is_farmer: 1,
        });
        console.log("PM-KISAN Response:", pmKisan);

        console.log("Testing PMAY...");
        const pmay = await predictPmay({
          age: sampleFormData.age,
          annual_income: sampleFormData.income,
          is_female: 0,
          is_laborer: 0,
        });
        console.log("PMAY Response:", pmay);

        console.log("Testing NSP...");
        const nsp = await predictNsp({
          age: sampleFormData.age,
          annual_income: sampleFormData.income,
          student_class: 12,
        });
        console.log("NSP Response:", nsp);

        console.log("Testing Ayushman Bharat...");
        const ayushman = await predictAyushman({
          age: sampleFormData.age,
          annual_income: sampleFormData.income,
          has_family_id: 1,
        });
        console.log("Ayushman Bharat Response:", ayushman);

        console.log("✅ All endpoints tested successfully!");
      } catch (err) {
        console.error("❌ Error testing backend:", err);
      }
    };

    testBackend();
  }, []);

  return <div className="p-6 text-center">Check the console for backend test results ✅</div>;
};

export default ApiTestPage;
