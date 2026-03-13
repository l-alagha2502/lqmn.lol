"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Copy, Check, Crown, Heart, Moon, Lightbulb, CheckCircle2, Calendar, MapPin } from "lucide-react"
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import Image from "next/image"

const badges = [
  { label: "Premium", icon: Crown, color: "text-amber-400" },
  { label: "Loyal", icon: Heart, color: "text-rose-400" },
  { label: "Ramadan 2026", icon: Moon, color: "text-purple-400" },
  { label: "Innovator", icon: Lightbulb, color: "text-cyan-400" },
  { label: "Verified", icon: CheckCircle2, color: "text-blue-400" },
]

const socials = [
  {
    name: "Discord",
    icon: FaDiscord,
    action: "copy",
    value: "x.vst",
    iconColor: "#5865F2",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    action: "link",
    value: "https://github.com/l-alagha2502",
    iconColor: "#fff",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    action: "link",
    value: "https://www.instagram.com/pwyv.8/",
    iconColor: "#E4405F",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    action: "link",
    value: "https://www.linkedin.com/in/luqman2502",
    iconColor: "#0A66C2",
  },
  {
    name: "Vast",
    icon: null,
    action: "link",
    value: "https://bio.site/vast.qa",
    iconColor: "#10B981",
    isText: true,
  },
]

const bioMessages = [
  "Founder of Vast™",
  "Graphic Designer & Artist",
  "Amateur Boxer & Basketballer",
  "Reading Enthusiast.",
]

