import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";
import { Mail, Phone, MapPin, Edit2 } from "lucide-react";
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
import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";
export default function ManageProfile() {
  const [cookie] = useCookies(["userId"]);
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
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
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
    <div>
      <div className="p-3">
        <button className="border p-2 rounded-lg hover:bg-gray-400 hover:text-white">
          <Link to="/dashboard">Go to Dashboard</Link>
        </button>
      </div>
      <div className="max-w-6xl  mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="bg-white shadow-md rounded-xl p-6 lg:col-span-1 relative md:sticky top-6 z-30 h-fit">
          <div className="flex flex-col items-center text-center">
            <img
              src={userData.avatarUrl || "/user.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full shadow-md ring-2 ring-gray-200 object-cover"
            />
            <h1 className="text-2xl font-semibold mt-4">{userData.name}</h1>
            <div className="text-gray-500 text-sm mt-1">{userData.about}</div>
            <div className="flex flex-col gap-2 mt-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4" /> {userData.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4" /> {userData.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4" /> {userData.address}
              </div>
              <div className="flex items-center gap-2">
                {userData.gender === "Male" ? (
                  <HiOutlineUserCircle className="w-4" />
                ) : (
                  <HiOutlineUser className="w-4" />
                )}
                {userData.gender}
              </div>
            </div>
          </div>
          <div className="text-2xl flex justify-between">
            <button
              onClick={() => setIsEditPersonalModel(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <MdModeEditOutline />
            </button>
          </div>
          <br />
          <center className="bg-slate-100 rounded-3xl p-2">
            <button
              onClick={() => setIsEditAvatarModel(true)}
              className="border-r pr-2 text-blue-500 hover:text-gray-600 border-slate-300"
            >
              Edit Avatar
            </button>
            <button
              onClick={() => setIsEditResumeModel(true)}
              className="border-l pl-2 text-blue-500 hover:text-gray-600 border-slate-300"
            >
              Edit Resume
            </button>
          </center>
          <br />
          <div>
            <button
              type="button"
              onClick={() => setChangePasswordModel(true)}
              className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 hover:text-gray-600 p-2 text-white rounded-3xl "
            >
              Change Password
            </button>
          </div>
          <br />
          <div>
            <button
              type="button"
              className="w-full bg-gradient-to-r from-pink-700 via-red-600 to-pink-700 hover:text-gray-600 p-2 text-white rounded-3xl "
            >
              Delete Account
            </button>
          </div>
        </aside>

        {changePasswordModel && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="p-6 w-full max-w-xl">
              <ChangePassword
                ChangePasswordModelShow={ChangePasswordModelShow}
                id={cookie.userId}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="lg:col-span-2 flex flex-col gap-6">
          {/* Experience */}
          <Section title="Experience">
            {userData.experience.map((item, index) => (
              <Card key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">
                    {item.role} @ {item.company}
                  </h3>
                  <span className="text-sm text-gray-500">{item.period}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  {item.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                {item.achievements.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-sm text-gray-600">
                      Achievements:
                    </p>
                    <ul className="list-disc list-inside ml-2 text-gray-700">
                      {item.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="text-2xl flex justify-between">
                  <button
                    onClick={() => {
                      setIsEditExpModel(true);
                      EditExpModelWithDataAndIndex(item, index);
                    }}
                  >
                    <MdModeEditOutline className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => deleteExperience(index)}>
                    <MdDeleteOutline className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </Card>
            ))}
            <button
              onClick={() => setIsAddExpModel(true)}
              className="border bg-blue-500 p-2 rounded-full text-slate-100 w-full"
            >
              Add New Experience
            </button>
          </Section>

          {/* Education */}
          <Section title="Education">
            {userData.education.map((edu, index) => (
              <Card key={index}>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-gray-500">
                  {edu.institution} – {edu.year}
                </p>
                <p className="text-sm mt-2 font-medium text-gray-600">
                  Courses:
                </p>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  {edu.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
                <div className="text-2xl flex justify-between">
                  <button
                    onClick={() => {
                      setIsEditEduModel(true);
                      EditEduModelWithDataAndIndex(edu, index);
                    }}
                  >
                    <MdModeEditOutline className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => deleteEducation(index)}>
                    <MdDeleteOutline className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </Card>
            ))}
            <button
              onClick={() => setIsAddEduModel(true)}
              className="border bg-blue-500 p-2 rounded-full text-slate-100 w-full"
            >
              Add New Skills
            </button>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="border p-2 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userData.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <br />
              <div className="text-2xl flex justify-between">
                <button onClick={() => setIsEditSkillsModel(true)}>
                  <MdModeEditOutline className="text-blue-600 hover:text-blue-800" />
                </button>
              </div>
            </div>
          </Section>
        </main>
      </div>
      {isEditPersonalModel && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
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
        <div>
          <div className="fixed inset-0 z-50 bg-slate-900/80 bg-opacity-40 flex items-center justify-center">
            <div className="w-full max-w-xl">
              <AvatarUpload
                EditAvatarModelShow={EditAvatarModelShow}
                refresh={Refresh}
              />
            </div>
          </div>
        </div>
      )}
      {isEditResumeModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-slate-900/80 bg-opacity-40 flex items-center justify-center">
            <div className=" p-6 w-full max-w-xl">
              <ResumeUpload
                EditResumeModelShow={EditResumeModelShow}
                refresh={Refresh}
              />
            </div>
          </div>
        </div>
      )}
      {isEditExpModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
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
        </div>
      )}
      {isAddExpModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="p-6 w-full max-w-xl">
              <ExperienceAddCard
                refresh={Refresh}
                ExpModelShow={ExpModelShow}
              />
            </div>
          </div>
        </div>
      )}
      {isEditEduModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
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
        </div>
      )}
      {isAddEduModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="p-6 w-full max-w-xl">
              <EducationAddCard refresh={Refresh} onClose={EduModelShow} />
            </div>
          </div>
        </div>
      )}
      {isEditSkillsModel && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="p-6 w-full max-w-xl">
              <SkillCard
                refresh={Refresh}
                skillsData={userData.skills}
                onClose={EditSkillsModelShow}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {/* Future: <button className="text-blue-600 hover:underline text-sm flex items-center gap-1"><Edit2 size={14}/> Edit</button> */}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition-all duration-200">
      {children}
    </div>
  );
}
