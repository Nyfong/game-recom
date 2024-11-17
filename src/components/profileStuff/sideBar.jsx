import { MdLockPerson } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaCommentsDollar } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
let SideBarProfile = () => {
  return (
    <>
      {/* sticky drawwer */}
      <div className=" hidden md:w-2/6 lg:w-1/6 md:flex p-2 items-center flex-col gap-2 md:sticky md:top-[70px] h-[700px]   		">
        {/* dive container */}
        <div className="w-full flex flex-col rounded-lg items-center h-full bg-blue-700 p-2 gap-4 shadow-md  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]	">
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4  rounded-lg">
            <div className=" flex justify-end">
              <MdLockPerson className="text-white" />
            </div>
            <div>
              <p className="text-white">profile</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <MdOutlineManageHistory className="text-white" />
            </div>
            <div>
              <p className="text-white">history</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <FaCommentsDollar className="text-white" />
            </div>
            <div>
              <p className="text-white">subscription</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <AiFillFire className="text-white" />
            </div>
            <div>
              <p className="text-white">save</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <IoIosInformationCircleOutline className="text-white" />
            </div>
            <div>
              <p className="text-white">policy</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <AiOutlineLogout className="text-white" />
            </div>
            <div>
              <p className="text-white">logout</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4  rounded-lg">
            <div className=" flex justify-end">
              <MdLockPerson className="text-white" />
            </div>
            <div>
              <p className="text-white">profile</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <MdOutlineManageHistory className="text-white" />
            </div>
            <div>
              <p className="text-white">history</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <FaCommentsDollar className="text-white" />
            </div>
            <div>
              <p className="text-white">subscription</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <AiFillFire className="text-white" />
            </div>
            <div>
              <p className="text-white">save</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <IoIosInformationCircleOutline className="text-white" />
            </div>
            <div>
              <p className="text-white">policy</p>
            </div>
          </div>
          {/* profile picture */}
          <div className=" w-full flex gap-2 items-center p-4   rounded-lg">
            <div className="justify-self-end">
              <AiOutlineLogout className="text-white" />
            </div>
            <div>
              <p className="text-white">logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarProfile;
