import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appsettings } from "../settings/appsettings";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { FaArrowLeft, FaRegEyeSlash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, "secret_key").toString();
};

export function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPassword, userId } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordFieldTouched, setIsPasswordFieldTouched] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const validatePassword = (password: string) => {
    setIsValidLength(password.length >= 8 && password.length <= 16);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  useEffect(() => {
    if (isPasswordFieldTouched) {
      validatePassword(newPassword);
    }
  }, [newPassword, isPasswordFieldTouched]);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    if (!isValidLength || !hasUpperCase || !hasSpecialChar) {
      setPasswordError("Password does not meet the required criteria");
      return;
    }

    const encryptedPassword = encryptPassword(newPassword);

    try {
      await fetch(`${appsettings.apiUrl}User/ChangePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword: encryptedPassword,
        }),
      });

      Swal.fire({
        title: "Success",
        text: "Password changed successfully",
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an issue changing your password",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-blue-50 rounded-lg shadow-md flex flex-col p-4">
      <div className="p-4 flex items-center text-center text-xl font-bold mb-4 border-b-2 border-gray-200 py-4 w-full">
        <button className="text-black" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
        <h1 className="text-center text-xl font-semibold flex-grow">
          Change Password
        </h1>
      </div>
      <div className="flex-grow py-4 space-y-4">
        <div className="relative">
          <label className="text-gray-500">Current Password</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            readOnly
            className="peer mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
          >
            {showCurrentPassword ? <FiEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <div className="relative">
          <label className="text-gray-500">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (!isPasswordFieldTouched) {
                setIsPasswordFieldTouched(true);
              }
            }}
            className="peer mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/3 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <FiEye /> : <FaRegEyeSlash />}
          </button>
          {isPasswordFieldTouched && (
            <ul className="text-sm mt-2">
              <li className={isValidLength ? "text-green-500" : "text-red-500"}>
                Password must be 8 - 16 characters
              </li>
              <li className={hasUpperCase ? "text-green-500" : "text-red-500"}>
                Include at least 1 upper case letter
              </li>
              <li
                className={hasSpecialChar ? "text-green-500" : "text-red-500"}
              >
                Include at least 1 special character
              </li>
            </ul>
          )}
        </div>

        <div className="relative">
          <label className="text-gray-500">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="peer mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/5 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <FiEye /> : <FaRegEyeSlash />}
          </button>
          {newPassword !== confirmPassword && confirmPassword.length > 0 && (
            <p className="text-red-500 text-sm mt-2">Passwords don't match</p>
          )}
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}
        <h1 className="text-blue-500 text-center font-medium cursor-pointer">
          Forgot password?
        </h1>
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
