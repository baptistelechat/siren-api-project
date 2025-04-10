const CLIENT_ID = process.env.INSEE_CLIENT_ID!;
const CLIENT_SECRET = process.env.INSEE_CLIENT_SECRET!;

export const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch("https://api.insee.fr/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la récupération du token : ${response.status}`
    );
  }

  const data = await response.json();
  // console.log("Access Token 🔐 :", data.access_token);

  return data.access_token;
}
