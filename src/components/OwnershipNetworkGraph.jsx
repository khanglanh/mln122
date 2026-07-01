import React, { useState, useEffect, useMemo } from 'react';
import { ReactFlow, Background, Position, MarkerType } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Info, BarChart2, GitFork, Users } from 'lucide-react';
import '@xyflow/react/dist/style.css';

import networkData from '../data/ownership_network.json';
import shareholdersData from '../data/shareholders.json';

// Custom node component to render premium dark styling
const CustomNode = ({ data }) => {
  const isTarget = data.type === 'company';
  const borderClass = isTarget 
    ? 'border-blue-500/50 bg-blue-950/40 text-blue-300 shadow-blue-500/10 shadow-lg' 
    : data.type === 'retail'
      ? 'border-slate-700 bg-slate-900/60 text-slate-400'
      : 'border-purple-500/40 bg-purple-950/30 text-purple-300 shadow-purple-500/5 shadow-md';

  return (
    <div className={`px-4 py-2.5 rounded-lg border text-xs font-semibold tracking-wide ${borderClass} transition-all duration-300 text-center min-w-[140px]`}>
      <div>{data.label}</div>
      {data.share !== undefined && (
        <div className="text-[10px] text-amber-400/80 mt-0.5">
          {data.share}% {data.type === 'owner' ? 'holding' : 'shares'}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function OwnershipNetworkGraph({ initialBrand = 'coca_cola', isEnglish }) {
  const [brand, setBrand] = useState(initialBrand);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [highlightedEdges, setHighlightedEdges] = useState(new Set());

  // Load raw network data for current brand
  const currentNetwork = useMemo(() => networkData[brand], [brand]);
  const shareholdersList = useMemo(() => shareholdersData[brand], [brand]);

  // Construct React Flow nodes
  const initialNodes = useMemo(() => {
    return currentNetwork.nodes.map((node) => {
      // Calculate layouts statically for a clean, clean vertical or horizontal graph
      let x = 0;
      let y = 0;

      if (node.id === 'target') {
        x = 250;
        y = 350;
      } else if (node.depth === 1) {
        // Level 1: Shareholders
        const idx = currentNetwork.nodes.filter(n => n.depth === 1).findIndex(n => n.id === node.id);
        const count = currentNetwork.nodes.filter(n => n.depth === 1).length;
        x = 50 + idx * (500 / (count - 1));
        y = 200;
      } else if (node.depth === 2) {
        // Level 2: Ownership of shareholders
        const idx = currentNetwork.nodes.filter(n => n.depth === 2).findIndex(n => n.id === node.id);
        const count = currentNetwork.nodes.filter(n => n.depth === 2).length;
        x = 20 + idx * (560 / (count - 1));
        y = 50;
      }

      return {
        id: node.id,
        type: 'custom',
        data: { label: node.label, type: node.type, share: node.share },
        position: { x, y },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
    });
  }, [currentNetwork]);

  // Construct React Flow edges
  const initialEdges = useMemo(() => {
    return currentNetwork.links.map((link, idx) => {
      const edgeId = `e-${link.source}-${link.target}`;
      const isHighlighted = highlightedEdges.has(edgeId);

      return {
        id: edgeId,
        source: link.source,
        target: link.target,
        animated: isHighlighted || link.source === 'vanguard' || link.source === 'blackrock' || link.source === 'statestreet',
        label: `${link.value}%`,
        labelStyle: { fill: '#9ca3af', fontSize: 9, fontWeight: 600, background: '#0B1020' },
        labelBgPadding: [4, 2],
        labelBgBorderRadius: 2,
        labelBgStyle: { fill: '#0f172a', fillOpacity: 0.95 },
        style: { 
          stroke: isHighlighted ? '#a855f7' : 'rgba(255, 255, 255, 0.12)', 
          strokeWidth: isHighlighted ? 2.5 : 1.2 
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isHighlighted ? '#a855f7' : 'rgba(255, 255, 255, 0.2)',
          width: 12,
          height: 12,
        },
      };
    });
  }, [currentNetwork, highlightedEdges]);

  // Handle node selection / highlighting paths
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    
    // Compute ancestors/descendants to highlight paths
    const newHighlightedNodes = new Set([node.id]);
    const newHighlightedEdges = new Set();

    // Trace down towards target
    let currentId = node.id;
    currentNetwork.links.forEach((l) => {
      if (l.source === currentId) {
        newHighlightedNodes.add(l.target);
        newHighlightedEdges.add(`e-${l.source}-${l.target}`);
      }
      if (l.target === currentId) {
        newHighlightedNodes.add(l.source);
        newHighlightedEdges.add(`e-${l.source}-${l.target}`);
      }
    });

    setHighlightedNodes(newHighlightedNodes);
    setHighlightedEdges(newHighlightedEdges);
  };

  const clearHighlight = () => {
    setSelectedNode(null);
    setHighlightedNodes(new Set());
    setHighlightedEdges(new Set());
  };

  // Find shareholder info for detailed panel
  const activeShareholderInfo = useMemo(() => {
    if (!selectedNode) return null;
    return shareholdersList.find(s => s.name.toLowerCase().includes(selectedNode.id));
  }, [selectedNode, shareholdersList]);

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      {/* Brand Select Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => { setBrand('coca_cola'); clearHighlight(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${brand === 'coca_cola' ? 'bg-red-500/20 border-red-500/40 text-red-300' : 'bg-slate-900/50 border-white/5 text-gray-400 hover:text-gray-200'}`}
          >
            {isEnglish ? "Coca-Cola Ownership" : "Mạng lưới Coca-Cola"}
          </button>
          <button
            onClick={() => { setBrand('pepsi'); clearHighlight(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${brand === 'pepsi' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'bg-slate-900/50 border-white/5 text-gray-400 hover:text-gray-200'}`}
          >
            {isEnglish ? "PepsiCo Ownership" : "Mạng lưới PepsiCo"}
          </button>
        </div>
        <span className="text-[11px] text-gray-500">
          {isEnglish ? "Click any node to investigate direct & indirect ownership structures" : "Nhấp vào bất kỳ nút nào để tra cứu cấu trúc sở hữu trực tiếp & gián tiếp"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* React Flow Container */}
        <div className="lg:col-span-2 h-[450px] glass-panel rounded-2xl relative border border-white/10 overflow-hidden">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            nodesConnectable={false}
            nodesDraggable={false}
            zoomOnScroll={false}
            panOnDrag={true}
          >
            <Background color="rgba(255, 255, 255, 0.05)" gap={16} size={1} />
          </ReactFlow>
          
          {selectedNode && (
            <button
              onClick={clearHighlight}
              className="absolute bottom-4 right-4 bg-slate-950/80 border border-white/10 hover:border-white/20 text-white rounded-lg px-3 py-1.5 text-xs transition-colors cursor-pointer"
            >
              {isEnglish ? "Clear Filter" : "Xóa bộ lọc"}
            </button>
          )}
        </div>

        {/* Dynamic Detail Side Panel */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-purple-400" />
              <h3 className="text-sm font-bold text-gray-300">
                {isEnglish ? "Ownership Information" : "Thông tin cấu trúc sở hữu"}
              </h3>
            </div>

            {selectedNode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-base font-extrabold text-purple-400">{selectedNode.data.label}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">
                    {isEnglish ? `Node Type: ${selectedNode.data.type}` : `Loại: ${selectedNode.data.type === 'company' ? 'Doanh nghiệp gốc' : 'Cổ đông tổ chức'}`}
                  </p>
                </div>

                {activeShareholderInfo ? (
                  <div className="space-y-4">
                    {/* Shareholder specific percentages */}
                    <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{isEnglish ? "Direct Share" : "Tỷ lệ trực tiếp"}</span>
                        <span className="text-sm font-bold text-gray-200">{activeShareholderInfo.direct}%</span>
                      </div>
                      
                      {activeShareholderInfo.indirect > 0 && (
                        <>
                          <div className="flex justify-between items-center border-t border-white/5 pt-2">
                            <span className="text-xs text-gray-400">{isEnglish ? "Indirect Share" : "Tỷ lệ gián tiếp"}</span>
                            <span className="text-sm font-bold text-amber-400">+{activeShareholderInfo.indirect}%</span>
                          </div>
                          
                          <div className="flex justify-between items-center border-t border-white/5 pt-2 bg-purple-500/5 p-1 rounded">
                            <span className="text-xs font-semibold text-purple-300">{isEnglish ? "Effective Power" : "Quyền biểu quyết thực tế"}</span>
                            <span className="text-sm font-black text-purple-400">
                              {(activeShareholderInfo.direct + activeShareholderInfo.indirect).toFixed(1)}%
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="text-xs text-gray-400 bg-slate-950/30 p-3 rounded-lg leading-relaxed">
                      <div className="font-semibold text-gray-300 mb-1">{isEnglish ? "Cross-ownership mechanism" : "Cơ chế sở hữu chéo:"}</div>
                      {isEnglish ? activeShareholderInfo.source : activeShareholderInfo.source_vi}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 bg-slate-900/40 p-3 rounded-lg leading-relaxed">
                    {isEnglish 
                      ? "This is the primary corporate entity or retail shares block. Selecting institutional shareholders calculates the network of voting power." 
                      : "Đây là thực thể tập đoàn chính hoặc nhóm cổ phiếu đại chúng. Lựa chọn cổ đông định chế để xem chi tiết tính toán quyền lực bỏ phiếu chéo."}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <GitFork size={36} className="mx-auto text-gray-600 mb-2 opacity-55 animate-pulse" />
                <p className="text-xs text-gray-400 leading-relaxed px-4">
                  {isEnglish 
                    ? "Select any box in the graph to analyze details and calculate indirect voting power."
                    : "Chọn một ô bất kỳ trên sơ đồ để xem thông tin chi tiết và tính toán quyền lực bỏ phiếu gián tiếp."}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-3 border-t border-white/5 text-[10px] text-gray-500 space-y-1 bg-slate-950/20 p-2.5 rounded-lg">
            <div className="font-semibold text-gray-400 flex items-center gap-1">
              <Users size={11} />
              {isEnglish ? "Academic Insights" : "Góc nhìn học thuật"}
            </div>
            <p className="leading-relaxed">
              {isEnglish 
                ? "Marxist Political Economy highlights that financial capital forms complex inter-locking networks, magnifying control beyond direct ownership."
                : "Kinh tế chính trị Mác–Lênin chỉ ra rằng tư bản tài chính kết mạng chặt chẽ, tạo điều kiện tích tụ quyền kiểm soát lớn hơn tỷ lệ sở hữu vốn trực tiếp."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
