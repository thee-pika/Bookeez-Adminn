"use client";

import { useEffect, useState } from "react"

interface Payment {
    _id: string;
    paymentId: string;
    userId: string;
    amount: number;
    templateId?: string | null | undefined;
    bookId?: string | null | undefined;
}

const GetPaymeents = () => {
    const [payments, setPayments] = useState<Payment[] | null>();

    useEffect(() => {
        const fetchPayments = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/payment/`);
            if (res.ok) {
                const data = await res.json();
                const { payments } = data;
                console.log("payments", payments);

                setPayments(payments);
            }
        }
        fetchPayments();
    }, []);

    return (
        <>
            
            <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold mb-6 text-center">All Payments</h2>
                    <h1 className="text-white mr-8 bg-gray-700 p-2 rounded-md mb-4 ">Total Payments: {payments ? payments.length : 0}</h1>
                </div>

                {payments && payments.length > 0 ? (
                    <div className="space-y-4">
                        <div
                            key={""}
                            className="border border-gray-700 rounded-md flex justify-evenly bg-gray-800 p-4 mb-4 shadow-sm"
                        >
                            <p className="text-lg w-[13vw]">
                                <span className="font-semibold">UserId</span>
                            </p>
                            <p className="text-lg  w-[13vw]">
                                <span className="font-semibold">PaymentId</span>
                            </p>
                            <p className="text-lg w-[13vw]">
                                <span className="font-semibold ml-4">BookId</span>
                            </p>
                            <p className="text-lg w-[6vw]">
                                <span className="font-semibold"> Amount</span>
                            </p>
                        </div>
                        {payments.map((payment) => (
                            <div
                                key={payment._id}
                                className="border border-gray-700  rounded-md flex justify-evenly bg-gray-800 p-4 shadow-sm"
                            >
                                <p className=" w-[13vw]">
                                    <span className="font-semibold text-sm">{payment.userId}</span>
                                </p>
                                <p className=" w-[13vw]">
                                    <span className="font-semibold text-sm"> {payment.paymentId}</span>
                                </p>
                                <p className=" w-[13vw]">
                                    <span className="font-semibold  text-sm">  {payment.bookId}</span>
                                </p>
                                <p className=" w-[6vw]">
                                    <span className="font-semibold text-sm"> {payment.amount}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No users found.</p>
                )}
            </div>
        </>
    )
}

export default GetPaymeents