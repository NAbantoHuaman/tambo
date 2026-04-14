import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Moon, 
  Sun, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  LogOut,
  CreditCard,
  Banknote,
  Smartphone,
  Info,
  Search,
  Plus,
  Minus,
  Receipt,
  FileText,
  X,
  Package,
  CupSoda,
  Cookie as CookieIcon,
  Beer,
  Droplets,
  Pizza,
  Coffee,
  IceCream,
  Milk,
  Wind
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_PRODUCTS = [
  // BEBIDAS (Gaseosas, Aguas, Energizantes)
  { id: 1, name: 'Inca Kola 500ml', price: 3.50, stock: 24, category: 'Bebidas', icon: 'CupSoda', image: '/inka_kola_premium.png', color: 'from-yellow-400 to-yellow-600' },
  { id: 11, name: 'Coca-Cola 500ml', price: 3.50, stock: 20, category: 'Bebidas', icon: 'CupSoda', image: '/coca_cola_premium.png', color: 'from-red-600 to-red-800' },
  { id: 12, name: 'Sprite 500ml', price: 3.20, stock: 15, category: 'Bebidas', icon: 'CupSoda', image: '/sprite.png', color: 'from-emerald-500 to-green-600' },
  { id: 13, name: 'Pepsi 500ml', price: 3.00, stock: 18, category: 'Bebidas', icon: 'CupSoda', image: '/pepsi.png', color: 'from-blue-600 to-blue-800' },
  { id: 7, name: 'Agua San Luis 625ml', price: 2.50, stock: 30, category: 'Bebidas', icon: 'Droplets', image: '/agua_san_luis.png', color: 'from-blue-400 to-indigo-500' },
  { id: 30, name: 'Red Bull 250ml', price: 6.90, stock: 15, category: 'Bebidas', icon: 'Zap', image: '/red_bull.png', color: 'from-blue-700 to-red-600' },
  { id: 31, name: 'Monster Energy 473ml', price: 7.50, stock: 12, category: 'Bebidas', icon: 'Zap', image: '/monster.png', color: 'from-green-800 to-black' },
  
  // COMIDA LISTA (Pizzas, Empanadas, Choripán)
  { id: 3, name: 'Sándwich Pollo Mayo', price: 7.50, stock: 12, category: 'Comida', icon: 'Pizza', image: '/sandwich_tambo_premium.png', color: 'from-purple-400 to-pink-500' },
  { id: 32, name: 'Empanada de Carne', price: 4.90, stock: 20, category: 'Comida', icon: 'Pizza', image: '/empanada_premium.png', color: 'from-amber-600 to-orange-700' },
  { id: 33, name: 'Porción Pizza Americana', price: 5.50, stock: 15, category: 'Comida', icon: 'Pizza', image: '/pizza_premium.png', color: 'from-red-500 to-orange-500' },
  { id: 34, name: 'Choripán Tambo', price: 6.50, stock: 10, category: 'Comida', icon: 'Pizza', image: '/choripan_premium.png', color: 'from-orange-500 to-red-700' },
  { id: 35, name: 'Enrollado de Salchicha', price: 4.50, stock: 18, category: 'Comida', icon: 'Pizza', image: '/enrollado.png', color: 'from-amber-400 to-yellow-600' },
  { id: 36, name: 'Tamalito de Pollo', price: 5.90, stock: 8, category: 'Comida', icon: 'Package', image: '/tamal.png', color: 'from-yellow-600 to-amber-800' },

  // PIQUEOS & SNACKS
  { id: 2, name: 'Galletas Casino Menta', price: 1.20, stock: 50, category: 'Snacks', icon: 'CookieIcon', image: '/galletas_casino.png', color: 'from-emerald-400 to-teal-500' },
  { id: 8, name: 'Papas Lays Clásicas', price: 4.50, stock: 12, category: 'Snacks', icon: 'Package', image: '/papas_lays.png', color: 'from-yellow-400 to-orange-500' },
  { id: 15, name: 'Galletas Pícaras XL', price: 1.50, stock: 40, category: 'Snacks', icon: 'CookieIcon', image: '/galletas_picaras.png', color: 'from-amber-700 to-amber-900' },
  { id: 37, name: 'Nachos Tambo con Queso', price: 5.50, stock: 25, category: 'Snacks', icon: 'Package', image: '/nachos_premium.png', color: 'from-yellow-500 to-orange-600' },
  { id: 38, name: 'Maní Salado Karinto', price: 1.00, stock: 60, category: 'Snacks', icon: 'Package', image: 'https://images.tambo.pe/products/00028266.png', color: 'from-blue-400 to-blue-700' },
  { id: 39, name: 'Oreo Original', price: 1.20, stock: 45, category: 'Snacks', icon: 'CookieIcon', image: '/oreo.png', color: 'from-blue-700 to-blue-900' },

  // DESAYUNO
  { id: 4, name: 'Pan de Molde Unión', price: 6.50, stock: 15, category: 'Desayuno', icon: 'Package', image: '/pan_de_molde.png', color: 'from-amber-500 to-yellow-700' },
  { id: 5, name: 'Leche Gloria 1L', price: 5.50, stock: 24, category: 'Desayuno', icon: 'Milk', image: '/leche_gloria.png', color: 'from-blue-600 to-blue-800' },
  { id: 40, name: 'Café Americano 8oz', price: 3.50, stock: 100, category: 'Desayuno', icon: 'Coffee', image: 'https://images.tambo.pe/products/00344754.png', color: 'from-amber-800 to-black' },
  
  // LICORES (Cervezas, Vinos)
  { id: 9, name: 'Cerveza Cristal Lata', price: 6.50, stock: 48, category: 'Licores', icon: 'Beer', image: '/cerveza_cristal.png', color: 'from-green-500 to-emerald-700' },
  { id: 14, name: 'Cerveza Cusqueña', price: 7.50, stock: 24, category: 'Licores', icon: 'Beer', image: '/cerveza_cusquena.png', color: 'from-yellow-600 to-amber-800' },
  { id: 41, name: 'Vino Rose Tacama', price: 28.90, stock: 10, category: 'Licores', icon: 'Beer', image: '/vino_rose.png', color: 'from-rose-400 to-pink-600' },
  { id: 42, name: 'Pisco Queirolo 750ml', price: 35.00, stock: 5, category: 'Licores', icon: 'Beer', image: '/pisco.png', color: 'from-slate-300 to-slate-500' },

  // HIGIENE & OTROS
  { id: 6, name: 'Hielo 2kg', price: 6.00, stock: 10, category: 'Otros', icon: 'Wind', image: '/hielo_premium.png', color: 'from-cyan-400 to-blue-500' },
  { id: 43, name: 'Papel Higiénico 4u', price: 4.50, stock: 20, category: 'Otros', icon: 'Package', image: '/papel_h.png', color: 'from-blue-100 to-blue-300' },
  { id: 44, name: 'Shampoo Head & Shoulders', price: 2.50, stock: 15, category: 'Otros', icon: 'Droplets', image: '/shampoo.png', color: 'from-blue-500 to-blue-700' },
];

