import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";
import { Mail, Phone, MapPin, Edit2, Moon, Sun, Download, ExternalLink } from "lucide-react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditPersonalModel from "./model/Edit/EditPersonalModel";
import AvatarUpload from "./model/Avatar";
import ResumeUpload from "./model/Resume";
import ExperienceCard from "./model/Edit/EditExperience";
import EducationCard from "./model/Edit/EditEducation";
import SkillCard from "./model/Edit/EditSkills";
import { Link } from "react-router-dom";
import ExperienceAddCard from "./model/Add/AddExperience";
import EducationAddCard from "./model/Add/AddEducation";
import ChangePassword from "./model/ChangePassword";
import { HiOutlineUser, HiOutlineUserCircle, HiOutlineDocumentText } from "react-icons/hi";
import { TbCertificate } from "react-icons/tb";
import Nav from "../dashboard/Nav.jsx";

export default function ManageProfile() {
  const [cookie,,removeCookie] = useCookies(["userId"]);
  const [userData, setUserData] = useState(null);
  const [isEditPersonalModel, setIsEditPersonalModel] = useState(false);
  const [isEditAvatarModel, setIsEditAvatarModel] = useState(false);
  const [isEditResumeModel, setIsEditResumeModel] = useState(false);
  const [isEditExpModel, setIsEditExpModel] = useState(false);
  const [isAddExpModel, setIsAddExpModel] = useState(false);
  const [isEditExpIndexModel, setIsEditIndexExpModel] = useState(null);
  const [isEditExpDataModel, setIsEditDataExpModel] = useState({});
  const [isEditEduModel, setIsEditEduModel] = useState(false);
  const [isAddEduModel, setIsAddEduModel] = useState(false);
  const [isEditEduIndexModel, setIsEditIndexEduModel] = useState(null);
  const [isEditEduDataModel, setIsEditDataEduModel] = useState({});
  const [isEditSkillsModel, setIsEditSkillsModel] = useState(false);
  const [changePasswordModel, setChangePasswordModel] = useState(false);


  const EditPersonalModelShow = (val) => {
    setIsEditPersonalModel(val);
  };
  const EditAvatarModelShow = (val) => {
    setIsEditAvatarModel(val);
  };
  const EditResumeModelShow = (val) => {
    setIsEditResumeModel(val);
  };
  const EditExpModelShow = (val) => {
    setIsEditExpModel(val);
  };
  const EditEduModelShow = (val) => {
    setIsEditEduModel(val);
  };
  const EditSkillsModelShow = (val) => {
    setIsEditSkillsModel(val);
  };
  const EditExpModelWithDataAndIndex = (data, index) => {
    setIsEditDataExpModel(data);
    setIsEditIndexExpModel(index);
  };
  const EditEduModelWithDataAndIndex = (data, index) => {
    setIsEditDataEduModel(data);
    setIsEditIndexEduModel(index);
  };
  const setEmptyFields = () => {
    setIsEditDataExpModel({});
    setIsEditIndexExpModel(null);
  };
  const fetchUser = async () => {
    try {
      const res = await Fetch.get(`get-data`);
      if (res.success) {
        setUserData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ExpModelShow = (val) => {
    setIsAddExpModel(val);
  };
  const EduModelShow = (val) => {
    setIsAddEduModel(val);
  };
  const ChangePasswordModelShow = (val) => {
    setChangePasswordModel(val);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const Refresh = () => {
    fetchUser();
  };

  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  const deleteExperience = async (index) => {
    try {
      const res = await Fetch.deleteData(
        `experience/${cookie.userId}/${index}`
      );
      console.log(res);
      Refresh();
    } catch (err) {
      console.error(err);
    }
  };
  const deleteEducation = async (index) => {
    try {
      const res = await Fetch.deleteData(`education/${cookie.userId}/${index}`);
      console.log(res);
      Refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="p-3">
        <Nav userData={userData} removeCookie={removeCookie} />
      </div>
      

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 lg:col-span-1 relative md:sticky top-6 z-30 h-fit transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={userData.avatarUrl || "/user.png"}
                alt="Avatar"
                className="w-40 h-40 rounded-full shadow-lg ring-4 ring-blue-500/20 dark:ring-blue-400/20 object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
              {userData.name}
            </h1>
            <div className="text-gray-600 dark:text-gray-300 text-sm mt-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {userData.about}
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Phone className="w-4 h-4 text-green-500 dark:text-green-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MapPin className="w-4 h-4 text-red-500 dark:text-red-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {userData.gender === "Male" ? (
                  <HiOutlineUserCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                ) : (
                  <HiOutlineUser className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">{userData.gender}</span>
              </div>
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditPersonalModel(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white p-3 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>

          {/* Resume Section */}
          {userData.resumeUrl && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-3">
                <HiOutlineDocumentText className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Resume</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Click to view or download</p>
                </div>
                <a
                  href={userData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </a>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setIsEditAvatarModel(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <span className="text-gray-700 dark:text-gray-300">Update Avatar</span>
              <span className="text-blue-500 dark:text-blue-400 text-sm">Change</span>
            </button>
            
            <button
              onClick={() => setIsEditResumeModel(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <span className="text-gray-700 dark:text-gray-300">Update Resume</span>
              <span className="text-blue-500 dark:text-blue-400 text-sm">Upload</span>
            </button>
          </div>

          {/* Security & Danger Zone */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setChangePasswordModel(true)}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              🔐 Change Password
            </button>
            
            <button
              type="button"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              🗑️ Delete Account
            </button>
          </div>
        </aside>

        {/* Modals */}
        {changePasswordModel && (
          <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="p-6 w-full max-w-xl">
              <ChangePassword
                ChangePasswordModelShow={ChangePasswordModelShow}
                id={cookie.userId}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="lg:col-span-2 flex flex-col gap-8">
          {/* Experience Section */}
          <Section title="Experience" count={userData.experience?.length}>
            {userData.experience?.map((item, index) => (
              <Card key={index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {item.role} @ {item.company}
                      </h3>
                    </div>
                    <span className="text-sm text-blue-500 dark:text-blue-400 font-medium mt-1 block">
                      {item.period}
                    </span>
                    <ul className="mt-4 space-y-2">
                      {item.description.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {item.achievements.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-3">
                          🏆 Key Achievements:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.achievements.map((a, i) => (
                            <span key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-sm px-3 py-2 rounded-lg">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setIsEditExpModel(true);
                        EditExpModelWithDataAndIndex(item, index);
                      }}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit Experience"
                    >
                      <MdModeEditOutline className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" />
                    </button>
                    <button
                      onClick={() => deleteExperience(index)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete Experience"
                    >
                      <MdDeleteOutline className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            <button
              onClick={() => setIsAddExpModel(true)}
              className="group flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/20 dark:hover:from-blue-500/30 dark:hover:to-blue-600/30 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-blue-600 dark:text-blue-400 font-medium">+ Add New Experience</span>
            </button>
          </Section>

          {/* Education Section */}
          <Section title="Education" count={userData.education?.length}>
            {userData.education?.map((edu, index) => (
              <Card key={index}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <TbCertificate className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {edu.institution} • {edu.year}
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                      📚 Relevant Courses:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm px-3 py-1 rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setIsEditEduModel(true);
                        EditEduModelWithDataAndIndex(edu, index);
                      }}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit Education"
                    >
                      <MdModeEditOutline className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" />
                    </button>
                    <button
                      onClick={() => deleteEducation(index)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete Education"
                    >
                      <MdDeleteOutline className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            <button
              onClick={() => setIsAddEduModel(true)}
              className="group flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 hover:from-purple-500/20 hover:to-pink-500/20 dark:hover:from-purple-500/30 dark:hover:to-pink-500/30 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-purple-600 dark:text-purple-400 font-medium">+ Add New Education</span>
            </button>
          </Section>

          {/* Skills Section */}
          <Section title="Skills" count={userData.skills?.length}>
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.skills?.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-transparent bg-clip-text">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-1000"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setIsEditSkillsModel(true)}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <MdModeEditOutline />
                  <span>Edit Skills</span>
                </button>
              </div>
            </Card>
          </Section>
        </main>
      </div>

      {/* All Modals */}
      {isEditPersonalModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <EditPersonalModel
              EditPersonalModelShow={EditPersonalModelShow}
              user={userData}
              refresh={Refresh}
            />
          </div>
        </div>
      )}
      {isEditAvatarModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <AvatarUpload
              EditAvatarModelShow={EditAvatarModelShow}
              refresh={Refresh}
              oldAvatarUrl={userData.avatarUrl}
            />
          </div>
        </div>
      )}
      {isEditResumeModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <ResumeUpload
              EditResumeModelShow={EditResumeModelShow}
              refresh={Refresh}
            />
          </div>
        </div>
      )}
      {isEditExpModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <ExperienceCard
              refresh={Refresh}
              exp={isEditExpDataModel}
              index={isEditExpIndexModel}
              setEmptyFields={setEmptyFields}
              EditExpModelShow={EditExpModelShow}
            />
          </div>
        </div>
      )}
      {isAddExpModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <ExperienceAddCard
              refresh={Refresh}
              ExpModelShow={ExpModelShow}
            />
          </div>
        </div>
      )}
      {isEditEduModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <EducationCard
              refresh={Refresh}
              edu={isEditEduDataModel}
              index={isEditEduIndexModel}
              setEmptyFields={setEmptyFields}
              onClose={EditEduModelShow}
            />
          </div>
        </div>
      )}
      {isAddEduModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <EducationAddCard refresh={Refresh} onClose={EduModelShow} />
          </div>
        </div>
      )}
      {isEditSkillsModel && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm">
          <div className="p-6 w-full max-w-xl">
            <SkillCard
              refresh={Refresh}
              skillsData={userData.skills}
              onClose={EditSkillsModelShow}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children, count }) {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
          {count !== undefined && (
            <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-full">
              {count} items
            </span>
          )}
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {children}
    </div>
  );
}