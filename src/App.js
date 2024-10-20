import { useState, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  QrCode,
  Settings,
  Palette,
  Maximize,
  Code
} from 'lucide-react';

export default function FuturisticQRGenerator() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [fgColor, setFgColor] = useState("000000");
  const [qrCode, setQrCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}&color=${fgColor}`
    );
  }, [word, size, bgColor, fgColor]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setWord(temp);
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <QrCode className="h-8 w-8" />
            Quantum QR Generator
          </h1>
          <p className="text-slate-400">Generate stunning QR codes for the future</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Configuration Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-white text-xl flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5" />
                Configuration
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Content</label>
                <input
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
                  placeholder="Enter text to encode..."
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-16 h-10 bg-slate-900 border border-slate-700 rounded"
                    value={`#${bgColor}`}
                    onChange={(e) => setBgColor(e.target.value.substring(1))}
                  />
                  <input
                    value={`#${bgColor}`}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
                    onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Foreground Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-16 h-10 bg-slate-900 border border-slate-700 rounded"
                    value={`#${fgColor}`}
                    onChange={(e) => setFgColor(e.target.value.substring(1))}
                  />
                  <input
                    value={`#${fgColor}`}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white"
                    onChange={(e) => setFgColor(e.target.value.replace('#', ''))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Maximize className="h-4 w-4" />
                  Size: {size}px
                </label>
                <input
                  type="range"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  min={200}
                  max={600}
                  step={10}
                  className="w-full"
                />
              </div>

              <button 
                className={`w-full py-2 px-4 rounded bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2 ${!temp && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleGenerate}
                disabled={!temp}
              >
                <Sparkles className="h-4 w-4" />
                Generate QR Code
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-white text-xl mb-4">Preview</h2>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className={`bg-white p-4 rounded-lg transition-all duration-300 ${isGenerating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                {qrCode && <img src={qrCode} alt="QR Code" className="max-w-full" />}
              </div>
              
              {qrCode && (
                <a 
                  href={qrCode} 
                  download="quantum-qr-code"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-md text-white hover:bg-slate-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download QR Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-6">
  <div className="inline-flex items-center gap-2">
    <Code className="text-blue-500 animate-bounce h-6 w-6" />
    <p className="text-slate-400 hover:text-blue-400 transition-colors">
      Made by{" "}
      <a
        href="https://github.com/hari7261"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        hari7261
      </a>
    </p>
  </div>
</footer>
    </div>
  );
}