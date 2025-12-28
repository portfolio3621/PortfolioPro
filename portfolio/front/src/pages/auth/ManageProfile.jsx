import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";
import {
  Mail,
  Phone,
  MapPin,
  Edit2,
  Moon,
  Sun,
  Download,
  ExternalLink,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Shield,
  Trash2,
  Upload,
  User,
  Lock,
  Link,
  Plus,
  ChevronRight
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import EditPersonalModel from "./model/Edit/EditPersonalModel";
import AvatarUpload from "./model/Avatar";
import ResumeUpload from "./model/Resume";
import ExperienceCard from "./model/Edit/EditExperience";
import EducationCard from "./model/Edit/EditEducation";
import SkillCard from "./model/Edit/EditSkills";
import EditSocialLinksModal from "./model/Edit/EditSocialLinks";
import ExperienceAddCard from "./model/Add/AddExperience";
import EducationAddCard from "./model/Add/AddEducation";
import ChangePassword from "./model/ChangePassword";
import { HiOutlineUser, HiOutlineUserCircle, HiOutlineDocumentText } from "react-icons/hi";
import { TbCertificate } from "react-icons/tb";
import Nav from "../dashboard/Nav.jsx";
import { useUserStore } from "../../stores/userStore.js";
import {
  FiYoutube,
  FiGitlab,
  FiDribbble,
  FiFigma,
  FiSlack,
  FiTwitch,
  FiMessageSquare,
  FiLink,
  FiPlus,
  FiTrash2,
  FiGlobe
} from "react-icons/fi";


export default function ManageProfile() {
  const [cookie, , removeCookie] = useCookies(["userId"]);
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("experience");
  const userId = cookie.userId
  // All modal states
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
  const [isEditSocialModel, setIsEditSocialModel] = useState(false);
  const [changePasswordModel, setChangePasswordModel] = useState(false);
  const [deleteAccountModel, setDeleteAccountModel] = useState(false);

  // Modal handlers
  const EditPersonalModelShow = (val) => setIsEditPersonalModel(val);
  const EditAvatarModelShow = (val) => setIsEditAvatarModel(val);
  const EditResumeModelShow = (val) => setIsEditResumeModel(val);
  const EditExpModelShow = (val) => setIsEditExpModel(val);
  const EditEduModelShow = (val) => setIsEditEduModel(val);
  const EditSkillsModelShow = (val) => setIsEditSkillsModel(val);
  const EditSocialModelShow = (val) => setIsEditSocialModel(val);
  const ChangePasswordModelShow = (val) => setChangePasswordModel(val);
  const DeleteAccountModelShow = (val) => setDeleteAccountModel(val);

  const EditExpModelWithDataAndIndex = (data, index) => {
    setIsEditDataExpModel(data);
    setIsEditIndexExpModel(index);
  };
const { fetchUser:fetchStoreUser} = useUserStore();
  const EditEduModelWithDataAndIndex = (data, index) => {
    setIsEditDataEduModel(data);
    setIsEditIndexEduModel(index);
  };

  const setEmptyFields = () => {
    setIsEditDataExpModel({});
    setIsEditIndexExpModel(null);
    setIsEditDataEduModel({});
    setIsEditIndexEduModel(null);
  };

  const fetchUser = async () => {
    try {
      const res = await Fetch.get(`get-data`);
      if (res.success) {
        setUserData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const Refresh = () => {
    fetchUser();
    fetchStoreUser()
  };

  const deleteExperience = async (index) => {
    try {
      await Fetch.deleteData(`experience/${index}`);
      Refresh();
    } catch (err) {
      console.log("Failed to delete experience:", err);
    }
  };

  const deleteEducation = async (index) => {
    try {
      await Fetch.deleteData(`education/${index}`);
      Refresh();
    } catch (err) {
      console.log("Failed to delete education:", err);
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }



  // Get social media icon
  const getSocialIcon = (platform) => {
    const lower = platform.toLowerCase();
    if (lower.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
    if (lower.includes("github")) return <Github className="w-5 h-5" />;
    if (lower.includes("x") || lower.includes("x")) return <FaXTwitter className="w-5 h-5" />;
    if (lower.includes("instagram")) return <Instagram className="w-5 h-5" />;
    if (lower.includes("facebook")) return <Facebook className="w-5 h-5" />;
    if (lower.includes("youtube")) return <FiYoutube className="w-5 h-5" />;
    if (lower.includes("gitlab")) return <FiGitlab className="w-5 h-5" />;
    if (lower.includes("dribbble")) return <FiDribbble className="w-5 h-5" />;
    if (lower.includes("figma")) return <FiFigma className="w-5 h-5" />;
    if (lower.includes("slack")) return <FiSlack className="w-5 h-5" />;
    if (lower.includes("discord")) return <FaDiscord className="w-5 h-5" />;
    if (lower.includes("twitch")) return <FiTwitch className="w-5 h-5" />;
    if (lower.includes("telegram")) return <FiMessageSquare className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  // Social media colors
  const getSocialColor = (platform) => {
    const lower = platform.toLowerCase();
    if (lower.includes("linkedin")) return "bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20";
    if (lower.includes("github")) return "bg-gray-900/10 text-gray-900 dark:bg-gray-100/10 dark:text-gray-100 border-gray-900/20 dark:border-gray-100/20";
    if (lower.includes("x") || lower.includes("x")) return "bg-[#1DA1F2]/10 text-black border-[#1DA1F2]/20";
    if (lower.includes("instagram")) return "bg-gradient-to-r from-[#E1306C]/10 to-[#F77737]/10 text-[#E1306C] border-[#E1306C]/20";
    if (lower.includes("facebook")) return "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20";
    if (lower.includes("youtube")) return "bg-[#FF0000]/10 text-[#FF0000] border-[#1877F2]/20";
    if (lower.includes("gitlab")) return "bg-[#FC6D26]/10 text-[#FC6D26] border-[#1877F2]/20";
    if (lower.includes("dribbble")) return "text-[#EA4C89] bg-[#EA4C89]/10 border-[#1877F2]/20";
    if (lower.includes("figma")) return "text-[#F24E1E] bg-[#F24E1E]/10 border-[#1877F2]/20";
    if (lower.includes("slack")) return "text-[#4A154B] bg-[#4A154B]/10 border-[#1877F2]/20";
    if (lower.includes("discord")) return "text-[#5865F2] bg-[#5865F2]/10 border-[#1877F2]/20";
    if (lower.includes("twitch")) return "text-[#9146FF] bg-[#9146FF]/10 border-[#1877F2]/20";
    if (lower.includes("telegram")) return "text-[#26A5E4]bg-[#26A5E4]/10 border-[#1877F2]/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  const stats = [
    { label: "Experience", value: userData.experience?.length || 0, icon: Briefcase, color: "blue" },
    { label: "Education", value: userData.education?.length || 0, icon: GraduationCap, color: "purple" },
    { label: "Skills", value: userData.skills?.length || 0, icon: Code, color: "green" },
    { label: "Social Links", value: Object.keys(userData.socialLinks || {}).length, icon: Link, color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="w-full">
          <Nav userData={userData} removeCookie={removeCookie} place="profile"/>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative group mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                  <div className="relative">
                    <img
                      src={userData.avatarUrl || "/user.png"}
                      alt="Profile"
                      className="w-28 h-28 md:w-32 md:h-32 rounded-2xl shadow-2xl ring-4 ring-white dark:ring-gray-800 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => EditAvatarModelShow(true)}
                      className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Name and Title */}
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {userData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full text-sm md:text-base">
                  {userData.about || "No bio added yet"}
                </p>

                {/* Contact Info */}
                <div className="mt-6 w-full space-y-3">
                  {userData.email && (
                    <ContactItem
                      icon={<Mail className="w-4 h-4" />}
                      text={userData.email}
                      color="blue"
                    />
                  )}
                  {userData.phone && (
                    <ContactItem
                      icon={<Phone className="w-4 h-4" />}
                      text={userData.phone}
                      color="green"
                    />
                  )}
                  {userData.address && (
                    <ContactItem
                      icon={<MapPin className="w-4 h-4" />}
                      text={userData.address}
                      color="red"
                    />
                  )}
                </div>

                {/* Social Links */}
                {userData.socialLinks && Object.keys(userData.socialLinks).length > 0 && (
                  <div className="mt-6 w-full">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
                      Connect with me
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(userData.socialLinks).map(([platform, url], index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all duration-300 hover:scale-105 ${getSocialColor(platform)}`}
                        >
                          {getSocialIcon(platform)}
                          <span className="text-xs font-medium capitalize truncate w-full text-center">
                            {platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => EditPersonalModelShow(true)}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 text-sm md:text-base"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => EditSocialModelShow(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    <Link className="w-4 h-4" />
                    Social Links
                  </button>
                  
                  <button
                    onClick={() => EditResumeModelShow(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    <Upload className="w-4 h-4" />
                    Update Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Security & Settings
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => ChangePasswordModelShow(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Lock className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Change Password</p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Update your security settings</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>

                <button
                  onClick={() => DeleteAccountModelShow(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Delete Account</p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Permanently remove your account</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Section Navigation */}
            <div className="flex overflow-x-auto space-x-2 pb-4">
              {["experience", "education", "skills"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                    activeSection === section
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Section title="Work Experience" icon={Briefcase} count={userData.experience?.length}>
                {userData.experience?.map((item, index) => (
                  <Card key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Briefcase className="w-6 h-6 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                              {item.role}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base">
                              {item.company} • {item.period}
                            </p>
                            <ul className="mt-4 space-y-2">
                              {item.description?.map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                            {item.achievements?.length > 0 && (
                              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <p className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2 text-sm md:text-base">
                                  <Award className="w-4 h-4 text-yellow-500" />
                                  Key Achievements
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {item.achievements.map((a, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 text-yellow-700 dark:text-yellow-300 text-xs md:text-sm rounded-full border border-yellow-200 dark:border-yellow-800"
                                    >
                                      {a}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-start">
                        <button
                          onClick={() => {
                            EditExpModelShow(true);
                            EditExpModelWithDataAndIndex(item, index);
                          }}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <MdModeEditOutline className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => deleteExperience(index)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <MdDeleteOutline className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
                <AddButton
                  onClick={() => setIsAddExpModel(true)}
                  label="Add New Experience"
                  icon={<Plus className="w-5 h-5" />}
                  color="blue"
                />
              </Section>
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <Section title="Education" icon={GraduationCap} count={userData.education?.length}>
                {userData.education?.map((edu, index) => (
                  <Card key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="p-3 bg-purple-500/10 rounded-xl">
                            <GraduationCap className="w-6 h-6 text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                              {edu.degree}
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium text-sm md:text-base">
                              {edu.institution} • {edu.year}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-4 mb-3 text-sm md:text-base">
                              📚 Relevant Courses:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses?.map((course, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-700 dark:text-purple-300 text-xs md:text-sm rounded-full border border-purple-200 dark:border-purple-800"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-start">
                        <button
                          onClick={() => {
                            EditEduModelShow(true);
                            EditEduModelWithDataAndIndex(edu, index);
                          }}
                          className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                        >
                          <MdModeEditOutline className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </button>
                        <button
                          onClick={() => deleteEducation(index)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <MdDeleteOutline className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
                <AddButton
                  onClick={() => setIsAddEduModel(true)}
                  label="Add New Education"
                  icon={<Plus className="w-5 h-5" />}
                  color="purple"
                />
              </Section>
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <Section title="Skills & Expertise" icon={Code} count={userData.skills?.length}>
                <Card>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {userData.skills?.map((skill, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-transparent bg-clip-text">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              style={{ width: `${skill.level}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 transition-all duration-1000"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => EditSkillsModelShow(true)}
                      className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm md:text-base">Edit Skills</span>
                    </button>
                  </div>
                </Card>
              </Section>
            )}
          </div>
        </div>
      </div>

      {/* All Modals */}
      <Modal show={isEditPersonalModel} onClose={() => EditPersonalModelShow(false)}>
        <EditPersonalModel
          EditPersonalModelShow={EditPersonalModelShow}
          user={userData}
          refresh={Refresh}
        />
      </Modal>

      <Modal show={isEditAvatarModel} onClose={() => EditAvatarModelShow(false)}>
        <AvatarUpload
          EditAvatarModelShow={EditAvatarModelShow}
          refresh={Refresh}
          oldAvatarUrl={userData.avatarUrl}
        />
      </Modal>

      <Modal show={isEditResumeModel} onClose={() => EditResumeModelShow(false)}>
        <ResumeUpload
          EditResumeModelShow={EditResumeModelShow}
          refresh={Refresh}
          oldResumeUrl={userData.resumeUrl}
        />
      </Modal>

      <Modal show={isEditSocialModel} onClose={() => EditSocialModelShow(false)}>
        <EditSocialLinksModal
          onClose={EditSocialModelShow}
          refresh={Refresh}
          initialSocialLinks={userData.socialLinks || {}}
        />
      </Modal>

      <Modal show={changePasswordModel} onClose={() => ChangePasswordModelShow(false)}>
        <ChangePassword
          ChangePasswordModelShow={ChangePasswordModelShow}
          id={cookie.userId}
        />
      </Modal>

      <Modal show={isEditExpModel} onClose={() => EditExpModelShow(false)}>
        <ExperienceCard
          refresh={Refresh}
          exp={isEditExpDataModel}
          index={isEditExpIndexModel}
          setEmptyFields={setEmptyFields}
          EditExpModelShow={EditExpModelShow}
        />
      </Modal>

      <Modal show={isAddExpModel} onClose={() => setIsAddExpModel(false)}>
        <ExperienceAddCard
          refresh={Refresh}
          ExpModelShow={val => setIsAddExpModel(val)}
        />
      </Modal>

      <Modal show={isEditEduModel} onClose={() => EditEduModelShow(false)}>
        <EducationCard
          refresh={Refresh}
          edu={isEditEduDataModel}
          index={isEditEduIndexModel}
          setEmptyFields={setEmptyFields}
          onClose={(val)=>EditEduModelShow(val)}
        />
      </Modal>

      <Modal show={isAddEduModel} onClose={() => setIsAddEduModel(false)}>
        <EducationAddCard refresh={Refresh} onClose={(val)=>setIsAddEduModel(val)} />
      </Modal>

      <Modal show={isEditSkillsModel} onClose={() => EditSkillsModelShow(false)}>
        <SkillCard
          refresh={Refresh}
          skillsData={userData.skills}
          onClose={EditSkillsModelShow}
        />
      </Modal>
    </div>
  );
}

// Helper Components
function ContactItem({ icon, text, color }) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${colors[color]}`}>
      {icon}
      <span className="text-sm font-medium text-gray-800 dark:text-white truncate">{text}</span>
    </div>
  );
}

function Section({ title, icon: Icon, count, children }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
            {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {count !== undefined && (
          <span className="px-3 py-1 md:px-4 md:py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs md:text-sm font-medium rounded-full">
            {count} items
          </span>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {children}
    </div>
  );
}

function AddButton({ onClick, label, icon, color = "blue" }) {
  const colors = {
    blue: "from-blue-500/10 via-blue-500/5 to-blue-500/10 border-blue-300 hover:border-blue-400 dark:border-blue-700 dark:hover:border-blue-600 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    purple: "from-purple-500/10 via-purple-500/5 to-purple-500/10 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
  };

  return (
    <button
      onClick={onClick}
      className={`group w-full p-5 md:p-6 border-2 border-dashed rounded-2xl bg-gradient-to-r ${colors[color]} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-center gap-3">
        {icon}
        <span className="font-semibold text-sm md:text-base">{label}</span>
      </div>
    </button>
  );
}

function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-800 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}