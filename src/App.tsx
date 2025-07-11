import React, { useState, useEffect } from 'react';
import { Phone, Users, TrendingUp, Clock, BarChart3, AlertTriangle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import SalesTracker from './components/SalesTracker';
import { Statistics } from './components/Statistics';

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

export default function App() {
  const [currentView, setCurrentView] = useState<'tracker' | 'sales' | 'statistics' | 'objections' | 'mobile-sales'>('tracker');
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

  // Track mobile sales attempts
  useEffect(() => {
    if (currentView === 'mobile-sales') {
      const stats = JSON.parse(localStorage.getItem('callStats') || '{}');
      stats.mobileSalesAttempts = (stats.mobileSalesAttempts || 0) + 1;
      localStorage.setItem('callStats', JSON.stringify(stats));
    }
  }, [currentView, mobileSalesSteps]);

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
  const [copied, setCopied] = useState(false);

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
    },
    {
      id: 'too-good-true',
      title: "It sounds too good to be true",
      description: "Customer is skeptical about the pricing or offer",
      response: "I appreciate your skepticism - it shows you're a smart consumer! The reason we can offer these prices is because we're leveraging our existing cable infrastructure and partnering with Verizon for mobile coverage. We're not trying to make huge profits on mobile - we want to provide value to our existing customers and attract new ones. That's why we can pass these savings on to you.",
      tips: [
        "Validate their skepticism as smart",
        "Explain the business model briefly",
        "Mention existing infrastructure advantage",
        "Position as customer value, not profit grab"
      ],
      color: "bg-red-500"
    },
    {
      id: 'unlimited-data',
      title: "I need unlimited data",
      description: "Customer requires unlimited data plan",
      response: "Perfect! Our unlimited plan is just $45 per line, compared to $70-80 you're probably paying elsewhere. You get truly unlimited data with no throttling for the first 20GB, plus mobile hotspot included. And if you have multiple lines, the savings get even better - 2 lines for $80, 3 lines for $105. How many lines do you currently have?",
      tips: [
        "Quote competitive unlimited pricing",
        "Compare to typical carrier prices",
        "Mention hotspot inclusion",
        "Ask about multiple lines for bigger savings"
      ],
      color: "bg-indigo-500"
    },
    {
      id: 'multiple-lines',
      title: "I have multiple lines/family plan",
      description: "Customer has family plan with multiple phone lines",
      response: "Even better! That's where you'll see the biggest savings. Let me break this down: if you have 4 lines paying $200+ elsewhere, our 4-line unlimited plan is just $140 - that's $60+ savings every month, or over $700 per year! Plus, each line gets unlimited data and mobile hotspot. How many lines are you currently paying for?",
      tips: [
        "Show excitement about bigger savings",
        "Use specific 4-line example",
        "Calculate annual savings",
        "Ask for their specific line count"
      ],
      color: "bg-teal-500"
    },
    {
      id: 'talk-to-spouse',
      title: "I need to talk to my spouse/family",
      description: "Customer needs to consult with family members",
      response: "Absolutely, that's a smart approach for family decisions. Here's what I can do - I'll hold this promotional pricing for you for 48 hours so you have time to discuss it. I can also schedule a quick call with both of you together if that would help. What's the best time to reach you both, or would you prefer to call me back after you've talked?",
      tips: [
        "Respect the family decision process",
        "Offer to hold pricing temporarily",
        "Suggest joint call option",
        "Get commitment for follow-up"
      ],
      color: "bg-pink-500"
    },
    {
      id: 'barely-use-phone',
      title: "I barely use my phone",
      description: "Customer is a light user who doesn't need much data",
      response: "That's perfect for our 'By the Gig' plan! You only pay for what you use - just $15 per month for unlimited talk and text, then $12 per GB of data you actually use. Most light users end up paying $20-30 total per month instead of $50-70 on traditional plans. You could save $300-500 per year just by paying for what you actually use!",
      tips: [
        "Highlight pay-per-use advantage",
        "Give realistic total monthly cost",
        "Compare to traditional plan waste",
        "Calculate annual savings for light usage"
      ],
      color: "bg-cyan-500"
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

  if (currentView === 'sales') {
    return <SalesTracker onBack={() => setCurrentView('tracker')} />;
  }

  if (currentView === 'statistics') {
    return <Statistics onBack={() => setCurrentView('tracker')} />;
  }

  if (currentView === 'objections') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                Objection Handling Guide
              </h1>
              <button
                onClick={() => setCurrentView('tracker')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200"
              >
                Back to Tracker
              </button>
            </div>
            <p className="text-white/80">
              Master these responses to handle common customer objections with confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {objections.map((objection) => (
              <div
                key={objection.id}
                className={`bg-gradient-to-r ${objection.bgColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">"{objection.objection}"</h3>
                  <button
                    onClick={() => copyToClipboard(objection.solution)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200"
                    title="Copy response"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/90 leading-relaxed">{objection.solution}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Phone className="w-8 h-8 text-green-400" />
                Mobile Sales Process
              </h1>
              <button
                onClick={() => setCurrentView('tracker')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200"
              >
                Back to Tracker
              </button>
            </div>
            <p className="text-white/80">
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
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transition-all duration-300 ${
                  mobileSalesSteps[step.key as keyof typeof mobileSalesSteps] 
                    ? 'bg-green-500/20 border-green-400/50' 
                    : 'hover:bg-white/15'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    mobileSalesSteps[step.key as keyof typeof mobileSalesSteps]
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </div>
                  <button
                    onClick={() => setMobileSalesSteps(prev => ({
                      ...prev,
                      [step.key]: !prev[step.key as keyof typeof prev]
                    }))}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      mobileSalesSteps[step.key as keyof typeof mobileSalesSteps]
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
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
                <div className="absolute bottom-16 right-0 w-96 max-h-96 overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-2">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-xl">
                    <h3 className="font-bold text-lg">Mobile Sales Objections</h3>
                    <p className="text-sm opacity-90">Click any objection for handling strategies</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mobileSalesObjections.map((objection) => (
                      <div key={objection.id} className="border-b border-gray-100 last:border-b-0">
                        <button
                          onClick={() => setExpandedObjection(
                            expandedObjection === objection.id ? null : objection.id
                          )}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${objection.color}`}></div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{objection.title}</h4>
                              <p className="text-sm text-gray-600">{objection.description}</p>
                            </div>
                            {expandedObjection === objection.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {expandedObjection === objection.id && (
                          <div className="px-4 pb-4 bg-gray-50">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-gray-800">Response Strategy:</h5>
                                <button
                                  onClick={() => copyToClipboard(objection.response)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                  title="Copy response"
                                >
                                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                                </button>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                {objection.response}
                              </p>
                              <div>
                                <h6 className="font-semibold text-gray-800 text-sm mb-2">Pro Tips:</h6>
                                <ul className="space-y-1">
                                  {objection.tips.map((tip, index) => (
                                    <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Phone className="w-8 h-8 text-blue-400" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">Current Call</span>
              </div>
              <p className="text-2xl font-bold">#{currentCall}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Call Duration</span>
              </div>
              <p className="text-2xl font-bold">
                {Math.floor((new Date().getTime() - callStartTime.getTime()) / 1000 / 60)}m
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Quality Score</span>
              </div>
              <p className="text-2xl font-bold">
                {Math.round((Object.values(qualityAttributes).filter(Boolean).length / Object.values(qualityAttributes).length) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Call Information */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Call Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Account Number</label>
              <input
                type="text"
                value={callInfo.accountNumber}
                onChange={(e) => setCallInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Customer Name</label>
              <input
                type="text"
                value={callInfo.customerName}
                onChange={(e) => setCallInfo(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={callInfo.phoneNumber}
                onChange={(e) => setCallInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Comments</label>
              <input
                type="text"
                value={callInfo.comments}
                onChange={(e) => setCallInfo(prev => ({ ...prev, comments: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes"
              />
            </div>
          </div>
        </div>

        {/* Quality Attributes */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Call Quality Attributes</h2>
          
          {/* Call Opening */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Call Opening</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { key: 'greeting', label: 'Greeting' },
                { key: 'contextTool', label: 'Context Tool' },
                { key: 'apology', label: 'Apology' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qualityAttributes[key as keyof typeof qualityAttributes]}
                    onChange={(e) => setQualityAttributes(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/30 rounded focus:ring-blue-500"
                  />
                  <span className="text-white font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Building Connection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-300 mb-3">Building Connection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { key: 'empathy', label: 'Empathy' },
                { key: 'assurance', label: 'Assurance' },
                { key: 'rephrasing', label: 'Rephrasing' },
                { key: 'rapport', label: 'Rapport' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qualityAttributes[key as keyof typeof qualityAttributes]}
                    onChange={(e) => setQualityAttributes(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-green-600 bg-white/10 border-white/30 rounded focus:ring-green-500"
                  />
                  <span className="text-white font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Service & Support */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Service & Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { key: 'showingValue', label: 'Showing Value' },
                { key: 'discovery', label: 'Discovery' },
                { key: 'branding', label: 'Branding' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qualityAttributes[key as keyof typeof qualityAttributes]}
                    onChange={(e) => setQualityAttributes(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-purple-500"
                  />
                  <span className="text-white font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Call Closing */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-orange-300 mb-3">Call Closing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { key: 'appreciation', label: 'Appreciation' },
                { key: 'recap', label: 'Recap' },
                { key: 'extraAssistance', label: 'Extra Assistance' },
                { key: 'satisfaction', label: 'Satisfaction' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qualityAttributes[key as keyof typeof qualityAttributes]}
                    onChange={(e) => setQualityAttributes(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-orange-600 bg-white/10 border-white/30 rounded focus:ring-orange-500"
                  />
                  <span className="text-white font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
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