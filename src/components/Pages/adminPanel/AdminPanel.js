import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../..";
import "./adminPanel.css";
import Button from "../../button/button";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await store.getUsers();
        setUsers(response.data);
      } catch (e) {
        alert("Ошибка при загрузке пользователей: ", e);
      }
    };

    fetchUsers();
  }, []);

  const handleExpand = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
    } else {
      setExpandedUserId(userId);
      try {
        const userMarkers = await store.getMarks(userId);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, markers: userMarkers } : user
          )
        );
      } catch (e) {
        alert("Ошибка при загрузке маркеров пользователя: ", e);
      }
    }
  };
  const handleOut = () => {
    navigate("/");
  };

  return (
    <>
      <div className="head">
        <div>
          <h1>Список зарегистрированных пользователей</h1>
        </div>
        <div className="bBlock">
          <Button onClick={handleOut}>Выйти из панели</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id пользователя</th>
            <th>Email</th>
            <th>Места</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={user._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>
                  <Button onClick={() => handleExpand(user._id)}>
                    {expandedUserId === user._id ? "Свернуть" : "Развернуть"}
                  </Button>
                  {expandedUserId === user._id && (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ID места</th>
                          <th>Название</th>
                          <th>Широта</th>
                          <th>Долгота</th>
                        </tr>
                      </thead>
                      <thead>
                        {user.markers?.map((marker, index) => (
                          <tr key={marker._id}>
                            <td>{index + 1}</td>
                            <td>{marker._id}</td>
                            <td>{marker.name}</td>
                            <td>{marker.x}</td>
                            <td>{marker.y}</td>
                          </tr>
                        ))}
                      </thead>
                    </table>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default AdminPanel;