import { useEffect, useState } from "react";
import { IUsuario } from "../interfaces/IUsuario";
import { appsettings } from "../settings/appsettings";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export function Lista() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const navigate = useNavigate();

  const obtenerUsuario = async () => {
    const response = await fetch(`${appsettings.apiUrl}User/Lista`);
    if (response.ok) {
      const data = await response.json();
      setUsuarios(data);
    } else {
      console.error("Error al obtener los usuarios");
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  // Navegar al componente de cambio de contraseña
  const handleChangePassword = (id: number, currentPassword: string) => {
    navigate(`/change-password`, { state: { userId: id, currentPassword } });
  };
  const handleChangeUsername = (id: number, currentUsername: string) => {
    navigate(`/change-username`, { state: { userId: id, currentUsername } });
  };

  const handleEditName = (id: number, name: string) => {
    const [firstName, lastName] = name.split(" ");
    navigate(`/modificarname/${id}`, { state: { firstName, lastName } });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-blue-50 rounded-lg shadow-md p-4 space-y-4">
      <h1 className="text-center text-xl font-bold mb-4 border-b-2 border-gray-200 py-4 w-full block">
        Profile Setting
      </h1>

      {usuarios.map((item) => (
        <div
          key={item.idUsuario}
          className="border-2 border-blue-200 rounded-lg"
        >
          <div
            className="p-4 flex justify-between items-center border-b-2 border-blue-200 cursor-pointer"
            onClick={() => handleEditName(item.idUsuario, item.name)}
          >
            <div>
              <p className="font-medium">Name</p>
              <p className="text-sm text-gray-500">{item.name}</p>
            </div>
            <button className="text-black">
              <IoIosArrowForward />
            </button>
          </div>

          <div
            className="p-4 flex justify-between items-center border-b-2 border-blue-200 cursor-pointer"
            onClick={() => handleChangeUsername(item.idUsuario, item.username)}
          >
            <div>
              <p className="font-medium">Username</p>
              <p className="text-sm text-gray-500">{item.username}</p>
            </div>
            <button className="text-black">
              <IoIosArrowForward />
            </button>
          </div>
          <div className="p-4 flex justify-between items-center border-b-2 border-blue-200">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-500">{item.email}</p>
            </div>
            <button className="text-black">
              <IoIosArrowForward />
            </button>
          </div>
          <div className="p-4 flex justify-between items-center border-b-2 border-blue-200">
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-sm text-gray-500">{item.phoneNumber}</p>
            </div>
            <button className="text-black">
              <IoIosArrowForward />
            </button>
          </div>
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => handleChangePassword(item.idUsuario, item.password)}
          >
            <p className="font-medium">Change Password</p>
            <button className="text-black">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      ))}
      <div className="border-2 rounded-lg p-4 border-blue-200">
        <div className="flex justify-between items-center">
          <p className="font-medium">Delete my account and data</p>
          <button className="text-black">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="border-2 rounded-lg p-4 border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Notification</p>
            <p className="text-gray-500">On</p>
          </div>
          <button className="text-black">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
