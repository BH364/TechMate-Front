import React, { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import imageCompression from "browser-image-compression";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photourl: user.photourl,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills.join(", "),
  });
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
        const compressedFile = await imageCompression(file, options);
        const base64Image = await imageCompression.getDataUrlFromFile(compressedFile);
        setFormData({ ...formData, photourl: base64Image });
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
      const res = await axios.patch(
        BASE_URL + "/profile/profile/edit",
        { ...formData, skills: skillsArray },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-24">
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className={`btn ${!isPreview ? "btn-primary" : "btn-outline"}`}
          onClick={() => setIsPreview(false)}
        >
          Edit Profile
        </button>
        <button
          className={`btn ${isPreview ? "btn-primary" : "btn-outline"}`}
          onClick={() => setIsPreview(true)}
        >
          Preview
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className={`w-full max-w-md ${isPreview ? "hidden" : "block"}`}>
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Edit Profile</h2>
            <div>
              {["firstName", "lastName", "age", "about", "skills"].map((field) => (
                <label key={field} className="block mb-4">
                  <span className="text-blue-400 font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </span>
                  <input
                    type={field === "age" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none"
                    onChange={handleChange}
                  />
                </label>
              ))}
              <label className="block mb-4">
                <span className="text-blue-400 font-medium">Gender:</span>
                <div className="flex space-x-4 mt-2">
                  {["Male", "Female", "Other"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        className="mr-2"
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </label>
              <label className="block mb-4">
                <span className="text-blue-400 font-medium">Photo:</span>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 mt-1 rounded border border-gray-300"
                  onChange={handleFileChange}
                />
              </label>
              {formData.photourl && (
                <div className="mb-4">
                  <img
                    src={formData.photourl}
                    alt="Preview"
                    className="w-20 h-20 rounded-full border-2 border-blue-400"
                  />
                </div>
              )}
            </div>
            <p className="text-red-500">{error}</p>
            <div className="mt-4">
              <button
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>

        <div className={`${isPreview ? "block" : "hidden"} w-full max-w-md`}>
          <UserCard user={formData} />
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Profile updated successfully.
        </div>
      )}
    </div>
  );
};

export default EditProfile;
