"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { PiCoffeeBold } from "react-icons/pi";
import Link from "next/link";
import { get } from "@/lib/gameData";
import logo from "@/assets/icon/fav.png";
import RatingSection from "../rating/RatingSection";
import CommentSection from "../rating/CommentSection";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

let MainProdDetail = ({ detialsPropId }) => {
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get();
        const product = data.find((product) => product._id === detialsPropId);
        setDetailData(product);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [detialsPropId]);

  // If the product is not found, show an error message
  if (!isLoading && !detailData) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
          {/* Main product image */}
          <div>
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[450px] rounded-lg overflow-hidden">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <>
                    <img
                      src={
                        detailData.thumbnail ||
                        "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Update-Aquatic_1280x768.jpg"
                      }
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={
                        detailData.thumbnail ||
                        "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Update-Aquatic_1280x768.jpg"
                      }
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                    />
                  </>
                )}
              </div>

              <div className="absolute bottom-0 flex flex-col md:flex-row gap-2 items-start justify-end p-6">
                {isLoading ? (
                  <>
                    <Skeleton className="w-32 h-10 rounded-lg" />
                    <Skeleton className="w-32 h-10 rounded-lg" />
                  </>
                ) : (
                  <>
                    <Link href={detailData.game_url} target="_blank">
                      <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                        <p>Download Now</p>
                        <FaDownload />
                      </div>
                    </Link>
                    <Link href="/content/paycoffee">
                      <div className="mt-3 inline-block bg-blue-800 rounded-lg px-5 py-3 text-xs font-medium uppercase tracking-wide text-white flex gap-2 hover:bg-blue-400">
                        <p>support us now</p>
                        <PiCoffeeBold />
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main product description */}
          <div className="grid grid-cols-1">
            <div>
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  {isLoading ? (
                    Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                      >
                        <dt className="font-medium text-gray-900">
                          <Skeleton className="h-4 w-20" />
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          <Skeleton className="h-4 w-full" />
                        </dd>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Category</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.genre}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.title}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Developer</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.developer}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Platform</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.platform}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="text-gray-700 sm:col-span-2">$0</dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          Description
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.short_description ||
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          Release date
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {detailData.release_date}
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating and Comment Sections */}
      {!isLoading && (
        <>
          {/* <RatingSection gameId={detailData._id} /> */}
          <CommentSection
            gameId={detailData._id}
            existingReviews={detailData.reviews}
          />
        </>
      )}
    </>
  );
};

export default MainProdDetail;
