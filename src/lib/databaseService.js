import { supabase, DEFAULT_MERCHANT_ID } from './supabase';

/**
 * Fetch all core dashboard data from Supabase for a given merchant.
 * Returns mapped objects compatible with our frontend components.
 */
export async function fetchDashboardData(merchantId = DEFAULT_MERCHANT_ID) {
  try {
    // 1. Fetch Merchant Profile
    const { data: merchantData } = await supabase
      .from('merchants')
      .select('*')
      .eq('id', merchantId)
      .maybeSingle();

    // 2. Fetch Categories
    const { data: categoriesData, error: catErr } = await supabase
      .from('categories')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('sort_order', { ascending: true });

    // 3. Fetch Products
    const { data: productsData, error: prodErr } = await supabase
      .from('products')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    // 4. Fetch Orders with Items
    const { data: ordersData, error: ordErr } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    // 5. Fetch Dining Tables
    const { data: tablesData, error: tblErr } = await supabase
      .from('dining_tables')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('code', { ascending: true });

    // 6. Fetch Customers
    const { data: customersData } = await supabase
      .from('customers')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    // 7. Fetch Compliance Logs
    const { data: complianceData } = await supabase
      .from('compliance_logs')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false });

    // Map Categories
    const categories = (categoriesData || []).map(c => ({
      id: c.id,
      name: c.name,
      productsCount: (productsData || []).filter(p => p.category_id === c.id).length || 0,
      sortOrder: c.sort_order
    }));

    // Map Products
    const categoryMap = new Map((categoriesData || []).map(c => [c.id, c.name]));
    const products = (productsData || []).map(p => ({
      id: p.id,
      name: p.name,
      category: categoryMap.get(p.category_id) || 'Pizzas',
      brand: p.brand || 'The Braehead Slice',
      price: parseFloat(p.price),
      stock: p.stock ?? 50,
      reorderLevel: p.reorder_level ?? 10,
      inStock: p.in_stock,
      status: p.status || 'active',
      createdAt: new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: p.image_url || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80',
      description: p.description || '',
      restriction: (p.dietary_tags && p.dietary_tags.length > 0) ? p.dietary_tags[0] : 'None',
      expiryDays: p.expiry_days || 30
    }));

    // Map Orders
    const orders = (ordersData || []).map(o => ({
      id: o.order_number ? String(o.order_number) : o.id.slice(0, 8),
      dbId: o.id,
      customerName: o.customer_name,
      phone: o.phone,
      address: o.delivery_address,
      deliveryType: o.delivery_type,
      amount: parseFloat(o.amount),
      subtotal: parseFloat(o.subtotal || o.amount),
      deliveryFee: parseFloat(o.delivery_fee || 2.50),
      commissionSaved: parseFloat(o.commission_saved || 0.00),
      status: o.status,
      stage: o.stage || o.status,
      timeAgo: 'Just now',
      driver: o.driver_name,
      driverEta: o.driver_eta,
      softAcceptRemaining: o.soft_accept_countdown || 60,
      items: (o.order_items || []).map(it => ({
        name: it.name,
        qty: it.qty,
        price: parseFloat(it.unit_price),
        modifiers: it.modifiers
      }))
    }));

    // Map Tables
    const tables = (tablesData || []).map(t => ({
      id: t.code,
      dbId: t.id,
      name: t.name,
      seats: t.seats,
      zone: t.zone,
      status: t.status
    }));

    return {
      merchant: merchantData,
      categories,
      products,
      orders,
      tables,
      customers: customersData || [],
      complianceLogs: complianceData || [],
      isLiveDb: true
    };
  } catch (err) {
    console.error('Error fetching Supabase dashboard data:', err);
    return null;
  }
}

/**
 * Update order stage / status in Supabase
 */
export async function updateOrderStatus(orderDbId, newStatus, newStage) {
  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status: newStatus,
        stage: newStage || newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderDbId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error updating order status in Supabase:', err);
    return false;
  }
}

