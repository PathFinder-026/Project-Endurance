// Village Shop Admin - Comprehensive Mock Data & Configuration

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'The Braehead Special Pizza 12"',
    category: 'Pizzas',
    brand: 'The Braehead Slice',
    price: 14.50,
    stock: 63,
    reorderLevel: 10,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80',
    description: 'Fresh mozzarella, smoked pepperoni, garlic oil and basil on artisan sourdough.',
    restriction: 'None',
    expiryDays: 45
  },
  {
    id: 'prod-2',
    name: 'Classic Margherita Pizza 12"',
    category: 'Pizzas',
    brand: 'The Braehead Slice',
    price: 10.99,
    stock: 80,
    reorderLevel: 12,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=150&auto=format&fit=crop&q=80',
    description: 'San Marzano tomato base, creamy fior di latte, extra virgin olive oil.',
    restriction: 'Vegetarian',
    expiryDays: 30
  },
  {
    id: 'prod-3',
    name: 'Garlic Bread with Cheese',
    category: 'Sides & Starters',
    brand: 'The Braehead Slice',
    price: 5.50,
    stock: 90,
    reorderLevel: 15,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=150&auto=format&fit=crop&q=80',
    description: 'Crusty artisan baguette brushed with roasted garlic herb butter and melted mozzarella.',
    restriction: 'Vegetarian',
    expiryDays: 14
  },
  {
    id: 'prod-4',
    name: 'Glasgow Munchy Box',
    category: 'Kebabs & Burgers',
    brand: 'The Braehead Slice',
    price: 19.99,
    stock: 35,
    reorderLevel: 5,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&auto=format&fit=crop&q=80',
    description: 'Doner meat, chicken pakora, onion rings, seasoned chips, naan bread and dips.',
    restriction: 'Halal',
    expiryDays: 20
  },
  {
    id: 'prod-5',
    name: 'Charcoal Grilled Lamb Skewers',
    category: 'Kebabs & Burgers',
    brand: 'The Braehead Slice',
    price: 12.50,
    stock: 40,
    reorderLevel: 8,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80',
    description: 'Marinated tender lamb cubed and grilled over open embers with sumac onions.',
    restriction: 'Halal',
    expiryDays: 10
  },
  {
    id: 'prod-6',
    name: 'Gourmet Smashed Cheeseburger',
    category: 'Kebabs & Burgers',
    brand: 'The Braehead Slice',
    price: 9.75,
    stock: 52,
    reorderLevel: 10,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80',
    description: 'Double beef smash patties, American cheddar, caramelized onions, house burger relish on brioche.',
    restriction: 'Halal',
    expiryDays: 15
  },
  {
    id: 'prod-7',
    name: 'Chilled Iron Bru 330ml',
    category: 'Drinks & Beverages',
    brand: 'Scottish Brews',
    price: 2.20,
    stock: 120,
    reorderLevel: 24,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80',
    description: "Scotland's other national drink, ice cold sparkling soft drink.",
    restriction: 'None',
    expiryDays: 180
  },
  {
    id: 'prod-8',
    name: 'Warm Belgian Chocolate Lava Cake',
    category: 'Desserts',
    brand: 'Sweet Indulgence',
    price: 6.50,
    stock: 28,
    reorderLevel: 6,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 26, 2026, 8:05 PM',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=80',
    description: 'Rich dark chocolate sponge with molten ganache core and Madagascar vanilla cream.',
    restriction: 'Vegetarian',
    expiryDays: 7
  },
  {
    id: 'prod-9',
    name: 'Diavola Spicy Pizza 12"',
    category: 'Pizzas',
    brand: 'The Braehead Slice',
    price: 13.99,
    stock: 45,
    reorderLevel: 8,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 27, 2026, 2:15 PM',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=150&auto=format&fit=crop&q=80',
    description: 'Fiery Calabrian salami, fresh green chilis, crushed red pepper flakes.',
    restriction: 'None',
    expiryDays: 25
  },
  {
    id: 'prod-10',
    name: 'Crispy Truffle Potato Wedges',
    category: 'Sides & Starters',
    brand: 'The Braehead Slice',
    price: 4.80,
    stock: 65,
    reorderLevel: 10,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 27, 2026, 3:30 PM',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=150&auto=format&fit=crop&q=80',
    description: 'Thick hand-cut potatoes tossed in white truffle oil, shaved parmesan and parsley.',
    restriction: 'Vegetarian',
    expiryDays: 12
  },
  {
    id: 'prod-11',
    name: 'San Pellegrino Sparkling Lemonade',
    category: 'Drinks & Beverages',
    brand: 'Italian Springs',
    price: 2.80,
    stock: 85,
    reorderLevel: 20,
    inStock: true,
    status: 'active',
    createdAt: 'Oct 28, 2026, 11:10 AM',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&auto=format&fit=crop&q=80',
    description: 'Authentic Sicilian lemon extract sparkling beverage with natural pulp.',
    restriction: 'None',
    expiryDays: 210
  }
];

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Desserts',
    description: 'Cakes and sweet treats',
    hours: 'All Day (00:00 - 23:59)',
    productsCount: 1
  },
  {
    id: 'cat-2',
    name: 'Drinks & Beverages',
    description: 'Chilled soft drinks, ginger, and age-restricted craft beverages',
    hours: 'All Day (00:00 - 23:59)',
    productsCount: 2
  },
  {
    id: 'cat-3',
    name: 'Kebabs & Burgers',
    description: 'Charcoal-grilled skewers and gourmet smashed burgers',
    hours: 'All Day (00:00 - 23:59)',
    productsCount: 3
  },
  {
    id: 'cat-4',
    name: 'Pizzas',
    description: 'Stone-baked 12-inch artisan pizzas',
    hours: 'All Day (00:00 - 23:59)',
    productsCount: 3
  },
  {
    id: 'cat-5',
    name: 'Sides & Starters',
    description: 'Cheesy breads, truffle wedges, dips and appetisers',
    hours: 'All Day (00:00 - 23:59)',
    productsCount: 2
  }
];

