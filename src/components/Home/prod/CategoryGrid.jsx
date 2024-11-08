let CategoryGrid = () => {
  return (
    <>
      {/* category grid */}
      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2">
          <div className=" row-span-2	">
            <img
              src="https://cdn.europosters.eu/image/350/posters/the-legend-of-zelda-breath-of-the-wild-sunset-i40519.jpg"
              className="w-full h-full object-cover rounded-xl  opacity-70 duration-100	 hover:opacity-100"
              alt=""
            />
          </div>
          <div className="col-span-2	">
            <img
              src="https://m.media-amazon.com/images/I/61LJWSvJGEL._AC_SL1050_.jpg"
              className="w-full h-64 object-cover rounded-xl opacity-70 duration-100	 hover:opacity-100"
              alt=""
            />
          </div>

          <div className="row-span-2">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/d2ea2f108245597.5fb969bc9f890.png"
              className="w-full h-full object-cover rounded-xl   opacity-70 duration-100	 hover:opacity-100"
              alt=""
            />
          </div>
          <div className=" col-span-2	">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ebe0c8e2-0d97-4ac9-95da-ce8dce474095/d8oxf5g-af921337-1fe6-4aea-9301-a3e60f39e013.jpg/v1/fill/w_1024,h_576,q_75,strp/super_smash_bros_4__wii_u_3ds__poster_by_mariomegadraw_d8oxf5g-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvZWJlMGM4ZTItMGQ5Ny00YWM5LTk1ZGEtY2U4ZGNlNDc0MDk1XC9kOG94ZjVnLWFmOTIxMzM3LTFmZTYtNGFlYS05MzAxLWEzZTYwZjM5ZTAxMy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.DgH-bC2joqo5guYF2zccjn4eO8BWqRWZOv303l7U6No"
              className="w-full h-64 object-cover rounded-xl  opacity-70 duration-100	 hover:opacity-100"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default CategoryGrid;
