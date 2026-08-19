export const sampleDocuments = [
  {
    id: 'doc-001',
    type: 'Insurance',
    title: 'Medicare Advantage Renewal Letter',
    fileName: 'medicare-renewal-2026.pdf',
    pages: 2,
    summary: {
      simple: 'Your Medicare plan is renewing. You have until October 15 to make changes.',
      standard: 'Your Medicare Advantage plan is renewing for 2026. The monthly premium is increasing from $12 to $18. You may keep your current plan or choose a new one by October 15, 2026.',
      detailed: 'Your current Medicare Advantage plan is being renewed for 2026. The monthly premium will increase from $12 to $18. Your primary doctor and pharmacy remain in the network. The annual deductible is $500. You can switch plans, keep your current plan, or return to Original Medicare during the open enrollment period, which ends October 15, 2026.'
    },
    keyInfo: [
      { type: 'date', label: 'Decision Deadline', value: 'October 15, 2026', page: 1 },
      { type: 'amount', label: 'New Monthly Premium', value: '$18.00', page: 1 },
      { type: 'amount', label: 'Annual Deductible', value: '$500', page: 2 },
    ],
    actions: [
      { id: 'act-001', description: 'Review your current plan details', deadline: '2026-10-10', priority: 'high', steps: ['Open the letter', 'Compare current doctors', 'Check pharmacy network'] },
      { id: 'act-002', description: 'Compare other Medicare plans', deadline: '2026-10-12', priority: 'medium', steps: ['Visit Medicare.gov', 'Enter your ZIP code', 'Compare costs and doctors'] },
      { id: 'act-003', description: 'Decide to keep or change your plan', deadline: '2026-10-15', priority: 'high', steps: ['Review options', 'Talk to family if needed', 'Make your selection online or by phone'] },
    ]
  },
  {
    id: 'doc-002',
    type: 'Financial',
    title: 'Bank Statement - Unusual Charge',
    fileName: 'bank-statement-july.pdf',
    pages: 1,
    summary: {
      simple: 'There is a $249 charge you may not recognize. You should check it.',
      standard: 'Your July bank statement shows a $249 charge on July 18 to "WRS Supply" that is not in your usual spending. You should review and contact your bank if you do not recognize it.',
      detailed: 'Your July statement shows your ending balance is $4,120. There is a $249 charge on July 18, 2026 to "WRS Supply" that does not match your usual spending pattern. All other charges appear familiar. If you do not recognize this charge, call the number on the back of your debit card to dispute it.'
    },
    keyInfo: [
      { type: 'amount', label: 'Unusual Charge', value: '$249.00', page: 1 },
      { type: 'date', label: 'Charge Date', value: 'July 18, 2026', page: 1 },
      { type: 'amount', label: 'Ending Balance', value: '$4,120.00', page: 1 },
    ],
    actions: [
      { id: 'act-004', description: 'Look for a receipt for the $249 charge', deadline: '2026-08-05', priority: 'high', steps: ['Check receipts', 'Ask family', 'Check email for order confirmation'] },
      { id: 'act-005', description: 'Call the bank if you do not recognize the charge', deadline: '2026-08-07', priority: 'high', steps: ['Find bank phone number', 'Explain the charge', 'Ask about dispute options'] },
    ]
  },
  {
    id: 'doc-003',
    type: 'Government',
    title: 'Property Tax Bill',
    fileName: 'property-tax-2026.pdf',
    pages: 1,
    summary: {
      simple: 'You owe $1,840 in property tax. Pay by December 31 or set up a payment plan.',
      standard: 'Your 2026 property tax bill is $1,840. It must be paid by December 31, 2026. You can pay online, by mail, or in person. A payment plan is also available.',
      detailed: 'Your 2026 property tax for the property at 1420 Magnolia Lane is $1,840. The first installment of $920 is due December 31, 2026. The second installment is due April 30, 2027. You may pay online at the county website, mail a check, or visit the tax office. Payment plans are available if needed.'
    },
    keyInfo: [
      { type: 'amount', label: 'Total Tax', value: '$1,840.00', page: 1 },
      { type: 'date', label: 'First Installment Due', value: 'December 31, 2026', page: 1 },
      { type: 'date', label: 'Second Installment Due', value: 'April 30, 2027', page: 1 },
    ],
    actions: [
      { id: 'act-006', description: 'Check if you qualify for a senior tax exemption', deadline: '2026-11-15', priority: 'medium', steps: ['Call county assessor', 'Ask about senior exemption', 'Submit form if available'] },
      { id: 'act-007', description: 'Pay the first installment', deadline: '2026-12-31', priority: 'high', steps: ['Go to county payment site', 'Enter property ID', 'Pay $920 or full amount'] },
    ]
  },
];
