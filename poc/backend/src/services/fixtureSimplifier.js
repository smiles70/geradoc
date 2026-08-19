const fixtureSimplifier = {
  async simplify() {
    return {
      simple: 'Your Medicare plan is renewing. You have until October 15 to make changes.',
      standard: 'Your Medicare Advantage plan is renewing for 2026. Review your options by October 15, 2026.',
      detailed: 'Your plan is renewing for 2026. Review the premium, doctors, pharmacy network, and enrollment deadline before deciding whether to keep or change plans.',
    };
  },
};
module.exports = fixtureSimplifier;
