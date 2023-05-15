import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    console.log(res.data);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  const onDeleteUser = async (id) => {
    if (window.confirm("Emin misiniz")) {
      const res = await axios.delete(`http://localhost:5000/users/${id}`);
      if (res.status === 200) {
        getUsers();
      }
    }
  };
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>İsim</th>
            <th>E-Mail</th>
            <th>Şehir</th>
            <th>Numara</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.contact}</td>
                <td>
                  <div className="buttons">
                    <Link to={`/view/${user.id}`} className="btn btn-primary">
                    Görüntüle
                    </Link>{" "}
                    <Link to={`/update/${user.id}`} className="btn btn-success">
                      Düzenle
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
