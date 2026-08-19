const counters = new Map();

function increment(name, value = 1) {
  counters.set(name, (counters.get(name) || 0) + value);
}

function snapshot() {
  return Object.fromEntries(counters.entries());
}

function reset() {
  counters.clear();
}

module.exports = { increment, snapshot, reset };
