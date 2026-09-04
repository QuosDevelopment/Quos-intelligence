class QuantumQ {
  constructor() {
    this.model = new Gemini();
    this.memory = new Memory();
    this.tools = new Tools();
  }

  async process(userInput) {
    // Step 1: Think
    const thought = await this.model.think(userInput);

    // Step 2: Search (if needed)
    if (thought.needsSearch) {
      thought.context = await this.tools.search(thought.query);
    }

    // Step 3: Build (if needed)
    if (thought.needsBuild) {
      const repo = await this.tools.createRepo(thought.projectName);
      await this.tools.pushCode(repo, thought.code);
      const liveUrl = await this.tools.deploy(repo);
      thought.liveUrl = liveUrl;
    }

    // Step 4: Return response
    return thought.response;
  }
}

module.exports = QuantumQ;