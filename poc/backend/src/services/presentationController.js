const LEVELS = ['SIMPLE', 'STANDARD', 'DETAILED'];

class PresentationController {
  constructor({ upThreshold = 0.8, downThreshold = 0.55, upCount = 2, downCount = 2 } = {}) {
    this.state = 'SIMPLE';
    this.upThreshold = upThreshold;
    this.downThreshold = downThreshold;
    this.upCount = upCount;
    this.downCount = downCount;
    this.upStreak = 0;
    this.downStreak = 0;
  }

  transition(stability, { hardConstraintsPass = true, epistemicHigh = false, aleatoricHigh = false } = {}) {
    if (!hardConstraintsPass || aleatoricHigh) {
      this.state = 'REVIEW';
      this.upStreak = 0;
      this.downStreak = 0;
      return this.state;
    }
    if (epistemicHigh) {
      this.upStreak = 0;
      return this.state;
    }
    if (this.state === 'REVIEW') this.state = 'SIMPLE';
    if (stability >= this.upThreshold) {
      this.upStreak += 1;
      this.downStreak = 0;
      if (this.upStreak >= this.upCount) {
        const index = Math.min(LEVELS.indexOf(this.state) + 1, LEVELS.length - 1);
        this.state = LEVELS[index];
        this.upStreak = 0;
      }
    } else if (stability < this.downThreshold) {
      this.downStreak += 1;
      this.upStreak = 0;
      if (this.downStreak >= this.downCount) {
        const index = Math.max(LEVELS.indexOf(this.state) - 1, 0);
        this.state = LEVELS[index];
        this.downStreak = 0;
      }
    } else {
      this.upStreak = 0;
      this.downStreak = 0;
    }
    return this.state;
  }
}

module.exports = { LEVELS, PresentationController };
