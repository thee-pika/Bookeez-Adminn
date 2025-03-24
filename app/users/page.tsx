"use client"

import { useEffect, useState } from "react";
import dotenv from 'dotenv';
import { toast } from "react-toastify";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string
}

const Users = () => {
  dotenv.config();
  const [loading, setloading] = useState(true)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/user`);
   
      if (res.ok) {
        const data = await res.json();
      
        setUsers(data.users)

      }
    } catch (error) {
     toast.error("Error fetching users")
      setloading(false)
    } finally {
      setloading(false)
    }
  }
  
  if (loading) {
    return <div className="h-screen">Loading ....</div>
  }
  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>
        <h1 className="text-white mr-8 bg-gray-700 p-2 rounded-md mb-4 ">Total Users: {users.length}</h1>
      </div>

      {users.length > 0 ? (
        <div className="space-y-4">
          <div
            key={""}
            className="border border-gray-700 rounded-md flex justify-evenly bg-gray-800 p-4 mb-4 shadow-sm"
          >
            <p className="text-lg w-[12vw]">
              <span className="font-semibold">Username</span>
            </p>
            <p className="text-lg  w-[18vw]">
              <span className="font-semibold">Email</span>
            </p>
            <p className="text-lg w-[12vw]">
              <span className="font-semibold ml-4">Role</span>
            </p>
            <p className="text-lg w-[10vw]">
              <span className="font-semibold">Date Joined</span>
            </p>
          </div>
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-700  rounded-md flex justify-evenly bg-gray-800 p-4 shadow-sm"
            >
              <p className="text-lg w-[12vw]">
                <span className="font-semibold ml-4">{user.username}</span>
              </p>
              <p className="text-lg w-[18vw]">
                <span className="font-semibold"> {user.email}</span>
              </p>
              <p className="text-lg w-[12vw]">
                <span className="font-semibold ml-4">  {user.role}</span>
              </p>
              <p className="text-lg w-[10vw]">
                <span className="font-semibold "> {new Date(user.createdAt).toLocaleDateString()}</span>

              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No users found.</p>
      )}
    </div>
  )
}

export default Users