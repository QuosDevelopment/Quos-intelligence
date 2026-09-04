const { searchGoogle, searchOpenSerp } = require('./search');

class Tools {
  async search(query) {
    try {
      // Try OpenSerp first (free)
      const openSerpResults = await searchOpenSerp(query);
      if (openSerpResults.results.length > 0) {
        return openSerpResults.results;
      }
    } catch (error) {
      console.log('OpenSerp failed, trying SerpApi...');
    }

    // Fallback to SerpApi
    try {
      const serpResults = await searchGoogle(query);
      return serpResults.results;
    } catch (error) {
      console.log('SerpApi failed too.');
      return [];
    }
  }

  async createRepo(name, description) {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        private: false,
        auto_init: true
      })
    });
    return await response.json();
  }

  async pushCode(repo, file) {
    const response = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${file.path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: file.message,
          content: Buffer.from(file.content).toString('base64')
        })
      }
    );
    return await response.json();
  }

  async deployToVercel(projectName, repoId) {
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectName,
        gitSource: {
          type: 'github',
          repoId,
          ref: 'main'
        }
      })
    });
    return await response.json();
  }
}

module.exports = Tools;