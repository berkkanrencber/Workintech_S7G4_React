import { useState, useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", terms: false });
  const [errors, setErrors] = useState({});
  const isFormValid = formData.email && formData.password && formData.terms && Object.keys(errors).length === 0;

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir email giriniz.";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Şifre en az 8 karakter, bir büyük harf ve bir sayı içermelidir.";
    }
    if (!formData.terms) {
      newErrors.terms = "Şartları kabul etmelisiniz.";
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (isFormValid) {
      window.location.href = "/success";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Şifre:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
          Şartları kabul ediyorum
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>
      <button type="submit" disabled={!isFormValid}>
        Giriş Yap
      </button>
    </form>
  );
};

export default Login;
