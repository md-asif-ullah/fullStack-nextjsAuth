"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        const user = async () => {
            try {
                const res = await axios.get("/api/users/profile");
                setUser(res.data);
            } catch (error: any) {
                console.log(error.message);
            }
        };

        user();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/users/logout");
            console.log(res.data);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="w-full h-screen ">
            {user && (
                <div className="text-center mt-36">
                    <div>
                        <h1>name:{user.user.name}</h1>
                        <p>email :{user.user.email}</p>
                    </div>
                    <button className="mt-20" onClick={handleLogout}>
                        logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
