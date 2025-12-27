import { useState } from 'react';

// ⚠️ 请确保这里是你之前配置好的加速域名
const EDGE_DOMAIN = "https://git.007icu.eu.org";

export default function ProtocolTerminal() {
  const [inputUrl, setInputUrl] = useState('');
  const [status, setStatus] = useState('IDLE'); 
  const [result, setResult] = useState(null);
  
  const handleProcess = (e) => {
    e.preventDefault();
    if (!inputUrl) return;

    setStatus('PROCESSING');

    setTimeout(() => {
      try {
        // 1. 清理 URL，移除 https://github.com/ 前缀
        const cleanPath = inputUrl.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '').replace(/\/$/, '');
        const parts = cleanPath.split('/');
        
        // 简单校验
        if (parts.length < 2) {
            throw new Error("Invalid GitHub URL");
        }

        const user = parts[0];
        const repo = parts[1];
        const repoRoot = `${EDGE_DOMAIN}/${user}/${repo}`;

        let cloneCmd = '';
        let wgetCmd = '';
        let rawLink = '';

        // 2. 判断是“仓库首页”还是“具体文件”
        // GitHub 文件路径通常包含 /blob/分支名/...
        if (cleanPath.includes('/blob/')) {
            // === 场景 A: 具体文件 ===
            
            // 构造 Raw 链接：将 /blob/ 替换为 /raw/
            // 例如: user/repo/raw/main/README.md
            // 注意: 访问 github.com/user/repo/raw/... 会触发 302 跳转到 raw.githubusercontent.com
            // EdgeOne 默认会跟随这个跳转，从而实现加速
            const rawPath = cleanPath.replace('/blob/', '/raw/');
            const finalRawUrl = `${EDGE_DOMAIN}/${rawPath}`;
            const fileName = parts[parts.length - 1];

            cloneCmd = `git clone ${repoRoot}.git`; // Clone 依然拉取整个仓库
            wgetCmd = `wget -O ${fileName} ${finalRawUrl}`; // Wget 下载该文件
            rawLink = finalRawUrl; // Raw 显示文件直链

        } else {
            // === 场景 B: 仓库根目录 ===
            
            cloneCmd = `git clone ${repoRoot}.git`;
            
            // Wget 下载整个仓库的源码包 (ZIP)
            // 使用 HEAD.zip 可以自动指向默认分支 (main 或 master)
            wgetCmd = `wget -O ${repo}.zip ${repoRoot}/archive/HEAD.zip`;
            
            // 仓库没有所谓的“Raw链接”，这里显示加速后的仓库主页
            rawLink = repoRoot;
        }

        setResult({
            clone: cloneCmd,
            wget: wgetCmd,
            raw: rawLink
        });
        setStatus('APPROVED');

      } catch (err) {
        console.error(err);
        setStatus('IDLE'); // 简单的错误处理：重置状态
        alert("无效的 GitHub 链接，请检查格式 (Format error)");
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-4 border-ink shadow-brutal p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-ink text-white px-3 py-1 text-xs font-bold">
            REF: 2025-NEBULA-GIT
        </div>

        <div className="border-b-4 border-ink pb-6 mb-8 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-tighter">
                Acceleration Protocol
            </h2>
            <p className="text-sm mt-2 opacity-70">
                /// BUREAU OF DATA TRANSPORT // SECURE CHANNEL
            </p>
        </div>

        <form onSubmit={handleProcess} className="mb-12">
            <div className="flex flex-col space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-safety-orange">
                    // Target Resource Locator (输入 GitHub 链接)
                </label>
                <div className="relative group">
                    <input 
                        type="text" 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="w-full bg-paper border-2 border-ink p-4 text-lg md:text-xl font-mono focus:outline-none focus:bg-white focus:border-safety-orange transition-colors placeholder-gray-400"
                    />
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

        {status === 'APPROVED' && result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-4 mb-8 opacity-50">
                    <span className="text-xs">CUT HERE</span>
                    <div className="h-px bg-ink border-t border-dashed border-ink flex-grow"></div>
                    <span className="text-2xl">✂</span>
                </div>

                <div className="relative">
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
                        <ResultCard label="GIT CLONE (仓库克隆)" command={result.clone} />
                        <ResultCard label="WGET -O (下载源码/文件)" command={result.wget} />
                        <ResultCard label="ACCELERATED LINK (原始链接)" command={result.raw} />
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

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