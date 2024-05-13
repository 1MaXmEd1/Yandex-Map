import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../..";
import "./AdminPanel.css";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const { store } = useContext(Context);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await store.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей: ", error);
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
      } catch (error) {
        console.error("Ошибка при загрузке маркеров пользователя: ", error);
      }
    }
  };

  const handleOut = () =>{
    navigate("/");
  }

  return (
    <div>
      <div className="he">
      <h1>Список зарегистрированных пользователей</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <Button fun={handleOut}>Выйти из панели</Button>
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
                  <Button fun={() => handleExpand(user._id)}>
                    {expandedUserId === user._id ? "Свернуть" : "Развернуть"}
                  </Button>
                  {expandedUserId === user._id && (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ID места</th>
                          <th>Название</th>
                          <th>X</th>
                          <th>Y</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.markers?.map((marker, index) => (
                          <tr key={marker._id}>
                            <td>{index + 1}</td>
                            <td>{marker._id}</td>
                            <td>{marker.name}</td>
                            <td>{marker.x}</td>
                            <td>{marker.y}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