const COMBOS = [
  { 
    id: 'c-empanada', 
    name: 'Combo Empanada', 
    items: [32, 1], // Empanada + Inca Kola
    discount: 1.40,
    trigger: [32, 1]
  },
  { 
    id: 'c-choripan', 
    name: 'Combo Choripán', 
    items: [34, 11], // Choripan + Coca-Cola
    discount: 2.00,
    trigger: [34, 11]
  },
  { 
    id: 'c-pizza', 
    name: 'Combo Pizza', 
    items: [33, 11], // Pizza + Coca-Cola
    discount: 1.50,
    trigger: [33, 11]
  },
  { 
    id: 'c-desayuno-patrio', 
    name: 'Desayuno Patrio', 
    items: [36, 40], // Tamal + Café
    discount: 1.90,
    trigger: [36, 40]
  },
  { 
    id: 'c-refrescante', 
    name: 'Combo Refrescante', 
    items: [1, 3], // Inca Kola + Sándwich
    discount: 1.50,
    trigger: [1, 3]
  },
  { 
    id: 'c-diversion', 
    name: 'Pack Diversión', 
    items: [8, 9], // Papas Lays + Cerveza
    discount: 2.50,
    trigger: [8, 9]
  },
  { 
    id: 'c-nachos', 
    name: 'Combo Nachos', 
    items: [37, 1], // Nachos + Inca Kola
    discount: 1.50,
    trigger: [37, 1]
  },
  { 
    id: 'c-chilcano', 
    name: 'Pack Chilcano', 
    items: [42, 12, 6], // Pisco + Sprite + Hielo
    discount: 5.00,
    trigger: [42, 12, 6]
  },
  { 
    id: 'c-karinto', 
    name: 'Dúo Karinto', 
    items: [38, 38], // 2 Maní
    discount: 0.30,
    trigger: [38, 38]
  },
  { 
    id: 'c-cerveza', 
    name: 'Dúo Cervezas', 
    items: [9, 9], // 2 Cervezas
    discount: 1.00,
    trigger: [9, 9]
  },
  { 
    id: 'c-higiene', 
    name: 'Dúo Higiene', 
    items: [43, 44], // Papel + Shampoo
    discount: 1.50,
    trigger: [43, 44]
  }
];

const ProductIcon = ({ name, image, size = 48, className = "", heroMode = false }) => {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${heroMode ? 'w-full h-52 rounded-2xl' : 'rounded-2xl shadow-lg border border-white/20 dark:border-white/10'} ${className}`} style={!heroMode ? { width: size * 1.8, height: size * 1.8 } : undefined}>
        <img src={image} alt={name} className={`w-full h-full object-contain transform transition-transform group-hover:scale-105 duration-700 ${heroMode ? 'p-4' : 'p-1'}`} />
      </div>
    );
  }

  const icons = {
    CupSoda: CupSoda,
    CookieIcon: CookieIcon,
    Package: Package,
    Beer: Beer,
    Droplets: Droplets,
    Pizza: Pizza,
    Coffee: Coffee,
    IceCream: IceCream,
    Milk: Milk,
    Wind: Wind,
    Zap: Smartphone // Usamos Zap para energizantes
  };
  
  const Icon = icons[name] || Package;
  return (
    <div className={`flex items-center justify-center ${heroMode ? 'w-full h-52 rounded-2xl' : 'rounded-2xl shadow-lg border border-white/20 dark:border-white/10'} bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-transparent backdrop-blur-xl ${className}`} style={!heroMode ? { width: size * 1.8, height: size * 1.8 } : undefined}>
      <Icon size={heroMode ? 80 : size} className="text-purple-500 dark:text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
    </div>
  );
};

// --- SUB-COMPONENTS ---
const ClearConfirmModal = ({ setShowClearConfirm, confirmClearCart }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] animate-in fade-in duration-200 p-4">
    <div className="bg-white dark:bg-[#2d1a4a] rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-purple-200 dark:border-purple-800 animate-in zoom-in-95 duration-200 text-center">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 dark:text-rose-400">
        <AlertTriangle size={40} />
      </div>
      <h3 className="text-2xl font-black text-purple-900 dark:text-white mb-2">¿Anular Venta?</h3>
      <p className="text-slate-500 dark:text-purple-300 mb-8 font-medium">Esta acción vaciará todo el carrito actual y no se puede deshacer.</p>
      <div className="flex gap-3">
        <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-4 bg-slate-100 dark:bg-purple-900/50 text-slate-600 dark:text-purple-300 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-purple-800 transition-all">
          Cancelar
        </button>
        <button onClick={confirmClearCart} className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95">
          Sí, Anular
        </button>
      </div>
    </div>
  </div>
);

const ProcessingCardModal = ({ setProcessingCard }) => (
  <div className="fixed inset-0 bg-[#6A0DAD]/60 backdrop-blur-md flex items-center justify-center z-[150] animate-in fade-in duration-300">
    <div className="bg-white dark:bg-[#2d1a4a] rounded-[3rem] p-12 w-full max-w-sm shadow-[0_20px_100px_rgba(0,0,0,0.5)] border border-white/20 text-center animate-in zoom-in-95 duration-300">
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 border-8 border-purple-100 dark:border-purple-900/50 rounded-full" />
        <div className="absolute inset-0 border-8 border-yellow-400 rounded-full border-t-transparent animate-spin" />
        <CreditCard size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 dark:text-yellow-400 animate-pulse" />
      </div>
      <h3 className="text-3xl font-black text-purple-900 dark:text-white mb-4 italic uppercase tracking-tight">Procesando...</h3>
      <p className="text-slate-500 dark:text-purple-300 font-bold animate-pulse text-sm tracking-widest uppercase">Comunicando con POS Izipay</p>
    </div>
  </div>
);

const TicketModal = ({ groupedItems, subtotal, discount, total, docType, onClose, date, lastTransaction }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] animate-in fade-in duration-300 p-4">
    <div className="bg-white text-slate-800 w-full max-w-sm rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col p-8 font-mono relative animate-in slide-in-from-bottom-10 border-t-8 border-[#6A0DAD]">
      <div className="absolute top-4 right-4 print:hidden">
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-rose-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-6">
        <h2 className="text-2xl font-black italic tracking-tighter mb-1">TAMBO+</h2>
        <p className="text-[10px] leading-tight">TIENDAS TAMBO S.A.C.</p>
        <p className="text-[10px] leading-tight text-slate-500 italic">Av. Javier Prado Este 1234, Lima</p>
        <p className="text-[10px] leading-tight text-slate-500 italic">RUC: 20551234567</p>
      </div>

      <div className="text-[10px] mb-6 space-y-1">
        <div className="flex justify-between"><span>FECHA: {date}</span><span>HORA: {new Date().toLocaleTimeString()}</span></div>
        <div className="flex justify-between"><span>TIENDA: IDAT-01</span><span>CAJA: 01</span></div>
        <div className="flex justify-between capitalize"><span>DOC: {docType} ELECTRÓNICA</span><span>SERIE: F001-00042</span></div>
      </div>

      <div className="border-b border-slate-200 mb-2 text-[10px] pb-1 font-bold flex justify-between uppercase">
        <span className="w-8">CANT</span>
        <span className="flex-1 px-2">DESCRIPCION</span>
        <span className="w-16 text-right">TOTAL</span>
      </div>

      <div className="flex-1 space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {groupedItems.map((group, i) => (
          <div key={i} className="space-y-1">
            {group.type === 'combo' && (
              <div className="text-[10px] font-black text-emerald-600 border-b border-emerald-100 pb-0.5 mb-1 italic">
                {group.name.toUpperCase()}
              </div>
            )}
            {group.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[11px] leading-tight group">
                <span className="w-8">{item.quantity}</span>
                <span className="flex-1 px-2 uppercase">{item.name}</span>
                <span className="w-16 text-right">S/ {(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
            {group.type === 'combo' && (
              <div className="flex justify-between text-[10px] font-bold text-emerald-600 pl-8">
                <span>DSCTO COMBO</span>
                <span>- S/ {group.discount.toFixed(2)}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-dashed border-slate-300 pt-4 space-y-2 mb-4">
        <div className="flex justify-between text-xs font-bold"><span>SUBTOTAL:</span><span>S/ {subtotal.toFixed(2)}</span></div>
        {discount > 0 && <div className="flex justify-between text-xs font-bold text-emerald-600"><span>AHORRO TOTAL:</span><span>- S/ {discount.toFixed(2)}</span></div>}
        <div className="flex justify-between text-lg font-black pt-2 border-t border-slate-100 text-[#6A0DAD]"><span>TOTAL:</span><span>S/ {total.toFixed(2)}</span></div>
      </div>

      {lastTransaction?.method === 'efectivo' && lastTransaction?.received > 0 && (
        <div className="border-t border-slate-100 pt-2 pb-4 space-y-1 mb-4">
          <div className="flex justify-between text-[11px] font-bold text-slate-500">
            <span>EFECTIVO RECIBIDO:</span>
            <span>S/ {lastTransaction.received.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[12px] font-black text-slate-900 bg-slate-50 p-1 rounded-lg px-2">
            <span>VUELTO:</span>
            <span>S/ {(lastTransaction.received - total).toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="text-center font-bold italic text-[11px] mb-8">
        ¡GRACIAS POR COMPRAR EN TAMBO!<br />
        <span className="text-[10px] not-italic font-normal text-slate-400">Escanee el QR para ver su comprobante</span>
      </div>

      <div className="flex flex-col gap-2 print:hidden">
        <button onClick={() => window.print()} className="w-full py-4 bg-[#6A0DAD] text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg">
          <Receipt size={20} /> IMPRIMIR TICKET
        </button>
        <button onClick={onClose} className="w-full py-2 text-slate-400 font-bold text-sm uppercase">Cerrar</button>
      </div>
    </div>
  </div>
);

const WarehouseModal = ({ products, setWarehouseModal }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-[150] animate-in fade-in duration-300 p-4">
    <div className="bg-[#f8f0fc] dark:bg-[#1a0b2e] rounded-[3rem] w-full max-w-4xl max-h-[90vh] shadow-[0_20px_80px_rgba(0,0,0,0.4)] border-4 border-purple-200 dark:border-purple-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
      <div className="p-8 border-b-4 border-purple-200 dark:border-purple-800 flex justify-between items-center bg-white dark:bg-[#2d1a4a]">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-800/50 rounded-3xl text-purple-600 dark:text-yellow-400">
            <ShoppingCart size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-purple-900 dark:text-white leading-tight">STOCK DE ALMACÉN</h2>
            <p className="text-purple-500 dark:text-purple-300 font-bold text-sm uppercase tracking-widest">Sincronización en tiempo real</p>
          </div>
        </div>
        <button onClick={() => setWarehouseModal(false)} className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-4 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-lg active:scale-95">
          <X size={28} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white/50 dark:bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white dark:bg-[#2d1a4a] p-4 rounded-3xl border-2 border-purple-100 dark:border-purple-800/50 flex items-center justify-between shadow-sm group hover:border-yellow-400 transition-all">
              <div className="flex items-center gap-4">
                <ProductIcon name={p.icon} image={p.image} size={24} />
                <div>
                  <p className="font-black text-purple-900 dark:text-white text-base leading-tight">{p.name}</p>
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-tighter">{p.category}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-3xl font-black ${p.stock <= 3 ? 'text-rose-600 animate-pulse' : 'text-purple-900 dark:text-yellow-400'}`}>
                  {p.stock}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase">Unidades</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-purple-900 text-white text-center font-bold tracking-widest text-xs uppercase animate-pulse">
        Sistema TamboSync v2.0 • Protegido por IDAT Security
      </div>
    </div>
  </div>
);

