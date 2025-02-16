"use client"

import React, { useEffect, useState } from 'react'
// import { Rating } from 'react-simple-star-rating'
import dotenv from 'dotenv';
import { useRouter } from "next/navigation";
import Image from 'next/image';

dotenv.config();

interface Review {
  comment: string,
  rating: number,
  userId: string,
  username: string,
  date: string
}
const Reviews = () => {

  const router = useRouter();
  // const [rating, setRating] = useState(0);
  const [allReviews, setallReviews] = useState<Review[] | undefined>([])
  const [users, setUsers] = useState<{ [key: string]: string }>({})

  // const handleRating = (rate: number) => {
  //   setRating(rate)
  // }

  // const handleReset = () => {
  //     // Set the initial value
  //     setRating(0)
  // }


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/template/review`);

        if (res.ok) {
          const data = await res.json();
          console.log("all reviews in 11111111111111111111", data.allReviews);
          setallReviews(data.allReviews)
          fetchUsername(data.allReviews)

          router.refresh()

        }
      } catch (error) {
        console.log("eror", error)
      }
    }
    fetchReviews();
  }, [router])


  const fetchUsername = async (allReviews: Review[]) => {
    try {
      const userIds = allReviews.map((review) => review.userId)
      console.log("all reviews", allReviews);
      const uniqueUserIds = [...new Set(userIds)]
      const userPromises = uniqueUserIds.map(async (userId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/user/${userId}`);

        if (res.ok) {
          const data = await res.json()
          console.log("data", data);
          console.log("data.user.username", data.user.username);
          return { userId, username: data.user.username }
        }
        return null;
      })

      const usersData = await Promise.all(userPromises)
      const usersMap: { [key: string]: string } = {}

      usersData.forEach((data) => {
        if (data) {
          usersMap[data.userId] = data.username
        }
      })
      setUsers(usersMap)
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="display-reviews w-full mt-12 space-y-6" key={""}>
      <div className='flex bg-gray-700 justify-center w-[15vw] mx-auto p-4 font-bold text-lg'>
        <h1 className='text-white'>Total Reviews : {allReviews?.length}</h1>
      </div>
      {allReviews && allReviews.length > 0 ? (
        allReviews.map((review) => (
          <div
            key={review.userId}
            className="review-item bg-gray-800 shadow-lg mx-auto mb-4 rounded-lg p-6 w-[40vw] transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            {/* Star Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                <Image
                  src={"/assests/star.svg"}
                  alt={""}
                  width={24}
                  height={24}
                />
                <span className="text-lg mt-2 text-white ml-[2px]">{review.rating ? review.rating : 1} / 5</span>
              </div>
            </div>
            {/* Review Content */}
            <p className="text-white text-lg mb-2 italic">&quot;{review.comment}&quot;</p>
            {/* User Info */}
            <p className="text-white font-semibold text-lg">
              — {users[review.userId] || 'Unknown User'}
            </p>
            {/* Date */}
            <p className="text-gray-400 text-sm mt-2">
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No reviews yet.</p>
      )}
    </div>

  )
}

export default Reviews