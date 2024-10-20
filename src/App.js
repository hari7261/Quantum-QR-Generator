"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Sparkles, 
  QrCode,
  Settings,
  Palette,
  Maximize,
  Code,
  Share2,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'

export default function EnhancedFuturisticQRGenerator() {
  const [temp, setTemp] = useState("")
  const [word, setWord] = useState("")
  const [size, setSize] = useState(400)
  const [bgColor, setBgColor] = useState("ffffff")
  const [fgColor, setFgColor] = useState("000000")
  const [qrCode, setQrCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (word) {
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${size}x${size}&bgcolor=${bgColor}&color=${fgColor}`
      )
    }
  }, [word, size, bgColor, fgColor])

  const handleGenerate = () => {
    setIsGenerating(true)
    setWord(temp)
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
      toast.success('QR Code generated successfully!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }, 800)
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Quantum QR Code',
        text: 'Check out this QR code I generated!',
        url: qrCode,
      })
      toast.success('Shared successfully!')
    } catch (error) {
      toast.error('Unable to share')
    }
  }

  const handleBack = () => {
    setShowPreview(false)
    setWord("")
    setQrCode("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <QrCode className="h-8 w-8" />
            Quantum QR Generator
          </h1>
          <p className="text-slate-400">Generate stunning QR codes for the future</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showPreview ? (
            <motion.div 
              key="config"
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="text-white text-xl flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5" />
                  Configuration
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm text-slate-400">Content</label>
                  <input
                    id="content"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter text to encode..."
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bgColor" className="text-sm text-slate-400 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="bgColor"
                      className="w-16 h-10 bg-slate-900 border border-slate-700 rounded cursor-pointer"
                      value={`#${bgColor}`}
                      onChange={(e) => setBgColor(e.target.value.substring(1))}
                    />
                    <input
                      value={`#${bgColor}`}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fgColor" className="text-sm text-slate-400 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Foreground Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="fgColor"
                      className="w-16 h-10 bg-slate-900 border border-slate-700 rounded cursor-pointer"
                      value={`#${fgColor}`}
                      onChange={(e) => setFgColor(e.target.value.substring(1))}
                    />
                    <input
                      value={`#${fgColor}`}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setFgColor(e.target.value.replace('#', ''))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="size" className="text-sm text-slate-400 flex items-center gap-2">
                    <Maximize className="h-4 w-4" />
                    Size: {size}px
                  </label>
                  <input
                    id="size"
                    type="range"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    min={200}
                    max={600}
                    step={10}
                    className="w-full accent-blue-500"
                  />
                </div>

                <motion.button 
                  className={`w-full py-2 px-4 rounded bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2 ${!temp && 'opacity-50 cursor-not-allowed'}`}
                  onClick={handleGenerate}
                  disabled={!temp || isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-white text-xl mb-4 flex items-center justify-between">
                <span>Preview</span>
                <motion.button
                  onClick={handleBack}
                  className="text-slate-400 hover:text-white flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </motion.button>
              </h2>
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div 
                  className="bg-white p-4 rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {qrCode && <img src={qrCode} alt="Generated QR Code" className="max-w-full" />}
                </motion.div>
                
                {qrCode && (
                  <div className="flex gap-2">
                    <motion.a 
                      href={qrCode} 
                      download="quantum-qr-code"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-md text-white hover:bg-slate-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </motion.a>
                    <motion.button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-md text-white hover:bg-slate-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.footer 
        className="text-center py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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
      </motion.footer>
    </div>
  )
}