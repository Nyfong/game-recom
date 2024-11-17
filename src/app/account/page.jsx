import SearchBar from "@/components/common/SearchBar";
import Image from "next/image";
import FElogo from "@/assets/logoITE.png";
import logo from "@/assets/icon/favBlue.png";
import SideBarProfile from "@/components/profileStuff/sideBar";
import Nyfong from "@/assets/fong.png";
let AccountPage = () => {
  const loopDiv = [1, 2, 2, 2];
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 h-full ">
        <SideBarProfile />
        <div className="w-full md:w-4/6 lg:w-5/6 bg-pink-100  h-[4000px]">
          {/*vertical container */}
          <div className=" flex flex-col mt-10 p-4 gap-10">
            <div className=" w-full	 flex flex-col gap-5 items-center  pt-10">
              <div className="relative mt-1 w-full ">
                <div className="rounded  overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <Image
                        src={Nyfong}
                        alt="profile picture"
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="flex flex-col my-4 md:flex-row gap-4 items-center justify-center">
                      <p className="font-bold text-3xl text-center mb-1">
                        Ny Fong
                      </p>
                      <Image
                        src={FElogo}
                        className="h-6 w-6 object-contain"
                        alt="logoFE"
                      />
                    </div>

                    <p className="text-gray-800 text-sm text-center">ITE</p>
                    <hr />
                    <p className="text-gray-800 text-sm text-center">ddd</p>

                    <p className="text-gray-800 text-sm pl-4 md:text-center md:pl-0 font-bold mt-5 underline">
                      Short description about me
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      dddd
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
