export const initialTasks = [
  {
    id: 'SR-243',
    title: 'Loose electrical wires near park',
    status: 'IN_PROGRESS',
    dueDate: '2025-01-06',
    priority: 'HIGH',
    description: 'I noticed some loose electrical wires hanging near the park entrance. It could be a danger for everyone.',
    category: ['Adhoc service request','Repairs','Water leaks','Pipe repairs'],
    location: {
      building: 'Floor 3, Building 2, Edinburg office',
      room: 'Arora Room, Room No. 101',
      notes: 'Near Cooler',
      coordinates: { lat: 0, lng: 0 }
    },
    spaces: [
      { id: 'loc1', label: 'Floor 3, Building 2, Edinburg office', mapType: 'indoor' },
      { id: 'loc2', label: 'Section B, Aisle 5, Near Loading Dock 3', mapType: 'outdoor' }
    ],
    assets: [
      { id: 'asset1', name: 'Equipment', code: 'Assembly line A1' }
    ],
    attachments: [
      { id: 'att1', type: 'image', name: 'screenshot.png', url: '#', thumbnail: '/vite.svg' },
      { id: 'att2', type: 'pdf', name: 'manual.pdf', url: '#', thumbnail: '' }
    ],
    relations: {
      parent: [{ id: 'SR-200', title: 'Parent Ticket' }],
      linked: [{ id: 'SR-220', title: 'Linked Ticket' }],
      child: [{ id: 'SR-250', title: 'Child Ticket' }, { id: 'SR-251', title: 'Child Ticket 2' }]
    },
    observers: [
      { id: 'user5', name: 'Gerald S Smith' },
      { id: 'user6', name: 'Other Observer' }
    ],
    assignees: [
      { id: 'me', name: 'Samuel Alex', me: true },
      { id: 'user2', name: 'Jane Doe' }
    ],
    activity: [
      { id: 'act1', type: 'comment', user: 'Samuel Alex', message: 'Received request for restroom plumbing issue. Leak located at sink valve. Temporary fix applied; permanent part ordered (ETA: 2 days).', timestamp: Date.now() - 3600 * 1000 * 5 },
      { id: 'act2', type: 'update', user: 'John Fitzgerald', message: 'Changed action to Send to technician', timestamp: Date.now() - 3600 * 1000 * 4 },
    ],
    insights: { totalWorkHours: 129, totalCost: 13.5 }
  }
];
