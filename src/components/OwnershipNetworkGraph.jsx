import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Users, Landmark, Coins, TrendingUp, ArrowRight, RefreshCw, Flame, HelpCircle } from 'lucide-react';

// Shareholder profile details in Vietnamese for the sidebar
const SHAREHOLDER_DETAILS = {
  vanguard: {
    name: "Vanguard Group",
    badge: "Cổ đông lớn nhất",
    discovery: "Vanguard là cổ đông lớn nhất của cả Coca-Cola (8.5%) và PepsiCo (9.1%), nghĩa là hai đối thủ lớn nhất lại chung một chủ sở hữu hàng đầu.",
    figures: "Coca-Cola: 8.5% | PepsiCo: 9.1% | Tổng tài sản quản lý (AUM): ≈$10 nghìn tỷ USD.",
    whyPower: "Vì phần còn lại thuộc về hàng triệu cổ đông nhỏ lẻ khó phối hợp. Trong khi đó, các quỹ lớn bỏ phiếu tập trung và có năng lực tác động đến quản trị doanh nghiệp.",
    power: "Ảnh hưởng trực tiếp đến bầu chọn Hội đồng quản trị, biểu quyết cổ tức, chương trình mua lại cổ phiếu và chiến lược dài hạn.",
    theory: "Minh họa cho sự tập trung hóa của tư bản tài chính dưới hình thức quỹ đầu tư chỉ số. Sự cạnh tranh trong kinh tế thực tế bị chi phối bởi danh mục đầu tư."
  },
  blackrock: {
    name: "BlackRock, Inc.",
    badge: "Quỹ quản lý tài sản lớn nhất hành tinh",
    discovery: "BlackRock xuất hiện đồng thời trong Coca-Cola và PepsiCo với tư cách là cổ đông lớn thứ hai.",
    figures: "Coca-Cola: 7.1% | PepsiCo: 7.6% | Tổng tài sản quản lý (AUM): ≈$11 nghìn tỷ USD.",
    whyPower: "Vì phần còn lại thuộc về hàng triệu cổ đông nhỏ lẻ khó phối hợp. Trong khi đó, các quỹ lớn bỏ phiếu tập trung và có năng lực tác động đến quản trị doanh nghiệp.",
    power: "Ảnh hưởng đến HĐQT, cổ tức, mua lại cổ phiếu, chiến lược lợi nhuận.",
    theory: "Đây là biểu hiện mới của tư bản tài chính: kiểm soát thông qua quyền sở hữu cổ phần, quyền biểu quyết và mạng lưới tài chính, không cần sở hữu tuyệt đối."
  },
  statestreet: {
    name: "State Street Corp",
    badge: "Người khổng lồ ETF",
    discovery: "State Street là thành viên thứ ba của khối 'Big Three', sở hữu khoảng 4% tại cả Coca-Cola và PepsiCo.",
    figures: "Coca-Cola: 4.0% | PepsiCo: 4.3% | Tổng tài sản quản lý (AUM): ≈$4.7 nghìn tỷ USD.",
    whyPower: "Một mình State Street sở hữu 4% có vẻ nhỏ, nhưng khi kết hợp biểu quyết đồng thuận cùng Vanguard và BlackRock, họ tạo thành khối trên 20% gần như không thể bị đánh bại.",
    power: "Phối hợp bỏ phiếu ủy quyền (proxy voting), định hướng chiến lược ESG và cấu trúc quản trị tập đoàn.",
    theory: "Minh chứng cho sự độc quyền nhóm của tư bản tài chính, nơi ba quỹ quản lý tài sản hoạt động như một liên minh bỏ phiếu ủy quyền thống nhất."
  },
  berkshire: {
    name: "Berkshire Hathaway",
    badge: "Tư bản giá trị chủ động",
    discovery: "Berkshire Hathaway sở hữu khối cổ phần lớn 9.2% tại Coca-Cola nhưng 0% tại PepsiCo, đóng vai trò đối tác truyền thống chủ động.",
    figures: "Coca-Cola: 9.2% | PepsiCo: 0% | Tổng tài sản tập đoàn: ≈$1 nghìn tỷ USD.",
    whyPower: "Warren Buffett cam kết đồng hành lâu dài. Khối cổ phần tập trung này giúp Berkshire có tiếng nói cực lớn trực tiếp trong HĐQT Coca-Cola.",
    power: "Cung cấp dòng vốn ổn định, bảo vệ ban quản trị khỏi các sức ép ngắn hạn từ các quỹ đầu cơ.",
    theory: "Đại diện cho dòng vốn cổ phần chủ động cổ điển gắn liền với sự ổn định quản trị doanh nghiệp, độc lập với dòng vốn thụ động của các quỹ chỉ số."
  },
  public: {
    name: "Public & Others",
    badge: "Đại chúng phân tán",
    discovery: "Dù sở hữu tỷ lệ lớn, nhóm này yếu vì bị phân tán.",
    figures: "Coca-Cola: 71.2% | PepsiCo: 79.0% | Gồm hàng triệu cá nhân độc lập.",
    whyPower: "Do số cổ phần bị chia nhỏ cho hàng triệu tài khoản cá nhân, việc phối hợp biểu quyết là bất khả thi. Sự phân tán này dâng quyền kiểm soát thực tế cho các nhóm cổ đông thiểu số tập trung.",
    power: "Hầu như không có quyền lực biểu quyết thực tế. Tiếng nói bị pha loãng hoàn toàn do không thể phối hợp hành động.",
    theory: "Phơi bày ảo tưởng về sự dân chủ hóa của chủ nghĩa tư bản cổ phần. Quyền sở hữu cổ phần thì rộng rãi, nhưng quyền kiểm soát thực tế lại tập trung cao độ."
  },
  bigthree: {
    name: "Khối Big Three",
    badge: "Khối liên minh tài phiệt tập trung",
    discovery: "Khối sở hữu tập trung có quyền lực lớn hơn tỷ lệ bề mặt.",
    figures: "Coca-Cola: 19.6% | PepsiCo: 21.0% | Gồm Vanguard, BlackRock, State Street.",
    whyPower: "Với tỷ lệ gần 20% bỏ phiếu tập trung từ 3 quỹ phối hợp hành động, họ nắm giữ đa số thực tế vì các cổ đông nhỏ lẻ còn lại hiếm khi tham gia hoặc biểu quyết cùng một hướng.",
    power: "Chi phối việc bầu chọn Hội đồng quản trị, quyết định tỷ lệ chia cổ tức, phê duyệt chiến lược mua lại cổ phiếu.",
    theory: "Đây là biểu hiện mới của tư bản tài chính: kiểm soát thông qua quyền sở hữu cổ phần, quyền biểu quyết và mạng lưới tài chính, không cần sở hữu tuyệt đối."
  },
  coca: {
    name: "Coca-Cola Company",
    badge: "Tập đoàn mục tiêu",
    discovery: "Hai thương hiệu đồ uống lớn nhất cạnh tranh khốc liệt ngoài thị trường nhưng chia sẻ chung những ông chủ tài chính đứng sau.",
    figures: "Khối Big Three sở hữu 19.6% | Berkshire Hathaway: 9.2% | Đại chúng phân tán: 71.2%",
    whyPower: "Các quỹ lớn không cần mua đứt doanh nghiệp. Họ chỉ cần nắm giữ khối cổ phần đủ lớn để chi phối cuộc biểu quyết của Hội đồng cổ đông.",
    power: "Thực thi các quyết định về tái cấu trúc, phân bổ lợi nhuận, chi trả cổ tức và định hình chiến lược kinh doanh toàn cầu.",
    theory: "Vạch trần ranh giới cạnh tranh giả tạo của nền kinh tế thị trường khi cả hai đối thủ đều chịu sự kiểm soát cuối cùng của một nhóm tài phiệt tài chính."
  },
  pepsi: {
    name: "PepsiCo, Inc.",
    badge: "Tập đoàn mục tiêu",
    discovery: "Hai thương hiệu đồ uống lớn nhất cạnh tranh khốc liệt ngoài thị trường nhưng chia sẻ chung những ông chủ tài chính đứng sau.",
    figures: "Khối Big Three sở hữu 21.0% | Đại chúng phân tán: 79.0%",
    whyPower: "Các quỹ lớn không cần mua đứt doanh nghiệp. Họ chỉ cần nắm giữ khối cổ phần đủ lớn để chi phối cuộc biểu quyết của Hội đồng cổ đông.",
    power: "Thực thi các quyết định về tái cấu trúc, phân bổ lợi nhuận, chi trả cổ tức và định hình chiến lược kinh doanh toàn cầu.",
    theory: "Vạch trần ranh giới cạnh tranh giả tạo của nền kinh tế thị trường khi cả hai đối thủ đều chịu sự kiểm soát cuối cùng của một nhóm tài phiệt tài chính."
  }
};