function TypewriterBio({ messages }: { messages: string[] }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentMessage.length) {
          setCurrentText(currentMessage.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentMessageIndex, messages])

  return (
    <span className="text-white/60">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function BioLink() {
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [copied, setCopied] = useState(false)
  const audioRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      if (isMuted) {
        audioRef.current.play()
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }
    setShowVolumeSlider(true)
  }

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
    }, 300)
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSocialClick = (social: typeof socials[0]) => {
    if (social.action === "copy") {
      handleCopy(social.value)
    } else {
      window.open(social.value, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background with Audio */}
      <video
        ref={audioRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      >
        <source src="/videos/car_background.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

      {/* Sound toggle with volume slider */}
      <div 
        className="fixed right-4 top-4 z-50 flex items-center gap-2"
        onMouseEnter={handleVolumeMouseEnter}
        onMouseLeave={handleVolumeMouseLeave}
      >
        {/* Volume Slider */}
        <div 
          className={`flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-2 backdrop-blur-sm transition-all duration-300 ${
            showVolumeSlider ? "w-32 opacity-100" : "w-0 opacity-0 overflow-hidden px-0 border-0"
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0"
          />
        </div>
        
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="rounded-full border border-white/20 bg-black/50 p-3 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-black/70"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white/70" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Profile Card - Glassy transparent */}
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-[2px]">
          {/* Top Section - PFP and Name side by side */}
          <div className="flex items-start gap-5">
            {/* Profile Picture with Animated Wave Lines - Bigger */}
            <div className="relative flex-shrink-0">
              {/* Animated continuous wave lines */}
              <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                {/* Outer wave line - continuous */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="url(#waveGradient1)"
                  strokeWidth="2"
                  className="animate-[spin_10s_linear_infinite]"
                  style={{ transformOrigin: "center" }}
                />
                {/* Middle wave line - continuous */}
                <circle
                  cx="60"
                  cy="60"
                  r="51"
                  fill="none"
                  stroke="url(#waveGradient2)"
                  strokeWidth="1.5"
                  className="animate-[spin_8s_linear_infinite_reverse]"
                  style={{ transformOrigin: "center" }}
                />
                {/* Inner wave line - continuous */}
                <circle
                  cx="60"
                  cy="60"
                  r="47"
                  fill="none"
                  stroke="url(#waveGradient1)"
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-[spin_12s_linear_infinite]"
                  style={{ transformOrigin: "center" }}
                />
              </svg>
              
              {/* Sweep overlay that goes over pfp every 3 seconds */}
              <div className="absolute inset-0 rounded-full overflow-hidden z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-sweep" />
              </div>
              
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-purple-500/50 bg-black/50">
                <Image
                  src="/images/pfp.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name and Info */}
            <div className="flex-1 min-w-0 pt-1">
              {/* Username with Glow */}
              <h1 className="font-serif text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] [text-shadow:0_0_20px_rgba(168,85,247,0.4),0_0_40px_rgba(168,85,247,0.2)]">
                𝕷𝖚𝖖𝖒𝖆𝖓
              </h1>

              {/* Badges Row */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {badges.map((badge, index) => (
                  <div key={index} className="group relative">
                    <div className="rounded-md bg-black/60 p-1.5 backdrop-blur-sm border border-white/10 transition-all hover:border-white/30 hover:bg-black/80">
                      <badge.icon className={`h-3.5 w-3.5 ${badge.color}`} />
                    </div>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 border border-white/20 z-20">
                      {badge.label}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                    </div>
                  </div>
                ))}
                {/* Aetherian Badge */}
                <div className="group relative">
                  <div className="rounded-md bg-black/60 p-1.5 backdrop-blur-sm border border-white/10 transition-all hover:border-white/30 hover:bg-black/80 flex items-center justify-center w-[26px] h-[26px]">
                    <span className="font-bold text-purple-400 text-[10px] leading-none">!!!</span>
                  </div>
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 border border-white/20 z-20">
                    Aetherian
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                  </div>
                </div>
                {/* Vex Badge */}
                <div className="group relative">
                  <div className="rounded-md bg-black/60 p-1.5 backdrop-blur-sm border border-white/10 transition-all hover:border-white/30 hover:bg-black/80 flex items-center justify-center w-[26px] h-[26px]">
                    <span className="font-mono font-bold text-white text-[10px] leading-none">{"<>"}</span>
                  </div>
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 border border-white/20 z-20">
                    {"</Vex>"}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                  </div>
                </div>
              </div>

              {/* Typewriter Bio */}
              <div className="mt-3 h-5 text-sm">
                <TypewriterBio messages={bioMessages} />
              </div>
            </div>
          </div>

          {/* Social Icons Row - Centered */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {socials.map((social, index) => (
              <button
                key={index}
                onClick={() => handleSocialClick(social)}
                className="group relative rounded-full border border-white/10 bg-black/40 p-2.5 backdrop-blur-sm transition-all hover:scale-110 hover:border-white/30 hover:bg-black/60"
                aria-label={social.name}
              >
                {social.isText ? (
                  <span className="flex h-4 w-4 items-center justify-center text-xs font-bold" style={{ color: social.iconColor }}>
                    V
                  </span>
                ) : (
                  <social.icon
                    className="h-4 w-4 transition-all group-hover:scale-110"
                    style={{ color: social.iconColor }}
                  />
                )}
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 border border-white/20 z-20">
                  {social.action === "copy" ? (copied ? "Copied!" : `Copy: ${social.value}`) : social.name}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                </div>
              </button>
            ))}
          </div>

          {/* AETHER Widget - Chrome Metallic Liquid Effect */}
          <a
            href="https://www.discord.gg/cy3t9tQbMT"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-4 flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-sm transition-all duration-500 overflow-hidden hover:border-white/20"
          >
            {/* Chrome metallic liquid effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              {/* Base metallic gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/5 via-slate-300/10 to-zinc-500/5" />
              {/* Liquid flow animation */}
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(200,200,200,0.15)_40%,rgba(255,255,255,0.2)_50%,rgba(200,200,200,0.15)_60%,transparent_80%)] animate-liquid-flow" />
              {/* Secondary liquid wave */}
              <div className="absolute inset-0 bg-[linear-gradient(75deg,transparent_30%,rgba(180,180,180,0.1)_45%,rgba(220,220,220,0.15)_50%,rgba(180,180,180,0.1)_55%,transparent_70%)] animate-liquid-flow-delayed" />
              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {/* Iridescent shimmer */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,220,255,0.1)_0%,transparent_50%)] animate-pulse-slow" />
            </div>
            
            <div className="relative h-9 w-9 overflow-hidden rounded-lg flex-shrink-0">
              <Image
                src="/images/aetherian.svg"
                alt="AETHER"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative flex-1">
              <span className="font-medium text-white text-sm">{"ÆTHER'"}</span>
              <p className="text-xs text-white/50">Join the community</p>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Info - Location and Join Date */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>Qatar</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Joined March 13, 2026</span>
        </div>
      </div>

      {/* Copy notification */}
      {copied && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-emerald-500/90 px-4 py-2 text-sm text-white backdrop-blur-sm">
          <Check className="h-4 w-4" />
          Copied to clipboard!
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes sweep {
          0% {
            transform: translateX(-150%);
          }
          33%, 100% {
            transform: translateX(150%);
          }
        }
        .animate-sweep {
          animation: sweep 3s ease-in-out infinite;
        }
        @keyframes liquid-flow {
          0% {
            transform: translateX(-100%) rotate(0deg);
          }
          100% {
            transform: translateX(200%) rotate(0deg);
          }
        }
        .animate-liquid-flow {
          animation: liquid-flow 2s ease-in-out infinite;
        }
        @keyframes liquid-flow-delayed {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-liquid-flow-delayed {
          animation: liquid-flow-delayed 2.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
