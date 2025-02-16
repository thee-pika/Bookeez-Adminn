"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        router.push('/auth/login');
    };

    return (
        <>
            <div className="navbar w-100% flex h-20 bg-[rgb(9,9,11)] items-center justify-between">

                <div className="flex">
                    <div className="logo">
                        <Image
                            className="ml-8"
                            src={"/assests/logo.png"}
                            width={40}
                            height={40}
                            alt='logo'
                        />
                    </div>
                    <div className="home mt-2">
                        <Link href={"/"} className="text-white ">Bookeez</Link>
                    </div>
                </div>

                <div className="login ml-[35rem]">
                    {!isLoggedIn ? <button className='bg-gray-700 hover:bg-gray-950 rounded-md p-2 w-[7rem]  text-[#F1FBFB] ml-8 mr-8' ><Link href={"/auth/login"}>Login</Link></button> : <button className='bg-gray-900 hover:bg-gray-950 rounded-md p-2 w-[7rem] text-[#F1FBFB] ml-8 mr-10' onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </>
    )
}

export default Navbar