/**
 * Toggle product stock status in Supabase
 */
export async function toggleProductStock(productId, currentInStock) {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        in_stock: !currentInStock,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error toggling stock in Supabase:', err);
    return false;
  }
}

/**
 * Adjust product stock number in Supabase
 */
export async function adjustProductStock(productId, newStock) {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        stock: newStock,
        in_stock: newStock > 0,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error adjusting stock in Supabase:', err);
    return false;
  }
}

/**
 * Add a new product into Supabase
 */
export async function addProductToDb(merchantId = DEFAULT_MERCHANT_ID, productData) {
  try {
    // Lookup category UUID
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('name', productData.category)
      .maybeSingle();

    const { data, error } = await supabase
      .from('products')
      .insert({
        merchant_id: merchantId,
        category_id: cat?.id || null,
        name: productData.name,
        brand: productData.brand || 'The Braehead Slice',
        price: productData.price,
        stock: productData.stock || 50,
        reorder_level: productData.reorderLevel || 10,
        in_stock: true,
        status: 'active',
        image_url: productData.image,
        description: productData.description || '',
        dietary_tags: productData.restriction ? [productData.restriction] : ['None'],
        expiry_days: productData.expiryDays || 30
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error inserting product into Supabase:', err);
    return null;
  }
}

/**
 * Add a new category into Supabase
 */
export async function addCategoryToDb(merchantId = DEFAULT_MERCHANT_ID, categoryName) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        merchant_id: merchantId,
        name: categoryName,
        sort_order: 10
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error inserting category into Supabase:', err);
    return null;
  }
}

/**
 * Subscribe to real-time changes on Orders table via Supabase WebSocket
 */
