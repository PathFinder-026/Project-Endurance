import React, { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, Search, Bell, Mail, ShieldCheck, X, Sparkles, Smartphone,
  Palette, Slice, Camera, LayoutDashboard, ShoppingBag, Store, Package,
  ClipboardList, Repeat, Calendar, Headphones, MessageSquare, Megaphone,
  Bot, Users, TrendingUp, ShieldAlert, MessageSquareShare, UserCheck,
  Activity, ArrowRight, CornerDownLeft, Check, LogOut, Settings, User,
  ChevronRight, AlertCircle, Clock, CheckCircle2, Zap
} from 'lucide-react';

export default function Header({
  currentRoute = 'live-ops',
  theme = 'light',
  toggleTheme,
  userName = 'Sakib',
  storeName = 'The Braehead Slice',
  isDbConnected = false,
  onNavigate,
  onOpenWhatsAppSimulator,
  onOpenWhiteLabel,
  onOpenVisionScanner,
  onOpenPizzaBuilder,
  onOpenAddProduct,
  onInspectOrder,
  orders = [],
  products = [],
  customers = [],
  onLogout,
  onEditProfile
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchResultsRef = useRef(null);

  // Platform detection for keyboard shortcut display (⌘K vs Ctrl+K)
  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K';

  // Real unread counter: pending orders waiting for kitchen action
  const pendingOrders = Array.isArray(orders) ? orders.filter(o => o.stage === 'pending') : [];
  const pendingCount = pendingOrders.length;

  // Global keyboard listener for ⌘K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isProfileOpen) setIsProfileOpen(false);
        if (isNotificationsOpen) setIsNotificationsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isProfileOpen, isNotificationsOpen]);

  // Auto-focus search input when command palette opens
  useEffect(() => {
    if (isSearchOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  }, [isSearchOpen]);

  // Click outside to close profile and notifications dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isProfileOpen || isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isNotificationsOpen]);

  // 18 Native Application Routes for Command Palette & Breadcrumbs
  const allRoutes = [
    { id: 'live-ops', label: 'Live Ops & Kitchen', category: 'Commerce', icon: LayoutDashboard, desc: 'Real-time kitchen display, order bumping, tickets' },
    { id: 'menu-catalog', label: 'Menu & Catalog', category: 'Commerce', icon: ShoppingBag, desc: 'Pizzas, kebabs, sides, 86 stock toggle' },
    { id: 'categories', label: 'Menu Categories', category: 'Commerce', icon: Store, desc: 'Sourdough, Craft Kebabs, Artisan Gelato' },
    { id: 'inventory', label: 'Pantry & Stock', category: 'Commerce', icon: Package, desc: 'Ingredient tracking, flour, mozzarella levels' },
    { id: 'orders', label: 'Order History', category: 'Commerce', icon: ClipboardList, desc: 'Historical customer transactions, audit logs' },
    { id: 'subscriptions', label: 'Subscriptions', category: 'Commerce', icon: Repeat, desc: 'Weekly pizza clubs, VIP bread tiers' },
    { id: 'reservations', label: 'Reservations & Floor', category: 'Operations', icon: Calendar, desc: 'Dine-in tables, QR digital ordering' },
    { id: 'ledger', label: 'Ledger & Disputes', category: 'Operations', icon: Headphones, desc: 'Chargebacks, refunds, driver tip pools' },
    { id: 'chats', label: 'Unified Comms Inbox', category: 'Operations', icon: MessageSquare, desc: 'WhatsApp & SMS live conversations' },
    { id: 'marketing', label: 'Local Marketing', category: 'Operations', icon: Megaphone, desc: 'Geo-targeted broadcast coupons' },
    { id: 'ai-copilot', label: 'AI Assistant & Dialect', category: 'Intelligence', icon: Bot, desc: 'Scottish vernacular tuning, voice assistant' },
    { id: 'customers', label: 'Customers & Loyalty', category: 'Intelligence', icon: Users, desc: 'VIP stamps, order history, phone directory' },
    { id: 'financials', label: 'Financials & Tips', category: 'Intelligence', icon: TrendingUp, desc: 'Revenue, £0 commission savings, tip pool' },
    { id: 'compliance', label: 'Compliance & Logs', category: 'Intelligence', icon: ShieldAlert, desc: 'Scotland MUP alcohol check, Challenge 25' },
    { id: 'waba-setup', label: 'Connect WhatsApp', category: 'Administration', icon: MessageSquareShare, desc: 'Meta Cloud API WABA phone number' },
    { id: 'settings', label: 'Shop Settings', category: 'Administration', icon: Store, desc: 'Operating hours, zero-commission subscription' },
    { id: 'team', label: 'Team & Admins', category: 'Administration', icon: UserCheck, desc: 'Staff roles, kitchen bump bar pins' },
    { id: 'activity-log', label: 'Message Activity Log', category: 'Administration', icon: Activity, desc: 'Realtime dispatch notifications & webhooks' },
  ];

  // Current Route Metadata for Contextual Breadcrumb
  const currentRouteMeta = allRoutes.find(r => r.id === currentRoute) || {
    id: 'live-ops',
    label: 'Live Ops & Kitchen',
    category: 'Commerce'
  };

  // Quick Action commands
  const quickActions = [
    {
      id: 'act-wa-sim',
      title: 'Launch WhatsApp Customer Simulator',
      subtitle: 'Simulate natural ordering conversation in Scottish dialect',
      category: 'Actions',
      icon: Smartphone,
      badge: 'Interactive',
      badgeColor: '#059669',
      onSelect: () => {
        setIsSearchOpen(false);
        onOpenWhatsAppSimulator && onOpenWhatsAppSimulator();
      }
    },
    {
      id: 'act-pizza-builder',
      title: 'Open Interactive Pizza Builder',
      subtitle: 'Customize artisan crusts, sauce layers, toppings',
      category: 'Actions',
      icon: Slice,
      badge: 'Product Builder',
      badgeColor: '#10b981',
      onSelect: () => {
        setIsSearchOpen(false);
        onOpenPizzaBuilder && onOpenPizzaBuilder();
      }
    },
    {
      id: 'act-white-label',
      title: 'White-Label Branding Customizer',
      subtitle: 'Switch emerald, sapphire, obsidian themes and store logo',
      category: 'Actions',
      icon: Palette,
      badge: 'Design System',
      badgeColor: '#6366f1',
      onSelect: () => {
        setIsSearchOpen(false);
        onOpenWhiteLabel && onOpenWhiteLabel();
      }
    },
    {
      id: 'act-vision-scanner',
      title: 'AI Vision Menu & Invoice Scanner',
      subtitle: 'Optical item extraction from physical supplier invoices',
      category: 'Actions',
      icon: Camera,
      badge: 'AI Vision',
      badgeColor: '#8b5cf6',
      onSelect: () => {
        setIsSearchOpen(false);
        onOpenVisionScanner && onOpenVisionScanner();
      }
    },
    {
      id: 'act-theme',
      title: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
      subtitle: 'Toggle dashboard appearance and glass opacity',
      category: 'Actions',
      icon: theme === 'light' ? Moon : Sun,
      badge: 'Appearance',
      badgeColor: '#64748b',
      onSelect: () => {
        setIsSearchOpen(false);
        toggleTheme && toggleTheme();
      }
    }
  ];

  // Filter items based on user search query
  const q = searchQuery.trim().toLowerCase();

  // 1. Pages/Routes results
  const filteredRoutes = allRoutes.filter(r =>
    !q || r.label.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)
  ).map(r => ({
    id: `route-${r.id}`,
    type: 'pages',
    title: r.label,
    subtitle: r.desc,
    category: r.category,
    icon: r.icon,
    badge: r.category,
    badgeColor: '#059669',
    onSelect: () => {
      setIsSearchOpen(false);
      onNavigate && onNavigate(r.id);
    }
  }));

  // 2. Real Orders results
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(o => {
    if (!q) return false;
    const matchId = String(o.id || '').toLowerCase().includes(q);
    const matchCustomer = String(o.customerName || '').toLowerCase().includes(q);
    const matchPhone = String(o.phone || '').toLowerCase().includes(q);
    const matchStatus = String(o.status || '').toLowerCase().includes(q);
    const matchItem = o.items && Array.isArray(o.items) && o.items.some(it => String(it.name || '').toLowerCase().includes(q));
    return matchId || matchCustomer || matchPhone || matchStatus || matchItem;
  }).slice(0, 5).map(o => ({
    id: `order-${o.id}`,
    type: 'orders',
    title: `Order #${o.id} • ${o.customerName || 'Customer'}`,
    subtitle: `${o.items?.map(i => `${i.quantity || 1}x ${i.name}`).join(', ') || 'No item details'} • £${Number(o.amount || 0).toFixed(2)}`,
    category: 'Live Orders',
    icon: ClipboardList,
    badge: o.status || 'Active',
    badgeColor: o.status === 'pending' ? '#f59e0b' : '#10b981',
    onSelect: () => {
      setIsSearchOpen(false);
      if (onInspectOrder) {
        onInspectOrder(o);
      } else if (onNavigate) {
        onNavigate('live-ops');
      }
    }
  }));

  // 3. Real Menu Products results
  const filteredProducts = (Array.isArray(products) ? products : []).filter(p => {
    if (!q) return false;
    const matchName = String(p.name || '').toLowerCase().includes(q);
    const matchCategory = String(p.category || '').toLowerCase().includes(q);
    return matchName || matchCategory;
  }).slice(0, 5).map(p => ({
    id: `prod-${p.id}`,
    type: 'menu',
    title: p.name,
    subtitle: `${p.category || 'Menu Item'} • £${Number(p.price || 0).toFixed(2)} • ${p.inStock ? 'In Stock' : '86ed / Out of Stock'}`,
    category: 'Menu Items',
    icon: ShoppingBag,
    badge: p.inStock ? 'In Stock' : 'Out of Stock',
    badgeColor: p.inStock ? '#10b981' : '#ef4444',
    onSelect: () => {
      setIsSearchOpen(false);
      onNavigate && onNavigate('menu-catalog');
    }
  }));

  // 4. Real Customers results
  const filteredCustomers = (Array.isArray(customers) ? customers : []).filter(c => {
    if (!q) return false;
    const matchName = String(c.name || '').toLowerCase().includes(q);
    const matchPhone = String(c.phone || '').toLowerCase().includes(q);
    return matchName || matchPhone;
  }).slice(0, 5).map(c => ({
    id: `cust-${c.id}`,
    type: 'customers',
    title: c.name,
    subtitle: `${c.phone || ''} • ${c.ordersCount || c.totalOrders || 1} past orders`,
    category: 'Customers',
    icon: Users,
    badge: 'Customer',
    badgeColor: '#6366f1',
    onSelect: () => {
      setIsSearchOpen(false);
      onNavigate && onNavigate('customers');
    }
  }));

  // 5. Actions results
  const filteredActions = quickActions.filter(a =>
    !q || a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
  ).map(a => ({
    id: a.id,
    type: 'actions',
    title: a.title,
    subtitle: a.subtitle,
    category: a.category,
    icon: a.icon,
    badge: a.badge,
    badgeColor: a.badgeColor,
    onSelect: a.onSelect
  }));

  // Compute final filtered list based on active tab
  let finalResults = [];
  if (activeTab === 'all') {
    if (!q) {
      finalResults = [...filteredActions, ...filteredRoutes.slice(0, 8)];
    } else {
      finalResults = [
        ...filteredOrders,
        ...filteredProducts,
        ...filteredCustomers,
        ...filteredRoutes,
        ...filteredActions
      ];
    }
  } else if (activeTab === 'pages') {
    finalResults = filteredRoutes;
  } else if (activeTab === 'orders') {
    finalResults = filteredOrders.length > 0 ? filteredOrders : (Array.isArray(orders) ? orders.slice(0, 6).map(o => ({
      id: `order-${o.id}`,
      type: 'orders',
      title: `Order #${o.id} • ${o.customerName || 'Customer'}`,
      subtitle: `${o.items?.map(i => `${i.quantity || 1}x ${i.name}`).join(', ') || 'No item details'} • £${Number(o.amount || 0).toFixed(2)}`,
      category: 'Live Orders',
      icon: ClipboardList,
      badge: o.status || 'Active',
      badgeColor: o.status === 'pending' ? '#f59e0b' : '#10b981',
      onSelect: () => {
        setIsSearchOpen(false);
        if (onInspectOrder) onInspectOrder(o);
        else if (onNavigate) onNavigate('live-ops');
      }
    })) : []);
  } else if (activeTab === 'menu') {
    finalResults = filteredProducts.length > 0 ? filteredProducts : (Array.isArray(products) ? products.slice(0, 8).map(p => ({
      id: `prod-${p.id}`,
      type: 'menu',
      title: p.name,
      subtitle: `${p.category || 'Menu Item'} • £${Number(p.price || 0).toFixed(2)}`,
      category: 'Menu Items',
      icon: ShoppingBag,
      badge: p.inStock ? 'In Stock' : 'Out of Stock',
      badgeColor: p.inStock ? '#10b981' : '#ef4444',
      onSelect: () => {
        setIsSearchOpen(false);
        onNavigate && onNavigate('menu-catalog');
      }
    })) : []);
  } else if (activeTab === 'customers') {
    finalResults = filteredCustomers.length > 0 ? filteredCustomers : (Array.isArray(customers) ? customers.slice(0, 8).map(c => ({
      id: `cust-${c.id}`,
      type: 'customers',
      title: c.name,
      subtitle: `${c.phone || ''}`,
      category: 'Customers',
      icon: Users,
      badge: 'Customer',
      badgeColor: '#6366f1',
      onSelect: () => {
        setIsSearchOpen(false);
        onNavigate && onNavigate('customers');
      }
    })) : []);
  } else if (activeTab === 'actions') {
    finalResults = filteredActions;
  }

  // Keyboard navigation within the command palette
  const handleKeyDownPalette = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (finalResults.length > 0 ? (prev + 1) % finalResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (finalResults.length > 0 ? (prev - 1 + finalResults.length) % finalResults.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (finalResults[selectedIndex]) {
        finalResults[selectedIndex].onSelect();
      }
    }
  };

  return (
    <>
      {/* Sticky Apple Light Glass Top Header Command Bar */}
      <header className="apple-command-header stagger-1">
        {/* Left: Brand Identity, Contextual Breadcrumbs & Live Connection Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="apple-command-title">
                Apex Kitchen Command
              </h1>
              {/* Dynamic Connection Indicator with Node Pulse */}
              <div
                className="apple-status-pill"
                title={isDbConnected
                  ? 'Realtime Supabase PostgreSQL WebSocket Active (Project cfdtvtrohgtauhjravyl) • 12ms latency'
                  : 'Operating in local offline dispatch fallback mode'}
                style={{
                  background: isDbConnected ? 'rgba(16, 185, 129, 0.10)' : 'rgba(245, 158, 11, 0.10)',
                  borderColor: isDbConnected ? 'rgba(16, 185, 129, 0.28)' : 'rgba(245, 158, 11, 0.28)',
                  color: isDbConnected ? '#047857' : '#b45309'
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: isDbConnected ? '#10b981' : '#f59e0b',
                    boxShadow: isDbConnected ? '0 0 10px rgba(16, 185, 129, 0.8)' : '0 0 6px rgba(245, 158, 11, 0.6)',
                    animation: isDbConnected ? 'appleGlowPulse 2.2s infinite ease-in-out' : 'none'
                  }}
                />
                <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                  {isDbConnected ? 'Supabase Live' : 'Live Dispatch (Local)'}
                </span>
                {isDbConnected && (
                  <span style={{ fontSize: '0.66rem', opacity: 0.75, fontWeight: 600 }}>
                    12ms
                  </span>
                )}
              </div>
            </div>

            {/* Contextual Breadcrumb Navigation Bar */}
            <div className="apple-breadcrumb-bar">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('live-ops')}
                className="apple-crumb-root"
                title="Return to Apex Command Live Ops"
              >
                Apex
              </button>
              <span className="apple-crumb-sep">/</span>
              <span className="apple-crumb-group">{currentRouteMeta.category}</span>
              <span className="apple-crumb-sep">/</span>
              <span className="apple-crumb-active">{currentRouteMeta.label}</span>
              <span className="apple-crumb-bullet">•</span>
              <span className="apple-crumb-store">{storeName}</span>
            </div>
          </div>
        </div>

        {/* Right: Search Capsule & Minimalist Actions */}
        <div className="apple-command-actions">
          {/* Intelligent Command Palette Capsule */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="apple-search-capsule"
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <Search size={15} color="var(--brand-accent)" style={{ flexShrink: 0 }} />
            <span className="apple-search-text">
              Search orders, dishes, customers, pages...
            </span>
            <kbd className="apple-kbd-shortcut">
              {shortcutLabel}
            </kbd>
          </button>

          {/* WhatsApp Customer Experience Simulator Trigger */}
          <button
            onClick={onOpenWhatsAppSimulator}
            className="apple-wa-action-btn"
            title="Launch WhatsApp Customer Ordering Simulator"
          >
            <Smartphone size={15} />
            <span className="hide-on-mobile">WhatsApp Simulator</span>
            <Sparkles size={13} style={{ opacity: 0.85 }} />
          </button>

          {/* Pizza Builder Trigger */}
          <button
            onClick={onOpenPizzaBuilder}
            className="image2-icon-btn"
            title="Interactive Pizza Builder"
          >
            <Slice size={17} color="#059669" />
          </button>

          {/* AI Vision Scanner Trigger */}
          <button
            onClick={onOpenVisionScanner}
            className="image2-icon-btn"
            title="AI Vision Menu & Invoice Scanner"
          >
            <Camera size={17} color="#059669" />
          </button>

          {/* White-Label Theme Customizer */}
          <button
            onClick={onOpenWhiteLabel}
            className="image2-icon-btn"
            title="White-Label Theme Customizer"
          >
            <Palette size={17} color="var(--brand-accent)" />
          </button>

          {/* Unified Comms Mail Icon */}
          <button
            onClick={() => onNavigate && onNavigate('chats')}
            className="image2-icon-btn"
            title="Unified Customer Comms Inbox"
          >
            <Mail size={17} />
          </button>

          {/* Notification Bell with Dropdown Popover */}
          <div ref={notificationsRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="image2-icon-btn"
              title={pendingCount > 0 ? `${pendingCount} pending kitchen orders requiring action` : 'System & Kitchen Notifications'}
              style={{ position: 'relative' }}
            >
              <Bell size={17} />
              {pendingCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '9px',
                    right: '9px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#f59e0b',
                    boxShadow: '0 0 8px rgba(245, 158, 11, 0.9)',
                    animation: 'appleGlowPulse 1.8s infinite ease-in-out'
                  }}
                />
              )}
            </button>

            {/* Apple Light Glass Notifications Popover */}
            {isNotificationsOpen && (
              <div className="apple-notifications-popover">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={15} color="var(--brand-accent)" />
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      Kitchen & System Alerts
                    </span>
                  </div>
                  {pendingCount > 0 && (
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: 'rgba(245, 158, 11, 0.12)',
                      color: '#b45309',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      {pendingCount} Pending
                    </span>
                  )}
                </div>

                {/* Notifications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto', padding: '10px 0' }}>
                  {/* Real Live Pending Orders */}
                  {pendingOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        if (onInspectOrder) onInspectOrder(order);
                        else if (onNavigate) onNavigate('live-ops');
                      }}
                      className="apple-notif-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                          Order #{order.id} • {order.customerName || 'Customer'}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 700 }}>
                          £{Number(order.amount || 0).toFixed(2)}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {order.items?.map(it => `${it.quantity || 1}x ${it.name}`).join(', ') || 'Pending kitchen confirmation'}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: '#059669', fontWeight: 600, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} /> Click to inspect order
                      </span>
                    </div>
                  ))}

                  {/* Supabase Live DB Sync Alert */}
                  <div className="apple-notif-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#059669" />
                      <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#047857' }}>
                        Supabase Realtime PostgreSQL
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {isDbConnected ? 'Live stream subscribed: orders, products, tables, compliance_logs.' : 'Local fallback queue active. Ready to sync.'}
                    </span>
                  </div>

                  {/* Compliance Policy Notice */}
                  <div className="apple-notif-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={13} color="#6366f1" />
                      <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#4338ca' }}>
                        Scottish Licensing & Challenge 25
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      MUP 65p alcohol unit floor and Challenge 25 active across Glasgow takeaway orders.
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div style={{ borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      onNavigate && onNavigate('activity-log');
                    }}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--brand-accent)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '6px 0',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>View Full Activity Log</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Capsule */}
          <button
            onClick={toggleTheme}
            className="image2-icon-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Profile Avatar Tile with Popover Dropdown */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="apple-profile-avatar-btn"
              title={`Signed in as ${userName} (${storeName})`}
            >
              {userName ? userName[0].toUpperCase() : 'S'}
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: isDbConnected ? '#10b981' : '#f59e0b',
                  border: '2px solid #ffffff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
                }}
              />
            </button>

            {/* Apple Light Glass Profile Menu Popover */}
            {isProfileOpen && (
              <div className="apple-profile-popover">
                {/* Popover User Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 4px 12px', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
                    }}
                  >
                    {userName ? userName[0].toUpperCase() : 'S'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {userName}
                      </span>
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '9999px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#047857',
                        border: '1px solid rgba(16, 185, 129, 0.25)'
                      }}>
                        Admin
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {storeName}
                    </span>
                  </div>
                </div>

                {/* Popover Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 0 6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onEditProfile && onEditProfile();
                    }}
                    className="apple-popover-item"
                  >
                    <User size={15} color="var(--brand-accent)" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate && onNavigate('settings');
                    }}
                    className="apple-popover-item"
                  >
                    <Settings size={15} color="#64748b" />
                    <span>Shop Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate && onNavigate('chats');
                    }}
                    className="apple-popover-item"
                  >
                    <MessageSquare size={15} color="#64748b" />
                    <span>Customer Comms Inbox</span>
                  </button>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout && onLogout();
                  }}
                  className="apple-popover-item apple-popover-item-danger"
                >
                  <LogOut size={15} color="#ef4444" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spatial Apple Light Glass Command Palette Modal (⌘K / Ctrl+K) */}
      {isSearchOpen && (
        <div
          className="apple-palette-backdrop"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="apple-palette-card"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDownPalette}
          >
            {/* Search Input Bar */}
            <div className="apple-palette-input-wrap">
              <Search size={20} color="var(--brand-accent)" style={{ flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search commands, live orders, dishes, customers, pages..."
                className="apple-palette-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndex(0);
                    searchInputRef.current?.focus();
                  }}
                  className="apple-palette-clear-btn"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="apple-palette-esc-badge" onClick={() => setIsSearchOpen(false)}>
                ESC
              </kbd>
            </div>

            {/* Category Filter Pills */}
            <div className="apple-palette-tabs">
              {[
                { id: 'all', label: 'All' },
                { id: 'pages', label: 'Pages' },
                { id: 'orders', label: 'Orders' },
                { id: 'menu', label: 'Menu Catalog' },
                { id: 'customers', label: 'Customers' },
                { id: 'actions', label: 'Actions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedIndex(0);
                  }}
                  className={`apple-palette-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div ref={searchResultsRef} className="apple-palette-results">
              {finalResults.length === 0 ? (
                <div className="apple-palette-empty">
                  <Search size={32} color="#94a3b8" style={{ marginBottom: '10px' }} />
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>
                    No results found for "{searchQuery}"
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
                    Try searching for an order ID like "#101", a dish name, or a page like "Kitchen" or "Stock".
                  </p>
                </div>
              ) : (
                finalResults.map((item, index) => {
                  const Icon = item.icon || ArrowRight;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`apple-palette-item ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="apple-palette-item-icon">
                        <Icon size={16} color="var(--brand-accent)" />
                      </div>
                      <div className="apple-palette-item-content">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="apple-palette-item-title">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className="apple-palette-item-badge"
                              style={{
                                color: item.badgeColor || '#059669',
                                background: `${item.badgeColor || '#059669'}14`,
                                borderColor: `${item.badgeColor || '#059669'}30`
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <span className="apple-palette-item-subtitle">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      <div className="apple-palette-item-action">
                        <CornerDownLeft size={13} color="#94a3b8" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="apple-palette-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <kbd className="apple-footer-kbd">↑</kbd>
                  <kbd className="apple-footer-kbd">↓</kbd>
                  <span>navigate</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <kbd className="apple-footer-kbd">↵</kbd>
                  <span>select</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <kbd className="apple-footer-kbd">ESC</kbd>
                  <span>close</span>
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>
                {finalResults.length} items available
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
