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
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileData); // Now contains both games and users

    return new Response(JSON.stringify(data, null, 2), { status: 200 });
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
    const { id, gameData } = body; // Assuming 'gameData' contains the new game info

    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileData);

    // Validate the provided ID for games
    if (id <= 0 || id > data.games.length + 1) {
      return new Response(
        JSON.stringify({ error: "Invalid index to insert" }),
        { status: 400 }
      );
    }

    // Insert the new game at the calculated index
    const insertIndex = id - 1;
    data.games.splice(insertIndex, 0, gameData);

    // Reassign sequential IDs to all games
    const renumberedGames = data.games.map((game, index) => ({
      ...game,
      id: index + 1, // IDs start from 1
    }));

    // Save updated data to the public folder
    data.games = renumberedGames; // Update the games array in the data
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");

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
    const data = JSON.parse(fileData);

    // Find the game by ID and update it
    const gameIndex = data.games.findIndex((game) => game.id === id);
    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    data.games[gameIndex] = { ...data.games[gameIndex], ...updatedData };

    // Save updated games list to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");

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
    const data = JSON.parse(fileData);

    // Filter out the game to delete
    const updatedGames = data.games.filter((game) => game.id !== id);

    if (updatedGames.length === data.games.length) {
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
    data.games = renumberedGames; // Update the games array in the data
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");

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
