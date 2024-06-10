import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGOUT } from "../redux/actions";

const UserDropdown = () => {
  const user = useSelector(state => {
    return state.user.user;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/login"));
  };
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom-1" data-toggle="dropdown">
        {user.profile_img && (
          <img src={`/storage/${user.profile_img}`} alt="" width={"50px"} className="rounded-circle" />
        )}
        {!user.profile_img && (
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsaRe2zqH_BBicvUorUseeTaE4kxPL2FmOQ&s`}
            alt=""
            width={"50px"}
            className="rounded-circle"
          />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-end ">
        <Dropdown.Item href="#/action-1">Dati personali</Dropdown.Item>
        <Dropdown.Item href="#/action-1">I miei ordini</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Preferiti</Dropdown.Item>
        <div className="dropdown-divider"></div>

        <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          <LuLogOut className="me-2 " />
          Esci
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
