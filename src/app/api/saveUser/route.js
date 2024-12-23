import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const user = await req.json(); // Parse the incoming JSON data

    const dataFilePath = path.join(
      process.cwd(),
      "public",
      "api",
      "data",
      "data.json"
    );

    // Read the existing data if the file exists
    let jsonData = [];
    if (fs.existsSync(dataFilePath)) {
      jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    }

    // Ensure the first element in the array exists and has the 'user' property
    if (!jsonData[0].user) {
      jsonData[0].user = [];
    }

    // Add the new user to the user array
    jsonData[0].user.push(user);

    // Write the updated data back to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(JSON.stringify({ error: "Failed to save user" }), {
      status: 500,
    });
  }
}
