import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    // Path to your JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "api",
      "data",
      "data.json"
    );
    const fileContents = await fs.promises.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Ensure the data is an array and contains a 'game' property
    if (Array.isArray(data) && data[0].game) {
      return new Response(JSON.stringify(data[0].game.slice(0, 50)), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({
          error: "'game' is not an array or missing in the data",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error reading data file:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