const SplitPaymentModal = ({ total, setPaymentModal, processPayment }) => {
  const [cashAmount, setCashAmount] = useState('');
  const amount = parseFloat(cashAmount) || 0;
  const remaining = total - amount;
  const isValid = amount > 0 && amount < total;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[150] animate-in fade-in duration-300 p-4">
      <div className="bg-white dark:bg-[#2d1a4a] rounded-[3rem] p-10 w-full max-w-md shadow-2xl border border-purple-200 dark:border-purple-800 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-black text-purple-900 dark:text-yellow-400 italic">PAGO DIVIDIDO</h3>
          <button onClick={() => setPaymentModal(null)} className="text-slate-400 hover:text-rose-500 bg-slate-100 dark:bg-purple-900/50 p-3 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 mb-8 text-center text-purple-900 dark:text-white">
          <div>
            <span className="block text-xs font-black uppercase text-purple-400 mb-1">Total de la Venta</span>
            <span className="text-5xl font-black italic tracking-tighter">S/ {total.toFixed(2)}</span>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-3xl border-2 border-purple-100 dark:border-purple-800/50">
            <label className="block text-sm font-black uppercase text-purple-600 dark:text-purple-300 mb-4 tracking-widest">¿Cuánto en Efectivo?</label>
            <input 
              type="number" autoFocus
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="w-full text-4xl p-2 bg-transparent text-center border-b-4 border-yellow-400 focus:outline-none font-black text-purple-900 dark:text-white"
              placeholder="0.00"
            />
          </div>

          <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-xs">Monto en Yape/Tarjeta:</span>
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">S/ {remaining > 0 ? remaining.toFixed(2) : '0.00'}</span>
          </div>
        </div>

        <button 
          onClick={() => processPayment('dividido', { cash: amount, digital: remaining })}
          disabled={!isValid}
          className="w-full py-5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 text-purple-900 text-xl font-black rounded-3xl shadow-xl transition-all active:scale-95 border-b-4 border-yellow-600 disabled:border-transparent"
        >
          CONFIRMAR PAGO MIXTO
        </button>
      </div>
    </div>
  );
};

