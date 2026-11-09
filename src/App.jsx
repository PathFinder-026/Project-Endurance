import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import JarvisCopilot from './components/JarvisCopilot';
import VoiceMicModal from './components/VoiceMicModal';
import AddProductModal from './components/AddProductModal';
import AddCategoryModal from './components/AddCategoryModal';
import AddTableModal from './components/AddTableModal';
import InspectOrderModal from './components/InspectOrderModal';
import EditProfileModal from './components/EditProfileModal';
import PizzaModifierModal from './components/PizzaModifierModal';
import ThermalReceiptModal from './components/ThermalReceiptModal';
import DeliveryMapModal from './components/DeliveryMapModal';
import WhatsAppPhoneSimulator from './components/WhatsAppPhoneSimulator';
import AiVisionScannerModal from './components/AiVisionScannerModal';
import WhiteLabelThemeModal from './components/WhiteLabelThemeModal';
import AmbientBackground from './components/AmbientBackground';

import LoginPage from './pages/LoginPage';
import LiveOpsKitchen from './pages/LiveOpsKitchen';
import MenuCatalog from './pages/MenuCatalog';
import MenuCategories from './pages/MenuCategories';
import PantryStock from './pages/PantryStock';
import LedgerDisputes from './pages/LedgerDisputes';
import LocalMarketing from './pages/LocalMarketing';
import ReservationsFloor from './pages/ReservationsFloor';
import CustomersCRM from './pages/CustomersCRM';
import Subscriptions from './pages/Subscriptions';
import FinancialsTips from './pages/FinancialsTips';
import AiAssistantDialect from './pages/AiAssistantDialect';
import ComplianceLogs from './pages/ComplianceLogs';
import OrderHistory from './pages/OrderHistory';
import UnifiedCommsInbox from './pages/UnifiedCommsInbox';
import WabaSetup from './pages/WabaSetup';
import ShopSettings from './pages/ShopSettings';
import TeamAdmins from './pages/TeamAdmins';
import MessageActivityLog from './pages/MessageActivityLog';

