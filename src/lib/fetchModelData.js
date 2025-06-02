/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url The URL to issue the GET request.
 * @returns {Promise<Object>} JSON data from the server.
 */
async function fetchModel(url, headers = {}) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch model failed:", error);
    return null;
  }
}

export default fetchModel;
