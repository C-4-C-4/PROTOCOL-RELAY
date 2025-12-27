import { useState } from 'react';

// ⚠️ 确保这里是你的加速域名
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
        let cleanPath = inputUrl.trim();

        const isSimpleRepo = /^[a-zA-Z0-9_\-\.]+\/[a-zA-Z0-9_\-\.]+$/.test(cleanPath);
        
        if (!isSimpleRepo) {
             cleanPath = cleanPath
                .replace(/^(https?:\/\/)?(www\.)?github\.com\//, '')
                .replace(/\/$/, '')
                .replace(/\.git$/, ''); 
        }

        const parts = cleanPath.split('/');
        if (parts.length < 2) throw new Error("Format Error");

        const user = parts[0];
        const repo = parts[1];
        const repoRoot = `${EDGE_DOMAIN}/${user}/${repo}`;

        let cloneCmd = '';
        let wgetCmd = '';
        let curlCmd = '';
        let rawLink = '';
        let downloadLink = '';

        if (cleanPath.includes('/blob/')) {
            const rawPath = cleanPath.replace('/blob/', '/raw/');
            const finalRawUrl = `${EDGE_DOMAIN}/${rawPath}`;
            const fileName = parts[parts.length - 1];

            cloneCmd = `git clone ${repoRoot}.git`; 
            wgetCmd = `wget -O ${fileName} ${finalRawUrl}`;
            curlCmd = `curl -L -o ${fileName} ${finalRawUrl}`;
            rawLink = finalRawUrl;
            downloadLink = finalRawUrl;

        } else {
            cloneCmd = `git clone ${repoRoot}.git`;
            wgetCmd = `wget ${repoRoot}`;
            curlCmd = `curl -L ${repoRoot}`;
            downloadLink = `${repoRoot}/archive/HEAD.zip`;
            rawLink = repoRoot;
        }

        setResult({
            clone: cloneCmd,
            wget: wgetCmd,
            curl: curlCmd,
            raw: rawLink,
            download: downloadLink
        });
        setStatus('APPROVED');

      } catch (err) {
        console.error(err);
        setStatus('IDLE');
        alert("格式错误 (Format Error): 请输入完整链接或 '用户名/仓库名'");
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-4 border-ink shadow-brutal p-6 md:p-10 relative overflow-hidden">
        {/* 修改点 1：已删除右上角的黑色 REF 块 */}

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
                    // Target (Link or User/Repo)
                </label>
                <div className="relative group">
                    <input 
                        type="text" 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://github.com/torvalds/linux OR torvalds/linux"
                        className="w-full bg-paper border-2 border-ink p-4 text-lg md:text-xl font-mono focus:outline-none focus:bg-white focus:border-safety-orange transition-colors placeholder-gray-400"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-ink group-focus-within:bg-safety-orange"></div>
                </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs hidden md:block opacity-50 uppercase">
                    {/* 修改点 2：提示语更改 */}
                    * PROTOCOL-RELAY
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

                <div className="relative pt-6">
                    <div className="absolute -top-10 right-0 md:right-4 border-4 border-safety-orange text-safety-orange rounded-full w-28 h-28 flex items-center justify-center transform rotate-12 opacity-80 pointer-events-none z-10 mix-blend-multiply">
                        <div className="text-center">
                            <div className="text-xs font-bold border-b border-safety-orange">APPROVED</div>
                            <div className="text-lg font-serif font-black">NEBULA</div>
                            <div className="text-[10px] tracking-widest">SPEED-UP</div>
                        </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold mb-6 flex items-center">
                        <span className="w-2 h-6 bg-ink mr-3"></span>
                        MANIFEST OUTPUT (加速清单)
                    </h3>

                    <div className="space-y-6 relative z-20">
                        <ResultCard label="GIT CLONE" command={result.clone} />
                        <ResultCard label="WGET" command={result.wget} />
                        <ResultCard label="cURL" command={result.curl} />
                        <ResultCard label="ACCELERATED RAW URL" command={result.raw} />
                        <div className="mt-8 pt-4 border-t-2 border-dashed border-ink flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                                // PHYSICAL MEDIA ACCESS
                            </span>
                            <a 
                                href={result.download}
                                className="bg-ink text-white px-6 py-3 font-bold uppercase hover:bg-safety-orange hover:shadow-brutal-sm transition-all border-2 border-transparent"
                            >
                                ↓ Direct Download
                            </a>
                        </div>
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
                    className="text-xs font-bold hover:text-safety-orange uppercase flex items-center space-x-1 cursor-pointer z-30 relative"
                >
                    <span>{copied ? '[ COPIED ]' : '[ COPY ]'}</span>
                    {!copied && <span className="w-2 h-2 bg-ink inline-block animate-blink"></span>}
                </button>
            </div>
            <div className="bg-paper border border-ink p-3 font-mono text-sm break-all relative hover:bg-white transition-colors z-20">
                {command}
            </div>
        </div>
    );
}