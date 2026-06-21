import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Bell,
  Globe,
  Laptop,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  PhoneCall,
  Phone,
  Grid,
  FileText,
  User,
  MapPin,
  ClipboardList
} from "lucide-react";
import { CategoryItem, AppUpdate } from "../data";

interface CafeProfile {
  shopName: string;
  ownerName: string;
  contact: string;
  isLoggedIn: boolean;
}

interface DashboardServicesProps {
  categories: CategoryItem[];
  updates: AppUpdate[];
  onSelectCategory: (catId: string) => void;
  onNavigateTab: (tab: "services" | "all-links" | "tools") => void;
  getCategoryIcon: (iconName: string) => React.ComponentType<{ className?: string }>;
  cafeProfile: CafeProfile;
  onOpenCafeModal: () => void;
  onLogoutCafe: () => void;
}

export default function DashboardServices({
  categories,
  updates,
  onSelectCategory,
  onNavigateTab,
  getCategoryIcon,
  cafeProfile,
  onOpenCafeModal,
  onLogoutCafe
}: DashboardServicesProps) {
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toBengaliNumber = (num: number | string): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().split("").map(digit => {
      return bengaliDigits[parseInt(digit, 10)] !== undefined 
        ? bengaliDigits[parseInt(digit, 10)] 
        : digit;
    }).join("");
  };

  const getFormattedBengaliTime = () => {
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    
    let timeOfDayBengali = "";
    const originalHours = currentTime.getHours();
    if (originalHours >= 5 && originalHours < 12) timeOfDayBengali = "সকাল";
    else if (originalHours >= 12 && originalHours < 17) timeOfDayBengali = "দুপুর";
    else if (originalHours >= 17 && originalHours < 20) timeOfDayBengali = "সন্ধ্যা";
    else timeOfDayBengali = "রাত";

    return `${timeOfDayBengali} ${toBengaliNumber(hours)}:${toBengaliNumber(minutesStr)}:${toBengaliNumber(secondsStr)} ${ampm}`;
  };

  const hour = currentTime.getHours();
  let greetingText = "";
  let subGreetingText = "";
  let themeClasses = "";
  let emoji = "";
  let accentBorder = "";
  let isNightMode = false;

  if (hour >= 5 && hour < 12) {
    greetingText = "শুভ সকাল / গুড মর্নিং";
    subGreetingText = "সকালের নতুন মিষ্টি আলোয় আপনার স্টুডিওর গ্রাহকসেবা সফল ও ঝামেলামুক্ত হোক!";
    themeClasses = "from-amber-200/15 via-emerald-100/10 to-white text-emerald-900 border-amber-250";
    emoji = "🌅☀️";
    accentBorder = "border-amber-200/60";
  } else if (hour >= 12 && hour < 17) {
    greetingText = "শুভ দুপুর / গুড আফটারনুন";
    subGreetingText = "কর্মব্যস্ত দুপুরের প্রতিটি আধার ও পরচা ফি জমাদানের কাজ হোক আরও দ্রুত!";
    themeClasses = "from-amber-400/15 via-amber-100/5 to-white text-slate-800 border-amber-300";
    emoji = "☀️🌤️";
    accentBorder = "border-amber-250";
  } else if (hour >= 17 && hour < 20) {
    greetingText = "শুভ সন্ধ্যা / গুড ইভনিং";
    subGreetingText = "শান্ত সন্ধ্যার মনোরম পরিবেশে আপনার স্টুডিওতে আসুক নতুন ডিজিটাল গতি!";
    themeClasses = "from-pink-500/10 via-violet-500/5 to-white text-violet-900 border-violet-200";
    emoji = "🌆🌇";
    accentBorder = "border-violet-200/80";
  } else {
    greetingText = "শুভ রাত্রি / গুড নাইট";
    subGreetingText = "দিনের নিরলস খাটাখাটনির পর রাতের শান্ত অবসরে আপনার কাজের একটি সুন্দর সমাপ্তি ঘটুক!";
    themeClasses = "from-slate-950 via-slate-900 to-indigo-950 text-indigo-100 border-indigo-900/80";
    emoji = "🌙✨";
    accentBorder = "border-indigo-850/80";
    isNightMode = true;
  }

  // Custom statistics summary items
  const stats = [
    {
      id: "stat1",
      title: "৩০০+ সরকারি পোর্টাল",
      desc: "পরচা, রেশন ও প্যান কার্ড লিঙ্ক সরাসরি সোর্স",
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      accent: "border-emerald-200"
    },
    {
      id: "stat2",
      title: "১০+ ড্যাশবোর্ড টুলস",
      desc: "মেমো রসিদ ও ফটোকপি রিসাইজার গাইডলাইন",
      icon: Laptop,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      accent: "border-blue-200"
    },
    {
      id: "stat3",
      title: "১০০% ভেরিফাইড তথ্য",
      desc: "কোনো স্প্যাম রিডাইরেক্ট বা ঝঞ্ঝাট নেই",
      icon: Shield,
      color: "text-indigo-600 bg-indigo-50 border-[#E2E8F0]",
      accent: "border-indigo-200"
    },
    {
      id: "stat4",
      title: "২৪x৭ লাইভ সাপোর্ট",
      desc: "সমস্যা নিরসনে সরাসরি কল বা চ্যাট উইন্ডো",
      icon: PhoneCall,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      accent: "border-amber-200"
    }
  ];

  // Steps for 'How It Works'
  const steps = [
    {
      no: "১",
      title: "সহজে বিভাগ খুঁজুন",
      desc: "আমাদের রিচ ক্যটাগরি বা ডাইরেক্ট ড্যাশবোর্ড ফিল্টার থেকে আপনার প্রয়োজনীয় অনলাইন কাজটি নির্বাচন করুন।"
    },
    {
      no: "২",
      title: "নির্দেশিকা ও গাইড চেক করুন",
      desc: "আবেদনের জন্য প্রয়োজনীয় নথি সম্বলিত বিবরণ, মূল্য ও শেষ সময় এক ক্লিকে অফলাইনে দেখে নিশ্চিত হোন।"
    },
    {
      no: "৩",
      title: "কাজ সম্পন্ন ও মেমো রসিদ",
      desc: "সরাসরি সরকারি পোর্টালে কাজ সম্পন্ন করুন এবং গ্রাহকের জন্য প্রফেশনাল ক্যাশ মেমো জেনারেট করে প্রিন্ট আউট নিন।"
    }
  ];

  // Benefits for 'Why Choose Us'
  const benefits = [
    {
      title: "পশ্চিমবঙ্গের নির্ভরযোগ্য হাব",
      desc: "সহজ সেবা সম্পূর্ণ বিজ্ঞাপন মুক্ত এবং আসল ব্যাকএন্ড সোর্সের সাথে সংযুক্ত, তাই কোনো লিংক বিভ্রান্তি ঘটে না।"
    },
    {
      title: "সম্পূর্ণ সরল বাংলা অনুবাদ",
      desc: "ইংরাজী পোর্টালে কাজের প্রতিটি জটিল টেকనిక্যাল পরিভাষা আমরা সহজ সাধারণ বাংলা ভাষায় আপনাদের জন্য সাজিয়েছি।"
    },
    {
      title: "ক্যাফে-বান্ধব ইনবিল্ট টুলস",
      desc: "আমাদের ক্যাশ মেমো মেকার ও ডিজিটাল স্লিপ দিয়ে দৈনিক কাজের হিসাব ভেরিফাইড করুন।"
    }
  ];

  return (
    <div className="space-y-4 pb-4">
      
      {/* 1. HERO SECTION (CLEAN TYPOGRAPHY, NO CARD BACKGROUND) */}
      <div className="py-2 sm:py-3 space-y-3 animate-fade-in select-text text-center flex flex-col items-center justify-center">
        <div className="space-y-1.5 flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#15803D] tracking-tight leading-tight">
            আমার স্টুডিও এখন স্মার্ট প্রফেশনাল
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed max-w-2xl mx-auto">
            আমাদের জন্য সহজ সেবা নিয়ে এসেছে এক অসাধারণ ফিচারস যা এখন প্রত্যেক স্টুডিওতে
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 pt-0.5">
          <button
            onClick={() => onNavigateTab("all-links")}
            className="px-4.5 py-2 bg-[#15803D] hover:bg-green-750 text-white font-extrabold text-xs rounded-xl transition-all shadow-3xs hover:scale-[1.01] flex items-center gap-1.5 cursor-pointer border border-[#16A34A]/20"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>সমস্ত লিংক ব্রাউজ করুন</span>
          </button>
          <button
            onClick={() => onNavigateTab("tools")}
            className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-250 hover:border-slate-300 text-slate-800 font-extrabold text-xs rounded-xl transition-all duration-205 hover:scale-[1.01] flex items-center gap-1.5 cursor-pointer"
          >
            <Laptop className="h-3.5 w-3.5 text-[#15803D]" />
            <span>সহায়ক ক্যাফে টুলস</span>
          </button>
        </div>
      </div>

      {/* 2. NEW INTERACTIVE DYNAMIC GREETING PANEL */}
      <div className={`p-4 sm:p-5 rounded-2xl border bg-gradient-to-br ${themeClasses} ${accentBorder} shadow-xs relative overflow-hidden transition-all duration-500 group select-text`}>
        {/* Dynamic ambient backdrop elements */}
        <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500 -mr-6 -mt-6 ${
          isNightMode ? "bg-indigo-500/10" : "bg-emerald-500/10"
        }`} />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none -ml-8 -mb-8" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          
          <div className="space-y-2 flex-1">
            {/* Super Header Info */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                isNightMode 
                  ? "bg-slate-800/90 border-indigo-500/40 text-indigo-400" 
                  : "bg-emerald-50 border-emerald-200/60 text-[#15803D]"
              }`}>
                <Sparkles className="h-3 w-3 animate-pulse text-[#15803D]" />
                স্মার্ট স্টুডিও সংস্করণ
              </span>
              <span className={`text-[10px] font-extrabold flex items-center gap-1 ${isNightMode ? "text-indigo-200" : "text-slate-500"}`}>
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#15803D]" />
                {getFormattedBengaliTime()}
              </span>
            </div>

            {/* Display greeting & details */}
            <div className="space-y-1">
               <h2 className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-tight flex items-center gap-2 ${isNightMode ? "text-white" : "text-slate-900"}`}>
                 <span>{greetingText}</span>
                 <span className="inline-block animate-bounce">{emoji}</span>
               </h2>
               
               {cafeProfile.isLoggedIn ? (
                 <div className="space-y-1.5 pt-1 border-t border-dotted border-slate-350/50">
                   <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                     <p className={`text-sm sm:text-base md:text-lg font-black font-sans flex items-center gap-1.5 ${isNightMode ? "text-emerald-400 font-extrabold" : "text-[#15803D]"}`}>
                       <Laptop className="h-4 w-4 shrink-0" />
                       <span>{cafeProfile.shopName}</span>
                     </p>
                     <span className={`text-[9px] uppercase font-black px-1.5 py-0.2 border rounded-md ${
                       isNightMode ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-800"
                     }`}>
                       অফিশিয়াল হাব
                     </span>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-bold leading-normal">
                     <div className={`flex items-center gap-1.5 ${isNightMode ? "text-slate-300" : "text-slate-655"}`}>
                       <User className="h-3.5 w-3.5 text-slate-450 shrink-0" />
                       <span>স্টুডিও ওনার: <strong className={isNightMode ? "text-white font-black" : "text-slate-800 font-extrabold"}>{cafeProfile.ownerName}</strong></span>
                     </div>
                     <div className={`flex items-center gap-1.5 ${isNightMode ? "text-slate-300" : "text-slate-655"}`}>
                       <Phone className="h-3.5 w-3.5 text-slate-455 shrink-0" />
                       <span>যোগাযোগ আইডি: <strong className={isNightMode ? "text-white font-black" : "text-slate-800 font-extrabold"}>{cafeProfile.contact}</strong></span>
                     </div>
                   </div>
                 </div>
               ) : (
                 <p className={`text-xs ${isNightMode ? "text-slate-300" : "text-slate-600"} leading-relaxed max-w-xl`}>
                   {subGreetingText} <span className="text-[#15803D] hover:underline font-extrabold cursor-pointer border-b border-dotted border-[#15803D]" onClick={onOpenCafeModal}>এখানে ক্লিক করে</span> আপনার সাইবার ক্যাফের নাম ও মালিকের নাম যুক্ত করে নিন, যাতে ব্যানারটি আপনার ব্রান্ডিং অনুযায়ী সাজানো থাকে।
                 </p>
               )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {cafeProfile.isLoggedIn ? (
              <div className="flex gap-1.5">
                <button
                  onClick={onOpenCafeModal}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-850 hover:text-slate-900 border border-slate-300 hover:border-slate-400 dark:text-white font-extrabold text-xs rounded-lg cursor-pointer transition-all flex items-center gap-1 shadow-3xs"
                >
                  প্রোফাইল এডিট
                </button>
                <button
                  onClick={onLogoutCafe}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-750 font-extrabold text-xs rounded-lg cursor-pointer transition-all border border-red-200/60 flex items-center gap-1 shadow-3xs"
                >
                  লগ আউট
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenCafeModal}
                className="px-4 py-2 bg-[#15803D] hover:bg-green-750 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-all shadow-3xs hover:scale-[1.01] flex items-center gap-1.5 border border-[#16A34A]/20"
              >
                <Laptop className="h-4 w-4" />
                <span>ফ্রি রেজিস্টার ও স্টুডিও লগইন</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. SERVICES OVERVIEW STATISTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl flex flex-col justify-between hover:border-emerald-300 hover:shadow-2xs transition-all duration-350 group`}
            >
              <div className="space-y-2">
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${item.color} group-hover:scale-105 transition-transform`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#0F172A] text-xs sm:text-sm tracking-tight leading-none">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-505 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* 8. HOW IT WORKS SECTION */}
      <div className="bg-white border border-slate-205/75 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
        <div className="space-y-0.5 text-center max-w-lg mx-auto">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm font-sans">সহজ সেবা যেভাবে কাজ করে</h3>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold leading-relaxed">
            পশ্চিমবঙ্গের নাগরিকদের অনলাইন কাজের পথ সুবিধাজনক ও নির্ভুল করতে আমাদের ডিজিটাল হাব ৩টি সহজ ধাপে কাজ করে
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Connecting Line behind on Desktop */}
          <div className="hidden md:block absolute top-5.5 left-12 right-12 h-0.5 bg-slate-100 z-0 border-dashed" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 md:flex-col md:items-center text-left md:text-center z-10 relative font-sans">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#EFFDF4] border-2 border-emerald-500 flex items-center justify-center shrink-0 font-extrabold text-emerald-800 text-xs shadow-3xs">
                {step.no}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-800 text-xs text-[11px] sm:text-xs">
                  {step.title}
                </h4>
                <p className="text-[10px] sm:text-[10.5px] text-slate-505 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. WHY CHOOSE US SECTION */}
      <div className="space-y-3">
        <div className="space-y-0.5 text-center max-w-lg mx-auto">
          <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm font-sans">কেন সহজ সেবা ব্যবহার করবেন?</h3>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold">অন্যান্য পোর্টালের তুলনা আমাদের সেবার গুণগত পাথর্ক্য নিম্নরূপ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((bene, idx) => (
            <div key={idx} className="p-3.5 bg-white border border-slate-200/80 hover:border-emerald-250 rounded-xl flex gap-2.5 shadow-3xs transition-colors">
              <div className="w-5.5 h-5.5 rounded-lg bg-emerald-55/10 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-800 text-[11px] sm:text-xs font-sans">
                  {bene.title}
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {bene.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
