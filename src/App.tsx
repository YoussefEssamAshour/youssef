import React, { useState } from 'react';
import { Phone, AlertTriangle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import Statistics from './components/Statistics';
import SalesTracker from './components/SalesTracker';

interface MobileObjection {
  id: string;
  objection: string;
  brief: string;
  handling: string;
  proTips: string[];
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'mobile' | 'internet' | 'stats'>('home');
  const [selectedObjection, setSelectedObjection] = useState<string>('');
  const [copiedObjection, setCopiedObjection] = useState<string | null>(null);

  const mobileObjections: MobileObjection[] = [
    {
      id: 'too-expensive',
      objection: "Too Expensive",
      brief: "Empathizing with the customer is very important when it comes to this specific objection. Relating to him and restating the benefits connecting to his answers to the discovery questions asked.",
      handling: "I totally understand that reducing monthly charges is really important. Believe me, I try to do that too! Earlier we discussed, (something customer has mentioned that turned into a need for a line) so it def sounds like something you'll be using on the long-term.",
      proTips: [
        "Empathize with the customer's concern about cost",
        "Reference their specific needs from discovery questions",
        "Connect benefits to their long-term usage",
        "Show understanding of budget concerns"
      ]
    },
    {
      id: 'check-with-spouse',
      objection: "I have to check in with my wife/husband",
      brief: "Uncovering the spouse's needs and connecting the features and benefits to those needs",
      handling: "I absolutely understand you would want to talk to your partner first. What questions do you think your wife will have?",
      proTips: [
        "Acknowledge the need to consult with spouse",
        "Ask about potential spouse concerns",
        "Uncover spouse's specific needs",
        "Connect benefits to both partners' needs"
      ]
    },
    {
      id: 'need-to-think',
      objection: "I need to think about it",
      brief: "Revisit how their values match nicely with our products and services. State again what is in it for them.",
      handling: "I totally understand you may need time to think about it. Maybe I can help clear things up. What are your concerns?",
      proTips: [
        "Acknowledge their need for time",
        "Offer to address specific concerns",
        "Revisit value proposition",
        "Ask open-ended questions about hesitations"
      ]
    },
    {
      id: 'under-contract',
      objection: "I'm under a contract",
      brief: "Revisit how their values match nicely with our products and services. Visit Xfinity.com/mobile to have a comparison and see how much you can save",
      handling: "Mr. Customer, I totally understand that you're under a contract but let me tell you that the $20 you're saving every month by switching to Xfinity mobile can cover for any possible ETF in a year's time! So, it's definitely a save in the long run, as well, it seems perfectly suited for you and your family's needs",
      proTips: [
        "Calculate monthly savings vs ETF costs",
        "Show long-term financial benefits",
        "Reference Xfinity.com/mobile for comparisons",
        "Connect to family needs and values"
      ]
    },
    {
      id: 'dont-need-line',
      objection: "I don't need the line",
      brief: "Response here should directly relate to the needs uncovered through discovery questions asked by yourself",
      handling: "Mr. Customer, I totally understand how it might seem that way but based on what you told me (customer's needs) it definitely sounds like something you'll be needing and using to get the lifestyle you deserve",
      proTips: [
        "Reference specific customer needs from discovery",
        "Connect service to their desired lifestyle",
        "Show understanding while redirecting",
        "Use their own words and needs against objection"
      ]
    },
    {
      id: 'get-at-store',
      objection: "I'm going to get it at the store",
      brief: "Highlight how promotional phones discussed may not be available in stock at the specific store. Tackle any Urgency on Delivery for free.",
      handling: "Mr. Customer, I totally understand you want to speak to someone face-to-face. What concerns do you have about doing this over the phone by the way? By the way, if you're concerned about delivery, I can sign you up for a promotion on free express shipping and guarantee the phone will be delivered asap but I wouldn't be able to guarantee you'd be able to find that device in the store's stock",
      proTips: [
        "Acknowledge preference for face-to-face interaction",
        "Uncover specific concerns about phone sales",
        "Highlight inventory availability issues",
        "Offer free express shipping as advantage"
      ]
    },
    {
      id: 'family-has-phones',
      objection: "All family members have their own phones",
      brief: "Highlight the savings the customer can get from having a family friend/neighbors/coworker etc. added to his account",
      handling: "Mr. Customer, that's great to hear how connected you all are as a family together! Let me tell you, however about how much money you're saving for yourself paying $XX less for each line when you add that friend and you can have them Venmo you the money each month",
      proTips: [
        "Acknowledge family connectivity positively",
        "Introduce concept of adding non-family members",
        "Show specific dollar savings per line",
        "Suggest modern payment methods like Venmo"
      ]
    },
    {
      id: 'not-good-time',
      objection: "It's not a good time/It's not the right time",
      brief: "Make sure that all concerns are covered because with this specific objection, you have most likely missed something that is still a concern for the customer",
      handling: "I definitely want to make sure you're comfortable with the pace we're moving with. What do you think might change between now and the next XX months that is making you want to wait?",
      proTips: [
        "Slow down the pace and show understanding",
        "Uncover the real underlying concerns",
        "Ask about specific timing concerns",
        "Address missed objections that may still exist"
      ]
    },
    {
      id: 'good-with-current',
      objection: "I'm good with my current provider",
      brief: "Calculate the savings to the cx and try to show value in the product and the price",
      handling: "I'm glad that you're doing well with your current provider and not facing any kind of issues but if it's affecting your expenses in a bad way, I think you need to rethink it especially when all the prices are going up and up, I mean your money is better off in your pocket. I could calculate all the savings that we'll save by switching and after this it's your call.",
      proTips: [
        "Acknowledge their satisfaction with current provider",
        "Focus on rising costs and expenses",
        "Emphasize money staying in their pocket",
        "Offer to calculate specific savings"
      ]
    }
  ];

  const copyToClipboard = async (text: string, objectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedObjection(objectionId);
      setTimeout(() => setCopiedObjection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleMobileObjection = (objectionId: string) => {
    setExpandedMobileObjection(
      expandedMobileObjection === objectionId ? null : objectionId
    );
  };

  const renderMobileObjectionsDropdown = () => {
    if (!showMobileObjections) return null;

    return (
      <div className="fixed bottom-20 right-4 w-96 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-40">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-600" />
            Mobile Sales Objections
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Click any objection to see handling strategies
          </p>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {mobileObjections.map((objection, index) => (
            <div key={objection.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <button
                onClick={() => toggleMobileObjection(objection.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-3`}
                    style={{ backgroundColor: `hsl(${index * 36}, 70%, 60%)` }}
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      "{objection.objection}"
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {objection.brief}
                    </div>
                  </div>
                </div>
                {expandedMobileObjection === objection.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {expandedMobileObjection === objection.id && (
                <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-700/50">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {objection.handling}
                    </p>
                    <button
                      onClick={() => copyToClipboard(objection.handling, objection.id)}
                      className="mt-2 inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {copiedObjection === objection.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Response
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pro Tips:</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {objection.proTips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'mobile':
        return (
          <div className="relative">
            <div className="max-w-4xl mx-auto p-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Phone className="w-8 h-8 text-blue-600 mr-3" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Mobile Sales
                  </h1>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Customer Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Carrier
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., Verizon, AT&T, T-Mobile"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Monthly Bill
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="$80"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Number of Lines
                        </label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="2"
                        />
                      </div>
                      
                      {/* Mobile Objections Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Common Objections
                        </label>
                        <select
                          value={selectedObjection}
                          onChange={(e) => setSelectedObjection(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">Select an objection...</option>
                          {mobileObjections.map((objection) => (
                            <option key={objection.id} value={objection.id}>
                              {objection.objection}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Xfinity Mobile Plans
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">By the Gig</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">$15/month + $12/GB</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Perfect for light users</p>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Unlimited</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">$45/month per line</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">$10 discount with Xfinity Internet</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selected Objection Details */}
                {selectedObjection && (
                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    {(() => {
                      const objection = mobileObjections.find(obj => obj.id === selectedObjection);
                      if (!objection) return null;
                      
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                              Objection: "{objection.objection}"
                            </h3>
                            <button
                              onClick={() => copyToClipboard(objection.handling, objection.id)}
                              className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                            >
                              {copiedObjection === objection.id ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-1" />
                                  Copy Response
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Brief:</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                              {objection.brief}
                            </p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">How to Handle:</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
                              {objection.handling}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Pro Tips:</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                              {objection.proTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Key Selling Points
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                    <li>• Uses Verizon's reliable network</li>
                    <li>• No annual contracts</li>
                    <li>• Free number transfer</li>
                    <li>• Access to millions of Xfinity WiFi hotspots</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'internet':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Internet Sales
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Internet sales tools and resources coming soon...
              </p>
            </div>
          </div>
        );
      case 'stats':
        return <Statistics />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <SalesTracker />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Sales Dashboard
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'home'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveView('mobile')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'mobile'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Mobile Sales
              </button>
              <button
                onClick={() => setActiveView('internet')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'internet'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Internet Sales
              </button>
              <button
                onClick={() => setActiveView('stats')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'stats'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Statistics
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;