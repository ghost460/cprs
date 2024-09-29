import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample disease categories and subcategories (this can be fetched from an API)
const diseaseData = {
  "Infectious Diseases": [
    "Bacterial Infections",
    "Viral Infections",
    "Fungal Infections",
    "Parasitic Infections",
    "Sexually Transmitted Infections",
    "Zoonotic Diseases",
  ],
  "Cardiovascular Diseases": [
    "Coronary Artery Disease",
    "Heart Failure",
    "Hypertension",
    "Arrhythmias",
    "Congenital Heart Disease",
    "Peripheral Artery Disease",
  ],
  "Respiratory Diseases": [
    "Asthma",
    "COPD",
    "Pneumonia",
    "Bronchitis",
    "Tuberculosis",
    "Lung Cancer",
  ],
  "Neurological Disorders": [
    "Alzheimer's Disease",
    "Parkinson's Disease",
    "Multiple Sclerosis",
    "Epilepsy",
    "Stroke",
    "Migraine",
  ],
  "Gastrointestinal Diseases": [
    "Irritable Bowel Syndrome",
    "Gastritis",
    "Crohn's Disease",
    "Ulcerative Colitis",
    "Liver Cirrhosis",
    "Hepatitis",
  ],
  "Endocrine Disorders": [
    "Diabetes Mellitus",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Cushing's Syndrome",
    "Addison's Disease",
    "Polycystic Ovary Syndrome (PCOS)",
  ],
  "Musculoskeletal Diseases": [
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Osteoporosis",
    "Gout",
    "Fibromyalgia",
    "Tendinitis",
  ],
  Cancers: [
    "Breast Cancer",
    "Prostate Cancer",
    "Lung Cancer",
    "Colorectal Cancer",
    "Leukemia",
    "Melanoma",
  ],
  "Skin Disorders": [
    "Psoriasis",
    "Eczema",
    "Acne",
    "Rosacea",
    "Vitiligo",
    "Skin Cancer",
  ],
  "Psychiatric Disorders": [
    "Depression",
    "Anxiety Disorders",
    "Bipolar Disorder",
    "Schizophrenia",
    "Obsessive-Compulsive Disorder",
    "Post-Traumatic Stress Disorder (PTSD)",
  ],
  "Genetic Disorders": [
    "Down Syndrome",
    "Cystic Fibrosis",
    "Sickle Cell Anemia",
    "Hemophilia",
    "Huntington's Disease",
    "Duchenne Muscular Dystrophy",
  ],
  "Autoimmune Diseases": [
    "Systemic Lupus Erythematosus",
    "Rheumatoid Arthritis",
    "Celiac Disease",
    "Graves' Disease",
    "Hashimoto's Thyroiditis",
    "Type 1 Diabetes",
  ],
  "Nutritional and Metabolic Disorders": [
    "Obesity",
    "Malnutrition",
    "Hyperlipidemia",
    "Phenylketonuria (PKU)",
    "Metabolic Syndrome",
    "Anemia",
  ],
  "Hematologic Disorders": [
    "Anemia",
    "Thalassemia",
    "Hemophilia",
    "Leukopenia",
    "Thrombocytopenia",
    "Sickle Cell Disease",
  ],
  "Renal Diseases": [
    "Chronic Kidney Disease",
    "Acute Kidney Injury",
    "Kidney Stones",
    "Nephrotic Syndrome",
    "Polycystic Kidney Disease",
    "Glomerulonephritis",
  ],
  "Reproductive System Disorders": [
    "Endometriosis",
    "Prostatitis",
    "Erectile Dysfunction",
    "Pelvic Inflammatory Disease",
    "Uterine Fibroids",
    "Ovarian Cysts",
  ],
  "Eye Disorders": [
    "Cataracts",
    "Glaucoma",
    "Macular Degeneration",
    "Diabetic Retinopathy",
    "Retinal Detachment",
    "Conjunctivitis",
  ],
};

