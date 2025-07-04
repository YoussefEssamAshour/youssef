import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, Circle, RotateCcw, User, PhoneCall, Heart, Shield, MessageSquare, Star, Search, Users, Gift, Award, RefreshCw, HelpCircle, ThumbsUp, FileText, Hash, UserCheck, Copy, Check, ArrowRight, ArrowLeft, DollarSign, ChevronDown, ChevronRight, BarChart3, Smartphone, Wifi, CreditCard, Clock, Sun, Moon, TrendingUp } from 'lucide-react';
import SalesTracker from './components/SalesTracker';
import Statistics from './components/Statistics';
import { CallItem, CallInfo, Objection, ViewType, MobileSalesStep } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('tracker');
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('xfinity-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('xfinity-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Save mobile sales attempt when entering objections view
  useEffect(() => {
    if (currentView === 'objections') {
      const mobileSalesData = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        completedSteps: mobileSalesSteps.filter(step => step.completed).length,
        totalSteps: mobileSalesSteps.length
      };

      const existingHistory = JSON.parse(localStorage.getItem('xfinity-mobile-sales-history') || '[]');
      existingHistory.push(mobileSalesData);
      localStorage.setItem('xfinity-mobile-sales-history', JSON.stringify(existingHistory));
    }
  }, [currentView]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [callItems, setCallItems] = useState<CallItem[]>([
    {
      id: 'greeting',
      title: 'Greeting',
      verbatim: 'Thank you for calling [Xfinity] this is (your name) speaking. May I have the pleasure of knowing your first and last name?',
      icon: Phone,
      completed: false,
      category: 'opening'
    },
    {
      id: 'context',
      title: 'Context Tool',
      verbatim: 'I see from my end here you might want to upgrade your service, am I correct?',
      icon: Search,
      completed: false,
      category: 'opening'
    },
    {
      id: 'apology',
      title: 'Apology',
      verbatim: 'I apologize for the inconvenience. I know what you must be feeling right now.',
      icon: Heart,
      completed: false,
      category: 'connection'
    },
    {
      id: 'empathy',
      title: 'Empathy',
      verbatim: 'I feel what you must be feeling right now you know I\'ve been through a very similar situation so I completely understand where you\'re coming from.',
      icon: Users,
      completed: false,
      category: 'connection'
    },
    {
      id: 'assurance',
      title: 'Assurance',
      verbatim: 'Thank you so much for explaining everything to me you came to the right department you\'re now with a specialist from the billing department and I\'m not ending this call until all of your concerns are addressed.',
      icon: Shield,
      completed: false,
      category: 'connection'
    },
    {
      id: 'rephrasing',
      title: 'Rephrasing',
      verbatim: 'To make sure that I understood everything correctly...',
      icon: MessageSquare,
      completed: false,
      category: 'service'
    },
    {
      id: 'showing-value',
      title: 'Showing Value',
      verbatim: 'You know I actually see accounts all day long and this package you\'ve is not only an amazing package the price as well is one of a kind how did you get this price to begin with its amazing.',
      icon: Star,
      completed: false,
      category: 'service'
    },
    {
      id: 'discovery',
      title: 'Discovery',
      verbatim: 'What are your favorite channels that you always watch or like watching?',
      icon: Search,
      completed: false,
      category: 'service'
    },
    {
      id: 'rapport',
      title: 'Rapport',
      verbatim: 'Well actually while I\'m working on this for you my mother\'s birthday is next week what would you recommend, I should get her?',
      icon: Gift,
      completed: false,
      category: 'service'
    },
    {
      id: 'appreciation',
      title: 'Show Appreciation',
      verbatim: 'I see here from my end that you\'ve been with Xfinity since ----, you\'ve been a very loyal customer to Xfinity we really appreciate your business with us.',
      icon: Award,
      completed: false,
      category: 'service'
    },
    {
      id: 'branding',
      title: 'Branding Xfinity',
      verbatim: 'Xfinity would never be okay with something like this happening to you. You\'re a very loyal customer to Xfinity and we\'ll take good care of you.',
      icon: PhoneCall,
      completed: false,
      category: 'service'
    },
    {
      id: 'recap',
      title: 'Recap the Call',
      verbatim: 'So, as we\'re getting to an end let me make sure we covered everything, what we did so far is ...',
      icon: RefreshCw,
      completed: false,
      category: 'closing'
    },
    {
      id: 'extra-assistance',
      title: 'Extra Assistance',
      verbatim: 'I could send you an article or guide you through to make it easier for you. Is there anything else that I can help you with?',
      icon: HelpCircle,
      completed: false,
      category: 'closing'
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction',
      verbatim: 'Can you confirm that this resolves your concerns for today? (pause for response) Great, I hope I was able to make you 100% satisfied with Xfinity. (pause for response) Thank you for being a loyal Xfinity Customer & I hope you have an amazing rest of your day',
      icon: ThumbsUp,
      completed: false,
      category: 'closing'
    }
  ]);

  const [mobileSalesSteps, setMobileSalesSteps] = useState<MobileSalesStep[]>([
    {
      id: 'mobile-discovery',
      title: 'Mobile Service Discovery',
      verbatim: 'By the way, I noticed you\'re an Xfinity customer - are you currently using Xfinity Mobile for your cell phone service, or are you with a different carrier like Verizon, AT&T, or T-Mobile?',
      icon: Smartphone,
      completed: false,
      category: 'discovery',
      tips: 'Listen carefully to their current provider and monthly cost. This information is crucial for the savings calculation.'
    },
    {
      id: 'current-bill-inquiry',
      title: 'Current Mobile Bill Discovery',
      verbatim: 'I see, and if you don\'t mind me asking, what are you currently paying monthly for your [carrier name] service? Is that for one line or multiple lines?',
      icon: DollarSign,
      completed: false,
      category: 'discovery',
      tips: 'Get the exact monthly amount. If they hesitate, say "I\'m asking because I might be able to save you some money."'
    },
    {
      id: 'pain-point-identification',
      title: 'Identify Pain Points',
      verbatim: 'Wow, that\'s quite a bit! And how\'s the service been for you? Any issues with coverage, slow data speeds, or unexpected charges on your bill?',
      icon: Search,
      completed: false,
      category: 'discovery',
      tips: 'Listen for any complaints about their current service. These become selling points for Xfinity Mobile.'
    },
    {
      id: 'xfinity-mobile-introduction',
      title: 'Introduce Xfinity Mobile Benefits',
      verbatim: 'Well, since you\'re already an Xfinity customer, you actually qualify for Xfinity Mobile, which runs on Verizon\'s network - the most reliable network in America. The best part is, you could potentially save $20-40 per month compared to what you\'re paying now.',
      icon: Wifi,
      completed: false,
      category: 'presentation',
      tips: 'Emphasize the Verizon network quality and immediate savings opportunity.'
    },
    {
      id: 'keep-number-assurance',
      title: 'Number Portability Assurance',
      verbatim: 'And don\'t worry - you get to keep your exact same phone number. We handle all the switching for you, so there\'s no hassle on your end. Your current service stays active until your new Xfinity Mobile service is up and running.',
      icon: Phone,
      completed: false,
      category: 'presentation',
      tips: 'Address the common concern about losing their number upfront.'
    },
    {
      id: 'savings-calculation',
      title: 'Calculate Specific Savings',
      verbatim: 'Let me show you the savings - you mentioned you\'re paying $[current amount] with [carrier]. With Xfinity Mobile, you\'d pay just $[new amount] per month. That\'s a savings of $[difference] every single month, which adds up to $[annual savings] per year!',
      icon: CreditCard,
      completed: false,
      category: 'presentation',
      tips: 'Use their exact numbers. Make the annual savings sound significant.'
    },
    {
      id: 'network-quality-emphasis',
      title: 'Emphasize Network Quality',
      verbatim: 'You\'re getting the exact same Verizon network coverage that Verizon customers pay premium prices for, but at a fraction of the cost because you\'re bundling it with your Xfinity services.',
      icon: Wifi,
      completed: false,
      category: 'presentation',
      tips: 'Reinforce that they\'re not sacrificing quality for savings.'
    },
    {
      id: 'urgency-creation',
      title: 'Create Urgency',
      verbatim: 'Here\'s what I can do for you today - I can get you started with Xfinity Mobile right now and you\'ll see those savings on your very next bill. This is a limited-time opportunity for existing Xfinity customers.',
      icon: Clock,
      completed: false,
      category: 'closing',
      tips: 'Create urgency without mentioning activation fees. Focus on immediate savings.'
    },
    {
      id: 'address-concerns',
      title: 'Address Any Concerns',
      verbatim: 'I know switching carriers can feel like a big decision. What questions or concerns do you have about making the switch? I\'m here to make sure you\'re 100% comfortable with this.',
      icon: HelpCircle,
      completed: false,
      category: 'closing',
      tips: 'Listen carefully and address each concern specifically. Common concerns: contract, phone compatibility, coverage.'
    },
    {
      id: 'close-the-sale',
      title: 'Close the Sale',
      verbatim: 'Based on everything we\'ve discussed - the $[monthly savings] in savings, keeping your same number, getting Verizon\'s premium network - does it make sense to get you set up with Xfinity Mobile today?',
      icon: CheckCircle2,
      completed: false,
      category: 'closing',
      tips: 'Summarize all benefits and ask for the sale directly. Pause and wait for their response.'
    }
  ]);

  const [objections, setObjections] = useState<Objection[]>([
    {
      id: 'too-expensive',
      objection: 'Too Expensive',
      solution: 'I totally understand that reducing monthly charges is really important. Believe me. I try to do that too! Earlier we discussed something customer has mentioned that turned into a need for a line) so it def sounds like something you\'ll be using on the long-term.',
      bgColor: 'from-red-600 to-red-700'
    },
    {
      id: 'check-with-spouse',
      objection: 'Have to check in with my wife/husband',
      solution: 'I absolutely understand you would want to talk to your partner first. What questions do you think your wife will have?',
      bgColor: 'from-pink-600 to-pink-700'
    },
    {
      id: 'need-to-think',
      objection: 'Need to think about it',
      solution: 'I totally understand you may need time to think about it. Maybe I can help clear things up. What are your concerns?',
      bgColor: 'from-purple-600 to-purple-700'
    },
    {
      id: 'under-contract',
      objection: 'I\'m under a contract',
      solution: 'Mr. Customer. I totally understand that you\'re under a contract but let me tell you that the $20 you\'re saving every month by switching to Xfinity mobile can cover for any possible ETF in a year\'s time! So, it\'s definitely a save in the long run, as well, it seems perfectly suited for you and your family\'s needs',
      bgColor: 'from-indigo-600 to-indigo-700'
    },
    {
      id: 'dont-need-line',
      objection: 'Don\'t need the line',
      solution: 'Mr. Customer, I totally understand how it might seem that way but based on what you told me (customer\'s needs) it definitely sounds like something you\'ll be needing and using to get the lifestyle you deserve',
      bgColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 'get-at-store',
      objection: 'I\'m going to get it at the store',
      solution: 'Mr. Customer. I totally understand you want to speak to someone face-to-face. What concerns do you have about doing this over the phone by the way? By the way, if you\'re concerned about delivery. I can sign you up for a promotion on free express shipping and guarantee the phone will be delivered asap but I wouldn\'t be able to guarantee you\'d be able to find that device in the store\'s stock',
      bgColor: 'from-cyan-600 to-cyan-700'
    },
    {
      id: 'family-has-phones',
      objection: 'All family members have their own phones',
      solution: 'Mr. Customer, that\'s great to hear how connected you all are as a family together! Let me tell you, however about how much money you\'re saving for yourself paying $XX less for each line when you add that friend and you can have them Venmo you the money each month',
      bgColor: 'from-teal-600 to-teal-700'
    },
    {
      id: 'not-good-time',
      objection: 'It\'s not a good time / it\'s not the right time',
      solution: 'I definitely want to make sure you\'re comfortable with the pace we\'re moving with. What do you think might change between now and the next XX months that is making you want to wait?',
      bgColor: 'from-emerald-600 to-emerald-700'
    },
    {
      id: 'good-with-current',
      objection: 'I\'m good with my current provider',
      solution: 'I\'m glad that you\'re doing well with your current provider and not facing any kind of issues but if it\'s affecting your expenses in a bad way I think you need to rethink it especially when all the prices are going up and up. I mean your money is better off in your pocket could calculate all the savings that we\'ll save by switching and after this it\'s your call',
      bgColor: 'from-green-600 to-green-700'
    }
  ]);

  const [currentCall, setCurrentCall] = useState(1);
  const [callStartTime, setCallStartTime] = useState<Date>(new Date());
  const [callInfo, setCallInfo] = useState<CallInfo>({
    accountNumber: '',
    customerName: '',
    phoneNumber: '',
    comments: ''
  });
  const [copied, setCopied] = useState(false);

  // Track call statistics
  const saveCallStatistics = (completedItems: string[], categoryStats: any) => {
    const callData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      completionRate: (completedItems.length / callItems.length) * 100,
      completedItems,
      categoryStats,
      duration: Math.floor((new Date().getTime() - callStartTime.getTime()) / 60000) // in minutes
    };

    const existingHistory = JSON.parse(localStorage.getItem('xfinity-call-history') || '[]');
    existingHistory.push(callData);
    localStorage.setItem('xfinity-call-history', JSON.stringify(existingHistory));
  };

  // Track mobile sales attempts
  const saveMobileSalesAttempt = () => {
    const mobileSalesData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      completedSteps: mobileSalesSteps.filter(step => step.completed).length,
      totalSteps: mobileSalesSteps.length
    };

    const existingHistory = JSON.parse(localStorage.getItem('xfinity-mobile-sales-history') || '[]');
    existingHistory.push(mobileSalesData);
    localStorage.setItem('xfinity-mobile-sales-history', JSON.stringify(existingHistory));
  };

  const toggleItem = (id: string) => {
    setCallItems(prev => {
      const newItems = prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      
      // Auto-progress to next item if current item was just completed
      const clickedItem = newItems.find(item => item.id === id);
      if (clickedItem?.completed) {
        const currentIndex = newItems.findIndex(item => item.id === id);
        const nextItem = newItems[currentIndex + 1];
        
        if (nextItem && !nextItem.completed) {
          // Scroll to next item after a short delay
          setTimeout(() => {
            const nextElement = document.getElementById(`item-${nextItem.id}`);
            if (nextElement) {
              nextElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }
          }, 300);
        }
      }
      
      return newItems;
    });
  };

  const toggleMobileStep = (id: string) => {
    setMobileSalesSteps(prev => {
      const newSteps = prev.map(step => 
        step.id === id ? { ...step, completed: !step.completed } : step
      );
      
      // Auto-progress to next step if current step was just completed
      const clickedStep = newSteps.find(step => step.id === id);
      if (clickedStep?.completed) {
        const currentIndex = newSteps.findIndex(step => step.id === id);
        const nextStep = newSteps[currentIndex + 1];
        
        if (nextStep && !nextStep.completed) {
          // Scroll to next step after a short delay
          setTimeout(() => {
            const nextElement = document.getElementById(`mobile-step-${nextStep.id}`);
            if (nextElement) {
              nextElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }
          }, 300);
        }
      }
      
      return newSteps;
    });
  };

  const resetCall = () => {
    // Save call statistics before resetting
    const completedItems = callItems.filter(item => item.completed).map(item => item.id);
    const categoryStats = {
      opening: {
        completed: callItems.filter(item => item.category === 'opening' && item.completed).length,
        total: callItems.filter(item => item.category === 'opening').length
      },
      connection: {
        completed: callItems.filter(item => item.category === 'connection' && item.completed).length,
        total: callItems.filter(item => item.category === 'connection').length
      },
      service: {
        completed: callItems.filter(item => item.category === 'service' && item.completed).length,
        total: callItems.filter(item => item.category === 'service').length
      },
      closing: {
        completed: callItems.filter(item => item.category === 'closing' && item.completed).length,
        total: callItems.filter(item => item.category === 'closing').length
      }
    };

    saveCallStatistics(completedItems, categoryStats);

    // Reset call state
    setCallItems(prev => prev.map(item => ({ ...item, completed: false })));
    setMobileSalesSteps(prev => prev.map(step => ({ ...step, completed: false })));
    setCurrentCall(prev => prev + 1);
    setCallStartTime(new Date());
    setCallInfo({
      accountNumber: '',
      customerName: '',
      phoneNumber: '',
      comments: ''
    });
    setCopied(false);
  };

  const updateCallInfo = (field: keyof CallInfo, value: string) => {
    setCallInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleObjection = (id: string) => {
    setExpandedObjection(expandedObjection === id ? null : id);
  };

  const copyToClipboard = async () => {
    const callData = `XFINITY CALL INFORMATION
========================
Call #: ${currentCall}
Date: ${new Date().toLocaleDateString()}
Time: ${callStartTime.toLocaleTimeString()}

CUSTOMER DETAILS:
Account Number: ${callInfo.accountNumber || 'Not provided'}
Customer Name: ${callInfo.customerName || 'Not provided'}
Phone Number: ${callInfo.phoneNumber || 'Not provided'}

ADDITIONAL COMMENTS:
${callInfo.comments || 'No additional comments'}

CALL PROGRESS:
Completed Steps: ${completedCount}/${totalCount}
Progress: ${Math.round(progressPercentage)}%`;

    try {
      await navigator.clipboard.writeText(callData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = callData;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completedCount = callItems.filter(item => item.completed).length;
  const totalCount = callItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const mobileCompletedCount = mobileSalesSteps.filter(step => step.completed).length;
  const mobileTotalCount = mobileSalesSteps.length;
  const mobileProgressPercentage = (mobileCompletedCount / mobileTotalCount) * 100;

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'opening': return 'Call Opening';
      case 'connection': return 'Building Connection';
      case 'service': return 'Service & Support';
      case 'closing': return 'Call Closing';
      case 'discovery': return 'Discovery & Qualification';
      case 'presentation': return 'Presentation & Benefits';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opening': return 'from-blue-600 to-blue-700';
      case 'connection': return 'from-emerald-600 to-emerald-700';
      case 'service': return 'from-purple-600 to-purple-700';
      case 'closing': return 'from-red-600 to-red-700';
      case 'discovery': return 'from-orange-600 to-orange-700';
      case 'presentation': return 'from-cyan-600 to-cyan-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const groupedItems = callItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CallItem[]>);

  const groupedMobileSteps = mobileSalesSteps.reduce((acc, step) => {
    if (!acc[step.category]) {
      acc[step.category] = [];
    }
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, MobileSalesStep[]>);

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    headerBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    headerBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputText: isDarkMode ? 'text-white' : 'text-gray-900',
    inputPlaceholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
    buttonSecondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    itemBg: isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50',
    itemBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    itemHover: isDarkMode ? 'hover:bg-gray-700/70' : 'hover:bg-gray-100',
    scriptBg: isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/50',
    scriptBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    progressBg: isDarkMode ? 'bg-gray-800/95' : 'bg-white/95',
    progressBorder: isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
  };

  // Render Statistics
  if (currentView === 'statistics') {
    return <Statistics onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  // Render Sales Tracker
  if (currentView === 'sales') {
    return <SalesTracker onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  // Render Xfinity Mobile Sales Process
  if (currentView === 'objections') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
              isDarkMode 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-900' 
                : 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Floating Progress Bar for Mobile Sales */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4">
          <div className={`backdrop-blur-lg rounded-2xl shadow-2xl p-4 transition-colors duration-300 ${themeClasses.progressBg} border ${themeClasses.progressBorder}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-orange-600 rounded-lg">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${themeClasses.text}`}>Mobile Sales Progress</h3>
                  <p className={`text-xs ${themeClasses.textMuted}`}>Xfinity Mobile</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${themeClasses.text}`}>{Math.round(mobileProgressPercentage)}%</span>
                <p className={`text-xs ${themeClasses.textMuted}`}>{mobileCompletedCount}/{mobileTotalCount}</p>
              </div>
            </div>
            <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${mobileProgressPercentage}%` }}
              />
            </div>
            {mobileProgressPercentage === 100 && (
              <div className="mt-2 flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Sale Complete!</span>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <header className={`shadow-xl transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder}`}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-lg shadow-lg">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Xfinity Mobile Sales Process</h1>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Step-by-step guide to convert customers to Xfinity Mobile</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('tracker')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg ${themeClasses.buttonSecondary}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tracker</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8 pb-32 pt-24">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Xfinity Mobile Sales Strategy</h2>
              <p className="text-orange-100 mb-4">
                Follow this proven step-by-step process to successfully convert customers to Xfinity Mobile. Each step builds on the previous one to create a compelling case for switching.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-orange-800/30 rounded-lg p-3">
                  <h4 className="font-semibold mb-1">Key Benefits to Emphasize:</h4>
                  <ul className="space-y-1 text-orange-100">
                    <li>• Verizon network quality</li>
                    <li>• Significant monthly savings</li>
                    <li>• Keep same phone number</li>
                    <li>• Seamless switching process</li>
                  </ul>
                </div>
                <div className="bg-orange-800/30 rounded-lg p-3">
                  <h4 className="font-semibold mb-1">Common Objections:</h4>
                  <ul className="space-y-1 text-orange-100">
                    <li>• "I'm under contract"</li>
                    <li>• "Happy with current provider"</li>
                    <li>• "Need to think about it"</li>
                    <li>• "Worried about coverage"</li>
                  </ul>
                </div>
                <div className="bg-orange-800/30 rounded-lg p-3">
                  <h4 className="font-semibold mb-1">Success Tips:</h4>
                  <ul className="space-y-1 text-orange-100">
                    <li>• Get exact current monthly cost</li>
                    <li>• Calculate specific savings</li>
                    <li>• Address concerns immediately</li>
                    <li>• Create urgency with savings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sales Steps */}
          <div className="space-y-8">
            {Object.entries(groupedMobileSteps).map(([category, steps]) => (
              <div key={category} className={`rounded-xl shadow-xl overflow-hidden transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
                <div className={`bg-gradient-to-r ${getCategoryColor(category)} px-6 py-4`}>
                  <h3 className="text-lg font-semibold text-white">
                    {getCategoryTitle(category)}
                  </h3>
                  <p className="text-sm text-white/80">
                    {steps.filter(step => step.completed).length} of {steps.length} completed
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  {steps.map((step) => {
                    const IconComponent = step.icon;
                    return (
                      <div
                        key={step.id}
                        id={`mobile-step-${step.id}`}
                        className={`group p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          step.completed
                            ? 'border-emerald-500 bg-emerald-900/30 hover:bg-emerald-900/40'
                            : `${themeClasses.itemBorder} ${themeClasses.itemBg} hover:border-gray-500 hover:shadow-lg ${themeClasses.itemHover}`
                        }`}
                        onClick={() => toggleMobileStep(step.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 pt-1">
                            {step.completed ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Circle className={`w-6 h-6 ${themeClasses.textMuted} group-hover:text-gray-300`} />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-3">
                              <IconComponent className={`w-5 h-5 ${step.completed ? 'text-emerald-400' : themeClasses.textMuted}`} />
                              <h4 className={`font-semibold ${step.completed ? 'text-emerald-300' : themeClasses.text}`}>
                                {step.title}
                              </h4>
                            </div>
                            
                            <div className={`p-4 rounded-lg mb-3 transition-colors duration-300 ${step.completed ? 'bg-gray-900/50 border border-emerald-600/30' : `${themeClasses.scriptBg} border ${themeClasses.scriptBorder}`}`}>
                              <p className={`text-base leading-relaxed font-bold ${step.completed ? 'text-emerald-200' : themeClasses.text}`}>
                                <span className="font-semibold text-orange-400">Script: </span>
                                "{step.verbatim}"
                              </p>
                            </div>

                            {step.tips && (
                              <div className={`p-3 rounded-lg ${step.completed ? 'bg-blue-900/20 border border-blue-600/30' : 'bg-blue-900/10 border border-blue-600/20'}`}>
                                <p className={`text-sm ${step.completed ? 'text-blue-200' : 'text-blue-300'}`}>
                                  <span className="font-semibold text-blue-400">💡 Tip: </span>
                                  {step.tips}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Sales Summary */}
          {mobileCompletedCount === mobileTotalCount && (
            <div className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle2 className="w-8 h-8" />
                <h3 className="text-xl font-bold">Mobile Sales Process Completed!</h3>
              </div>
              <div className="bg-emerald-800/30 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">Next Steps:</h4>
                <ul className="space-y-2 text-sm text-emerald-100">
                  <li>• Process the mobile line order in the system</li>
                  <li>• Schedule device delivery or store pickup</li>
                  <li>• Provide customer with confirmation details</li>
                  <li>• Set expectations for number porting timeline</li>
                  <li>• Follow up within 24-48 hours to ensure satisfaction</li>
                </ul>
              </div>
              <p className="text-emerald-100 mb-4">
                Excellent work! You've successfully guided the customer through the complete Xfinity Mobile sales process. 
                Remember to document this sale in your sales tracker.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('sales')}
                  className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-lg"
                >
                  Record Sale
                </button>
                <button
                  onClick={resetCall}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                >
                  Start New Sale
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Main Tracker View
  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isDarkMode 
              ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-900' 
              : 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Floating Progress Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4">
        <div className={`backdrop-blur-lg rounded-2xl shadow-2xl p-4 transition-colors duration-300 ${themeClasses.progressBg} border ${themeClasses.progressBorder}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <PhoneCall className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className={`text-sm font-semibold ${themeClasses.text}`}>Call Progress</h3>
                <p className={`text-xs ${themeClasses.textMuted}`}>Call #{currentCall}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-bold ${themeClasses.text}`}>{Math.round(progressPercentage)}%</span>
              <p className={`text-xs ${themeClasses.textMuted}`}>{completedCount}/{totalCount}</p>
            </div>
          </div>
          <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {progressPercentage === 100 && (
            <div className="mt-2 flex items-center justify-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Call Complete!</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button
          onClick={() => setCurrentView('statistics')}
          className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25"
        >
          <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold">Statistics</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={() => setCurrentView('sales')}
          className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-emerald-500/25"
        >
          <BarChart3 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold">Sales Tracker</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        
        <button
          onClick={() => setCurrentView('objections')}
          className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25"
        >
          <Smartphone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold">Mobile Sales</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Header */}
      <header className={`shadow-xl transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Xfinity Call Tracker</h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Call #{currentCall} • Started at {callStartTime.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={resetCall}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg ${themeClasses.buttonSecondary}`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Call</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 pb-32 pt-24">
        {/* Customer Information Section */}
        <div className={`rounded-xl shadow-xl p-6 mb-8 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Customer Information</h2>
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Info</span>
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                <Hash className="w-4 h-4" />
                <span>Account Number</span>
              </label>
              <input
                type="text"
                value={callInfo.accountNumber}
                onChange={(e) => updateCallInfo('accountNumber', e.target.value)}
                placeholder="Enter account number"
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
              />
            </div>
            
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                <User className="w-4 h-4" />
                <span>Customer Name</span>
              </label>
              <input
                type="text"
                value={callInfo.customerName}
                onChange={(e) => updateCallInfo('customerName', e.target.value)}
                placeholder="Enter customer name"
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
              />
            </div>
            
            <div>
              <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={callInfo.phoneNumber}
                onChange={(e) => updateCallInfo('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
              <FileText className="w-4 h-4" />
              <span>Additional Comments</span>
            </label>
            <textarea
              value={callInfo.comments}
              onChange={(e) => updateCallInfo('comments', e.target.value)}
              placeholder="Enter any additional notes or comments about this call..."
              rows={4}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
            />
          </div>
        </div>

        {/* Call Checklist */}
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className={`rounded-xl shadow-xl overflow-hidden transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
              <div className={`bg-gradient-to-r ${getCategoryColor(category)} px-6 py-4`}>
                <h3 className="text-lg font-semibold text-white">
                  {getCategoryTitle(category)}
                </h3>
                <p className="text-sm text-white/80">
                  {items.filter(item => item.completed).length} of {items.length} completed
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                {items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.id}
                      id={`item-${item.id}`}
                      className={`group p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        item.completed
                          ? 'border-emerald-500 bg-emerald-900/30 hover:bg-emerald-900/40'
                          : `${themeClasses.itemBorder} ${themeClasses.itemBg} hover:border-gray-500 hover:shadow-lg ${themeClasses.itemHover}`
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 pt-1">
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          ) : (
                            <Circle className={`w-6 h-6 ${themeClasses.textMuted} group-hover:text-gray-300`} />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <IconComponent className={`w-5 h-5 ${item.completed ? 'text-emerald-400' : themeClasses.textMuted}`} />
                            <h4 className={`font-semibold ${item.completed ? 'text-emerald-300' : themeClasses.text}`}>
                              {item.title}
                            </h4>
                          </div>
                          
                          <div className={`p-4 rounded-lg transition-colors duration-300 ${item.completed ? 'bg-gray-900/50 border border-emerald-600/30' : `${themeClasses.scriptBg} border ${themeClasses.scriptBorder}`}`}>
                            <p className={`text-base leading-relaxed font-bold ${item.completed ? 'text-emerald-200' : themeClasses.text}`}>
                              <span className="font-semibold text-blue-400">Script: </span>
                              "{item.verbatim}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Call Summary */}
        {completedCount === totalCount && (
          <div className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle2 className="w-8 h-8" />
              <h3 className="text-xl font-bold">Call Completed Successfully!</h3>
            </div>
            <div className="bg-emerald-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-2">Call Summary:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Account:</span> {callInfo.accountNumber || 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Customer:</span> {callInfo.customerName || 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {callInfo.phoneNumber || 'Not provided'}
                </div>
              </div>
              {callInfo.comments && (
                <div className="mt-3">
                  <span className="font-medium">Comments:</span> {callInfo.comments}
                </div>
              )}
            </div>
            <p className="text-emerald-100 mb-4">
              You've completed all {totalCount} steps of the Xfinity call structure. 
              Great job following the professional protocol!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={resetCall}
                className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-lg"
              >
                Start New Call
              </button>
              <button
                onClick={copyToClipboard}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
                  copied 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;