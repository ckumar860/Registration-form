
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCityMapping = {
  India: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai','kolkata','hyderabad','pune'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
};

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCities(countryCityMapping[formData.country] || []);
    if (!cities.includes(formData.city)) {
      setFormData(prevData => ({
        ...prevData,
        city: '',
      }));
    }
  }, [formData.country]);

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    switch (name) {
      case 'firstName':
        return value ? '' : 'First Name is required';
      case 'lastName':
        return value ? '' : 'Last Name is required';
      case 'username':
        return value ? '' : 'Username is required';
      case 'email':
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Email is invalid';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!passwordRegex.test(value)) return 'Password must be at least 8 characters long and include at least one letter, one number, and one special character';
        return '';
      case 'phoneNo':
        return value ? '' : 'Phone Number is required';
      case 'country':
        return value ? '' : 'Country is required';
      case 'city':
        return value ? '' : 'City is required';
      case 'panNo':
        return value ? '' : 'PAN Number is required';
      case 'aadharNo':
        return value ? '' : 'Aadhar Number is required';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    const error = validateField(name, fieldValue);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-md">
      <h1 className="text-2xl text-center font-bold mb-5">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.username && <span className="text-red-600 text-sm">{errors.username}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            type={formData.showPassword ? 'text' : 'password'} 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
          <div className="mt-2">
            <label className="text-sm font-medium mr-2">Show Password</label>
            <input 
              type="checkbox" 
              name="showPassword" 
              checked={formData.showPassword} 
              onChange={handleChange} 
              className="align-middle" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input 
            type="text" 
            name="phoneNo" 
            value={formData.phoneNo} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.phoneNo && <span className="text-red-600 text-sm">{errors.phoneNo}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <select 
            name="country" 
            value={formData.country} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2">
            <option value="">Select Country</option>
            {Object.keys(countryCityMapping).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="text-red-600 text-sm">{errors.country}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <select 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2">
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="text-red-600 text-sm">{errors.city}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">PAN Number</label>
          <input 
            type="text" 
            name="panNo" 
            value={formData.panNo} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.panNo && <span className="text-red-600 text-sm">{errors.panNo}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium">Aadhar Number</label>
          <input 
            type="text" 
            name="aadharNo" 
            value={formData.aadharNo} 
            onChange={handleChange} 
            className="mt-1 block w-full border rounded p-2" 
          />
          {errors.aadharNo && <span className="text-red-600 text-sm">{errors.aadharNo}</span>}
        </div>
        <button 
          type="submit" 
          disabled={Object.keys(errors).some(key => errors[key])} 
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