export function subscribeToRealtimeOrders(merchantId = DEFAULT_MERCHANT_ID, onInsert, onUpdate) {
  const channel = supabase
    .channel(`realtime:orders:${merchantId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
        filter: `merchant_id=eq.${merchantId}`
      },
      async (payload) => {
        // Fetch order items for the newly inserted order
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', payload.new.id);

        const newOrder = {
          id: payload.new.order_number ? String(payload.new.order_number) : payload.new.id.slice(0, 8),
          dbId: payload.new.id,
          customerName: payload.new.customer_name,
          phone: payload.new.phone,
          address: payload.new.delivery_address,
          deliveryType: payload.new.delivery_type,
          amount: parseFloat(payload.new.amount),
          subtotal: parseFloat(payload.new.subtotal || payload.new.amount),
          deliveryFee: parseFloat(payload.new.delivery_fee || 2.50),
          commissionSaved: parseFloat(payload.new.commission_saved || 0.00),
          status: payload.new.status,
          stage: payload.new.stage || payload.new.status,
          timeAgo: 'Just now',
          driver: payload.new.driver_name,
          driverEta: payload.new.driver_eta,
          softAcceptRemaining: payload.new.soft_accept_countdown || 60,
          items: (items || []).map(it => ({
            name: it.name,
            qty: it.qty,
            price: parseFloat(it.unit_price),
            modifiers: it.modifiers
          }))
        };

        if (onInsert) onInsert(newOrder);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `merchant_id=eq.${merchantId}`
      },
      (payload) => {
        if (onUpdate) onUpdate(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Insert a brand new live order into Supabase (orders + order_items)
 * This immediately triggers the real-time WebSocket on all connected merchant screens.
 */
export async function createLiveOrder(merchantId = DEFAULT_MERCHANT_ID, orderData) {
  try {
    const subtotal = orderData.subtotal || 17.23;
    const deliveryFee = orderData.deliveryFee ?? 2.50;
    const totalAmount = orderData.amount || (subtotal + deliveryFee);
    const commissionSaved = (totalAmount * 0.30).toFixed(2); // 30% saved vs Just Eat

    // 1. Insert Order
    const { data: newOrder, error: orderErr } = await supabase
      .from('orders')
      .insert({
        merchant_id: merchantId,
        customer_name: orderData.customerName || 'Akash (WhatsApp VIP)',
        phone: orderData.phone || '+44 7700 900123',
        delivery_address: orderData.address || '12 Braehead St, Glasgow G51 1XQ',
        delivery_type: orderData.deliveryType || 'Delivery',
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        commission_saved: commissionSaved,
        amount: totalAmount,
        status: 'pending',
        stage: 'pending',
        driver_name: orderData.driverName || 'Michael (Honda Scooter)',
        driver_eta: '25 mins',
        soft_accept_countdown: 60,
        payment_status: 'paid_stripe'
      })
      .select()
      .single();

    if (orderErr) throw orderErr;

    // 2. Insert Order Items
    const items = orderData.items && orderData.items.length > 0 ? orderData.items : [
      {
        name: '12" Braehead Special Pizza (Stone-charred)',
        qty: 1,
        unit_price: 14.50,
        total_price: 14.50,
        modifiers: { doneness: 'well-done', cut: '4-slices', sauce: 'San Marzano' }
      },
      {
        name: 'Barr Irn-Bru Can (330ml)',
        qty: 1,
        unit_price: 2.73,
        total_price: 2.73,
        modifiers: { chilled: true }
      }
    ];

    const itemsToInsert = items.map(item => ({
      order_id: newOrder.id,
      name: item.name,
      qty: item.qty || 1,
      unit_price: item.price || item.unit_price,
      total_price: (item.price || item.unit_price) * (item.qty || 1),
      modifiers: item.modifiers || {}
    }));

    await supabase.from('order_items').insert(itemsToInsert);

    return newOrder;
  } catch (err) {
    console.error('Error creating live order in Supabase:', err);
    return null;
  }
}

/**
 * Update dining table status in Supabase
 */
export async function updateTableStatus(merchantId = DEFAULT_MERCHANT_ID, tableCode, newStatus) {
  try {
    const { error } = await supabase
      .from('dining_tables')
      .update({ status: newStatus })
      .eq('merchant_id', merchantId)
      .eq('code', tableCode);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error updating table status in Supabase:', err);
    return false;
  }
}

/**
 * Log a council compliance record (Age refusal Challenge 25 or Scottish MUP) into Supabase
 */
export async function addComplianceLog(merchantId = DEFAULT_MERCHANT_ID, logData) {
  try {
    const { data, error } = await supabase
      .from('compliance_logs')
      .insert({
        merchant_id: merchantId,
        log_type: logData.logType || 'age_refusal',
        customer_phone_masked: logData.customerPhoneMasked || '+44 77** *** 123',
        reason: logData.reason,
        driver_id: logData.driverId || 'Driver #04',
        gps_coordinates: logData.gpsCoordinates || '55.8642° N, 4.2518° W'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error logging compliance in Supabase:', err);
    return null;
  }
}

/**
 * Update White-Label Brand configuration in Supabase
 */
export async function updateMerchantBrandConfig(merchantId = DEFAULT_MERCHANT_ID, brandConfig) {
  try {
    const { error } = await supabase
      .from('merchants')
      .update({
        trading_name: brandConfig.storeName,
        white_label_config: {
          paletteId: brandConfig.paletteId,
          tagline: brandConfig.tagline
        },
        updated_at: new Date().toISOString()
      })
      .eq('id', merchantId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error updating merchant brand config in Supabase:', err);
    return false;
  }
}

/**
 * Play authentic two-tone restaurant KDS kitchen chime (Ding-Dong 587Hz -> 880Hz)
 * Synthesized using browser Web Audio API — works 100% offline with zero assets.
 */
export function playKitchenAudioChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    
    // First tone (587.33 Hz - D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second tone (880.00 Hz - A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.16);
    gain2.gain.setValueAtTime(0.4, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.65);
  } catch (e) {
    // Non-blocking in case of audio autoplay restrictions
    console.warn('Audio chime skipped:', e);
  }
}


