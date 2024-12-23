import { promises as fs } from "fs";
import path from "path";

// Define the correct path to the data.json file
const dataFilePath = path.join(process.cwd(), "data", "data.json");

async function readData() {
  try {
    const fileData = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error("Failed to read data: " + error.message);
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error("Failed to write data: " + error.message);
  }
}

// Handle GET request to fetch a game by its ID
export async function GET(request) {
  try {
    const { id } = request.params; // Retrieve ID from request params
    const data = await readData();

    // Find the game by the id (it could be at any index, we match by id)
    const game = data.games.find((game) => game.id === parseInt(id));

    if (game) {
      return new Response(JSON.stringify(game, null, 2), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Handle POST request to add a new game
export async function POST(request) {
  try {
    const { id, gameData } = await request.json(); // Read the request body
    if (!id || !gameData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const data = await readData();

    // Check if the game with the given ID already exists (to ensure you don't insert by index)
    const existingGameIndex = data.games.findIndex((game) => game.id === id);

    if (existingGameIndex !== -1) {
      return new Response(
        JSON.stringify({ error: "Game with this ID already exists" }),
        { status: 400 }
      );
    }

    // Insert the new game at the specified position, based on the index you calculate
    const insertIndex = id - 1;
    data.games.splice(insertIndex, 0, gameData); // Insert new game at the correct index

    // Renumber game IDs sequentially starting from 1
    data.games = data.games.map((game, index) => ({ ...game, id: index + 1 }));
    await writeData(data);

    return new Response(
      JSON.stringify({ message: "Game added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Handle PUT request to update a game
export async function PUT(request) {
  try {
    const { id, ...updatedData } = await request.json(); // Read the request body
    if (!id || !updatedData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const data = await readData();

    // Find game by id
    const gameIndex = data.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    // Update the game data
    data.games[gameIndex] = { ...data.games[gameIndex], ...updatedData };
    await writeData(data);

    return new Response(
      JSON.stringify({ message: "Game updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Handle DELETE request to remove a game
export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Read the request body
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing game ID" }), {
        status: 400,
      });
    }

    const data = await readData();

    // Find and remove the game by its id
    const gameIndex = data.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    // Remove the game from the array
    data.games.splice(gameIndex, 1);

    // Renumber the game IDs sequentially starting from 1
    data.games = data.games.map((game, index) => ({ ...game, id: index + 1 }));
    await writeData(data);

    return new Response(
      JSON.stringify({ message: "Game deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
