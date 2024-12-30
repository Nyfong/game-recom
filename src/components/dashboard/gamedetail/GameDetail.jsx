// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MdArrowBack } from "react-icons/md";

// const GameDetailPage = ({ params }) => {
//   // Sample game data (in a real app, this would come from a database)
//   const games = [
//     {
//       id: "the-finals",
//       title: "The Finals",
//       image:
//         "https://imageio.forbes.com/specials-images/imageserve/653d1491d815981e910e08d8/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
//       description:
//         "In The Finals, teams of players must compete against each other as they participate in a fictional VR combat game show. The Finals revolves around players competing in the titular fictional VR combat game show.",
//       longDescription:
//         "The Finals is an innovative multiplayer first-person shooter that transforms competitive gaming into a high-stakes virtual game show. Players are thrust into dynamic, destructible arenas where strategy, skill, and spectacle collide. Each match is a thrilling combination of precise shooting mechanics and environmental manipulation.",
//       gameDetails: {
//         genre: "First-Person Shooter",
//         platform: ["PC", "PlayStation", "Xbox"],
//         players: "Multiplayer",
//         releaseDate: "2023",
//         developer: "Embark Studios",
//       },
//       systemRequirements: {
//         minimum: {
//           os: "Windows 10 64-bit",
//           processor: "Intel Core i5",
//           memory: "8 GB RAM",
//           graphics: "NVIDIA GeForce GTX 970",
//         },
//         recommended: {
//           os: "Windows 11 64-bit",
//           processor: "Intel Core i7",
//           memory: "16 GB RAM",
//           graphics: "NVIDIA GeForce RTX 3070",
//         },
//       },
//     },
//     // Add more games here...
//   ];

//   // Find the specific game based on the ID
//   const game = games.find((g) => g.id === params.id);

//   if (!game) {
//     return <div>Game not found</div>;
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-8">
//       <Link
//         href="/dashboard/listgame"
//         className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
//       >
//         <MdArrowBack className="mr-2" /> Back to Game List
//       </Link>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Game Image */}
//         <div>
//           <Image
//             src={game.image}
//             alt={game.title}
//             width={600}
//             height={400}
//             className="rounded-lg shadow-lg object-cover w-full"
//           />
//         </div>

//         {/* Game Details */}
//         <div>
//           <h1 className="text-3xl font-bold text-blue-600 mb-4">
//             {game.title}
//           </h1>
//           <p className="text-gray-700 mb-6">{game.longDescription}</p>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Game Information</h2>
//             <div className="space-y-2">
//               {Object.entries(game.gameDetails).map(([key, value]) => (
//                 <div key={key} className="flex">
//                   <span className="font-medium mr-2 capitalize">{key}:</span>
//                   <span>{Array.isArray(value) ? value.join(", ") : value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//             <h2 className="text-xl font-semibold mb-4">System Requirements</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="font-medium mb-2">Minimum</h3>
//                 {Object.entries(game.systemRequirements.minimum).map(
//                   ([key, value]) => (
//                     <div key={key} className="text-sm">
//                       <span className="font-medium capitalize">{key}:</span>{" "}
//                       {value}
//                     </div>
//                   )
//                 )}
//               </div>
//               <div>
//                 <h3 className="font-medium mb-2">Recommended</h3>
//                 {Object.entries(game.systemRequirements.recommended).map(
//                   ([key, value]) => (
//                     <div key={key} className="text-sm">
//                       <span className="font-medium capitalize">{key}:</span>{" "}
//                       {value}
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex space-x-4">
//             <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
//               Download
//             </button>
//             <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">
//               Play Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameDetailPage;