const UpdateMedicalHistory = ({ medicalHistoryId, onClose }) => {
  const [formData, setFormData] = useState({
    id: medicalHistoryId,
    bloodPressure: "",
    weight: "",
    currentProblem: "",
    refersToTest: false,
    labtesttype: "",
    LabtestItems: "",
    doctorPrescription: "",
    diseasecatagory: "",
    diseasesubcatagory: "",
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch existing medical history data if updating
    const fetchMedicalHistory = async () => {
      if (medicalHistoryId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/getMedicalHistory?id=${medicalHistoryId}`
          );
          const {
            id,
            bloodPressure,
            weight,
            currentProblem,
            refersToTest,
            labtesttype,
            LabtestItems,
            doctorPrescription,
            diseasecatagory,
            diseasesubcatagory,
          } = response.data.data?.[0] || {};

          setFormData({
            id,
            bloodPressure,
            weight,
            currentProblem,
            refersToTest,
            labtesttype,
            LabtestItems,
            doctorPrescription,
            diseasecatagory,
            diseasesubcatagory,
          });

          // Set filtered subcategories based on the fetched disease category
          if (diseasecatagory) {
            setFilteredSubcategories(diseaseData[diseasecatagory] || []);
          }
        } catch (err) {
          console.error("Error fetching medical history:", err);
          setError("Failed to fetch medical history.");
        }
      }
    };

    fetchMedicalHistory();
  }, [medicalHistoryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle form field changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Update subcategories and reset subcategory if diseaseCategory changes
    if (name === "diseasecatagory") {
      const selectedCategory = diseaseData[value] || [];
      setFilteredSubcategories(selectedCategory);

      // Reset diseaseSubcategory after updating subcategories
      setFormData((prevData) => ({
        ...prevData,
        diseasesubcatagory: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/updateMedicalHistory/${medicalHistoryId}`,
        formData
      );
      setSuccess("Medical history updated successfully.");
      if (onClose) onClose(); // Close the form or redirect
    } catch (err) {
      console.error("Error updating medical history:", err);
      setError("Failed to update medical history.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Update Medical History</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBloodPressure">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="Enter blood pressure"
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
              />
            </Form.Group>

            <Form.Group controlId="formCurrentProblem">
              <Form.Label>Current Problem</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="currentProblem"
                value={formData.currentProblem}
                onChange={handleChange}
                placeholder="Describe the current problem"
              />
            </Form.Group>

            <Form.Group controlId="formRefersToTest">
              <Form.Check
                type="checkbox"
                label="Refers to Test"
                name="refersToTest"
                checked={formData.refersToTest}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLabtesttype">
              <Form.Label>Lab Test Type</Form.Label>
              <Form.Control
                type="text"
                name="labtesttype"
                value={formData.labtesttype}
                onChange={handleChange}
                placeholder="Enter lab test type"
              />
            </Form.Group>

            <Form.Group controlId="formLabtestItems">
              <Form.Label>Lab Test Items</Form.Label>
              <Form.Control
                type="text"
                name="LabtestItems"
                value={formData.LabtestItems}
                onChange={handleChange}
                placeholder="Enter lab test items"
              />
            </Form.Group>

            {/* Disease Category Dropdown */}
            <Form.Group controlId="formDiseaseCategory">
              <Form.Label>Disease Category</Form.Label>
              <Form.Control
                as="select"
                name="diseasecatagory"
                value={formData.diseasecatagory}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {Object.keys(diseaseData).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Disease Subcategory Dropdown */}
            <Form.Group controlId="formDiseaseSubcategory">
              <Form.Label>Disease Subcategory</Form.Label>
              <Form.Control
                as="select"
                name="diseasesubcatagory"
                value={formData.diseasesubcatagory}
                onChange={handleChange}
                disabled={!formData.diseasecatagory}
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDoctorPrescription">
              <Form.Label>Doctor's Prescription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="doctorPrescription"
                value={formData.doctorPrescription}
                onChange={handleChange}
                placeholder="Enter doctor's prescription"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="secondary" onClick={onClose} className="ml-2">
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateMedicalHistory;
