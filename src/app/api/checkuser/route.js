import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Parse the incoming JSON data

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

    // Find the user in the 'user' array by email and password
    const user = jsonData[0]?.user?.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Check if the user is an admin
      if (user.role === "admin") {
        return new Response(
          JSON.stringify({
            success: true,
            username: user.username, // Include the username in the response
            redirectTo: "/dashboard", // Add redirect path for admin
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: true,
            username: user.username, // Include the username for non-admin user
          }),
          { status: 200 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid credentials. Please try again." }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during user check:", error);
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again.",
      }),
      { status: 500 }
    );
  }
}
