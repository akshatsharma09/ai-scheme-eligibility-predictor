# AI Scheme Eligibility & Impact Predictor

> **Empowering citizens to discover government schemes they are eligible for using Explainable AI**

---

## 🧠 Problem Statement

In India, thousands of government welfare schemes exist at both central and state levels. However:

* Citizens struggle to **discover relevant schemes**
* Eligibility rules are **complex and difficult to interpret**
* Applicants often lack clarity about **approval likelihood**, leading to confusion and repeated attempts

As a result, many eligible citizens are unable to access benefits that could significantly improve their quality of life.

---

## 💡 Our Solution

**AI Scheme Eligibility & Impact Predictor** is a web-based, AI-powered system that:

* Identifies **government schemes a citizen is eligible for**
* Predicts the **probability of approval** for each scheme
* Estimates the **expected benefit amount**
* Clearly explains **why each recommendation was made** using Explainable AI

The focus is on **clarity, transparency, and responsible AI**, not black-box predictions.

---

## ⚙️ How It Works (High-Level Flow)

1. **User Input**
   The user enters basic details such as age, gender, state, occupation, and annual income.

2. **Eligibility Analysis**
   The system matches user details against scheme eligibility rules and ML models.

3. **Prediction**
   AI models estimate approval probability and expected benefit amount.

4. **Explainable AI Output**
   The system shows simple, human-readable reasons behind each recommendation.

5. **Results Display**
   Eligible schemes are shown, ranked by approval probability.

---

## 🧪 Example Output

For each eligible scheme, the system displays:

* ✅ Eligibility status
* 📊 Approval probability (percentage + progress bar)
* 💰 Expected benefit amount
* 🧠 Explanation (e.g., income threshold, age group, state eligibility)

This helps users **prioritize applications intelligently**.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Python
* FastAPI

### Machine Learning

* Logistic Regression
* Random Forest

### Explainability

* Rule-based explanations
* SHAP-inspired reasoning (simplified for clarity)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 🎯 Key Highlights

* **Explainable AI First** – users understand *why* a scheme is recommended
* **Probability-Based Insights** – helps users prioritize applications
* **Citizen-Centric Design** – simple, government-portal-style interface
* **Focused MVP** – emphasizes clarity, reliability, and usability
* **AI for Social Good** – addresses real-world public policy challenges

---

## 🚧 Scope & Limitations

* The system currently uses **representative scheme data** for demonstration
* Predictions are **indicative** and do not represent official government decisions
* The platform is designed to **assist discovery and understanding**, not replace official portals

---

## 🔒 Responsible AI & Privacy

* No sensitive personal data is stored
* User inputs are used **only for eligibility calculation**
* No third-party data sharing
* Focus on transparency and trust

---

## 🚀 Future Scope

* Expansion to a larger number of central and state schemes
* Multilingual and voice-based access
* Mobile-first experience for improved accessibility
* Document upload and automated verification
* Enhanced accessibility features

---

## 🏁 Conclusion

**AI Scheme Eligibility & Impact Predictor** demonstrates how artificial intelligence can be applied responsibly to help citizens better understand and access government welfare programs.

By focusing on transparency, explainability, and user-centric design, the system aims to bridge the gap between complex policy frameworks and the people they are meant to serve.

---

> *"No eligible citizen should miss out on government benefits due to lack of awareness or clarity."*
