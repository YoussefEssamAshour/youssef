import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Users, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Sun, 
  Moon,
  MessageSquare,
  X
} from 'lucide-react';
import SalesTracker from './components/SalesTracker';
import Statistics from './components/Statistics';

interface Sale {
  id: string;
  accountNumber: string;
  customerName: string;
  callbackNumber: string;
  product: string;
  saleAmount: number;
  status: 'pending' | 'callback' | 'activated' | 'cancelled';
  timestamp: Date;
  comments?: string;
}

interface CallInfo {
  accountNumber: string;
  customerName: string;
  phoneNumber: string;
  comments: string;
}

interface Objection {
  id: string;
  objection: string;
  solution: string;
  bgColor: string;
}

interface MobileSalesObjection {
  id: string;
  title: string;
  description: string;
  response: string;
  tips: string[];
  color: string;
}

interface QualityStep {
  key: string;
  label: string;
  verbatim: string;
  category: 'opening' | 'connection' | 'service' | 'closing';
}

export default function App() {
  const [currentView, setCurrentView] = useState<'tracker' | 'sales' | 'statistics' | 'objections' | 'mobile-sales'>('tracker');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [sales, setSales] = useState<Sale[]>([]);
  const [callStartTime, setCallStartTime] = useState(new Date());
  const [currentCall, setCurrentCall] = useState(1);
  const [callInfo, setCallInfo] = useState<CallInfo>({
    accountNumber: '',
    customerName: '',
    phoneNumber: '',
    comments: ''
  });

  // Mobile sales tracking
  const [mobileSalesSteps, setMobileSalesSteps] = useState({
    discovery: false,
    needsAnalysis: false,
    presentSolution: false,
    handleObjections: false,
    createUrgency: false,
    closeAttempt: false,
    followUp: false
  });

  const [qualityAttributes, setQualityAttributes] = useState({
    greeting: false,
    contextTool: false,
    apology: false,
    empathy: false,
    assurance: false,
    rephrasing: false,
    showingValue: false,
    discovery: false,
    rapport: false,
    appreciation: false,
    branding: false,
    recap: false,
    extraAssistance: false,
    satisfaction: false
  });

  const [showObjections, setShowObjections] = useState(false);
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);
  const [expandedVerbatim, setExpandedVerbatim] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Quality steps with verbatims
  const qualitySteps: QualityStep[] = [
    {
      key: 'greeting',
      label: 'Greeting',
      verbatim: "Thank you for calling Xfinity, my name is [Your Name]. I hope you're having a wonderful day! I see you're calling about [reason]. I'm here to help you with that and make sure we get everything taken care of for you today.",
      category: 'opening'
    },
    {
      key: 'contextTool',
      label: 'Context Tool',
      verbatim: "Let me pull up your account here... I can see you've been a valued Xfinity customer since [date], and I really appreciate your loyalty. I'm looking at your current services and I want to make sure we're providing you with the best value possible.",
      category: 'opening'
    },
    {
      key: 'apology',
      label: 'Apology',
      verbatim: "I sincerely apologize for any inconvenience this has caused you. I completely understand how frustrating this must be, and I want to make this right for you today. You shouldn't have to deal with this, and I'm going to personally ensure we resolve this.",
      category: 'opening'
    },
    {
      key: 'empathy',
      label: 'Empathy',
      verbatim: "I completely understand how you're feeling, and I would feel the exact same way if I were in your situation. Your concerns are absolutely valid, and I want you to know that I'm here to listen and help find the best solution for you.",
      category: 'connection'
    },
    {
      key: 'assurance',
      label: 'Assurance',
      verbatim: "I want to assure you that we're going to get this resolved today. I have the tools and authority to help you, and I'm not going to let you hang up without a solution. You're in good hands, and I'm committed to making this right.",
      category: 'connection'
    },
    {
      key: 'rephrasing',
      label: 'Rephrasing',
      verbatim: "Just to make sure I understand correctly, what you're telling me is [restate their concern]. Is that right? I want to ensure I have all the details so I can provide you with the best possible solution.",
      category: 'connection'
    },
    {
      key: 'rapport',
      label: 'Rapport',
      verbatim: "That's interesting! I actually [relate to something they mentioned]. It's always nice to connect with customers who [shared interest/experience]. Now, let me focus on getting you the help you need today.",
      category: 'connection'
    },
    {
      key: 'showingValue',
      label: 'Showing Value',
      verbatim: "What I love about Xfinity is that we're constantly innovating to provide better value for our customers. With your current plan, you're already getting [list benefits], and I want to show you how we can make it even better while potentially saving you money.",
      category: 'service'
    },
    {
      key: 'discovery',
      label: 'Discovery',
      verbatim: "Help me understand your current situation better. How many people are in your household? What devices do you typically use? What's most important to you - speed, reliability, or value? This will help me recommend the perfect solution for your needs.",
      category: 'service'
    },
    {
      key: 'branding',
      label: 'Branding',
      verbatim: "At Xfinity, we're committed to providing the fastest, most reliable internet and the best entertainment experience. We're not just your service provider - we're your technology partner, here to keep you connected to what matters most.",
      category: 'service'
    },
    {
      key: 'appreciation',
      label: 'Appreciation',
      verbatim: "I really want to thank you for being such a loyal Xfinity customer and for giving me the opportunity to help you today. Customers like you are the reason I love what I do, and I appreciate your patience as we work through this together.",
      category: 'closing'
    },
    {
      key: 'recap',
      label: 'Recap',
      verbatim: "Let me quickly recap what we've accomplished today: [summarize actions taken]. You should see [expected results] within [timeframe]. Is there anything else about what we discussed that you'd like me to clarify?",
      category: 'closing'
    },
    {
      key: 'extraAssistance',
      label: 'Extra Assistance',
      verbatim: "Before we wrap up, is there anything else I can help you with today? I'm here and I have the time, so please don't hesitate to ask about any other questions or concerns you might have about your Xfinity services.",
      category: 'closing'
    },
    {
      key: 'satisfaction',
      label: 'Satisfaction',
      verbatim: "On a scale of 1 to 10, how would you rate the service I provided today? Is there anything I could have done better to earn a perfect 10? I want to make sure you're completely satisfied before we end this call.",
      category: 'closing'
    }
  ];

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? 'bg-gray-900' 
      : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputText: isDarkMode ? 'text-white' : 'text-gray-900',
    buttonPrimary: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700',
    buttonSecondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
    buttonSecondaryText: isDarkMode ? 'text-gray-200' : 'text-gray-700',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  };

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Track mobile sales attempts
  useEffect(() => {
    if (currentView === 'mobile-sales') {
      const stats = JSON.parse(localStorage.getItem('callStats') || '{}');
      stats.mobileSalesAttempts = (stats.mobileSalesAttempts || 0) + 1;
      localStorage.setItem('callStats', JSON.stringify(stats));
    }
  }, [currentView, mobileSalesSteps]);

  // Track call statistics
  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('callStats') || '{}');
    const today = new Date().toDateString();
    
    if (!stats[today]) {
      stats[today] = {
        totalCalls: 0,
        qualityAttributes: {},
        mobileSalesAttempts: 0,
        timeSpent: 0
      };
    }
    
    localStorage.setItem('callStats', JSON.stringify(stats));
  }, []);

  const objections: Objection[] = [
    {
      id: 'too-expensive',
      objection: 'Too Expensive',
      solution: "I understand cost is important. Let me show you how this actually saves you money. With our current promotion, you'll save $30-40 per month compared to what you're paying now. Over a year, that's $360-480 back in your pocket. Can you see how this investment pays for itself?",
      bgColor: 'from-red-600 to-red-700'
    },
    {
      id: 'think-about-it',
      objection: 'Need to think about it',
      solution: "I completely understand wanting to make an informed decision. What specific concerns do you have that I can address right now? Is it the price, the service, or something else? I'd rather answer your questions now than have you miss out on these savings.",
      bgColor: 'from-yellow-600 to-yellow-700'
    },
    {
      id: 'happy-current',
      objection: 'Happy with current service',
      solution: "That's great that you're satisfied! I'm curious though - are you completely happy with what you're paying each month? Even if the service is good, wouldn't you want the same quality for $30-40 less per month? That's exactly what we're offering.",
      bgColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 'no-money',
      objection: 'Don\'t have money right now',
      solution: "I hear you, and that's exactly why this makes sense. You're already spending money on your current service. We're not asking for more money - we're showing you how to spend less and get more. You'll actually have more money in your pocket each month.",
      bgColor: 'from-purple-600 to-purple-700'
    },
    {
      id: 'not-interested',
      objection: 'Not interested',
      solution: "I appreciate your honesty. Can I ask - are you not interested in saving money, or not interested in changing services? Because if I could show you how to keep everything the same but pay less, would that change your perspective?",
      bgColor: 'from-gray-600 to-gray-700'
    },
    {
      id: 'bad-timing',
      objection: 'Not a good time',
      solution: "I understand timing is important. Let me ask - when would be a better time to discuss how we could save you $30-40 every month on your phone bill? I can call you back at a time that works better for you.",
      bgColor: 'from-green-600 to-green-700'
    }
  ];

  const mobileSalesObjections: MobileSalesObjection[] = [
    {
      id: 'happy-carrier',
      title: "I'm happy with my current carrier",
      description: "Customer is satisfied with their current mobile service provider",
      response: "That's wonderful that you're happy with the service quality! I'm not here to tell you your carrier is bad. What I want to show you is how you can get that same great service quality - or even better - while saving $30-50 every month. Xfinity Mobile runs on Verizon's network, so you'll get the same reliable coverage you're used to, just at a fraction of the cost.",
      tips: [
        "Acknowledge their satisfaction first",
        "Focus on savings, not service quality",
        "Mention Verizon network for credibility",
        "Use specific dollar amounts"
      ],
      color: "bg-blue-500"
    },
    {
      id: 'phone-number',
      title: "I don't want to change my phone number",
      description: "Customer is concerned about losing their current phone number",
      response: "Great news - you don't have to! We can transfer your current phone number at no cost to you. It's called number porting, and it's completely free. You'll keep the exact same number you have now, but you'll be saving money every month. The process is simple and we handle everything for you.",
      tips: [
        "Immediately reassure them they can keep their number",
        "Emphasize it's free",
        "Explain the process is handled for them",
        "Remove this barrier quickly"
      ],
      color: "bg-green-500"
    },
    {
      id: 'contract',
      title: "I'm in a contract",
      description: "Customer believes they're locked into their current carrier contract",
      response: "I understand that concern. Let me ask - how much are you paying per month right now? Most contracts have early termination fees between $100-200, but if you're saving $40 per month with us, you'll make that back in just 3-5 months. After that, it's pure savings for the rest of the year. Plus, many customers find their contracts have already expired without them realizing it.",
      tips: [
        "Calculate the break-even point",
        "Show long-term savings",
        "Suggest checking if contract expired",
        "Make the math simple and clear"
      ],
      color: "bg-orange-500"
    },
    {
      id: 'think-about-it',
      title: "I need to think about it",
      description: "Customer wants time to consider the offer",
      response: "I completely understand wanting to make an informed decision. What specific part would you like to think about - is it the savings, the service quality, or the switching process? I'd rather address any concerns now because this promotional pricing is only available for a limited time, and I'd hate for you to miss out on these savings.",
      tips: [
        "Ask what specifically they need to think about",
        "Address concerns immediately",
        "Create urgency with limited-time offer",
        "Show willingness to help decide now"
      ],
      color: "bg-yellow-500"
    },
    {
      id: 'network-coverage',
      title: "I don't trust the network coverage",
      description: "Customer is concerned about service quality and coverage",
      response: "That's a smart question to ask! Xfinity Mobile actually runs on Verizon's network - the same network that's rated #1 for coverage and reliability. So you're getting the exact same towers, the same coverage, the same speed. The only difference is you're paying less for it. Plus, we offer a 30-day money-back guarantee, so there's no risk to try it.",
      tips: [
        "Emphasize Verizon network partnership",
        "Mention #1 rating for credibility",
        "Offer money-back guarantee",
        "Remove risk from the equation"
      ],
      color: "bg-purple-500"
    }
  ];

  const handleCompleteCall = () => {
    const callDuration = Math.floor((new Date().getTime() - callStartTime.getTime()) / 1000 / 60);
    
    // Save call statistics
    const stats = JSON.parse(localStorage.getItem('callStats') || '{}');
    const today = new Date().toDateString();
    
    if (!stats[today]) {
      stats[today] = {
        totalCalls: 0,
        qualityAttributes: {},
        mobileSalesAttempts: 0,
        timeSpent: 0
      };
    }
    
    stats[today].totalCalls += 1;
    stats[today].timeSpent += callDuration;
    
    // Track quality attributes
    Object.entries(qualityAttributes).forEach(([key, value]) => {
      if (!stats[today].qualityAttributes[key]) {
        stats[today].qualityAttributes[key] = { used: 0, total: 0 };
      }
      stats[today].qualityAttributes[key].total += 1;
      if (value) {
        stats[today].qualityAttributes[key].used += 1;
      }
    });
    
    localStorage.setItem('callStats', JSON.stringify(stats));
    
    // Reset for next call
    setCurrentCall(currentCall + 1);
    setCallStartTime(new Date());
    setQualityAttributes({
      greeting: false,
      contextTool: false,
      apology: false,
      empathy: false,
      assurance: false,
      rephrasing: false,
      showingValue: false,
      discovery: false,
      rapport: false,
      appreciation: false,
      branding: false,
      recap: false,
      extraAssistance: false,
      satisfaction: false
    });
    setCallInfo({
      accountNumber: '',
      customerName: '',
      phoneNumber: '',
      comments: ''
    });
    setMobileSalesSteps({
      discovery: false,
      needsAnalysis: false,
      presentSolution: false,
      handleObjections: false,
      createUrgency: false,
      closeAttempt: false,
      followUp: false
    });
    setCurrentView('tracker');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'opening': return 'Call Opening';
      case 'connection': return 'Building Connection';
      case 'service': return 'Service & Support';
      case 'closing': return 'Call Closing';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opening': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'connection': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      case 'service': return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'closing': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (currentView === 'sales') {
    return <SalesTracker onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  if (currentView === 'statistics') {
    return <Statistics onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  if (currentView === 'objections') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-3xl font-bold flex items-center gap-3 ${themeClasses.text}`}>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                Objection Handling Guide
              </h1>
              <button
                onClick={() => setCurrentView('tracker')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${themeClasses.buttonSecondary} ${themeClasses.buttonSecondaryText}`}
              >
                Back to Tracker
              </button>
            </div>
            <p className={themeClasses.textSecondary}>
              Master these responses to handle common customer objections with confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {objections.map((objection) => (
              <div
                key={objection.id}
                className={`rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>"{objection.objection}"</h3>
                  <button
                    onClick={() => copyToClipboard(objection.solution)}
                    className={`p-2 rounded-lg transition-all duration-200 ${themeClasses.buttonSecondary}`}
                    title="Copy response"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className={`leading-relaxed ${themeClasses.textSecondary}`}>{objection.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'mobile-sales') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className={`rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-3xl font-bold flex items-center gap-3 ${themeClasses.text}`}>
                <Phone className="w-8 h-8 text-green-500" />
                Mobile Sales Process
              </h1>
              <button
                onClick={() => setCurrentView('tracker')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${themeClasses.buttonSecondary} ${themeClasses.buttonSecondaryText}`}
              >
                Back to Tracker
              </button>
            </div>
            <p className={themeClasses.textSecondary}>
              Follow this proven process to maximize your mobile sales success rate.
            </p>
          </div>

          <div className="grid gap-4 mb-6">
            {[
              { key: 'discovery', title: 'Discovery Questions', description: 'Ask about current mobile usage and pain points' },
              { key: 'needsAnalysis', title: 'Needs Analysis', description: 'Identify specific customer needs and budget' },
              { key: 'presentSolution', title: 'Present Solution', description: 'Show how Xfinity Mobile meets their needs' },
              { key: 'handleObjections', title: 'Handle Objections', description: 'Address any concerns or hesitations' },
              { key: 'createUrgency', title: 'Create Urgency', description: 'Emphasize limited-time savings opportunity' },
              { key: 'closeAttempt', title: 'Close Attempt', description: 'Ask for the sale directly' },
              { key: 'followUp', title: 'Follow Up', description: 'Schedule callback or next steps' }
            ].map((step, index) => (
              <div
                key={step.key}
                className={`rounded-xl p-4 border transition-all duration-300 ${
                  mobileSalesSteps[step.key as keyof typeof mobileSalesSteps] 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : `${themeClasses.cardBg} ${themeClasses.cardBorder} ${themeClasses.hover}`
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    mobileSalesSteps[step.key as keyof typeof mobileSalesSteps]
                      ? 'bg-green-500 text-white'
                      : `${themeClasses.buttonSecondary} ${themeClasses.textMuted}`
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>{step.title}</h3>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{step.description}</p>
                  </div>
                  <button
                    onClick={() => setMobileSalesSteps(prev => ({
                      ...prev,
                      [step.key]: !prev[step.key as keyof typeof prev]
                    }))}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      mobileSalesSteps[step.key as keyof typeof mobileSalesSteps]
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : `${themeClasses.buttonSecondary} ${themeClasses.buttonSecondaryText}`
                    }`}
                  >
                    {mobileSalesSteps[step.key as keyof typeof mobileSalesSteps] ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Objections Dropdown */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="relative">
              {showObjections && (
                <div className={`absolute bottom-16 right-0 w-96 max-h-96 overflow-y-auto rounded-xl shadow-2xl border animate-in slide-in-from-bottom-2 ${themeClasses.cardBg} ${themeClasses.cardBorder}`}>
                  <div className="p-4 border-b bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-xl">
                    <h3 className="font-bold text-lg">Mobile Sales Objections</h3>
                    <p className="text-sm opacity-90">Click any objection for handling strategies</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mobileSalesObjections.map((objection) => (
                      <div key={objection.id} className={`border-b last:border-b-0 ${themeClasses.cardBorder}`}>
                        <button
                          onClick={() => setExpandedObjection(
                            expandedObjection === objection.id ? null : objection.id
                          )}
                          className={`w-full p-4 text-left transition-colors duration-200 ${themeClasses.hover}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${objection.color}`}></div>
                            <div className="flex-1">
                              <h4 className={`font-semibold ${themeClasses.text}`}>{objection.title}</h4>
                              <p className={`text-sm ${themeClasses.textSecondary}`}>{objection.description}</p>
                            </div>
                            {expandedObjection === objection.id ? (
                              <ChevronUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
                            ) : (
                              <ChevronDown className={`w-5 h-5 ${themeClasses.textMuted}`} />
                            )}
                          </div>
                        </button>
                        
                        {expandedObjection === objection.id && (
                          <div className={`px-4 pb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                            <div className={`rounded-lg p-4 shadow-sm ${themeClasses.cardBg}`}>
                              <div className="flex items-center justify-between mb-3">
                                <h5 className={`font-semibold ${themeClasses.text}`}>Response Strategy:</h5>
                                <button
                                  onClick={() => copyToClipboard(objection.response)}
                                  className={`p-1 rounded transition-colors duration-200 ${themeClasses.hover}`}
                                  title="Copy response"
                                >
                                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className={`w-4 h-4 ${themeClasses.textMuted}`} />}
                                </button>
                              </div>
                              <p className={`text-sm leading-relaxed mb-3 ${themeClasses.textSecondary}`}>
                                {objection.response}
                              </p>
                              <div>
                                <h6 className={`font-semibold text-sm mb-2 ${themeClasses.text}`}>Pro Tips:</h6>
                                <ul className="space-y-1">
                                  {objection.tips.map((tip, index) => (
                                    <li key={index} className={`text-xs flex items-start gap-2 ${themeClasses.textSecondary}`}>
                                      <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-400'}`}></span>
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowObjections(!showObjections)}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Handle Objections</span>
                {showObjections ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Floating Dark/Light Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className={`rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold flex items-center gap-3 ${themeClasses.text}`}>
              <Phone className="w-8 h-8 text-blue-500" />
              Xfinity Call Tracker
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('sales')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Sales Tracker
              </button>
              <button
                onClick={() => setCurrentView('statistics')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Statistics
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className={`font-semibold ${themeClasses.text}`}>Current Call</span>
              </div>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>#{currentCall}</p>
            </div>
            <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className={`font-semibold ${themeClasses.text}`}>Call Duration</span>
              </div>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>
                {Math.floor((new Date().getTime() - callStartTime.getTime()) / 1000 / 60)}m
              </p>
            </div>
            <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className={`font-semibold ${themeClasses.text}`}>Quality Score</span>
              </div>
              <p className={`text-2xl font-bold ${themeClasses.text}`}>
                {Math.round((Object.values(qualityAttributes).filter(Boolean).length / Object.values(qualityAttributes).length) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Call Information */}
        <div className={`rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <h2 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Call Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>Account Number</label>
              <input
                type="text"
                value={callInfo.accountNumber}
                onChange={(e) => setCallInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>Customer Name</label>
              <input
                type="text"
                value={callInfo.customerName}
                onChange={(e) => setCallInfo(prev => ({ ...prev, customerName: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>Phone Number</label>
              <input
                type="text"
                value={callInfo.phoneNumber}
                onChange={(e) => setCallInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>Comments</label>
              <input
                type="text"
                value={callInfo.comments}
                onChange={(e) => setCallInfo(prev => ({ ...prev, comments: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.inputBg} ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                placeholder="Add any notes"
              />
            </div>
          </div>
        </div>

        {/* Quality Attributes with Verbatims */}
        <div className={`rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <h2 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>Call Quality Attributes</h2>
          
          {['opening', 'connection', 'service', 'closing'].map((category) => (
            <div key={category} className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${themeClasses.text}`}>
                {getCategoryTitle(category)}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {qualitySteps
                  .filter(step => step.category === category)
                  .map((step) => (
                    <div key={step.key} className={`border-l-4 rounded-lg p-4 transition-all duration-200 ${getCategoryColor(step.category)}`}>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={qualityAttributes[step.key as keyof typeof qualityAttributes]}
                            onChange={(e) => setQualityAttributes(prev => ({ ...prev, [step.key]: e.target.checked }))}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className={`font-medium ${themeClasses.text}`}>{step.label}</span>
                        </label>
                        <button
                          onClick={() => setExpandedVerbatim(expandedVerbatim === step.key ? null : step.key)}
                          className={`p-2 rounded-lg transition-all duration-200 ${themeClasses.buttonSecondary}`}
                          title="View verbatim"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {expandedVerbatim === step.key && (
                        <div className={`mt-3 p-3 rounded-lg border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold text-sm ${themeClasses.text}`}>Verbatim Script:</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => copyToClipboard(step.verbatim)}
                                className={`p-1 rounded transition-colors duration-200 ${themeClasses.hover}`}
                                title="Copy verbatim"
                              >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className={`w-4 h-4 ${themeClasses.textMuted}`} />}
                              </button>
                              <button
                                onClick={() => setExpandedVerbatim(null)}
                                className={`p-1 rounded transition-colors duration-200 ${themeClasses.hover}`}
                              >
                                <X className={`w-4 h-4 ${themeClasses.textMuted}`} />
                              </button>
                            </div>
                          </div>
                          <p className={`text-sm leading-relaxed ${themeClasses.textSecondary}`}>
                            {step.verbatim}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setCurrentView('mobile-sales')}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Mobile Sales
          </button>
          <button
            onClick={() => setCurrentView('objections')}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Handle Objections
          </button>
          <button
            onClick={handleCompleteCall}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Complete Call
          </button>
        </div>
      </div>
    </div>
  );
}