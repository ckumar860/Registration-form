import React from 'react';
import { useLocation } from 'react-router-dom';

const SubmissionSuccess = () => {
  const location = useLocation();
  const formData = location.state || {};

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-md">
      <h2 className="text-2xl text-center font-bold mb-1">Thank You for Registering</h2>  
      <h1 className="text-2xl text-center font-bold mb-5">Submission Successful</h1>
      <p className="mb-5">Here are your details:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>First Name: {formData.firstName}</li>
        <li>Last Name: {formData.lastName}</li>
        <li>Username: {formData.username}</li>
        <li>Email: {formData.email}</li>
        <li>Phone Number: {formData.phoneNo}</li>
        <li>Country: {formData.country}</li>
        <li>City: {formData.city}</li>
        <li>PAN Number: {formData.panNo}</li>
        <li>Aadhar Number: {formData.aadharNo}</li>
      </ul>
    </div>
  );
};

export default SubmissionSuccess;