const CashPaymentModal = ({ total, cashReceived, setCashReceived, setPaymentModal, processPayment }) => {
  const received = parseFloat(cashReceived) || 0;
  const change = received - total;
  const isValid = received >= total;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-[#2d1a4a] rounded-3xl p-8 w-full max-w-md shadow-2xl border border-purple-200 dark:border-purple-800 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-purple-900 dark:text-yellow-400 flex items-center gap-2">
            <Banknote size={28} /> Pago en Efectivo
          </h3>
          <button onClick={() => setPaymentModal(null)} className="text-slate-400 hover:text-rose-500 bg-slate-100 dark:bg-purple-900/50 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-2xl mb-6 border border-purple-100 dark:border-purple-800/50 flex justify-between items-center">
          <span className="text-lg font-medium text-purple-800 dark:text-purple-300">Total a Pagar:</span>
          <span className="text-3xl font-black text-purple-900 dark:text-yellow-400">S/ {total.toFixed(2)}</span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-600 dark:text-purple-300 mb-2">Efectivo Recibido (S/)</label>
          <input 
            type="number" 
            autoFocus
            value={cashReceived}
            onChange={(e) => setCashReceived(e.target.value)}
            placeholder="Ej. 50.00"
            className="w-full text-4xl p-4 bg-slate-50 dark:bg-[#1a0b2e] border-2 border-purple-200 dark:border-purple-700 rounded-2xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 text-purple-900 dark:text-white font-black transition-all mb-4 text-center"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map(num => (
            <button 
              key={num} 
              onClick={() => setCashReceived(prev => prev + num.toString())}
              className="h-14 text-xl font-bold bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/50 text-purple-900 dark:text-white rounded-xl border border-purple-100 dark:border-purple-800 transition-all active:scale-95 shadow-sm"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => setCashReceived(prev => prev.slice(0, -1))}
            className="h-14 text-sm font-bold bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-800/50 text-rose-500 rounded-xl border border-rose-100 dark:border-rose-800 transition-all active:scale-95 flex items-center justify-center shadow-sm"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className={`p-4 rounded-2xl mb-8 flex justify-between items-center border ${isValid ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'}`}>
          <span className={`text-lg font-bold ${isValid ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>Vuelto a entregar:</span>
          <span className={`text-3xl font-black ${isValid ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            S/ {isValid ? change.toFixed(2) : '0.00'}
          </span>
        </div>

        <button 
          onClick={() => processPayment('efectivo', null, received)}
          disabled={!isValid}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-300 disabled:text-slate-500 text-purple-900 text-xl font-black rounded-2xl shadow-lg transition-all active:scale-95 disabled:active:scale-100 border-2 border-transparent disabled:border-transparent border-yellow-500 flex justify-center items-center gap-2"
        >
          <CheckCircle size={24} /> Confirmar Pago
        </button>
      </div>
    </div>
  );
};

const LoginScreen = ({ pin, handlePinInput, handlePinDelete }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#6A0DAD] via-[#4B0082] to-black text-white selection:bg-yellow-400/30">
    <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-7xl font-black text-yellow-400 mb-3 tracking-tight italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
        TAMBO<span className="font-light text-white not-italic">Sync</span>
      </h1>
      <p className="text-purple-200/80 font-medium tracking-wide">Acceso Seguro de Colaborador</p>
    </div>
    
    <div className="backdrop-blur-xl bg-white/10 p-10 rounded-[2.5rem] shadow-[0_0_80px_rgba(106,13,173,0.3)] border border-white/20 w-96 animate-in zoom-in-95 duration-700">
      <div className="flex justify-center gap-5 mb-10">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${pin.length > i ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] scale-110' : 'bg-white/20'}`} />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button key={num} onClick={() => handlePinInput(num.toString())} className="h-16 text-2xl font-semibold bg-white/10 hover:bg-white/20 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/10 hover:border-yellow-400/50 hover:shadow-lg hover:text-yellow-400">
            {num}
          </button>
        ))}
        <button onClick={handlePinDelete} className="h-16 text-sm font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-rose-500/30 col-start-3 uppercase tracking-wider">
          Borrar
        </button>
        <button onClick={() => handlePinInput('0')} className="h-16 text-2xl font-semibold bg-white/10 hover:bg-white/20 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/10 hover:border-yellow-400/50 hover:shadow-lg hover:text-yellow-400 col-start-2 row-start-4">
          0
        </button>
      </div>
    </div>
  </div>
);

