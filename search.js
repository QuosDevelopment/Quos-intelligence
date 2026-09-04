async function searchOpenSerp(query) {
  const response = await fetch(
    `https://api.openserp.dev/v1/search?q=${encodeURIComponent(query)}&engine=google_search&api_key=${process.env.OPENSERP_API_KEY}`
  );

  const data = await response.json();

  return {
    results: data.results || [],
    totalResults: data.total_results || 0
  };
}

module.exports = { searchOpenSerp };