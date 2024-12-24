import { promises as fs } from "fs";
import path from "path";

// Determine the environment and set the file path
const dataFilePath =
  process.env.NODE_ENV === "production"
    ? path.join("/tmp", "data.json") // Use writable temp directory for production
    : path.join(process.cwd(), "data", "data.json");

// Helper function to initialize the data file in production if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch {
    const initialData = { games: [] }; // Define the structure of your initial data
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(initialData, null, 2),
      "utf-8"
    );
  }
}

async function readData() {
  try {
    await initializeDataFile(); // Ensure file exists in production
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

export async function GET(request) {
  try {
    const { id } = request.params;
    const data = await readData();

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

export async function POST(request) {
  try {
    const { id, gameData } = await request.json();
    if (!id || !gameData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const data = await readData();

    const existingGameIndex = data.games.findIndex((game) => game.id === id);

    if (existingGameIndex !== -1) {
      return new Response(
        JSON.stringify({ error: "Game with this ID already exists" }),
        { status: 400 }
      );
    }

    const insertIndex = id - 1;
    data.games.splice(insertIndex, 0, gameData);

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

export async function PUT(request) {
  try {
    const { id, ...updatedData } = await request.json();
    if (!id || !updatedData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const data = await readData();

    const gameIndex = data.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

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

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing game ID" }), {
        status: 400,
      });
    }

    const data = await readData();

    const gameIndex = data.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    data.games.splice(gameIndex, 1);

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
