import React, { useState } from 'react';
import { MdOutlineAlternateEmail, MdOutlineMarkEmailRead, MdOutlineCall, MdOutlinePhotoSizeSelectActual, MdOutlineLocationOn } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbUserCheck } from "react-icons/tb";
import { IoMdEye, IoMdEyeOff, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const Profile = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [editProfileForm, setEditProfileForm] = useState(true);
    const [editPasswordForm, setEditPasswordForm] = useState(false);

    const [profileData, setProfileData] = useState({
        userName: "hellooooo",
        name: "Hello World",
        email: "testing@gmail.com",
        phone: "879645",
        photo: "https://i.ibb.co/0wS5HrY/Profile-Picture.png",
        city: "Delhii"
    });

    const [image, setImage] = useState(null);

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const [profileErrors, setProfileErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});

    const validateProfile = () => {
        const errors = {};
        if (!profileData.userName) errors.userName = "Username is required.";
        if (!profileData.name) errors.name = "Name is required.";
        if (!profileData.email) errors.email = "Email is required.";
        if (!profileData.phone) errors.phone = "Phone number is required.";
        if (!profileData.city) errors.city = "City is required.";
        return errors;
    };

    const validatePassword = () => {
        const errors = {};
        if (!passwordData.oldPassword) errors.oldPassword = "Old password is required.";
        if (!passwordData.newPassword) errors.newPassword = "New password is required.";
        return errors;
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const errors = validateProfile();
        setProfileErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(profileData);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const errors = validatePassword();
        setPasswordErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(passwordData);
        }
    };

    const handleProfileChange = (e) => {
        setProfileErrors(prev => ({ ...prev, [e.target.name]: '' }));
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({
                    ...prev,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordErrors(prev => ({ ...prev, [e.target.name]: '' }));
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='w-full flex flex-col items-center font-ubuntu my-5' style={{ minHeight: 'calc(100vh - 70px - 150px)' }}>
            <div className='min-h-[80%] flex flex-col gap-4 w-[90%] sm:w-[80%] items-center justify-center rounded-xl bg-white mx-5 px-5 py-8 shadow-md'>
                <h1 className='text-3xl font-bold'>User Profile</h1>
                <hr className='w-full h-[2px] bg-gray-200' />
                <div className='w-full flex flex-col md:flex-row justify-center items-center'>
                    <div className='w-full flex flex-col justify-center items-center gap-3 px-5 py-3'>
                        <img src={profileData.photo} alt="Profile Picture" className='w-24 h-24 rounded-full' />
                        <p className='text-xl font-bold'>@{profileData.userName}</p>
                        {editProfileForm && !editPasswordForm ?
                            <button onClick={() => { setEditProfileForm(false); setEditPasswordForm(true); }} className='w-full py-2 bg-blue-500 text-white rounded-lg relative flex items-center justify-center gap-5'>Edit Password <IoIosArrowForward size={20} className='absolute right-3' /></button>
                            :
                            <button onClick={() => { setEditProfileForm(true); setEditPasswordForm(false); }} className='w-full py-2 bg-blue-500 text-white rounded-lg relative flex items-center justify-center gap-5'>Edit Profile <IoIosArrowForward size={20} className='absolute right-3' /></button>
                        }
                    </div>
                    <div className='w-full flex flex-col px-5 md:border-l-2 md:border-gray-300 py-2'>
                        {editProfileForm && !editPasswordForm ?
                            <form className='flex flex-col gap-4 w-full' onSubmit={(e) => { handleProfileSubmit(e); }}>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${profileErrors.userName ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <MdOutlineAlternateEmail size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="text"
                                            name="userName"
                                            defaultValue={profileData.userName}
                                            placeholder="UserName*"
                                            onChange={handleProfileChange}
                                            className={`px-3 py-2 border ${profileErrors.userName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                                    </div>
                                    {profileErrors.userName && <p className="text-red-500 text-sm pt-1 px-1">{profileErrors.userName}</p>}
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${profileErrors.name ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <TbUserCheck size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={profileData.name}
                                            placeholder="Name*"
                                            onChange={handleProfileChange}
                                            className={`px-3 py-2 border ${profileErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                                    </div>
                                    {profileErrors.name && <p className="text-red-500 text-sm pt-1 px-1">{profileErrors.name}</p>}
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${profileErrors.email ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <MdOutlineMarkEmailRead size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="text"
                                            name="email"
                                            defaultValue={profileData.email}
                                            placeholder="Email*"
                                            disabled
                                            onChange={handleProfileChange}
                                            className={`px-3 py-2 border ${profileErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider disabled:bg-gray-200`} />
                                    </div>
                                    {profileErrors.email && <p className="text-red-500 text-sm pt-1 px-1">{profileErrors.email}</p>}
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${profileErrors.phone ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <MdOutlineCall size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="text"
                                            name="phone"
                                            defaultValue={profileData.phone}
                                            placeholder="Phone*"
                                            onChange={handleProfileChange}
                                            className={`px-3 py-2 border ${profileErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                                    </div>
                                    {profileErrors.phone && <p className="text-red-500 text-sm pt-1 px-1">{profileErrors.phone}</p>}
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 border-gray-300 border-e-0 rounded-s-md`}>
                                            <MdOutlinePhotoSizeSelectActual size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            placeholder="Image*"
                                            onChange={handleImageChange}
                                            className={`px-3 py-2 border ${profileErrors.image ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${profileErrors.city ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <MdOutlineLocationOn size={20} className='text-gray-700' />
                                        </span>
                                        <input
                                            type="text"
                                            name="city"
                                            defaultValue={profileData.city}
                                            placeholder="City*"
                                            onChange={handleProfileChange}
                                            className={`px-3 py-2 border ${profileErrors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                                    </div>
                                    {profileErrors.city && <p className="text-red-500 text-sm pt-1 px-1">{profileErrors.city}</p>}
                                </div>

                                <button className='py-3 bg-green-400 text-white text-md rounded-md font-bold uppercase tracking-wider hover:bg-green-500 duration-200 shadow-md'>Save Profile</button>
                            </form>
                            :
                            <form className='flex flex-col gap-4 w-full' onSubmit={(e) => handlePasswordSubmit(e)}>
                                <div className='flex flex-col h-full'>
                                    <div className='flex flex-row w-full relative h-full'>

                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${passwordErrors.oldPassword ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <RiLockPasswordLine size={20} className='text-gray-700' />
                                        </span>

                                        <span onClick={togglePasswordVisibility} className="absolute right-3 text-sm text-gray-900 cursor-pointer h-full flex items-center">
                                            {
                                                passwordVisible ? <IoMdEye size={20} className='text-gray-700' /> : <IoMdEyeOff size={20} className='text-gray-700' />
                                            }
                                        </span>

                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="oldPassword"
                                            placeholder="Old Password"
                                            onChange={handlePasswordChange}
                                            className={`px-3 py-2 border ${passwordErrors.oldPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`}
                                        />
                                    </div>
                                    {passwordErrors.oldPassword && <p className="text-red-500 text-sm pt-1 px-1">{passwordErrors.oldPassword}</p>}
                                </div>
                                <div className='flex flex-col h-full'>
                                    <div className='flex flex-row w-full relative h-full'>

                                        <span className={`inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} border-e-0 rounded-s-md`}>
                                            <RiLockPasswordLine size={20} className='text-gray-700' />
                                        </span>

                                        <span onClick={togglePasswordVisibility} className="absolute right-3 text-sm text-gray-900 cursor-pointer h-full flex items-center">
                                            {
                                                passwordVisible ? <IoMdEye size={20} className='text-gray-700' /> : <IoMdEyeOff size={20} className='text-gray-700' />
                                            }
                                        </span>

                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="newPassword"
                                            placeholder="New Password"
                                            onChange={handlePasswordChange}
                                            className={`px-3 py-2 border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`}
                                        />
                                    </div>
                                    {passwordErrors.newPassword && <p className="text-red-500 text-sm pt-1 px-1">{passwordErrors.newPassword}</p>}
                                </div>
                                <button type="submit" className='py-3 bg-green-400 text-white text-md rounded-md font-bold uppercase tracking-wider hover:bg-green-500 duration-200 shadow-md'>Change Password</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;