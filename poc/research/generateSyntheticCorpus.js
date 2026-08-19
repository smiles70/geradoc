const fs = require('fs');
const path = require('path');

const variants = [
  ['January', '15', '2027', '$12'],
  ['March', '31', '2027', '$18'],
  ['June', '30', '2027', '$24'],
  ['October', '15', '2027', '$30'],
  ['December', '31', '2027', '$42'],
];

function buildCase(index, type, variant) {
  const [month, day, year, amount] = variant;
  const date = `${month} ${day}, ${year}`;
  const base = {
    id: `${type.toLowerCase()}-${String(index).padStart(3, '0')}`,
    documentType: type,
    sourceReferences: [{ page: (index % 3) + 1, label: 'synthetic source span' }],
  };

  if (type === 'Insurance') {
    return { ...base,
      sourceText: `Your Medicare Advantage plan renews on ${date}. The monthly premium will increase to ${amount}. If you do not choose a new plan, your current plan will continue. Contact Member Services if you need help.`,
      protectedAnchors: [{ type: 'date', value: date }, { type: 'amount', value: amount }, { type: 'negation', value: 'do not' }, { type: 'entity', value: 'Member Services' }],
      requiredActions: ['choose a new plan', 'contact Member Services'], 
    };
  }
  if (type === 'Financial') {
    return { ...base,
      sourceText: `A ${amount} charge from WRS Supply posted on ${date}. Contact your bank within 60 days if you do not recognize this charge. You must keep the dispute reference number.`,
      protectedAnchors: [{ type: 'amount', value: amount }, { type: 'date', value: date }, { type: 'condition', value: 'if you do not recognize' }, { type: 'obligation', value: 'must keep' }],
      requiredActions: ['contact your bank within 60 days', 'keep the dispute reference number'],
    };
  }
  if (type === 'Government') {
    return { ...base,
      sourceText: `The first property tax installment of ${amount} is due ${date}. A senior exemption may be available if you meet the county requirements. Do not send cash by mail.`,
      protectedAnchors: [{ type: 'amount', value: amount }, { type: 'date', value: date }, { type: 'condition', value: 'if you meet' }, { type: 'negation', value: 'Do not' }],
      requiredActions: ['property tax installment', 'meet the county requirements', 'send cash by mail'],
    };
  }
  return { ...base,
    sourceText: `This healthcare directive becomes effective on ${date}. Jordan Lee may make healthcare decisions only when you cannot make them yourself. You may revoke this directive at any time.`,
    protectedAnchors: [{ type: 'date', value: date }, { type: 'entity', value: 'Jordan Lee' }, { type: 'condition', value: 'only when you cannot' }, { type: 'revocation', value: 'revoke' }],
    requiredActions: ['make healthcare decisions', 'revoke this directive'],
  };
}

const types = ['Insurance', 'Financial', 'Government', 'Legal'];
const corpus = [];
for (let i = 0; i < 100; i += 1) {
  corpus.push(buildCase(i + 1, types[i % types.length], variants[i % variants.length]));
}

const output = path.join(__dirname, 'synthetic-corpus.json');
fs.writeFileSync(output, `${JSON.stringify(corpus, null, 2)}\n`);
console.log(`Generated ${corpus.length} synthetic cases at ${output}`);
