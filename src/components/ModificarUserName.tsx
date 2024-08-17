import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";

export default function ModificarUserName() {
  const location = useLocation();
  const { userId, currentUsername } = location.state || {
    userId: 0,
    currentUsername: "",
  };
  const [newUserName, setNewUserName] = useState(currentUsername);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSave = async () => {
    try {
      await fetch(`${appsettings.apiUrl}User/ChangeUsername`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          NewUsername: newUserName,
        }),
      });

      Swal.fire({
        title: "Success",
        text: "Username modified successfully",
        icon: "success",
      }).then(() => {
        navigate('/');  // Redirige a la página de lista
      });
    } catch (error) {
  
      Swal.fire({
        title: "Error",
        text: "Username modified successfully",
        icon: "success",
      }).then(() => {
        navigate('/');  
      });
    }
  };

  const handleClear = () => {
    setNewUserName('');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-blue-50 rounded-lg shadow-md flex flex-col p-4">
      <div className="p-4 flex items-center text-center text-xl font-bold mb-4 border-b-2 border-gray-200 py-4 w-full">
        <button className="text-black" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
        <h1 className="text-center text-xl font-semibold flex-grow">Edit Username</h1>
      </div>
      <div className="flex-grow space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-500 peer-focus:text-blue-500">
            Username
          </label>
          <input
            type="text"
            className="peer mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          {newUserName && (
            <button
              onClick={handleClear}
              className="absolute top-1/2 right-2 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
            >
              <MdCancel />
            </button>
          )}
        </div>
      </div>
      <button
        onClick={handleSave}
        className="w-full bg-lime-500 text-black font-medium py-2 rounded-lg mt-4 shadow-[0px_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0px_6px_12px_rgba(0,0,0,0.3)] transition-shadow"
      >
        Save
      </button>
    </div>
  );
}
