"use client";
import HomeSection from "@/components/Home/section/Section";
import CardPayCoffee from "@/components/paycoffeeStuff/Card.pay";
import FElogo from "@/assets/logoITE.png";
import logo from "@/assets/icon/favBlue.png";
import Image from "next/image";
import { detailTeam } from "@/lib/teamData";
import SharingHeartAboutUs from "@/components/button/SharingHeart.aboutus";

let PersonalAboutus = async ({ params }) => {
  const details = detailTeam;
  const { pageid } = await params; // fetching the params using async and await
  const pageIdInt = parseInt(pageid, 10); //convert from string to an integer
  const update = details[pageIdInt - 1];
  const picLogoSkill = update.logo;
  console.log("pictre", picLogoSkill);
  return (
    <>
      <main className="p-5 md:p-3 lg:p-0  gap-5 md:gap-3 max-w-screen-xl min-w-screen-80 mx-auto my-10">
        {/* avatar */}
        <section className="flex flex-col-reverse md:flex-row bg-gray-100 rounded-md gap-10 md:gap-4 p-10">
          {/* one side */}
          <div className=" md:w-2/4	 flex flex-col  items-center justify-center gap-5">
            {/* summary */}
            <div>
              <div className="space-y-4">
                <details
                  className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer  items-center justify-between gap-1.5 w-full">
                    <h2 className="text-lg font-medium text-gray-900">
                      Learning Mindset?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    Learning Mindset: Continuously exploring new tools,
                    technologies, and best practices in software development to
                    stay updated in the rapidly evolving tech industry.
                  </p>
                </details>

                <details className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-medium text-gray-900">
                      Career Goals?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    Career Goals: Aspires to join a dynamic team where they can
                    contribute to meaningful projects while growing as a full
                    stack developer capable of handling end-to-end development
                    processes.!
                  </p>
                </details>
              </div>
            </div>
            {/* cover laater */}
            <div>
              <div className="relative duration-300  hover:-rotate-0 [transform:rotate3d(1_,-1,_1,_60deg)] group border border-sky-900 border-4  overflow-hidden rounded-2xl relative h-52 w-72 bg-sky-800 p-5 flex flex-col items-start gap-4">
                <div className="text-gray-50">
                  <span className="font-bold text-5xl">Jr</span>
                  <p className="text-xs">Frontend Developer</p>
                </div>
                <button className="duration-300 hover:bg-sky-900 border hover:text-gray-50 bg-gray-50 font-semibold text-sky-800 px-3 py-2 flex flex-row items-center gap-3">
                  Dowload CV
                  <svg
                    y="0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    width="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    height="100"
                    className="w-6 h-6 fill-current"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z"
                    ></path>
                  </svg>
                </button>

                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-125 duration-500 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2  fill-gray-50 stroke-sky-900"
                >
                  <path
                    strokeWidth="5"
                    strokeMiterlimit="10"
                    d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
                    data-name="layer1"
                  ></path>
                </svg>

                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-125 duration-200 absolute -bottom-0.5 -right-20 w-48 h-48 z-10 -my-2  fill-gray-50 stroke-sky-700"
                >
                  <path
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
                    data-name="layer1"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {/* another side */}
          <div className=" md:w-2/4	 flex flex-col gap-5 items-center  pt-10">
            <div className="relative mt-1  ">
              <div className="rounded overflow-hidden shadow-md bg-white">
                <div className="absolute -mt-20 w-full flex justify-center">
                  <div className="h-32 w-32">
                    <Image
                      src={update.image || null}
                      alt="profile picture"
                      className="rounded-full object-cover h-full w-full shadow-md"
                    />
                  </div>
                </div>
                <div className="px-6 mt-16">
                  <div className="flex flex-col my-4 md:flex-row gap-4 items-center justify-center">
                    <SharingHeartAboutUs />
                    <p className="font-bold text-3xl text-center mb-1">
                      {update.name}
                    </p>
                    <Image
                      src={FElogo}
                      className="h-6 w-6 object-contain"
                      alt="logoFE"
                    />
                  </div>

                  <p className="text-gray-800 text-sm text-center pb-4">
                    {update.position}
                  </p>
                  <hr />
                  <div className="flex flex-col  sm:flex-row gap items-center justify-evenly p-2 md:p-4">
                    {picLogoSkill.map((el) => (
                      <>
                        <Image
                          key={el.id}
                          src={el}
                          className=" w-6 md:w-8 lg:w-20 h-8  object-contain  "
                          alt="logo"
                        />
                      </>
                    ))}
                  </div>
                  <hr />
                  <p className="text-gray-800 text-sm text-center pt-4">
                    {update.university} | {update.major}
                  </p>

                  <p className="text-gray-800 text-sm pl-4 md:text-center md:pl-0 font-bold mt-5 underline">
                    Short description about me
                  </p>
                  <p className="text-center text-gray-600 text-base pt-3 font-normal">
                    {update.description}
                  </p>

                  <div className="w-full flex justify-center pt-5 pb-5">
                    <a href="#" className="mx-5">
                      <div aria-label="Github">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#718096"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-github"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </div>
                    </a>
                    <a href="#" className="mx-5">
                      <div aria-label="Twitter">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#718096"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-twitter"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </div>
                    </a>
                    <a href="#" className="mx-5">
                      <div aria-label="Instagram">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#718096"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-instagram"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* sayba logo */}
            <div className="flex flex-col justify-center items-center p-4 md:p-2 lg:p-0">
              <Image
                src={logo}
                className="h-full w-full md:h-72 md:object-contain  object-cover"
                alt="logo"
              />
            </div>
          </div>
        </section>
        {/* home section */}
        <HomeSection />
      </main>
    </>
  );
};
export default PersonalAboutus;