const POSScreen = ({ 
  paymentModal, showClearConfirm, darkMode, setDarkMode, closeShift, 
  comboAlert, cart, products, addToCart, updateQuantity, clearCart, 
  searchQuery, setSearchQuery, activeCategory, setActiveCategory, 
  categories, filteredProducts, docType, setDocType, total, subtotal, 
  discount, initiatePayment, cashReceived, setCashReceived, 
  processPayment, confirmClearCart, setShowClearConfirm, processingCard,
  setProcessingCard, warehouseModal, setWarehouseModal, recentSales, showTicket, setShowTicket, 
  lastTransaction, upselling, setCart, groupedCart, totalItems
}) => (
  <div className="flex flex-col h-screen bg-[#f8f0fc] dark:bg-[#1a0b2e] text-slate-800 dark:text-slate-100 transition-colors duration-500 font-sans p-4 gap-4 relative">
    {processingCard && <ProcessingCardModal setProcessingCard={setProcessingCard} />}
    {warehouseModal && <WarehouseModal products={products} setWarehouseModal={setWarehouseModal} />}
    {paymentModal === 'dividido' && <SplitPaymentModal total={total} setPaymentModal={() => initiatePayment(null)} processPayment={processPayment} />}
    {showTicket && lastTransaction && (
      <TicketModal 
        groupedItems={lastTransaction.groupedCart || []} 
        subtotal={lastTransaction.subtotal} 
        discount={lastTransaction.discount} 
        total={lastTransaction.total} 
        docType={lastTransaction.docType} 
        date={lastTransaction.date}
        onClose={() => setShowTicket(false)} 
        lastTransaction={lastTransaction}
      />
    )}
    {paymentModal === 'efectivo' && <CashPaymentModal total={total} cashReceived={cashReceived} setCashReceived={setCashReceived} setPaymentModal={() => initiatePayment(null)} processPayment={processPayment} />}
    {showClearConfirm && <ClearConfirmModal setShowClearConfirm={setShowClearConfirm} confirmClearCart={confirmClearCart} />}

    {/* HEADER */}
    <header className="flex justify-between items-center px-6 py-4 bg-[#6A0DAD] dark:bg-[#4B0082] backdrop-blur-md border-b border-purple-800/50 dark:border-purple-900/50 rounded-3xl shadow-lg z-10 transition-all duration-500 text-white">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-black text-yellow-400 italic tracking-tight drop-shadow-sm">
          TAMBO<span className="text-white font-light not-italic">Sync</span>
        </h1>
        <div className="hidden md:flex items-center gap-3 bg-purple-800/50 dark:bg-purple-900/50 px-4 py-2 rounded-2xl border border-purple-700/50 dark:border-purple-800/50">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-purple-900 text-sm font-bold shadow-sm border-2 border-purple-900">
            CM
          </div>
          <div>
            <span className="block text-sm font-bold leading-tight">Carlos M.</span>
            <span className="block text-[10px] text-purple-300 uppercase">Caja 01 • En turno</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setWarehouseModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-purple-800/50 dark:bg-purple-900/50 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 hover:border-yellow-400 shadow-sm"
        >
          <ShoppingCart size={18} /> Almacén
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-purple-800/50 dark:bg-purple-900/50 hover:bg-purple-700/50 dark:hover:bg-purple-800/50 rounded-2xl transition-all duration-300 text-yellow-400 border border-purple-700/50 dark:border-purple-800/50 shadow-inner">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="h-10 w-px bg-purple-700/50 dark:bg-purple-800 px-0.5 mx-1" />
        <button onClick={closeShift} className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2 border-2 border-rose-600">
          <LogOut size={18} /> Cierre Z
        </button>
      </div>
    </header>

    {/* COMBO TOAST */}
    {comboAlert && (
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.4)] flex items-center gap-4 animate-in slide-in-from-top-10 fade-in zoom-in duration-500 z-[160] border-2 border-emerald-400">
        <div className="bg-white/20 p-2 rounded-full">
          <CheckCircle size={24} className="text-white" />
        </div>
        <div>
          <span className="block font-black text-lg leading-tight uppercase italic font-sans tracking-tight">¡Combo Detectado!</span>
          <span className="text-sm font-bold opacity-90">Descuento aplicado al total.</span>
        </div>
      </div>
    )}

    {/* MAIN CONTENT */}
    <div className="flex flex-1 overflow-hidden gap-4">
      
      {/* LEFT PANEL - CART */}
      <div className="w-[420px] bg-white/90 dark:bg-[#2d1a4a]/90 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-3xl flex flex-col shadow-sm transition-all duration-500 z-0">
        <div className="px-6 py-4 border-b border-purple-100 dark:border-purple-800/50 flex justify-between items-center bg-purple-50/50 dark:bg-transparent rounded-t-3xl">
          <h2 className="text-lg font-bold flex items-center gap-3 text-purple-900 dark:text-yellow-400">
            <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-xl text-purple-600 dark:text-yellow-400 shadow-inner">
              <ShoppingCart size={20} />
            </div>
            Ticket Actual
          </h2>
          <div className="flex gap-2">
            {recentSales.length > 0 && (
              <button onClick={() => setShowTicket(true)} className="text-purple-400 hover:text-purple-600 dark:hover:text-yellow-400 p-2 rounded-xl transition-all border border-transparent hover:bg-purple-50 dark:hover:bg-purple-900/30" title="Ver último ticket">
                <Receipt size={18} />
              </button>
            )}
            <button onClick={clearCart} className="text-rose-400 hover:text-white hover:bg-rose-500 p-2 rounded-xl transition-all border border-transparent hover:border-rose-600 shadow-sm" title="Anular venta">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* UPSELLING - SUGGESTION BOX (FIXED AT TOP) */}
        {upselling.length > 0 && cart.length > 0 && (
          <div className="mx-4 mt-4 p-3 bg-yellow-400/10 border-2 border-dashed border-yellow-400 rounded-2xl animate-bounce-subtle">
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-2">
              <Plus size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">¡Sugerencia de COMBO!</span>
            </div>
            {upselling.slice(0, 1).map((u, i) => (
              <button 
                key={i} 
                onClick={() => addToCart(u.product)}
                className="w-full flex items-center justify-between p-2 bg-white dark:bg-[#2d1a4a] rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-900/50 hover:scale-[1.02] active:scale-95 transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <ProductIcon name={u.product.icon} image={u.product.image} size={14} />
                  <div>
                    <p className="text-[8px] font-bold text-slate-500 uppercase leading-none mb-0.5">{u.comboName}</p>
                    <p className="text-xs font-black text-purple-900 dark:text-white leading-tight">{u.product.name}</p>
                  </div>
                </div>
                <div className="bg-emerald-500 text-white p-1 rounded-lg">
                  <Plus size={14} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* CART ITEMS (GROUPED) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-purple-400/60 dark:text-purple-300/60">
              <div className="w-24 h-24 mb-4 rounded-full bg-purple-50 dark:bg-purple-800/20 flex items-center justify-center border border-purple-200 dark:border-purple-700/50 border-dashed">
                <ShoppingCart size={32} className="opacity-70" />
              </div>
              <p className="font-bold text-lg">Caja Abierta</p>
              <p className="text-sm opacity-80 text-center px-8 mt-1">Escanea códigos de barra o selecciona del catálogo.</p>
            </div>
          ) : (
            groupedCart.map((group) => (
              <div key={group.id} className={`space-y-2 ${group.type === 'combo' ? 'bg-emerald-500/5 dark:bg-emerald-400/5 rounded-2xl border-2 border-emerald-500/20 dark:border-emerald-400/20 pb-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300' : ''}`}>
                {group.type === 'combo' && (
                  <div className="bg-emerald-500/10 dark:bg-emerald-400/10 px-3 py-2 flex justify-between items-center border-b border-emerald-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 italic">¡{group.name} Aplicado!</span>
                    </div>
                    <div className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                      - S/ {group.discount.toFixed(2)}
                    </div>
                  </div>
                )}
                
                <div className={group.type === 'combo' ? "px-2 space-y-2" : "space-y-2"}>
                  {group.items.map((item, idx) => (
                    <div key={`${group.id}-${item.id}-${idx}`} className="flex flex-col p-2 bg-white dark:bg-[#3a235f] rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm group">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <ProductIcon name={item.icon} image={item.image} size={16} />
                          <div className="max-w-[150px]">
                            <p className="font-extrabold text-[13px] text-purple-900 dark:text-purple-100 leading-none truncate">{item.name}</p>
                            <p className="text-[10px] text-purple-500 dark:text-purple-300 font-medium">PU: S/ {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <span className="font-black text-base text-purple-900 dark:text-yellow-400">S/ {(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                      
                      {/* Controls only for non-combo items to maintain grouping integrity, or for all if logic allows */}
                      <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-100 dark:border-purple-800/50">
                        <div className="flex items-center bg-slate-50 dark:bg-purple-900/30 rounded-xl p-1 border border-slate-100 dark:border-purple-800">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-purple-700 rounded-lg text-purple-600 dark:text-purple-300 transition-colors">
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-8 text-center font-black text-xs text-purple-900 dark:text-white">{group.type === 'combo' ? '1' : item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-purple-700 rounded-lg text-purple-600 dark:text-purple-300 transition-colors">
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* TOTALS & PAYMENT */}
        <div className="p-5 bg-purple-50/80 dark:bg-[#3a235f]/80 border-t border-purple-200 dark:border-purple-700/50 mt-auto rounded-b-3xl">
          
          {/* Boleta / Factura Toggle */}
          <div className="flex bg-white dark:bg-[#2d1a4a] rounded-xl p-1 mb-4 border border-purple-200 dark:border-purple-800 shadow-inner">
            <button 
              onClick={() => setDocType('Boleta')}
              className={`flex-1 py-2 flex items-center justify-center gap-2 text-sm font-bold rounded-lg transition-all ${docType === 'Boleta' ? 'bg-[#6A0DAD] text-yellow-400 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/50'}`}
            >
              <Receipt size={16} /> Boleta
            </button>
            <button 
              onClick={() => setDocType('Factura')}
              className={`flex-1 py-2 flex items-center justify-center gap-2 text-sm font-bold rounded-lg transition-all ${docType === 'Factura' ? 'bg-[#6A0DAD] text-yellow-400 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/50'}`}
            >
              <FileText size={16} /> Factura (RUC)
            </button>
          </div>

          <div className="space-y-2 mb-4 px-2">
            <div className="flex justify-between text-sm font-medium text-purple-600 dark:text-purple-300">
              <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span>S/ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                <span>Ahorro Promociones</span>
                <span>- S/ {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-end pt-2">
              <span className="text-purple-800 dark:text-purple-300 font-bold uppercase tracking-wider text-sm">Total a Cobrar</span>
              <span className="text-4xl font-black text-purple-900 dark:text-yellow-400 drop-shadow-sm">
                S/ {total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => initiatePayment('efectivo')} disabled={cart.length === 0}
              className="col-span-3 py-3 bg-yellow-400 hover:bg-yellow-500 text-purple-900 rounded-xl font-black text-base disabled:opacity-50 transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 border-2 border-yellow-500"
            >
              <Banknote size={20} /> PAGAR EFECTIVO
            </button>
            <button 
              onClick={() => initiatePayment('yape')} disabled={cart.length === 0}
              className="flex flex-col items-center justify-center p-2 bg-white dark:bg-[#2d1a4a] border border-[#7400b8]/30 dark:border-[#7400b8]/50 hover:border-[#7400b8] text-[#7400b8] dark:text-[#a542e4] rounded-xl disabled:opacity-50 transition-all font-bold text-[10px]"
            >
              <Smartphone size={16} className="mb-0.5" /> Yape
            </button>
            <button 
              onClick={() => initiatePayment('plin')} disabled={cart.length === 0}
              className="flex flex-col items-center justify-center p-2 bg-white dark:bg-[#2d1a4a] border border-[#00e5ff]/40 dark:border-[#00e5ff]/50 hover:border-[#00b8cc] text-[#00b8cc] dark:text-[#00e5ff] rounded-xl disabled:opacity-50 transition-all font-bold text-[10px]"
            >
              <Smartphone size={16} className="mb-0.5" /> Plin
            </button>
            <button 
              onClick={() => initiatePayment('tarjeta')} disabled={cart.length === 0}
              className="flex flex-col items-center justify-center p-2 bg-white dark:bg-[#2d1a4a] border border-rose-500/30 hover:border-rose-500 text-rose-500 rounded-xl disabled:opacity-50 transition-all font-bold text-[10px]"
            >
              <CreditCard size={16} className="mb-0.5" /> Tarjeta
            </button>
            <div className="col-span-3 grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => initiatePayment('dividido')} disabled={cart.length === 0}
                className="py-1.5 bg-purple-900 text-white rounded-lg font-bold text-[9px] hover:bg-purple-800 transition-all border border-purple-700 flex items-center justify-center gap-1 uppercase tracking-tighter"
              >
                <Plus size={10} /> Pago Dividido
              </button>
              <button 
                onClick={() => {
                  const bag = { id: 99, name: 'Bolsa Plástica', price: 0.50, icon: 'Package', quantity: 1 };
                  setCart(prev => {
                    const existing = prev.find(i => i.id === 99);
                    if (existing) return prev.map(i => i.id === 99 ? { ...i, quantity: i.quantity + 1 } : i);
                    return [...prev, bag];
                  });
                }}
                className="py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg font-bold text-[9px] border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1 uppercase tracking-tighter"
              >
                + Bolsa (S/ 0.50)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - FAST KEYS & INVENTORY */}
      <div className="flex-1 bg-white/90 dark:bg-[#2d1a4a]/90 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-3xl p-6 overflow-hidden flex flex-col shadow-sm">
        
        {/* Real POS Search & Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input 
                type="text" 
                placeholder="Escanear código o buscar producto (Ej: 'Leche')..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-purple-50 dark:bg-[#1a0b2e] border-2 border-purple-100 dark:border-purple-800/80 rounded-2xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 text-purple-900 dark:text-white font-medium transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all border-2 ${activeCategory === cat ? 'bg-[#6A0DAD] border-[#6A0DAD] text-yellow-400 shadow-md scale-105' : 'bg-white dark:bg-[#3a235f] border-purple-100 dark:border-purple-800/50 text-purple-600 dark:text-purple-300 hover:border-purple-300 dark:hover:border-purple-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <button 
                key={product.id} 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`group relative flex flex-col bg-white dark:bg-[#2d1a4a] rounded-3xl border border-purple-100/80 dark:border-purple-800/40 shadow-sm transition-all duration-300 overflow-hidden
                  ${product.stock === 0 ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-2 hover:shadow-2xl hover:border-purple-400 dark:hover:border-yellow-400/50 active:scale-[0.98]'}
                `}
              >
                {/* HERO IMAGE AREA */}
                <div className={`relative w-full bg-gradient-to-br ${product.color} bg-opacity-10 dark:bg-opacity-20 overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-[#2d1a4a]/80 dark:to-[#1a0f2e]/40" />
                  <div className="relative z-10 flex justify-center">
                    <ProductIcon name={product.icon} image={product.image} size={40} heroMode={true} />
                  </div>
                  {/* Stock badge overlay */}
                  {product.stock === 0 ? (
                    <span className="absolute top-4 right-4 z-20 text-[10px] font-black text-white bg-rose-500 px-3 py-1 rounded-full shadow-lg">AGOTADO</span>
                  ) : product.stock <= 3 ? (
                    <span className="absolute top-4 right-4 z-20 text-[10px] font-black text-white bg-rose-500 px-3 py-1 rounded-full shadow-lg animate-pulse">⚠ {product.stock} un.</span>
                  ) : (
                    <span className="absolute top-4 right-4 z-20 text-[10px] font-black text-purple-900 bg-white/80 px-3 py-1 rounded-full shadow-md">{product.stock} un.</span>
                  )}
                </div>

                {/* INFO AREA */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 dark:text-purple-500 mb-1">{product.category}</span>
                  <span className="text-left text-lg font-black leading-tight flex-1 mb-4 text-purple-900 dark:text-purple-100 tracking-tight group-hover:text-purple-700 dark:group-hover:text-yellow-400 transition-colors">{product.name}</span>
                  
                  <div className="flex justify-between items-center w-full mt-auto">
                    <span className="text-2xl font-black text-purple-900 dark:text-yellow-400">
                      <span className="text-xs font-bold text-purple-500 dark:text-purple-300 mr-1">S/</span>
                      {product.price.toFixed(2)}
                    </span>
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-xl text-purple-600 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-purple-400/60">
                <Search size={48} className="mb-4 opacity-50" />
                <p className="text-xl font-bold text-purple-800 dark:text-purple-300">No se encontraron productos</p>
                <p className="text-sm">Intenta buscar con otra palabra.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SuccessScreen = ({ nextCustomer, total, docType }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#6A0DAD] to-[#4B0082] text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-[60%] left-[70%] w-[50%] h-[50%] bg-yellow-400 rounded-full blur-[150px] opacity-30" />
    </div>

    <div className="bg-white/10 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.3)] border border-white/20 text-center max-w-sm w-full animate-in zoom-in-95 duration-500 relative z-10">
      <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(250,204,21,0.5)] border-4 border-white animate-bounce">
        <CheckCircle size={56} className="text-purple-900" />
      </div>
      <h2 className="text-4xl font-black mb-4 tracking-tight italic uppercase">¡{docType} EXITOSA!</h2>
      <p className="text-purple-100 text-lg mb-8 font-medium">Cobro procesado correctamente.</p>
      
      <div className="bg-white/10 rounded-2xl p-6 mb-10 border border-white/10">
        <span className="block text-sm text-purple-200 uppercase font-bold tracking-widest mb-1 opacity-70">Total Cobrado</span>
        <span className="text-5xl font-black text-yellow-400 drop-shadow-sm">S/ {total.toFixed(2)}</span>
      </div>

      <button onClick={nextCustomer} className="w-full py-5 bg-white text-purple-900 rounded-[2rem] font-black text-xl shadow-xl hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-transparent">
        SIGUIENTE CLIENTE
      </button>
    </div>
  </div>
);


const SummaryScreen = ({ shiftTotals, logout, setDarkMode, darkMode }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#f8f0fc] dark:bg-[#1a0b2e] text-purple-900 dark:text-purple-100 p-6 relative overflow-y-auto">
    <div className="bg-white/90 dark:bg-[#2d1a4a]/90 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl border-2 border-purple-200/50 dark:border-purple-800/50 w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 my-auto">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-purple-100 dark:bg-purple-800/30 rounded-3xl shadow-inner border border-purple-200 dark:border-purple-700/50">
          <Info size={40} className="text-purple-700 dark:text-yellow-400" />
        </div>
      </div>
      
      <h1 className="text-3xl font-black text-center mb-2 tracking-tight text-purple-900 dark:text-yellow-400">Cierre Z - Caja 01</h1>
      <p className="text-center text-purple-500 dark:text-purple-300 text-sm mb-8 font-medium">Turno: Carlos M.</p>
      
      <div className="space-y-4 mb-8">
        <div className="bg-purple-50 dark:bg-[#3a235f] rounded-2xl p-4 border border-purple-100 dark:border-purple-800/50 space-y-3">
          <h3 className="text-xs font-bold text-purple-400 dark:text-purple-300 uppercase tracking-wider border-b border-purple-200 dark:border-purple-700 pb-2 mb-2">Medios de Pago</h3>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium text-sm text-purple-800 dark:text-purple-200"><Smartphone className="text-[#7400b8]" size={16} /> Yape</span>
            <span className="font-bold text-purple-900 dark:text-yellow-400">S/ {shiftTotals.yape.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium text-sm text-purple-800 dark:text-purple-200"><Smartphone className="text-[#00e5ff]" size={16} /> Plin</span>
            <span className="font-bold text-purple-900 dark:text-yellow-400">S/ {shiftTotals.plin.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium text-sm text-purple-800 dark:text-purple-200"><Banknote className="text-green-600" size={16} /> Efectivo en Caja</span>
            <span className="font-bold text-purple-900 dark:text-yellow-400">S/ {shiftTotals.efectivo.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-[#3a235f] rounded-2xl p-4 border border-purple-100 dark:border-purple-800/50 flex justify-between">
          <div className="text-center flex-1 border-r border-purple-200 dark:border-purple-700">
            <span className="block text-2xl font-black text-purple-900 dark:text-white">{shiftTotals.boletas}</span>
            <span className="text-xs font-bold text-purple-400 uppercase">Boletas</span>
          </div>
          <div className="text-center flex-1">
            <span className="block text-2xl font-black text-purple-900 dark:text-white">{shiftTotals.facturas}</span>
            <span className="text-xs font-bold text-purple-400 uppercase">Facturas</span>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 border-t-2 border-dashed border-purple-300 dark:border-purple-700">
          <span className="font-bold text-purple-600 dark:text-purple-300">Total Recaudado</span>
          <span className="text-4xl font-black text-purple-900 dark:text-yellow-400 drop-shadow-sm">
            S/ {shiftTotals.total.toFixed(2)}
          </span>
        </div>
      </div>

      <button 
        onClick={logout}
        className="w-full py-4 bg-purple-700 hover:bg-purple-800 text-yellow-400 text-lg font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all border-4 border-purple-800 hover:border-yellow-400"
      >
        <LogOut size={20} /> CERRAR SESIÓN
      </button>
      <button onClick={() => setDarkMode(!darkMode)} className="mt-4 p-3 bg-white dark:bg-[#2d1a4a] rounded-xl text-purple-600 dark:text-yellow-400 shadow-sm border border-purple-100 dark:border-purple-800 transition-all w-full flex items-center justify-center gap-2">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />} {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </div>
  </div>
);

export default function App() {
  // --- STATE ---
  const [view, setView] = useState('login'); // 'login', 'pos', 'success', 'summary'
  const [pin, setPin] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [comboAlert, setComboAlert] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [discount, setDiscount] = useState(0);
  const prevDiscountRef = useRef(0);
  
  // Real POS states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [docType, setDocType] = useState('Boleta'); // 'Boleta', 'Factura'
  const [paymentModal, setPaymentModal] = useState(null); // 'efectivo', 'yape', 'plin'
  const [cashReceived, setCashReceived] = useState('');
  const [processingCard, setProcessingCard] = useState(false);
  const [warehouseModal, setWarehouseModal] = useState(false);
  
  // NEW "WOW" FEATURES STATE
  const [recentSales, setRecentSales] = useState([]);
  const [showTicket, setShowTicket] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);
  const [upselling, setUpselling] = useState([]);

  // Automatic Night Mode
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      setDarkMode(true);
    }
  }, []);

  // Shift totals
  const [shiftTotals, setShiftTotals] = useState({
    yape: 0, plin: 0, efectivo: 0, total: 0, boletas: 0, facturas: 0
  });

  // --- LOGIC ---
  const categories = ['Todos', ...new Set(INITIAL_PRODUCTS.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePinInput = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => { setView('pos'); setPin(''); }, 300);
      }
    }
  };

  const handlePinDelete = () => setPin(pin.slice(0, -1));

  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        const productInfo = products.find(p => p.id === id);
        if (newQuantity > 0 && newQuantity <= productInfo.stock) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }).filter(item => item.quantity > 0)); // Auto-remove if quantity goes to 0
  };

  const clearCart = () => {
    if (cart.length > 0) {
      setShowClearConfirm(true);
    }
  };

  const confirmClearCart = () => {
    setCart([]);
    setShowClearConfirm(false);
  };

  // --- COMBO GROUPING LOGIC ---
  const getGroupedCart = () => {
    let tempCart = cart.map(item => ({ ...item, remaining: item.quantity }));
    const groups = [];

    // 1. Identify applied combos
    COMBOS.forEach(combo => {
      // Calculate how many times this combo can be applied
      const idCounts = {};
      combo.trigger.forEach(id => { idCounts[id] = (idCounts[id] || 0) + 1; });
      
      const possibleCounts = Object.entries(idCounts).map(([id, required]) => {
        const item = tempCart.find(i => i.id === parseInt(id));
        return item ? Math.floor(item.remaining / required) : 0;
      });
      const count = possibleCounts.length > 0 ? Math.min(...possibleCounts) : 0;

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const groupItems = [];
          combo.trigger.forEach(id => {
            const itemIdx = tempCart.findIndex(it => it.id === id && it.remaining > 0);
            if (itemIdx !== -1) {
              tempCart[itemIdx].remaining -= 1;
              groupItems.push({ ...tempCart[itemIdx], quantity: 1 });
            }
          });
          groups.push({ 
            id: `group-${combo.id}-${i}`,
            type: 'combo', 
            name: combo.name, 
            discount: combo.discount, 
            items: groupItems 
          });
        }
      }
    });

    // 2. Remaining items
    const rest = tempCart.filter(item => item.remaining > 0);
    if (rest.length > 0) {
      groups.push({ 
        id: 'group-others',
        type: 'others', 
        name: 'Otros Productos',
        items: rest.map(r => ({ ...r, quantity: r.remaining })) 
      });
    }

    return groups;
  };

  const groupedCart = getGroupedCart();

  useEffect(() => {
    // 1. Detect active combos for discount (Synchronized with grouping logic)
    let totalDiscount = 0;
    let tempCart = cart.map(item => ({ id: item.id, remaining: item.quantity }));
    
    COMBOS.forEach(combo => {
      const idCounts = {};
      combo.trigger.forEach(id => { idCounts[id] = (idCounts[id] || 0) + 1; });
      
      const possibleCounts = Object.entries(idCounts).map(([id, required]) => {
        const item = tempCart.find(i => i.id === parseInt(id));
        return item ? Math.floor(item.remaining / required) : 0;
      });
      const count = possibleCounts.length > 0 ? Math.min(...possibleCounts) : 0;
      
      if (count > 0) {
        totalDiscount += count * combo.discount;
        // Consume items mentally for discount calculation
        for (let i = 0; i < count; i++) {
          combo.trigger.forEach(id => {
            const itIdx = tempCart.findIndex(it => it.id === id && it.remaining > 0);
            if (itIdx !== -1) tempCart[itIdx].remaining -= 1;
          });
        }
      }
    });

    // Only alert if we found a NEW discount
    if (totalDiscount > prevDiscountRef.current && !comboAlert) {
      setComboAlert(true);
      setTimeout(() => setComboAlert(false), 3000);
    }
    prevDiscountRef.current = totalDiscount;
    setDiscount(totalDiscount);

    // 2. Detect missing items for upselling
    const suggestions = [];
    if (cart.length > 0) {
      COMBOS.forEach(combo => {
        const idCounts = {};
        combo.trigger.forEach(id => { idCounts[id] = (idCounts[id] || 0) + 1; });
        
        Object.entries(idCounts).forEach(([id, required]) => {
          const cartItem = cart.find(item => item.id === parseInt(id));
          const currentQty = cartItem ? cartItem.quantity : 0;
          
          if (currentQty > 0 && currentQty < required) {
            const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
            if (product && product.stock > 0) {
              suggestions.push({ product, comboName: combo.name });
            }
          } else if (currentQty === 0 && combo.trigger.some(tid => cart.some(ci => ci.id === tid))) {
            // Si tiene otros items del combo pero este le falta del todo
            const product = INITIAL_PRODUCTS.find(p => p.id === parseInt(id));
            if (product && product.stock > 0) {
              suggestions.push({ product, comboName: combo.name });
            }
          }
        });
      });
    }
    setUpselling(suggestions);
  }, [cart, comboAlert]);

  // Keyboard Shortcuts (Simulación de Escáner)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view !== 'pos' || paymentModal || warehouseModal || showClearConfirm) return;
      
      // Teclas 1-9 para agregar los primeros 9 productos del catálogo filtrado
      if (e.key >= '1' && e.key <= '9' && document.activeElement.tagName !== 'INPUT') {
        const index = parseInt(e.key) - 1;
        if (filteredProducts[index]) {
          addToCart(filteredProducts[index]);
          e.preventDefault();
        }
      }
      
      // Escape para cerrar modals o limpiar búsqueda
      if (e.key === 'Escape') {
        if (searchQuery) setSearchQuery('');
        else setView('summary');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, filteredProducts, paymentModal, warehouseModal, showClearConfirm, searchQuery]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal - discount;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Real POS Payment flow
  const initiatePayment = (method) => {
    if (cart.length === 0) return;
    if (method === 'efectivo') {
      setCashReceived('');
      setPaymentModal('efectivo');
    } else if (method === 'dividido') {
      setPaymentModal('dividido');
    } else if (method === 'tarjeta') {
      setProcessingCard(true);
      setTimeout(() => {
        setProcessingCard(false);
        processPayment('tarjeta');
      }, 2500);
    } else {
      processPayment(method);
    }
  };

  const processPayment = (method, splitData = null, receivedAmount = 0) => {
    let totalsUpdate = { ...shiftTotals };
    
    if (method === 'dividido' && splitData) {
      totalsUpdate.efectivo += splitData.cash;
      totalsUpdate.yape += splitData.digital; // Asignamos lo digital a Yape por simplicidad
    } else {
      totalsUpdate[method] += total;
    }
    
    totalsUpdate.total += total;
    totalsUpdate.boletas += (docType === 'Boleta' ? 1 : 0);
    totalsUpdate.facturas += (docType === 'Factura' ? 1 : 0);

    setShiftTotals(totalsUpdate);

    const currentTransaction = {
      id: Date.now(),
      cart: [...cart],
      groupedCart: [...groupedCart],
      subtotal,
      discount,
      total,
      docType,
      method,
      received: receivedAmount,
      date: new Date().toLocaleDateString()
    };

    setLastTransaction(currentTransaction);
    setRecentSales(prev => [currentTransaction, ...prev].slice(0, 5));

    setProducts(prevProducts => 
      prevProducts.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
      })
    );

    setPaymentModal(null);
    setView('success');
    setShowTicket(true); // Abrir boleta automáticamente
  };

  const nextCustomer = () => { setCart([]); setDocType('Boleta'); setView('pos'); };
  const closeShift = () => setView('summary');
  const logout = () => { setCart([]); setView('login'); };


  // --- COMPONENTS ---





  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Ticket/Boleta Global - Siempre disponible si lastTransaction existe */}
      {showTicket && lastTransaction && (
        <TicketModal 
          groupedItems={lastTransaction.groupedCart || []} 
          subtotal={lastTransaction.subtotal} 
          discount={lastTransaction.discount} 
          total={lastTransaction.total} 
          docType={lastTransaction.docType} 
          date={lastTransaction.date}
          onClose={() => setShowTicket(false)} 
          lastTransaction={lastTransaction}
        />
      )}

      {view === 'login' && <LoginScreen pin={pin} handlePinInput={handlePinInput} handlePinDelete={handlePinDelete} />}
      {view === 'pos' && (
        <POSScreen 
          paymentModal={paymentModal} showClearConfirm={showClearConfirm} darkMode={darkMode} 
          setDarkMode={setDarkMode} closeShift={closeShift} comboAlert={comboAlert} cart={cart} 
          products={products} addToCart={addToCart} updateQuantity={updateQuantity} clearCart={clearCart} 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} categories={categories} filteredProducts={filteredProducts} 
          docType={docType} setDocType={setDocType} total={total} subtotal={subtotal} discount={discount} 
          initiatePayment={initiatePayment} cashReceived={cashReceived} setCashReceived={setCashReceived} 
          processPayment={processPayment} confirmClearCart={confirmClearCart} setShowClearConfirm={setShowClearConfirm}
          processingCard={processingCard} setProcessingCard={setProcessingCard} 
          warehouseModal={warehouseModal} setWarehouseModal={setWarehouseModal}
          recentSales={recentSales} showTicket={showTicket} setShowTicket={setShowTicket}
          lastTransaction={lastTransaction} upselling={upselling} setCart={setCart} groupedCart={groupedCart}
          totalItems={totalItemsCount}
        />
      )}
      {view === 'success' && <SuccessScreen nextCustomer={nextCustomer} total={total} docType={docType} />}
      {view === 'summary' && <SummaryScreen shiftTotals={shiftTotals} logout={logout} setDarkMode={setDarkMode} darkMode={darkMode} />}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(106, 13, 173, 0.2); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(250, 204, 21, 0.2); }
      `}</style>
    </div>
  );
}
