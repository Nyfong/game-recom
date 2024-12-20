import fs from "fs";
import path from "path";

// Define the correct path to the data.json file (use the public folder)
const dataFilePath = path.join(
  process.cwd(),
  "public",
  "api",
  "data",
  "data.json"
);

// Handle GET request to fetch and return data
export async function GET() {
  try {
    // Since Vercel cannot directly write to disk in production, ensure data is available
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const games = JSON.parse(fileData);

    return new Response(JSON.stringify(games, null, 2), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to read data" }), {
      status: 500,
    });
  }
}

// Handle POST request to add new data at a specific index based on the ID
export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const games = JSON.parse(fileData);

    // Validate the provided ID
    if (id <= 0 || id > games.length + 1) {
      return new Response(
        JSON.stringify({ error: "Invalid index to insert" }),
        { status: 400 }
      );
    }

    // Insert the new game at the calculated index
    const insertIndex = id - 1;
    games.splice(insertIndex, 0, body);

    // Reassign sequential IDs to all items
    const renumberedGames = games.map((game, index) => ({
      ...game,
      id: index + 1, // IDs start from 1
    }));

    // Save updated data to the public folder
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(renumberedGames, null, 2),
      "utf-8"
    );

    return new Response(
      JSON.stringify({ message: "Game added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add game" }), {
      status: 500,
    });
  }
}

// Handle PUT request to update data
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updatedData } = body;

    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const games = JSON.parse(fileData);

    // Find the game by ID and update it
    const gameIndex = games.findIndex((game) => game.id === id);
    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    games[gameIndex] = { ...games[gameIndex], ...updatedData };

    // Save updated games list to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(games, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "Game updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update game" }), {
      status: 500,
    });
  }
}

// Handle DELETE request to remove data
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const games = JSON.parse(fileData);

    // Filter out the game to delete
    const updatedGames = games.filter((game) => game.id !== id);

    if (updatedGames.length === games.length) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    // Reassign sequential IDs to the remaining items
    const renumberedGames = updatedGames.map((game, index) => ({
      ...game,
      id: index + 1, // IDs start from 1
    }));

    // Write updated list back to the file
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(renumberedGames, null, 2),
      "utf-8"
    );

    return new Response(
      JSON.stringify({ message: "Game deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete game" }), {
      status: 500,
    });
  }
}
