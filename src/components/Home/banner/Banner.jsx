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
            <h1 className="mb-5 text-5xl font-bold">
              {" "}
              🎮 Unlimited Fun, Zero Cost 🎮
            </h1>
            <p className="mb-5">
              All the best free games, so you can play without spending a penny
              Step into a world of endless entertainment with our collection of
              free games! No subscriptions, no hidden charges—just pure gaming
              bliss. Whether you're a casual gamer or a hardcore enthusiast,
              there's something here for everyone.
            </p>
            <button className="btn btn-primary">
              <Link href="/content/game">See the Games</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
