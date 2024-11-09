let SearchBar = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2  my-10">
        <div></div>
        {/* <div>
          <label
            classNameName="mx-auto  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            // for="search-bar"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              classNameName="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
            />
            <button classNameName="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
              <div classNameName="relative">
                <div classNameName="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                  <svg
                    classNameName="opacity-0 animate-spin w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      classNameName="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    ></circle>
                    <path
                      classNameName="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>

                <div classNameName="flex items-center transition-all opacity-1 valid:">
                  <span classNameName="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </div>
            </button>
          </label>
        </div> */}

        <div className="flex justify-end">
          <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#4070f4] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
            <div className="flex items-center justify-center fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
              placeholder="search me daddy.."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchBar;
