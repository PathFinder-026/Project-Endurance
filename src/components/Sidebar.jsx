import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Package,
  ClipboardList,
  Repeat,
  Calendar,
  Headphones,
  MessageSquare,
  Megaphone,
  Bot,
  Users,
  TrendingUp,
  ShieldAlert,
  MessageSquareShare,
  UserCheck,
  Activity,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  Pencil,
  Bell,
  Settings
} from 'lucide-react';

export default function Sidebar({
  currentRoute,
  setCurrentRoute,
  onLogout,
  onEditProfile,
  userName = 'Sakib',
  isMobileOpen = false,
  onCloseMobile
}) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('village_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [openSections, setOpenSections] = useState(() => {
    try {
      const saved = localStorage.getItem('village_sidebar_sections');
      return saved ? JSON.parse(saved) : {
        commerce: true,
        operations: true,
        intelligence: true,
        admin: true
      };
    } catch {
      return {
        commerce: true,
        operations: true,
        intelligence: true,
        admin: true
      };
    }
  });

  // Persist collapsed & section expansion preferences
  useEffect(() => {
    try {
      localStorage.setItem('village_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    } catch {}
  }, [isCollapsed]);

  useEffect(() => {
    try {
      localStorage.setItem('village_sidebar_sections', JSON.stringify(openSections));
    } catch {}
  }, [openSections]);

  const navContainerRef = useRef(null);
  const lastTopRef = useRef(null);

  const [dropIndicator, setDropIndicator] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visible: false,
    direction: 'down',
    isDropping: false
  });

  // 4 Enterprise SaaS Navigation Sections without numeric prefixes
  const navigationSections = [
    {
      key: 'commerce',
      label: 'Commerce',
      items: [
        { id: 'live-ops', label: 'Live Ops & Kitchen', icon: LayoutDashboard },
        { id: 'menu-catalog', label: 'Menu & Catalog', icon: ShoppingBag },
        { id: 'categories', label: 'Menu Categories', icon: Store },
        { id: 'inventory', label: 'Pantry & Stock', icon: Package },
        { id: 'orders', label: 'Order History', icon: ClipboardList },
        { id: 'subscriptions', label: 'Subscriptions', icon: Repeat },
      ]
    },
    {
      key: 'operations',
      label: 'Operations',
      items: [
        { id: 'reservations', label: 'Reservations & Floor', icon: Calendar },
        { id: 'ledger', label: 'Ledger & Disputes', icon: Headphones },
        { id: 'chats', label: 'Unified Comms Inbox', icon: MessageSquare },
        { id: 'marketing', label: 'Local Marketing', icon: Megaphone },
      ]
    },
    {
      key: 'intelligence',
      label: 'Intelligence',
      items: [
        { id: 'ai-copilot', label: 'AI Assistant & Dialect', icon: Bot },
        { id: 'customers', label: 'Customers & Loyalty', icon: Users },
        { id: 'financials', label: 'Financials & Tips', icon: TrendingUp },
        { id: 'compliance', label: 'Compliance & Logs', icon: ShieldAlert },
      ]
    },
    {
      key: 'admin',
      label: 'Administration',
      items: [
        { id: 'waba-setup', label: 'Connect WhatsApp', icon: MessageSquareShare },
        { id: 'settings', label: 'Shop Settings', icon: Store },
        { id: 'team', label: 'Team & Admins', icon: UserCheck },
        { id: 'activity-log', label: 'Message Activity Log', icon: Activity },
      ]
    }
  ];

  // Collapsed quick-access items
  const compactQuickItems = [
    { id: 'live-ops', label: 'Live Ops & Kitchen', icon: LayoutDashboard },
    { id: 'orders', label: 'Order History', icon: ClipboardList },
    { id: 'reservations', label: 'Reservations & Floor', icon: Calendar },
    { id: 'ai-copilot', label: 'AI Assistant & Dialect', icon: Bot },
    { id: 'customers', label: 'Customers & Loyalty', icon: Users },
    { id: 'financials', label: 'Financials & Tips', icon: TrendingUp },
    { id: 'inventory', label: 'Pantry & Stock', icon: Package },
    { id: 'chats', label: 'Unified Comms Inbox', icon: MessageSquare },
  ];

  // Auto-expand section when active route changes
  useEffect(() => {
    for (const section of navigationSections) {
      if (section.items.some(it => it.id === currentRoute)) {
        setOpenSections(prev => ({ ...prev, [section.key]: true }));
        break;
      }
    }
  }, [currentRoute]);

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Dynamic Liquid Raindrop Motion Position Calculation
  useEffect(() => {
    const updatePosition = () => {
      if (!navContainerRef.current) return;
      const activeEl = navContainerRef.current.querySelector(`[data-route-id="${currentRoute}"]`);
      if (activeEl) {
        const containerRect = navContainerRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const top = activeRect.top - containerRect.top + navContainerRef.current.scrollTop;
        const left = activeRect.left - containerRect.left;
        const width = activeRect.width;
        const height = activeRect.height;

        const direction = (lastTopRef.current !== null && top < lastTopRef.current) ? 'up' : 'down';
        const moved = lastTopRef.current !== null && Math.abs(top - lastTopRef.current) > 2;
        lastTopRef.current = top;

        setDropIndicator({
          top,
          left,
          width,
          height,
          visible: true,
          direction,
          isDropping: moved
        });

        if (moved) {
          const timeout = setTimeout(() => {
            setDropIndicator((prev) => ({ ...prev, isDropping: false }));
          }, 400);
          return () => clearTimeout(timeout);
        }
      } else {
        setDropIndicator(prev => ({ ...prev, visible: false }));
      }
    };

    updatePosition();
    const frame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frame);
  }, [currentRoute, isCollapsed, openSections]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Main Navigation"
      >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {/* Sidebar Brand Header */}
        <div
          className="sidebar-header"
          style={
            isCollapsed
              ? { padding: '10px 0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }
              : { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 18px 14px' }
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="sidebar-logo-icon"
              style={{
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.32)',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                transition: 'transform 0.2s var(--ease-apple)'
              }}
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Click to expand sidebar' : 'Click to collapse sidebar'}
            >
              <Store size={20} />
            </div>
            {!isCollapsed && (
              <div className="sidebar-brand-info">
                <span className="sidebar-brand-title">Village-Shop</span>
                <span className="sidebar-brand-subtitle">Apex Command Center</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '8px',
              transition: 'all 0.15s ease'
            }}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse to capsule'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div
          className="sidebar-nav-container"
          ref={navContainerRef}
          style={{
            position: 'relative',
            flex: 1,
            overflowY: 'auto',
            paddingRight: isCollapsed ? '0' : '4px'
          }}
        >
          {/* THE CYLINDRICAL RAIN DROP SLIDING INDICATOR */}
          {dropIndicator.visible && (
            <div
              className={`cylindrical-drop-pill ${dropIndicator.isDropping ? 'dropping' : ''} ${dropIndicator.direction}`}
              style={{
                position: 'absolute',
                top: `${dropIndicator.top}px`,
                left: `${dropIndicator.left}px`,
                width: `${dropIndicator.width}px`,
                height: `${dropIndicator.height}px`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              <div className="raindrop-specular-sheen" />
              {dropIndicator.isDropping && (
                <div className="raindrop-splash-wave" />
              )}
            </div>
          )}

          {/* In Collapsed Mode: Clean centered icons with hover tooltips */}
          {isCollapsed ? (
            <nav className="sidebar-nav" style={{ marginTop: '8px', padding: '0 4px', gap: '6px' }}>
              {compactQuickItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    data-route-id={item.id}
                    onClick={() => setCurrentRoute(item.id)}
                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    title={item.label}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      margin: '0 auto',
                      borderRadius: '14px',
                      background: 'transparent',
                      border: 'none',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s ease, transform 0.2s ease'
                    }}
                  >
                    <Icon className="nav-icon" size={19} />
                  </button>
                );
              })}
            </nav>
          ) : (
            /* In Expanded Mode: Collapsible sections with visual hierarchy */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px' }}>
              {navigationSections.map((section) => {
                const isOpen = openSections[section.key];
                return (
                  <div key={section.key} style={{ display: 'flex', flexDirection: 'column' }}>
                    <button
                      type="button"
                      onClick={() => toggleSection(section.key)}
                      className="sidebar-section-header"
                      title={`Click to ${isOpen ? 'collapse' : 'expand'} ${section.label}`}
                    >
                      <span>{section.label}</span>
                      <span className="section-chevron">
                        {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      </span>
                    </button>

                    {isOpen && (
                      <nav className="sidebar-nav" style={{ padding: '2px 10px', gap: '3px' }}>
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = currentRoute === item.id;
                          return (
                            <button
                              key={item.id}
                              data-route-id={item.id}
                              onClick={() => setCurrentRoute(item.id)}
                              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                              style={{
                                position: 'relative',
                                zIndex: 2,
                                background: 'transparent',
                                border: 'none',
                                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                                padding: '8px 14px',
                                borderRadius: '9999px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '11px',
                                fontSize: '0.84rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                transition: 'color 0.18s ease, transform 0.18s ease'
                              }}
                            >
                              <Icon className="nav-icon" size={16} />
                              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.label}
                              </span>
                            </button>
                          );
                        })}
                      </nav>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer User Info */}
      {isCollapsed ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '10px 0' }}>
          <button
            onClick={() => setCurrentRoute('activity-log')}
            title="Notifications & Activity"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--glass-pill-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Bell size={16} />
          </button>
          <button
            onClick={() => setCurrentRoute('settings')}
            title="Shop Settings"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--glass-pill-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Settings size={16} />
          </button>
          <div
            onClick={onLogout}
            title={`Signed in as ${userName}. Click to logout.`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.35)'
            }}
          >
            {userName ? userName[0].toUpperCase() : 'S'}
          </div>
        </div>
      ) : (
        <div className="sidebar-footer" style={{ padding: '14px 16px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              SIGNED IN
            </span>
            <button
              onClick={onEditProfile}
              style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 700 }}
            >
              Edit profile
            </button>
          </div>

          <div className="sidebar-user-card" style={{ padding: '8px 12px', borderRadius: '14px' }}>
            <div className="sidebar-user-left">
              <div className="sidebar-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                <span>{userName ? userName[0].toUpperCase() : 'S'}</span>
                <div className="sidebar-avatar-edit">
                  <Pencil size={8} />
                </div>
              </div>
              <div className="sidebar-user-meta">
                <span className="sidebar-user-name" style={{ fontSize: '0.84rem' }}>{userName || 'Sakib'}</span>
                <span className="sidebar-user-role" style={{ fontSize: '0.7rem' }}>
                  <span className="sidebar-online-dot"></span>
                  Merchant admin
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="sidebar-logout-btn"
              style={{ padding: '5px' }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      )}
    </aside>
    </>
  );
}
