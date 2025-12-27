import { useState } from 'react';

// ⚠️ 注意：这里以后要替换成你在 EdgeOne 上绑定的实际加速域名
// 目前我们先用一个占位符，不影响界面预览
const EDGE_DOMAIN = "https://git.007icu.eu.org";

export default function ProtocolTerminal() {
  const [inputUrl, setInputUrl] = useState('');
  const [status, setStatus] = useState('IDLE'); // 状态：空闲(IDLE), 处理中(PROCESSING), 已批准(APPROVED)
  const [result, setResult] = useState(null);
  
  const handleProcess = (e) => {
    e.preventDefault();
    if (!inputUrl) return;

    setStatus('PROCESSING');

    // 模拟“正在连接卫星”的延迟感 (0.8秒)
    setTimeout(() => {
      // 简单的字符串处理逻辑
      // 去掉 https://github.com/ 前缀
      let cleanPath = inputUrl.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '');
      
      // 生成三种格式的结果
      setResult({
        raw: `${EDGE_DOMAIN}/${cleanPath}`,
        clone: `git clone ${EDGE_DOMAIN}/${cleanPath}`,
        wget: `wget ${EDGE_DOMAIN}/${cleanPath}`
      });
      setStatus('APPROVED');
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-4 border-ink shadow-brutal p-6 md:p-10 relative overflow-hidden">
        {/* 装饰：右上角的档案编号 */}
        <div className="absolute top-0 right-0 bg-ink text-white px-3 py-1 text-xs font-bold">
            REF: 2025-NEBULA-GIT
        </div>

        {/* 标题区域 */}
        <div className="border-b-4 border-ink pb-6 mb-8 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-tighter">
                Acceleration Protocol
            </h2>
            <p className="text-sm mt-2 opacity-70">
                /// BUREAU OF DATA TRANSPORT // SECURE CHANNEL
            </p>
        </div>

        {/* 步骤 1：输入表单 */}
        <form onSubmit={handleProcess} className="mb-12">
            <div className="flex flex-col space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-safety-orange">
                    // Target Resource Locator (输入目标链接)
                </label>
                <div className="relative group">
                    <input 
                        type="text" 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://github.com/username/repository"
                        className="w-full bg-paper border-2 border-ink p-4 text-lg md:text-xl font-mono focus:outline-none focus:bg-white focus:border-safety-orange transition-colors placeholder-gray-400"
                    />
                    {/* 输入框装饰角标 */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-ink group-focus-within:bg-safety-orange"></div>
                </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs hidden md:block opacity-50">
                    * ALL REQUESTS ARE LOGGED BY EDGE-ONE
                </div>
                <button 
                    type="submit"
                    disabled={status === 'PROCESSING'}
                    className={`
                        px-8 py-3 font-bold border-2 border-ink uppercase tracking-wider
                        transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${status === 'PROCESSING' 
                            ? 'bg-grid cursor-wait shadow-none text-gray-500' 
                            : 'bg-safety-orange text-white shadow-brutal-sm hover:bg-ink'}
                    `}
                >
                    {status === 'PROCESSING' ? '/// VERIFYING...' : 'INITIATE PROTOCOL // 提交申请'}
                </button>
            </div>
        </form>

        {/* 步骤 2：输出结果 (仅当审批通过时显示) */}
        {status === 'APPROVED' && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 装饰：虚线剪切线 */}
                <div className="flex items-center space-x-4 mb-8 opacity-50">
                    <span className="text-xs">CUT HERE</span>
                    <div className="h-px bg-ink border-t border-dashed border-ink flex-grow"></div>
                    <span className="text-2xl">✂</span>
                </div>

                <div className="relative">
                    {/* 视觉特效：盖章 */}
                    <div className="absolute -top-6 -right-4 md:right-10 border-4 border-safety-orange text-safety-orange rounded-full w-32 h-32 flex items-center justify-center transform rotate-12 opacity-80 pointer-events-none z-10 mix-blend-multiply">
                        <div className="text-center">
                            <div className="text-xs font-bold border-b border-safety-orange">APPROVED</div>
                            <div className="text-xl font-serif font-black">NEBULA</div>
                            <div className="text-[10px] tracking-widest">SPEED-UP</div>
                        </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold mb-6 flex items-center">
                        <span className="w-2 h-6 bg-ink mr-3"></span>
                        MANIFEST OUTPUT (加速清单)
                    </h3>

                    <div className="space-y-6 relative z-20">
                        <ResultCard label="GIT CLONE" command={result.clone} />
                        <ResultCard label="WGET / cURL" command={result.wget} />
                        <ResultCard label="RAW PROXY" command={result.raw} />
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

// 子组件：单条结果卡片
function ResultCard({ label, command }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative">
            <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold bg-ink text-white px-1">{label}</span>
                <button 
                    onClick={handleCopy}
                    className="text-xs font-bold hover:text-safety-orange uppercase flex items-center space-x-1"
                >
                    <span>{copied ? '[ COPIED ]' : '[ COPY DATA ]'}</span>
                    {!copied && <span className="w-2 h-2 bg-ink inline-block animate-blink"></span>}
                </button>
            </div>
            <div className="bg-paper border border-ink p-3 font-mono text-sm break-all relative hover:bg-white transition-colors">
                {command}
            </div>
        </div>
    );
}