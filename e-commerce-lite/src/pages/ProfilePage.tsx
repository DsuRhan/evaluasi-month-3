import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/sharedTheme";

interface ProfileData {
name: string;
email: string;
phone: string;
address: string;
address_detail?: string;
photo?: string;
}

const STORAGE_KEY = "user_profile_data";

export const ProfilePage: React.FC = () => {
const { theme } = useTheme();
const [profile, setProfile] = useState<ProfileData>(() => {
const saved = localStorage.getItem(STORAGE_KEY);
return saved ? JSON.parse(saved) : { name: "", email: "", phone: "", address: "" };
});

const fileRef = useRef<HTMLInputElement | null>(null);
const [saving, setSaving] = useState(false);

const handleChange = (key: keyof ProfileData, value: string) => {
setProfile((prev) => ({ ...prev, [key]: value }));
};

const handleSave = () => {
setSaving(true);
localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
setTimeout(() => setSaving(false), 600);
};

const handleUpload = (file?: File) => {
if (!file) return;
const reader = new FileReader();
reader.onload = () => {
const result = reader.result as string;
const newProfile = { ...profile, photo: result };
setProfile(newProfile);
localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
};
reader.readAsDataURL(file);
};

const containerBg =
theme === "dark"
? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100"
: "bg-gradient-to-b from-orange-50 to-yellow-100 text-gray-800";

const cardBg =
theme === "dark"
? "bg-gray-800/70 backdrop-blur border border-gray-700 shadow-lg"
: "bg-white/80 border border-gray-200 shadow-md";

const inputStyle =
theme === "dark"
? "bg-gray-900/40 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
: "bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-orange-400 focus:border-orange-400";

return (
<div className={`min-h-screen p-8 transition-colors duration-300 ${containerBg}`}>
<div className={`max-w-xl mx-auto rounded-2xl p-6 ${cardBg}`}>
<h2 className="text-3xl font-bold mb-6 text-center">
Profil Pengguna
</h2>

    <div className="flex items-center gap-4 mb-6 justify-center">
      <div className="relative">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500 shadow-inner">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No Photo
            </div>
          )}
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-orange-400 hover:bg-orange-500 text-white"
          }`}
        >
          Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files?.[0])}
        />
      </div>
    </div>

    <div className="space-y-4">
      {[
        { key: "name", placeholder: "Name" },
        { key: "email", placeholder: "Email" },
        { key: "phone", placeholder: "Phone" },
        { key: "address", placeholder: "Address" },
      ].map(({ key, placeholder }) => (
        <input
          key={key}
          value={profile[key as keyof ProfileData]}
          onChange={(e) => handleChange(key as keyof ProfileData, e.target.value)}
          placeholder={placeholder}
          className={`w-full p-3 rounded-lg ${inputStyle} transition-all duration-200`}
        />
      ))}
      <textarea
        value={profile.address_detail || ""}
        onChange={(e) => handleChange("address_detail", e.target.value)}
        placeholder="Detail alamat (opsional)"
        className={`w-full p-3 rounded-lg resize-none ${inputStyle}`}
        rows={3}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all ${
            saving
              ? "opacity-60 cursor-not-allowed"
              : theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
</div>


);
};