import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_TABLES,
  INITIAL_CUSTOMERS
} from './data/mockData';
import {
  fetchDashboardData,
  updateOrderStatus,
  toggleProductStock,
  adjustProductStock,
  addProductToDb,
  addCategoryToDb,
  subscribeToRealtimeOrders,
  createLiveOrder,
  updateTableStatus,
  addComplianceLog,
  updateMerchantBrandConfig,
  playKitchenAudioChime
} from './lib/databaseService';
import { DEFAULT_MERCHANT_ID } from './lib/supabase';
import { Mic, Bot } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('live-ops');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('village_shop_theme') || 'dark';
  });
  const [hideValues, setHideValues] = useState(false);
  const [userName, setUserName] = useState('Sakib');

  // Core Data Collections
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [complianceLogs, setComplianceLogs] = useState([]);

  // Modals & Assistant State
  const [isJarvisOpen, setIsJarvisOpen] = useState(false);
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [inspectingOrder, setInspectingOrder] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Phase 1 Specialized Modals
  const [isPizzaBuilderOpen, setIsPizzaBuilderOpen] = useState(false);
  const [printingOrder, setPrintingOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [isWhatsAppSimulatorOpen, setIsWhatsAppSimulatorOpen] = useState(false);
  const [isVisionScannerOpen, setIsVisionScannerOpen] = useState(false);
  const [isWhiteLabelOpen, setIsWhiteLabelOpen] = useState(false);
  const [brandConfig, setBrandConfig] = useState({
    storeName: 'The Braehead Slice',
    tagline: 'Artisan Glasgow Sourdough & Kebabs',
    paletteId: 'emerald'
  });

  const [isDbConnected, setIsDbConnected] = useState(false);
  const [dbToast, setDbToast] = useState('');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('village_shop_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Load real-time data from Supabase on mount
  useEffect(() => {
    async function initSupabaseData() {
      const data = await fetchDashboardData(DEFAULT_MERCHANT_ID);
      if (data && data.isLiveDb) {
        setIsDbConnected(true);
        if (data.products?.length) setProducts(data.products);
        if (data.categories?.length) setCategories(data.categories);
        if (data.orders?.length) setOrders(data.orders);
        if (data.tables?.length) setTables(data.tables);
        if (data.customers?.length) {
          setCustomers(data.customers.map(c => ({
            id: c.id,
            name: c.name,
            phone: c.phone,
            tier: c.tier || 'Standard',
            streak: (c.streak_weeks && c.streak_weeks > 0) ? `🔥 ${c.streak_weeks} wks` : 'None',
            status: 'Active',
            ordersCount: c.orders_count || 1,
            totalSpent: parseFloat(c.total_spent || 0),
            dietaryTags: c.dietary_tags || [],
            lastOrder: 'Recent'
          })));
        }
        if (data.complianceLogs?.length) {
          setComplianceLogs(data.complianceLogs.map(l => ({
            id: l.id,
            date: new Date(l.created_at).toLocaleString('en-GB'),
            merchant: 'The Braehead Slice',
            phone: l.customer_phone_masked,
            reason: l.reason,
            logType: l.log_type,
            driverId: l.driver_id,
            gps: l.gps_coordinates
          })));
        }
        if (data.merchant?.trading_name) {
          setBrandConfig((prev) => ({
            ...prev,
            storeName: data.merchant.trading_name,
            tagline: data.merchant.white_label_config?.tagline || prev.tagline
          }));
        }
        setDbToast('Connected to Supabase Live Database!');
        setTimeout(() => setDbToast(''), 4000);
      }
    }
    initSupabaseData();

    // Subscribe to real-time order changes via Supabase WebSocket
    const unsubscribe = subscribeToRealtimeOrders(
      DEFAULT_MERCHANT_ID,
      (newOrder) => {
        playKitchenAudioChime();
        setOrders((prev) => [newOrder, ...prev]);
        setDbToast(`⚡ Real-Time Order #${newOrder.id} received on Kitchen KDS!`);
        setTimeout(() => setDbToast(''), 6000);
      },
      (updatedPayload) => {
        setOrders((prev) =>
          prev.map((o) =>
            (o.dbId === updatedPayload.id || o.id === String(updatedPayload.order_number))
              ? { ...o, status: updatedPayload.status, stage: updatedPayload.stage }
              : o
          )
        );
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Handlers with direct Supabase Database synchronization
  const handleToggleStock = async (productId) => {
    const target = products.find(p => p.id === productId);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    if (target) {
      await toggleProductStock(productId, target.inStock);
    }
  };

  const handleAddProduct = async (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setCategories((prev) =>
      prev.map((c) =>
        c.name === newProduct.category
          ? { ...c, productsCount: c.productsCount + 1 }
          : c
      )
    );
    await addProductToDb(DEFAULT_MERCHANT_ID, newProduct);
  };

  const handleAddCategory = async (newCat) => {
    setCategories((prev) => [...prev, newCat]);
    await addCategoryToDb(DEFAULT_MERCHANT_ID, newCat.name);
  };

  const handleRemoveCategory = (catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const handleAdjustStock = async (productId, delta) => {
    const target = products.find(p => p.id === productId);
    const newStock = Math.max(0, (target?.stock || 0) + delta);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    );
    await adjustProductStock(productId, newStock);
  };

  const handleBumpOrder = async (orderId) => {
    const target = orders.find(o => o.id === orderId);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'Confirmed & In Oven', stage: 'active' }
          : o
      )
    );
    if (target?.dbId) {
      await updateOrderStatus(target.dbId, 'in_kitchen', 'active');
    }
  };

  const handleAddTable = (newTable) => {
    setTables((prev) => [...prev, newTable]);
  };

  const handleUpdateTableStatus = async (tableCode, newStatus) => {
    setTables((prev) => prev.map((t) => (t.id === tableCode ? { ...t, status: newStatus } : t)));
    await updateTableStatus(DEFAULT_MERCHANT_ID, tableCode, newStatus);
  };

  const handlePlaceLiveOrder = async (orderData) => {
    playKitchenAudioChime();
    const inserted = await createLiveOrder(DEFAULT_MERCHANT_ID, orderData);
    if (!inserted) {
      const fallbackOrder = {
        id: String(Math.floor(100 + Math.random() * 900)),
        customerName: orderData.customerName,
        phone: orderData.phone,
        address: orderData.address,
        deliveryType: orderData.deliveryType,
        amount: orderData.amount,
        status: 'pending',
        stage: 'pending',
        timeAgo: 'Just now',
        items: orderData.items || []
      };
      setOrders((prev) => [fallbackOrder, ...prev]);
    }
    setDbToast('⚡ Live Order sent to Kitchen Screen via Supabase!');
    setTimeout(() => setDbToast(''), 5000);
  };

  const handleAddComplianceLog = async (logData) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toLocaleString('en-GB'),
      merchant: brandConfig.storeName,
      phone: logData.customerPhoneMasked || '+44 77** *** 123',
      reason: logData.reason
    };
    setComplianceLogs((prev) => [newLog, ...prev]);
    await addComplianceLog(DEFAULT_MERCHANT_ID, logData);
    setDbToast('🔒 Age refusal Challenge 25 recorded in compliance log!');
    setTimeout(() => setDbToast(''), 5000);
  };

  const handleUpdateBrandConfig = async (newConfig) => {
    setBrandConfig(newConfig);
    await updateMerchantBrandConfig(DEFAULT_MERCHANT_ID, newConfig);
    setDbToast('🎨 White-label brand theme saved to Supabase!');
    setTimeout(() => setDbToast(''), 4000);
  };

  const handleExecuteVoiceCommand = (cmd) => {
    if (cmd.includes('Bump')) {
      const firstPending = orders.find((o) => o.stage === 'pending');
      if (firstPending) {
        handleBumpOrder(firstPending.id);
        alert(`Voice command executed: Order #${firstPending.id} bumped to Confirmed!`);
      }
    } else if (cmd.includes('stock')) {
      setCurrentRoute('inventory');
    } else if (cmd.includes('reservation')) {
      setCurrentRoute('reservations');
    } else {
      alert(`Voice action performed: "${cmd}"`);
    }
  };

  // If not logged in, show exact login page
  if (!isLoggedIn) {
    return (
      <>
        <AmbientBackground />
        <LoginPage
          onLogin={() => setIsLoggedIn(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </>
    );
  }

  return (
    <>
      {/* Apple Light Glass Ambient Atmosphere Canvas */}
      <AmbientBackground />

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>

      {/* Exact Sidebar with COMMERCE, SETTINGS & WHATSAPP, ADMINISTRATION */}
      <Sidebar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        onLogout={() => setIsLoggedIn(false)}
        onEditProfile={() => setIsEditProfileOpen(true)}
        userName={userName}
      />

      <div className="main-wrapper">
        {/* Top Header Bar */}
        <Header
          currentRoute={currentRoute}
          theme={theme}
          toggleTheme={toggleTheme}
          userName={userName}
          storeName={brandConfig.storeName}
          isDbConnected={isDbConnected}
          onNavigate={(route) => setCurrentRoute(route)}
          onOpenWhatsAppSimulator={() => setIsWhatsAppSimulatorOpen(true)}
          onOpenWhiteLabel={() => setIsWhiteLabelOpen(true)}
          onOpenVisionScanner={() => setIsVisionScannerOpen(true)}
          onOpenPizzaBuilder={() => setIsPizzaBuilderOpen(true)}
          orders={orders}
          products={products}
          customers={customers}
          onLogout={() => setIsLoggedIn(false)}
          onEditProfile={() => setIsEditProfileOpen(true)}
          onInspectOrder={(order) => setInspectingOrder(order)}
        />

        {/* Dynamic Route View with Fluid Raindrop Page Transition */}
        <main key={currentRoute} className="page-fluid-transition" style={{ flex: 1 }}>
          {currentRoute === 'live-ops' && (
            <LiveOpsKitchen
              orders={orders}
              onBumpOrder={handleBumpOrder}
              onInspectOrder={(order) => setInspectingOrder(order)}
              onOpenAddProduct={() => setIsAddProductOpen(true)}
              onOpenThermalReceipt={(order) => setPrintingOrder(order || orders[0])}
              onOpenDeliveryMap={(order) => setTrackingOrder(order || orders[0])}
              onNavigate={(route) => setCurrentRoute(route)}
              hideValues={hideValues}
              setHideValues={setHideValues}
            />
          )}

          {currentRoute === 'menu-catalog' && (
            <MenuCatalog
              products={products}
              categories={categories}
              onToggleStock={handleToggleStock}
              onOpenAddProduct={() => setIsAddProductOpen(true)}
              onOpenCategories={() => setCurrentRoute('categories')}
              onOpenPizzaBuilder={() => setIsPizzaBuilderOpen(true)}
              onOpenVisionScanner={() => setIsVisionScannerOpen(true)}
              hideValues={hideValues}
            />
          )}

          {currentRoute === 'categories' && (
            <MenuCategories
              categories={categories}
              onOpenAddCategory={() => setIsAddCategoryOpen(true)}
              onRemoveCategory={handleRemoveCategory}
            />
          )}

          {currentRoute === 'inventory' && (
            <PantryStock
              products={products}
              onAdjustStock={handleAdjustStock}
              hideValues={hideValues}
            />
          )}

          {currentRoute === 'ledger' && (
            <LedgerDisputes hideValues={hideValues} />
          )}

          {currentRoute === 'marketing' && <LocalMarketing />}

          {currentRoute === 'reservations' && (
            <ReservationsFloor
              tables={tables}
              onUpdateTableStatus={handleUpdateTableStatus}
              onOpenAddTable={() => setIsAddTableOpen(true)}
            />
          )}

          {currentRoute === 'customers' && (
            <CustomersCRM
              customers={customers}
              onOpenSubscriptions={() => setCurrentRoute('subscriptions')}
              hideValues={hideValues}
            />
          )}

          {currentRoute === 'subscriptions' && (
            <Subscriptions hideValues={hideValues} />
          )}

          {currentRoute === 'financials' && (
            <FinancialsTips hideValues={hideValues} />
          )}

          {currentRoute === 'ai-copilot' && (
            <AiAssistantDialect
              onNavigateToCompliance={() => setCurrentRoute('compliance')}
            />
          )}

          {currentRoute === 'compliance' && (
            <ComplianceLogs
              complianceLogs={complianceLogs}
              onLogRefusal={handleAddComplianceLog}
            />
          )}

          {currentRoute === 'orders' && (
            <OrderHistory orders={orders} hideValues={hideValues} />
          )}

          {currentRoute === 'chats' && <UnifiedCommsInbox />}

          {currentRoute === 'waba-setup' && <WabaSetup />}

          {currentRoute === 'settings' && (
            <ShopSettings onOpenWhiteLabel={() => setIsWhiteLabelOpen(true)} />
          )}

          {currentRoute === 'team' && <TeamAdmins />}

          {currentRoute === 'activity-log' && <MessageActivityLog />}
        </main>

        {/* Floating Assistant Fab Bar */}
        <div className="floating-assistant-bar">
          <button
            onClick={() => setIsMicOpen(true)}
            className="mic-fab"
            title="Voice Commands"
          >
            <Mic size={20} color="#059669" />
          </button>

          <button
            onClick={() => setIsJarvisOpen(true)}
            className="jarvis-fab"
            title="Open Jarvis AI Store Co-Pilot"
          >
            <Bot size={18} />
            <span>Jarvis Co-Pilot</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>✓</span>
          </button>
        </div>
      </div>

      {/* Global Modals */}
      <JarvisCopilot
        isOpen={isJarvisOpen}
        onClose={() => setIsJarvisOpen(false)}
        orders={orders}
        products={products}
        onBumpOrder={handleBumpOrder}
      />

      <VoiceMicModal
        isOpen={isMicOpen}
        onClose={() => setIsMicOpen(false)}
        onExecuteVoiceCommand={handleExecuteVoiceCommand}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        categories={categories}
      />

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onAddCategory={handleAddCategory}
      />

      <AddTableModal
        isOpen={isAddTableOpen}
        onClose={() => setIsAddTableOpen(false)}
        onAddTable={handleAddTable}
      />

      <InspectOrderModal
        isOpen={!!inspectingOrder}
        onClose={() => setInspectingOrder(null)}
        order={inspectingOrder}
        onBump={handleBumpOrder}
        onPrintReceipt={(order) => setPrintingOrder(order)}
        onTrackDelivery={(order) => setTrackingOrder(order)}
        onOpenPizzaBuilder={() => setIsPizzaBuilderOpen(true)}
        hideValues={hideValues}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userName={userName}
        onSaveName={(name) => setUserName(name)}
      />

      {/* Phase 1 Specialized Modals */}
      <PizzaModifierModal
        isOpen={isPizzaBuilderOpen}
        onClose={() => setIsPizzaBuilderOpen(false)}
        onAddCustomPizza={(customItem) => {
          setProducts((prev) => [customItem, ...prev]);
        }}
      />

      <ThermalReceiptModal
        isOpen={!!printingOrder}
        onClose={() => setPrintingOrder(null)}
        order={printingOrder}
      />

      <DeliveryMapModal
        isOpen={!!trackingOrder}
        onClose={() => setTrackingOrder(null)}
        order={trackingOrder}
      />

      <WhatsAppPhoneSimulator
        isOpen={isWhatsAppSimulatorOpen}
        onClose={() => setIsWhatsAppSimulatorOpen(false)}
        onPlaceOrder={handlePlaceLiveOrder}
      />

      <AiVisionScannerModal
        isOpen={isVisionScannerOpen}
        onClose={() => setIsVisionScannerOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <WhiteLabelThemeModal
        isOpen={isWhiteLabelOpen}
        onClose={() => setIsWhiteLabelOpen(false)}
        brandConfig={brandConfig}
        onUpdateBrand={handleUpdateBrandConfig}
      />

      {/* Real-Time Database Alert Toast - Apple Light Glass */}
      {dbToast && (
        <div className="apple-toast-container">
          <span className="apple-toast-beacon" />
          <span>{dbToast}</span>
        </div>
      )}
    </div>
    </>
  );
}
