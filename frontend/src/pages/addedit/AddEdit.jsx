import { useState, useEffect } from "react";
import "./addedit.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  country: "",
  contact: "",
};

export const AddEdit = () => {
  const [data, setData] = useState(initialState);
  const { name, email, country, contact } = data;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    if (res.status === 200) {
      setData({ ...res.data });
    }
  };

  const createUser = async (data) => {
    const res = await axios.post("http://localhost:5000/users", data);
    if (res.status === 200) {
      toast.success("Yeni Kullanıcı Eklendi",{ position: "top-center" })
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:5000/users/${id}`, data);
    if (res.status === 200) {
      toast.success("Kullanıcı Düzenlendi", { position: "top-center" });

      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !country || !contact) {
      toast.error("Lütfen boş alanları doldurun",{ position: "top-center" });
      return;
    }
    if (!id) {
      createUser(data);
    } else {
      updateUser(data, id);
    }
    navigate(`/`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">İsim</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter a name."
            onChange={handleInputChange}
            value={name}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter an email."
            onChange={handleInputChange}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">Şehir</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter a country."
            onChange={handleInputChange}
            value={country}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="contact">Numara</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter a contact."
            onChange={handleInputChange}
            value={contact}
          />
        </div>
        <input type="submit" className="btn btn-success" value={id ? "Düzenle":"Ekle"} />
      </form>
    </div>
  );
};