export const INITIAL_ORDERS = [
  {
    id: '1f21fe9a',
    customerName: 'Akash Brahmbhatt',
    phone: '447777154301',
    amount: 39.96,
    timeAgo: '1132m ago',
    status: 'In Prep',
    stage: 'pending',
    items: [
      { name: 'The Braehead Special Pizza 12"', qty: 2, price: 14.50 },
      { name: 'Classic Margherita Pizza 12"', qty: 1, price: 10.96 }
    ],
    address: '14 Kelvin Way, Flat 2B, Glasgow G12 8QQ',
    notes: 'Please leave in reception porch if buzzer unanswered.'
  },
  {
    id: '84eecbc4',
    customerName: 'Akash Brahmbhatt',
    phone: '447777154301',
    amount: 14.50,
    timeAgo: '3063m ago',
    status: 'In Prep',
    stage: 'pending',
    items: [
      { name: 'The Braehead Special Pizza 12"', qty: 1, price: 14.50 }
    ],
    address: '14 Kelvin Way, Flat 2B, Glasgow G12 8QQ',
    notes: 'Extra spicy chili flakes requested via WhatsApp note.'
  },
  {
    id: '9a18df21',
    customerName: 'Sarah Jenkins',
    phone: '447812903411',
    amount: 14.50,
    timeAgo: '15m ago',
    status: 'In Prep',
    stage: 'pending',
    items: [
      { name: 'The Braehead Special Pizza 12"', qty: 1, price: 14.50 }
    ],
    address: '88 Buchanan Street, Apt 4, Glasgow G1 3HA',
    notes: 'Call on arrival.'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Akash Brahmbhatt',
    phone: '+44 7777 154301',
    tier: 'Premium (Voice & Image AI)',
    streak: '🔥 4 wks',
    status: 'Active',
    ordersCount: 8,
    totalSpent: 168.45,
    dietaryTags: ['Halal', 'Extra Spice'],
    lastOrder: 'Today, 2:30 PM'
  },
  {
    id: 'cust-2',
    name: 'Sarah Jenkins',
    phone: '+44 7812 903411',
    tier: 'Standard',
    streak: '🔥 2 wks',
    status: 'Active',
    ordersCount: 4,
    totalSpent: 72.80,
    dietaryTags: ['Vegetarian'],
    lastOrder: 'Yesterday, 8:15 PM'
  },
  {
    id: 'cust-3',
    name: 'David MacLeod',
    phone: '+44 7700 900123',
    tier: 'Standard',
    streak: 'None',
    status: 'Active',
    ordersCount: 2,
    totalSpent: 38.50,
    dietaryTags: ['Gluten-Free'],
    lastOrder: 'Oct 20, 2026'
  },
  {
    id: 'cust-4',
    name: 'Emma Watson',
    phone: '+44 7911 234567',
    tier: 'Standard',
    streak: '🔥 1 wk',
    status: 'Active',
    ordersCount: 1,
    totalSpent: 19.99,
    dietaryTags: ['Halal'],
    lastOrder: 'Oct 28, 2026'
  }
];