// Tech giants representation for Scene 4
const TECH_GIANTS = [
  { id: 'apple', name: 'Apple', code: 'AAPL', x: 15, y: 80 },
  { id: 'microsoft', name: 'Microsoft', code: 'MSFT', x: 32, y: 80 },
  { id: 'amazon', name: 'Amazon', code: 'AMZN', x: 50, y: 80 },
  { id: 'nvidia', name: 'Nvidia', code: 'NVDA', x: 68, y: 80 },
  { id: 'visa', name: 'Visa', code: 'V', x: 85, y: 80 }
];

// Ownership percentages for Tech Giants
const TECH_OWNERSHIP = {
  vanguard: { apple: "8.2%", microsoft: "8.4%", amazon: "7.0%", nvidia: "8.1%", visa: "8.3%" },
  blackrock: { apple: "6.6%", microsoft: "7.2%", amazon: "6.0%", nvidia: "7.0%", visa: "6.8%" },
  statestreet: { apple: "3.7%", microsoft: "3.9%", amazon: "3.2%", nvidia: "3.6%", visa: "3.5%" }
};

export default function OwnershipNetworkGraph({ isEnglish }) {
  const [scene, setScene] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [hoveredEntity, setHoveredEntity] = useState(null);

  // Generate random dots inside the Public node for the explosion animation
  const dotsCount = 60;
  const publicDots = useMemo(() => {
    return Array.from({ length: dotsCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 25 + 5; // starting within node radius
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 2.5 + 1.5,
      };
    });
  }, []);

  // Reset selected entity when changing scenes
  useEffect(() => {
    setSelectedEntity(null);
  }, [scene]);

  // Determine node coordinates
  const nodes = useMemo(() => {
    return {
      vanguard: { x: 50, y: 16, type: 'fund', label: 'Vanguard Group' },
      blackrock: { x: 28, y: 16, type: 'fund', label: 'BlackRock, Inc.' },
      statestreet: { x: 72, y: 16, type: 'fund', label: 'State Street Corp' },
      coca: { x: 32, y: 50, type: 'company', label: 'Coca-Cola' },
      pepsi: { x: 68, y: 50, type: 'company', label: 'PepsiCo' },
      berkshire: { x: 10, y: 50, type: 'berkshire', label: 'Berkshire Hathaway' },
      public: {
        x: 50,
        y: scene === 4 ? 94 : 82,
        type: 'public',
        label: 'Public & Others'
      }
    };
  }, [scene]);

  // Cubic Bezier curve paths generator helper
  const getBezierPath = (x1, y1, x2, y2) => {
    return `M ${x1} ${y1} C ${x1} ${y1 + 12}, ${x2} ${y2 - 12}, ${x2} ${y2}`;
  };

  // Straight line path helper
  const getStraightPath = (x1, y1, x2, y2) => {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  };

  // Check if a node is currently visible based on the current scene
  const isNodeVisible = (id) => {
    if (scene === 1) {
      return id === 'coca' || id === 'pepsi';
    }
    if (scene === 2) {
      return id !== 'public';
    }
    if (scene === 3) {
      return true;
    }
    if (scene === 4) {
      // In scene 4, we show all except we fade out Public if needed, or keep it. Let's keep all.
      return true;
    }
    return true;
  };

  // Node highlighting check
  const isNodeHighlighted = (id) => {
    if (!selectedEntity && !hoveredEntity) {
      // General scene highlights
      if (scene === 2) {
        // Highlight the overlapping Big 3
        return ['vanguard', 'blackrock', 'statestreet'].includes(id);
      }
      if (scene === 3) {
        // Highlight Big 3 as a block
        return ['vanguard', 'blackrock', 'statestreet'].includes(id);
      }
      return false;
    }

    const active = selectedEntity || hoveredEntity;

    if (active === 'bigthree') {
      return ['vanguard', 'blackrock', 'statestreet'].includes(id);
    }
    if (active === 'vanguard') {
      return id === 'vanguard' || id === 'coca' || id === 'pepsi' || (scene === 4 && TECH_GIANTS.some(t => t.id === id));
    }
    if (active === 'blackrock') {
      return id === 'blackrock' || id === 'coca' || id === 'pepsi' || (scene === 4 && TECH_GIANTS.some(t => t.id === id));
    }
    if (active === 'statestreet') {
      return id === 'statestreet' || id === 'coca' || id === 'pepsi' || (scene === 4 && TECH_GIANTS.some(t => t.id === id));
    }
    if (active === 'berkshire') {
      return id === 'berkshire' || id === 'coca';
    }
    if (active === 'public') {
      return id === 'public' || id === 'coca' || id === 'pepsi';
    }
    if (active === 'coca') {
      return id === 'coca' || ['vanguard', 'blackrock', 'statestreet', 'berkshire'].includes(id);
    }
    if (active === 'pepsi') {
      return id === 'pepsi' || ['vanguard', 'blackrock', 'statestreet'].includes(id);
    }

    // Tech giants highlighting
    if (TECH_GIANTS.some(t => t.id === active)) {
      return id === active || ['vanguard', 'blackrock', 'statestreet'].includes(id);
    }

    return false;
  };

  // Connections logic
  const connections = useMemo(() => {
    const list = [];
    
    // Shareholders to companies
    // Berkshire to Coke
    list.push({ source: 'berkshire', target: 'coca', value: '9.2%', curve: false });
    
    // Big 3 to Coke
    list.push({ source: 'vanguard', target: 'coca', value: '8.5%', curve: true });
    list.push({ source: 'blackrock', target: 'coca', value: '7.1%', curve: true });
    list.push({ source: 'statestreet', target: 'coca', value: '4.0%', curve: true });

    // Big 3 to Pepsi
    list.push({ source: 'vanguard', target: 'pepsi', value: '9.1%', curve: true });
    list.push({ source: 'blackrock', target: 'pepsi', value: '7.6%', curve: true });
    list.push({ source: 'statestreet', target: 'pepsi', value: '4.3%', curve: true });

    // Public to companies
    list.push({ source: 'public', target: 'coca', value: '71.2%', curve: true });
    list.push({ source: 'public', target: 'pepsi', value: '79.0%', curve: true });

    return list;
  }, []);

  // Filter visible connections based on active scene
  const visibleConnections = useMemo(() => {
    return connections.filter(conn => {
      const srcVis = isNodeVisible(conn.source);
      const tgtVis = isNodeVisible(conn.target);
      return srcVis && tgtVis;
    });
  }, [connections, scene]);

  // Check if connection is highlighted
  const isConnectionHighlighted = (conn) => {
    if (!selectedEntity && !hoveredEntity) {
      if (scene === 2 || scene === 3) {
        // Highlight Big 3 connections by default
        return ['vanguard', 'blackrock', 'statestreet'].includes(conn.source);
      }
      return false;
    }

    const active = selectedEntity || hoveredEntity;

    if (active === 'bigthree') {
      return ['vanguard', 'blackrock', 'statestreet'].includes(conn.source);
    }
    if (active === 'vanguard') {
      return conn.source === 'vanguard';
    }
    if (active === 'blackrock') {
      return conn.source === 'blackrock';
    }
    if (active === 'statestreet') {
      return conn.source === 'statestreet';
    }
    if (active === 'berkshire') {
      return conn.source === 'berkshire';
    }
    if (active === 'public') {
      return conn.source === 'public';
    }
    if (active === 'coca') {
      return conn.target === 'coca' && conn.source !== 'public';
    }
    if (active === 'pepsi') {
      return conn.target === 'pepsi' && conn.source !== 'public';
    }

    return false;
  };

  // Determine flow direction and activation
  // Flow is either:
  // - 'down' (purple/amber) representing voting power / corporate strategy
  // - 'up' (emerald green) representing dividends / profit cash back to shareholders
  // - null (inactive)
  const getConnectionFlow = (conn) => {
    const active = selectedEntity || hoveredEntity;
    if (!active) {
      if (scene === 2 || scene === 3) {
        // Default flows for Big Three
        if (['vanguard', 'blackrock', 'statestreet'].includes(conn.source)) {
          return { direction: 'down', color: '#a855f7' }; // voting power flow
        }
      }
      return null;
    }

    // Company clicked -> money flows UP
    if (active === 'coca' && conn.target === 'coca') {
      return { direction: 'up', color: '#10b981' }; // Emerald profit flow
    }
    if (active === 'pepsi' && conn.target === 'pepsi') {
      return { direction: 'up', color: '#10b981' };
    }

    // Fund clicked -> voting power flows DOWN
    if (active === 'bigthree' && ['vanguard', 'blackrock', 'statestreet'].includes(conn.source)) {
      return { direction: 'down', color: '#fbbf24' }; // Amber voting power
    }
    if (active === 'vanguard' && conn.source === 'vanguard') {
      return { direction: 'down', color: '#fbbf24' };
    }
    if (active === 'blackrock' && conn.source === 'blackrock') {
      return { direction: 'down', color: '#fbbf24' };
    }
    if (active === 'statestreet' && conn.source === 'statestreet') {
      return { direction: 'down', color: '#fbbf24' };
    }
    if (active === 'berkshire' && conn.source === 'berkshire') {
      return { direction: 'down', color: '#fbbf24' };
    }
    if (active === 'public' && conn.source === 'public') {
      return { direction: 'down', color: '#64748b' };
    }

    return null;
  };

  // Sidebar info selector
  const activeDetail = useMemo(() => {
    if (!selectedEntity) return null;
    return SHAREHOLDER_DETAILS[selectedEntity] || null;
  }, [selectedEntity]);

  return (
    <div className="w-full max-w-7xl mx-auto py-2">
      
      {/* 4 Scene Header Tracker */}
      <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-left w-full md:w-auto">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
            Tiến Trình Điều Tra Tương Tác
          </span>
          <h4 className="text-sm font-black text-white mt-0.5">
            {scene === 1 && "Cảnh 1: Bề mặt cạnh tranh"}
            {scene === 2 && "Cảnh 2: Cổ đông trực tiếp"}
            {scene === 3 && "Cảnh 3: Không cần 51%"}
            {scene === 4 && "Cảnh 4: Mạng lưới sở hữu chéo"}
          </h4>
        </div>
        
        {/* Scenario Steps */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-white/5 overflow-x-auto max-w-full">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setScene(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                scene === s 
                  ? 'bg-purple-600 border border-purple-500/30 text-white shadow-md shadow-purple-600/20' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              Cảnh {s}
            </button>
          ))}
        </div>

        {/* Next / Prev Scene controls */}
        <div className="flex gap-2">
          <button
            disabled={scene === 1}
            onClick={() => setScene(prev => Math.max(1, prev - 1))}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Quay lại
          </button>
          {scene < 4 ? (
            <button
              onClick={() => setScene(prev => Math.min(4, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 border border-purple-500/30 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              <span>Kế tiếp</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <button
              onClick={() => setScene(1)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/30 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              <RefreshCw size={12} className="animate-spin-slow" />
              <span>Bắt đầu lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Board + Sidebar Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Left/Middle: The custom Investigation Board */}
        <div className="lg:col-span-2 min-h-[580px] bg-slate-950/70 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl backdrop-blur-sm flex flex-col justify-between">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
          
          {/* Legend badge overlays inside the Canvas */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
            <span className="text-[10px] font-semibold text-gray-500 tracking-wider bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/5 uppercase">
              Bản Đồ Điều Tra
            </span>
            {scene >= 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 shadow-lg max-w-[200px]"
              >
                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-bold">Khối Big Three</span>
                <span className="text-xl font-black text-purple-300 font-mono">19.6% - 21%</span>
                <span className="text-[8px] text-gray-400 block mt-0.5 leading-tight">
                  Tập trung bỏ phiếu, lấn át cổ đông nhỏ lẻ
                </span>
              </motion.div>
            )}
          </div>

          {/* SVG Connections Layer */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="gradient-power" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradient-dividends" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Render Big Three Dotted Bounding Box in Scene 3 or 4 */}
            {(scene === 3 || scene === 4) && (
              <rect
                x="20"
                y="5"
                width="60"
                height="22"
                rx="6"
                fill="none"
                stroke="rgba(168, 85, 247, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                className="animate-pulse cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEntity('bigthree');
                }}
              />
            )}

            {/* 1. Render active connections */}
            {visibleConnections.map((conn, idx) => {
              const src = nodes[conn.source];
              const tgt = nodes[conn.target];
              if (!src || !tgt) return null;

              const isHighlighted = isConnectionHighlighted(conn);
              const flow = getConnectionFlow(conn);
              const pathD = conn.curve ? getBezierPath(src.x, src.y, tgt.x, tgt.y) : getStraightPath(src.x, src.y, tgt.x, tgt.y);

              return (
                <g key={`conn-${idx}`}>
                  {/* Outer glow line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? (flow?.color || "#a855f7") : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isHighlighted ? 3 : 1}
                    className={`transition-all duration-300 ${isHighlighted ? 'filter drop-shadow-[0_0_4px_currentColor]' : ''}`}
                    opacity={isHighlighted ? 0.8 : 0.25}
                  />

                  {/* Flowing animated particles */}
                  {isHighlighted && flow && (
                    <circle r="1.5" fill={flow.color} className="filter drop-shadow-[0_0_3px_currentColor]">
                      <animateMotion
                        dur={flow.direction === 'up' ? "1.6s" : "2.2s"}
                        repeatCount="indefinite"
                        path={pathD}
                        keyPoints={flow.direction === 'up' ? "1;0" : "0;1"}
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* 2. Scene 4: Fund Portfolio Web (Tech Giants) */}
            {scene === 4 && TECH_GIANTS.map((tech) => {
              const active = selectedEntity || hoveredEntity;
              const funds = ['blackrock', 'vanguard', 'statestreet'];
              
              return funds.map((fundId) => {
                const src = nodes[fundId];
                if (!src) return null;

                const isFundActive = active === fundId || active === 'bigthree';
                const isPathActive = isFundActive || active === tech.id;
                
                const pathD = getBezierPath(src.x, src.y, tech.x, tech.y);
                const percentLabel = TECH_OWNERSHIP[fundId][tech.id];

                return (
                  <g key={`tech-conn-${fundId}-${tech.id}`} className="transition-all duration-300">
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isPathActive ? "#c084fc" : "rgba(255, 255, 255, 0.02)"}
                      strokeWidth={isPathActive ? 2 : 0.6}
                      className={isPathActive ? "filter drop-shadow-[0_0_3px_#a855f7]" : ""}
                      opacity={isPathActive ? 0.65 : 0.1}
                    />

                    {isPathActive && (
                      <circle r="1.2" fill="#c084fc">
                        <animateMotion
                          dur="2.5s"
                          repeatCount="indefinite"
                          path={pathD}
                          keyPoints="0;1"
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    )}
                  </g>
                );
              });
            })}
          </svg>

          {/* 3. HTML Connection Midpoint Labels Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {visibleConnections.map((conn, idx) => {
              const src = nodes[conn.source];
              const tgt = nodes[conn.target];
              if (!src || !tgt) return null;

              const isHighlighted = isConnectionHighlighted(conn);
              if (!isHighlighted) return null;

              // Calculate linear midpoint coordinates
              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;

              return (
                <div
                  key={`label-${idx}`}
                  className="absolute bg-slate-950/90 text-amber-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                  style={{ left: `${midX}%`, top: `${midY}%` }}
                >
                  {conn.value}
                </div>
              );
            })}

            {/* Scene 4: Portfolio Holdings Labels */}
            {scene === 4 && (selectedEntity || hoveredEntity) && (
              TECH_GIANTS.map((tech) => {
                const active = selectedEntity || hoveredEntity;
                // If a single fund is clicked, show its ownership rate to tech companies
                if (['vanguard', 'blackrock', 'statestreet'].includes(active)) {
                  const src = nodes[active];
                  const midX = (src.x + tech.x) / 2;
                  const midY = (src.y + tech.y) / 2;
                  const value = TECH_OWNERSHIP[active][tech.id];

                  return (
                    <div
                      key={`tech-lbl-${tech.id}`}
                      className="absolute bg-slate-950/95 text-purple-300 font-mono text-[8px] font-bold px-1 py-0.5 rounded border border-purple-500/20 transform -translate-x-1/2 -translate-y-1/2 shadow"
                      style={{ left: `${midX}%`, top: `${midY}%` }}
                    >
                      {value}
                    </div>
                  );
                }
                return null;
              })
            )}
          </div>

          {/* 4. HTML Interactive Node Elements */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            
            {/* BIG THREE BOX LABEL */}
            {(scene === 3 || scene === 4) && (
              <div
                className="absolute transform -translate-x-1/2 px-2 py-0.5 bg-purple-950/80 border border-purple-500/40 rounded text-[9px] font-bold font-mono tracking-widest text-purple-300 uppercase cursor-pointer pointer-events-auto shadow-md shadow-purple-950/50 hover:bg-purple-900/80"
                style={{ left: '50%', top: '6.5%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEntity('bigthree');
                }}
              >
                Khối Big Three (Tập trung)
              </div>
            )}

            {/* Node Renderers */}
            {Object.keys(nodes).map((key) => {
              const node = nodes[key];
              if (!isNodeVisible(key)) return null;

              const isHighlighted = isNodeHighlighted(key);
              
              // Custom styles for specific node types
              let borderTheme = 'border-white/10 hover:border-white/20 bg-slate-900/85';
              let textTheme = 'text-gray-300';
              let shadowClass = '';

              if (node.type === 'company') {
                if (key === 'coca') {
                  borderTheme = isHighlighted 
                    ? 'border-red-500 bg-red-950/30 ring-2 ring-red-500/50' 
                    : 'border-red-900/40 hover:border-red-500/50 bg-red-950/15';
                  textTheme = 'text-red-200';
                  shadowClass = isHighlighted ? 'shadow-[0_0_18px_rgba(239,68,68,0.4)]' : '';
                } else {
                  borderTheme = isHighlighted 
                    ? 'border-blue-500 bg-blue-950/30 ring-2 ring-blue-500/50' 
                    : 'border-blue-900/40 hover:border-blue-500/50 bg-blue-950/15';
                  textTheme = 'text-blue-200';
                  shadowClass = isHighlighted ? 'shadow-[0_0_18px_rgba(59,130,246,0.4)]' : '';
                }
              } else if (node.type === 'fund') {
                borderTheme = isHighlighted 
                  ? 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/50' 
                  : 'border-purple-900/30 hover:border-purple-500/30 bg-purple-950/10';
                textTheme = 'text-purple-200';
                shadowClass = isHighlighted ? 'shadow-[0_0_18px_rgba(168,85,247,0.45)]' : '';
              } else if (node.type === 'berkshire') {
                borderTheme = isHighlighted 
                  ? 'border-amber-500 bg-amber-950/30 ring-2 ring-amber-500/40' 
                  : 'border-amber-900/20 hover:border-amber-500/20 bg-amber-950/5';
                textTheme = 'text-amber-200';
                shadowClass = isHighlighted ? 'shadow-[0_0_12px_rgba(245,158,11,0.25)]' : '';
              }

              // Rendering Public node or other nodes
              if (node.type === 'public') {
                const isExploded = selectedEntity === 'public';
                return (
                  <motion.div
                    key={key}
                    layoutId={`node-${key}`}
                    className={`absolute flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-colors duration-200 cursor-pointer pointer-events-auto select-none ${
                      isHighlighted 
                        ? 'border-slate-400 bg-slate-900/90 ring-1 ring-slate-400/30' 
                        : 'border-slate-800 hover:border-slate-600 bg-slate-950/80'
                    }`}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      x: '-50%',
                      y: '-50%',
                      width: '130px',
                      height: '75px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEntity('public');
                    }}
                    onMouseEnter={() => setHoveredEntity('public')}
                    onMouseLeave={() => setHoveredEntity(null)}
                  >
                    <span className="text-[10px] font-black tracking-wide text-slate-300">
                      Public & Others
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                      Cổ đông đại chúng
                    </span>

                    {/* Exploded dot cloud container */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none">
                      {publicDots.map((dot) => {
                        const multiplier = isExploded ? 2.8 : 0.0;
                        return (
                          <motion.div
                            key={dot.id}
                            className="absolute rounded-full bg-slate-500/80"
                            style={{
                              width: dot.size,
                              height: dot.size,
                              left: '50%',
                              top: '50%'
                            }}
                            animate={{
                              x: dot.x * multiplier,
                              y: dot.y * multiplier,
                              opacity: isExploded ? [0.9, 0.3, 0.9] : 0
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 90,
                              damping: 10,
                              delay: (dot.id % 8) * 0.008
                            }}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                );
              }

              // Standard nodes (Companies, Funds, Berkshire)
              return (
                <motion.div
                  key={key}
                  layoutId={`node-${key}`}
                  className={`absolute flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-colors duration-200 cursor-pointer pointer-events-auto select-none ${borderTheme} ${shadowClass}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    x: '-50%',
                    y: '-50%',
                    width: '140px',
                    minHeight: '65px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEntity(key);
                  }}
                  onMouseEnter={() => setHoveredEntity(key)}
                  onMouseLeave={() => setHoveredEntity(null)}
                >
                  {/* Micro-glow pulse on top of active entities */}
                  {isHighlighted && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                  )}
                  
                  {/* Node icon or brand representation */}
                  {node.type === 'company' && (
                    <div className={`w-3.5 h-3.5 rounded-full mb-1 flex items-center justify-center text-[7px] font-bold text-white ${key === 'coca' ? 'bg-red-600' : 'bg-blue-600'}`}>
                      {key === 'coca' ? 'C' : 'P'}
                    </div>
                  )}
                  {node.type === 'fund' && (
                    <Landmark size={12} className="text-purple-400 mb-1" />
                  )}
                  {node.type === 'berkshire' && (
                    <Coins size={12} className="text-amber-400 mb-1" />
                  )}

                  <span className={`text-[10px] font-black tracking-wide ${textTheme}`}>
                    {node.label}
                  </span>
                  
                  {/* Context share tags */}
                  {scene >= 2 && node.type === 'fund' && (
                    <span className="text-[8px] font-mono text-purple-400/80 mt-0.5">
                      {key === 'vanguard' && '≈9% sở hữu'}
                      {key === 'blackrock' && '≈7% sở hữu'}
                      {key === 'statestreet' && '≈4% sở hữu'}
                    </span>
                  )}
                  {scene >= 2 && key === 'berkshire' && (
                    <span className="text-[8px] font-mono text-amber-400/80 mt-0.5">
                      9.2% Coca-Cola
                    </span>
                  )}
                </motion.div>
              );
            })}

            {/* 5. Tech Giants row (Fades and scales up in Scene 4) */}
            {scene === 4 && TECH_GIANTS.map((tech) => {
              const isHighlighted = isNodeHighlighted(tech.id);
              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-colors duration-200 cursor-pointer pointer-events-auto ${
                    isHighlighted 
                      ? 'border-purple-400 bg-purple-950/20 ring-2 ring-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]' 
                      : 'border-white/5 bg-slate-900/50 hover:border-purple-500/20 hover:bg-slate-900/80'
                  }`}
                  style={{
                    left: `${tech.x}%`,
                    top: `${tech.y}%`,
                    x: '-50%',
                    y: '-50%',
                    width: '95px',
                    height: '52px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEntity(tech.id);
                  }}
                  onMouseEnter={() => setHoveredEntity(tech.id)}
                  onMouseLeave={() => setHoveredEntity(null)}
                >
                  <span className="text-[9px] font-bold text-gray-300">{tech.name}</span>
                  <span className="text-[8px] font-mono text-purple-400 font-bold mt-0.5">{tech.code}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive hints at the bottom of the board */}
          <div className="p-4 border-t border-white/5 bg-slate-950/40 text-center relative z-20">
            <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              {scene === 1 && "Nhấp nút Kế tiếp để lật mặt sau, vén màn cổ đông thực sự."}
              {scene === 2 && "Nhấp vào các quỹ để xem mạng lưới sở hữu hoặc Coca/Pepsi để xem dòng tiền."}
              {scene === 3 && "Nhấp vào Public để xem sự phân tán, hoặc khối Big Three để xem sức mạnh tập trung."}
              {scene === 4 && "Nhấp vào BlackRock/Vanguard để xem sức mạnh chi phối bao phủ toàn bộ các tập đoàn công nghệ lớn."}
            </span>
          </div>
        </div>

        {/* Right: Dynamic "Hồ sơ điều tra" panel */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between text-left bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
          
          {/* Ambient lighting effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Info size={16} className="text-purple-400" />
              <h3 className="text-sm font-black text-gray-300 uppercase tracking-wider">
                HỒ SƠ ĐIỀU TRA
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {selectedEntity ? (
                <motion.div
                  key={selectedEntity}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Header Title inside Profile */}
                  <div>
                    <h4 className="text-base font-black text-purple-400 tracking-tight">
                      {activeDetail ? activeDetail.name : nodes[selectedEntity]?.label || selectedEntity.toUpperCase()}
                    </h4>
                    <span className="text-[9px] text-purple-300 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono block w-fit mt-1">
                      {activeDetail ? activeDetail.badge : "Định chế mục tiêu"}
                    </span>
                  </div>

                  {/* Badges for active concepts */}
                  {activeDetail && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[8px] font-bold font-mono">
                        Không cần 51%
                      </span>
                      {selectedEntity === 'public' ? (
                        <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-[8px] font-bold font-mono">
                          Phân tán & Yếu thế
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[8px] font-bold font-mono">
                          Cổ phiếu khống chế
                        </span>
                      )}
                      {selectedEntity !== 'public' && selectedEntity !== 'berkshire' && (
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[8px] font-bold font-mono">
                          Sở hữu chéo
                        </span>
                      )}
                    </div>
                  )}

                  {/* 1. Phát hiện chính */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                      [1] Phát hiện chính
                    </span>
                    <p className="text-xs text-gray-200 font-semibold leading-relaxed">
                      {activeDetail ? activeDetail.discovery : "Nhấp để tiếp tục điều tra chi tiết."}
                    </p>
                  </div>

                  {/* 2. Con số sở hữu */}
                  <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 space-y-1.5">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block">
                      [2] Con số sở hữu
                    </span>
                    <p className="text-xs text-amber-400 font-mono font-bold leading-normal">
                      {activeDetail ? activeDetail.figures : "N/A"}
                    </p>
                  </div>

                  {/* 3. Vì sao không cần 51%? */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                      [3] Vì sao không cần 51%?
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {activeDetail ? activeDetail.whyPower : ""}
                    </p>
                  </div>

                  {/* 4. Quyền lực thực tế */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                      [4] Quyền lực thực tế
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed font-medium">
                      {activeDetail ? activeDetail.power : ""}
                    </p>
                  </div>

                  {/* 5. Ý nghĩa lý thuyết */}
                  <div className="bg-purple-950/15 border border-purple-500/10 rounded-xl p-3 space-y-1">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                      [5] Ý nghĩa lý thuyết
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {activeDetail ? activeDetail.theory : ""}
                    </p>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="no-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 space-y-4"
                >
                  <HelpCircle size={40} className="mx-auto text-gray-600 opacity-40 animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 leading-relaxed px-4">
                      {scene === 1 && "Nhấp vào Coca-Cola hoặc PepsiCo tại trung tâm sơ đồ để xem các dòng tương tác ban đầu."}
                      {scene === 2 && "Nhấp vào bất kỳ Cổ đông trực tiếp nào ở hàng trên (Vanguard, BlackRock, State Street) để kiểm tra dòng sở hữu chéo."}
                      {scene === 3 && "Nhấp vào Public & Others ở phía dưới để kích hoạt hiệu ứng phân tán cổ đông đại chúng."}
                      {scene === 4 && "Nhấp vào BlackRock hoặc Vanguard để kiểm tra mạng lưới chân rết tài chính phủ rộng cả các tập đoàn công nghệ."}
                    </p>
                    <span className="text-[10px] text-purple-400 font-mono block">
                      [Chọn một đối tượng trên sơ đồ để mở hồ sơ]
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick reset select */}
          {selectedEntity && (
            <button
              onClick={() => setSelectedEntity(null)}
              className="mt-6 flex items-center justify-center gap-1.5 w-full py-2 bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-white/10 text-[10px] font-bold text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw size={10} />
              <span>Xóa bộ lọc hồ sơ</span>
            </button>
          )}
        </div>
      </div>

      {/* Climax: Academic Insight Conclusion Card */}
      <div className="mt-8 glass-panel rounded-2xl p-6 md:p-8 border border-purple-500/20 bg-gradient-to-r from-purple-950/10 via-slate-950/40 to-indigo-950/10 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <h3 className="text-base md:text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
          <Users size={16} />
          Kết luận: Sự thống trị không cần sở hữu tuyệt đối
        </h3>
        
        <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
          Bạn vừa phát hiện một hình thức quyền lực mới của tư bản tài chính. Coca-Cola và PepsiCo vẫn cạnh tranh trong kinh tế thực, nhưng phía sau họ là những cổ đông tài chính trùng nhau. Các quỹ này không cần sở hữu 51% hay mua đứt doanh nghiệp. Chỉ cần nắm các khối cổ phần đủ lớn, bỏ phiếu tập trung và hiện diện trong nhiều công ty cùng lúc, họ đã có thể gây ảnh hưởng lên toàn bộ thị trường.
        </p>
      </div>
    </div>
  );
}
