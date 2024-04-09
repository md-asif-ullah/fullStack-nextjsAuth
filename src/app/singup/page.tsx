"use client";

import axios from "axios";
import { useState } from "react";

function SingupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handlesignup = async (e: any) => {
        e.preventDefault();
        try {
            // const response = await axios.post("/api/users/signup", formData);
            // console.log(response);

            axios
                .post("/api/users/singup", formData)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className="mt-20">
            <form className="max-w-sm mx-auto" onSubmit={handlesignup}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your name
                    </label>
                    <input
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            });
                        }}
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="enter your name"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Your email
                    </label>
                    <input
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                        }}
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="enter your email"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                    </label>
                    <input
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            });
                        }}
                        type="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SingupPage;