export const INITIAL_TABLES = [
  { id: 'T1', name: 'Table 01 - Window Booth', seats: 4, status: 'Available', zone: 'Front Dining' },
  { id: 'T2', name: 'Table 02 - Central Banquette', seats: 6, status: 'Available', zone: 'Main Hall' },
  { id: 'T3', name: 'Table 03 - High Top Bar', seats: 2, status: 'Available', zone: 'Bar Lounge' },
  { id: 'T4', name: 'Table 04 - Garden Alcove', seats: 4, status: 'Available', zone: 'Veranda' },
  { id: 'T5', name: 'Table 05 - Family Booth', seats: 8, status: 'Available', zone: 'Main Hall' },
  { id: 'T6', name: 'Table 06 - Chef Counter', seats: 2, status: 'Available', zone: 'Kitchen View' }
];

export const INITIAL_TEMPLATES = [
  {
    name: 'bakery_fresh_now',
    category: 'Marketing FOMO',
    status: 'Approved',
    language: 'en_GB',
    preview: 'Fresh batch of sourdough and artisan pizzas just came out of the stone oven! Order in next 30m for priority delivery.',
    lastUsed: '2 days ago'
  },
  {
    name: 'storm_prep_alert',
    category: 'Urgent Weather',
    status: 'Approved',
    language: 'en_GB',
    preview: 'Rain alert across Glasgow tonight! Cosy up at home — get 15% off comfort Munchy Boxes with free hot delivery.',
    lastUsed: '1 week ago'
  },
  {
    name: 'vip_secret_menu',
    category: 'VIP Reward',
    status: 'Approved',
    language: 'en_GB',
    preview: 'Exclusive for our Golden Flame members: Truffle Garlic Pizza is back for 48 hours only. Reply YES to reserve.',
    lastUsed: '3 days ago'
  }
];

export const INITIAL_DISPUTES = [
  {
    id: 'disp-101',
    customer: 'David MacLeod',
    phone: '+44 7700 900123',
    orderId: '#77bf49a',
    issue: 'Missing side garlic dip and bottle of Iron Bru',
    amountRequested: 4.40,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
    timeElapsed: '12m ago',
    status: 'Open'
  }
];

export const INITIAL_SUBSCRIPTIONS = [
  {
    id: 'sub-01',
    customerName: 'Akash Brahmbhatt',
    phone: '+44 7777 154301',
    product: 'Weekly Pizza Club (2 Pizzas + 2 Drinks)',
    frequency: 'Every Friday 7:00 PM',
    nextBilling: 'Nov 06, 2026',
    status: 'Active',
    amount: 25.00
  }
];
