import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle2, Circle, RotateCcw, User, PhoneCall, Heart, Shield, MessageSquare, Star, Search, Users, Gift, Award, RefreshCw, HelpCircle, ThumbsUp, FileText, Hash, UserCheck, Copy, Check, ArrowRight, ArrowLeft, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';

interface CallItem {
  id: string;
  title: string;
  verbatim: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  category: 'opening' | 'connection' | 'service' | 'closing';
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
}

function App() {
  const [currentView, setCurrentView] = useState<'tracker' | 'objections'>('tracker');
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);
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

  const [objections, setObjections] = useState<Objection[]>([
    {
      id: 'too-expensive',
      objection: 'Too Expensive',
      solution: 'I totally understand that reducing monthly charges is really important. Believe me. I try to do that too! Earlier we discussed something customer has mentioned that turned into a need for a line) so it def sounds like something you\'ll be using on the long-term.'
    },
    {
      id: 'check-with-spouse',
      objection: 'Have to check in with my wife/husband',
      solution: 'I absolutely understand you would want to talk to your partner first. What questions do you think your wife will have?'
    },
    {
      id: 'need-to-think',
      objection: 'Need to think about it',
      solution: 'I totally understand you may need time to think about it. Maybe I can help clear things up. What are your concerns?'
    },
    {
      id: 'under-contract',
      objection: 'I\'m under a contract',
      solution: 'Mr. Customer. I totally understand that you\'re under a contract but let me tell you that the $20 you\'re saving every month by switching to Xfinity mobile can cover for any possible ETF in a year\'s time! So, it\'s definitely a save in the long run, as well, it seems perfectly suited for you and your family\'s needs'
    },
    {
      id: 'dont-need-line',
      objection: 'Don\'t need the line',
      solution: 'Mr. Customer, I totally understand how it might seem that way but based on what you told me (customer\'s needs) it definitely sounds like something you\'ll be needing and using to get the lifestyle you deserve'
    },
    {
      id: 'get-at-store',
      objection: 'I\'m going to get it at the store',
      solution: 'Mr. Customer. I totally understand you want to speak to someone face-to-face. What concerns do you have about doing this over the phone by the way? By the way, if you\'re concerned about delivery. I can sign you up for a promotion on free express shipping and guarantee the phone will be delivered asap but I wouldn\'t be able to guarantee you\'d be able to find that device in the store\'s stock'
    },
    {
      id: 'family-has-phones',
      objection: 'All family members have their own phones',
      solution: 'Mr. Customer, that\'s great to hear how connected you all are as a family together! Let me tell you, however about how much money you\'re saving for yourself paying $XX less for each line when you add that friend and you can have them Venmo you the money each month'
    },
    {
      id: 'not-good-time',
      objection: 'It\'s not a good time / it\'s not the right time',
      solution: 'I definitely want to make sure you\'re comfortable with the pace we\'re moving with. What do you think might change between now and the next XX months that is making you want to wait?'
    },
    {
      id: 'good-with-current',
      objection: 'I\'m good with my current provider',
      solution: 'I\'m glad that you\'re doing well with your current provider and not facing any kind of issues but if it\'s affecting your expenses in a bad way I think you need to rethink it especially when all the prices are going up and up. I mean your money is better off in your pocket could calculate all the savings that we\'ll save by switching and after this it\'s your call'
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

  const toggleItem = (id: string) => {
    setCallItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetCall = () => {
    setCallItems(prev => prev.map(item => ({ ...item, completed: false })));
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

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'opening': return 'Call Opening';
      case 'connection': return 'Building Connection';
      case 'service': return 'Service & Support';
      case 'closing': return 'Call Closing';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opening': return 'from-blue-600 to-blue-700';
      case 'connection': return 'from-emerald-600 to-emerald-700';
      case 'service': return 'from-purple-600 to-purple-700';
      case 'closing': return 'from-red-600 to-red-700';
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

  if (currentView === 'objections') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        {/* Header */}
        <header className="bg-gray-800 shadow-xl border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-lg shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Objection Handling</h1>
                  <p className="text-sm text-gray-300">Customer objections and proven responses</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('tracker')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tracker</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Objection Handling Guide</h2>
              <p className="text-orange-100">
                Click on any objection below to see the proven response. These are common customer objections and effective ways to overcome them.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {objections.map((objection, index) => (
              <div key={objection.id} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleObjection(objection.id)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 flex items-center justify-between text-white"
                >
                  <div className="flex items-center space-x-3">
                    <span className="bg-white text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-lg font-semibold text-left">{objection.objection}</span>
                  </div>
                  {expandedObjection === objection.id ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                
                {expandedObjection === objection.id && (
                  <div className="p-6 bg-gray-900/50 border-t border-gray-600">
                    <div className="space-y-4">
                      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-400" />
                          <span>Conversation Preview:</span>
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="bg-red-600 rounded-full p-1">
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-red-400 font-semibold text-sm">Customer:</p>
                              <p className="text-red-300 bg-red-900/20 rounded-lg p-3 mt-1 border border-red-800/30">
                                "{objection.objection}"
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="bg-emerald-600 rounded-full p-1">
                              <PhoneCall className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-emerald-400 font-semibold text-sm">Your Response:</p>
                              <p className="text-emerald-300 bg-emerald-900/20 rounded-lg p-3 mt-1 border border-emerald-800/30 leading-relaxed">
                                "{objection.solution}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <span>Objection Handling Tips</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-400">Key Principles:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Listen actively and acknowledge their concern</li>
                  <li>• Empathize before presenting solutions</li>
                  <li>• Ask clarifying questions to understand the real issue</li>
                  <li>• Connect benefits to their specific needs</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-400">Best Practices:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Use their name when responding</li>
                  <li>• Provide specific examples and calculations</li>
                  <li>• Create urgency when appropriate</li>
                  <li>• Always confirm understanding before moving forward</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 shadow-xl border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Xfinity Call Tracker</h1>
                <p className="text-sm text-gray-300">Call #{currentCall} • Started at {callStartTime.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('objections')}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <DollarSign className="w-4 h-4" />
                <span>Start Offering</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={resetCall}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Call</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Customer Information Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Customer Information</h2>
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
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Hash className="w-4 h-4" />
                <span>Account Number</span>
              </label>
              <input
                type="text"
                value={callInfo.accountNumber}
                onChange={(e) => updateCallInfo('accountNumber', e.target.value)}
                placeholder="Enter account number"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4" />
                <span>Customer Name</span>
              </label>
              <input
                type="text"
                value={callInfo.customerName}
                onChange={(e) => updateCallInfo('customerName', e.target.value)}
                placeholder="Enter customer name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={callInfo.phoneNumber}
                onChange={(e) => updateCallInfo('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              <span>Additional Comments</span>
            </label>
            <textarea
              value={callInfo.comments}
              onChange={(e) => updateCallInfo('comments', e.target.value)}
              placeholder="Enter any additional notes or comments about this call..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Call Progress</h2>
            <span className="text-sm font-medium text-gray-300">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0%</span>
            <span className="font-medium text-blue-400">{Math.round(progressPercentage)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Call Checklist */}
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
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
                      className={`group p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        item.completed
                          ? 'border-emerald-500 bg-emerald-900/30 hover:bg-emerald-900/40'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:shadow-lg hover:bg-gray-700/70'
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 pt-1">
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 group-hover:text-gray-300" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <IconComponent className={`w-5 h-5 ${item.completed ? 'text-emerald-400' : 'text-gray-400'}`} />
                            <h4 className={`font-semibold ${item.completed ? 'text-emerald-300' : 'text-white'}`}>
                              {item.title}
                            </h4>
                          </div>
                          
                          <div className={`p-4 rounded-lg ${item.completed ? 'bg-gray-900/50 border border-emerald-600/30' : 'bg-gray-900/30 border border-gray-600'}`}>
                            <p className={`text-base leading-relaxed font-bold ${item.completed ? 'text-emerald-200' : 'text-gray-200'}`}>
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