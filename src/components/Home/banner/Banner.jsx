import Link from "next/link";
let Banner = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/033/842/617/non_2x/retro-gaming-digital-art-illustration-generative-ai-photo.jpeg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">
              <Link href="/content/game">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
