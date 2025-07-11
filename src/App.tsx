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
  const [showMobileObjections, setShowMobileObjections] = useState(false);
  const [expandedMobileObjection, setExpandedMobileObjection] = useState<string | null>(null);
  const [copiedObjection, setCopiedObjection] = useState<string | null>(null);

  const mobileObjections: MobileObjection[] = [
    {
      id: 'happy-with-carrier',
      objection: "I'm happy with my current carrier",
      brief: "Customer is satisfied with their current mobile service provider",
      handling: "I understand you're satisfied with your current service, and that's great! What I'd like to show you is how you can keep that same level of satisfaction while potentially saving $30-50 per month. Xfinity Mobile runs on the same reliable Verizon network you're probably already familiar with, so you'll get the same great coverage. The difference is in the pricing - we can offer these savings because we're able to leverage our existing relationship with our internet customers. Would you be interested in seeing how much you could save while keeping the same quality service?",
      proTips: [
        "Acknowledge their satisfaction first",
        "Focus on savings while maintaining quality",
        "Mention Verizon network for credibility",
        "Ask permission to show savings"
      ]
    },
    {
      id: 'phone-number',
      objection: "I don't want to change my phone number",
      brief: "Customer is concerned about losing their current phone number",
      handling: "That's completely understandable - your phone number is important to you! The great news is that you absolutely don't have to change your phone number. We can transfer your current number to Xfinity Mobile at no cost to you. This process is called 'porting' and it's completely free. Your number will work exactly the same way, and all your contacts will still be able to reach you. The transfer usually takes just a few hours, and we handle all the paperwork for you. So you get to keep your familiar number while enjoying the savings of up to $50 per month. Does that address your concern?",
      proTips: [
        "Immediately reassure them they can keep their number",
        "Explain the porting process is free and easy",
        "Mention the timeframe (few hours)",
        "Emphasize the savings benefit"
      ]
    },
    {
      id: 'contract',
      objection: "I'm in a contract",
      brief: "Customer believes they're locked into their current carrier contract",
      handling: "I understand contracts can feel limiting. Let me ask - do you know when your contract ends and if there's an early termination fee? Even if there is a fee, let's do some quick math together. If you're paying $80/month now and could pay $45/month with Xfinity Mobile, that's $35 in monthly savings. Over 12 months, that's $420 in savings. If your early termination fee is $200, you'd still save $220 in the first year alone, and then $420 every year after that. Plus, with Xfinity Mobile, there are no annual contracts - you have the flexibility to change whenever you want. Would you like me to help you calculate your specific savings?",
      proTips: [
        "Ask about their specific contract terms",
        "Do the math together to show break-even",
        "Highlight long-term savings",
        "Emphasize no-contract flexibility with Xfinity"
      ]
    },
    {
      id: 'think-about-it',
      objection: "I need to think about it",
      brief: "Customer wants to delay the decision",
      handling: "I completely understand wanting to think it through - this is an important decision. Let me ask, what specific aspects would you like to think about? Is it the savings, the network coverage, or something else? I'd rather address any concerns you have right now while we're talking, so you have all the information you need to make the best decision. Also, I should mention that this promotional pricing I'm showing you today is only available for a limited time. I'd hate for you to miss out on these savings. What questions can I answer for you right now?",
      proTips: [
        "Ask what specifically they need to think about",
        "Address concerns immediately",
        "Create urgency with limited-time pricing",
        "Keep them engaged with questions"
      ]
    },
    {
      id: 'network-coverage',
      objection: "I don't trust the network coverage",
      brief: "Customer is concerned about service quality and coverage",
      handling: "That's a very important concern, and I'm glad you brought it up! Here's something that might surprise you - Xfinity Mobile actually uses the exact same network as Verizon, which is consistently rated as the most reliable network in America. So if you've had good experiences with Verizon coverage, you'll get that same coverage with Xfinity Mobile. Plus, we also have access to millions of Xfinity WiFi hotspots nationwide, which means even better connectivity in many areas. And here's the best part - we're so confident in our coverage that we offer a 30-day money-back guarantee. You can try it risk-free for a full month, and if you're not completely satisfied with the coverage, we'll refund everything. Does that give you confidence in trying our service?",
      proTips: [
        "Emphasize it's the same Verizon network",
        "Mention WiFi hotspot advantage",
        "Offer 30-day guarantee to reduce risk",
        "Ask for commitment to try"
      ]
    },
    {
      id: 'too-good-to-be-true',
      objection: "It sounds too good to be true",
      brief: "Customer is skeptical about the pricing and offers",
      handling: "I understand your skepticism - when something sounds too good to be true, it often is! Let me explain exactly why we can offer these prices. Xfinity Mobile is part of Comcast, one of the largest telecommunications companies in America. We already have millions of customers for our internet service, and we can leverage that scale to negotiate better rates with network providers. We're not trying to make huge profits on mobile - we see it as a way to provide more value to our existing customers and attract new ones. Think of it like Costco - they can offer great prices because of their volume. Plus, we save money by not having physical stores everywhere like other carriers. These savings get passed on to you. Does that help explain how we can offer such competitive pricing?",
      proTips: [
        "Acknowledge their skepticism as reasonable",
        "Explain the business model clearly",
        "Use analogies like Costco for understanding",
        "Emphasize company credibility (Comcast)"
      ]
    },
    {
      id: 'unlimited-data',
      objection: "I need unlimited data",
      brief: "Customer requires unlimited data usage",
      handling: "Absolutely! We have unlimited data plans too, and they're still significantly cheaper than what you're probably paying now. Our unlimited plan starts at just $45 per line, compared to $70-80 you might be paying elsewhere. You get truly unlimited data on the Verizon network, plus access to millions of WiFi hotspots. And here's a bonus - if you have Xfinity Internet at home, you get an additional $10 discount per line, bringing it down to just $35 per month for unlimited data. That's less than half of what most people pay! Plus, there's no throttling after a certain amount like some carriers do. Would you like me to show you exactly how much you'd save with our unlimited plan?",
      proTips: [
        "Immediately confirm unlimited is available",
        "Compare pricing to competitors",
        "Mention Xfinity Internet discount",
        "Emphasize no throttling"
      ]
    },
    {
      id: 'multiple-lines',
      objection: "I have multiple lines/family plan",
      brief: "Customer has a family plan with multiple phone lines",
      handling: "That's perfect! Family plans are actually where you can save the most money with Xfinity Mobile. Let me show you - if you have 4 lines paying $200/month elsewhere, you could pay as little as $120/month with Xfinity Mobile, saving you $80 every single month. That's nearly $1,000 per year! Each additional line gets cheaper, and if you have Xfinity Internet, you save an extra $10 per line per month. So a family of 4 with Xfinity Internet could pay just $80/month total for unlimited data on all lines. How many lines do you currently have, and what are you paying per month? Let me calculate your exact savings.",
      proTips: [
        "Emphasize family plans save the most",
        "Use specific examples with dollar amounts",
        "Mention per-line discounts",
        "Ask for their specific situation to calculate"
      ]
    },
    {
      id: 'talk-to-spouse',
      objection: "I need to talk to my spouse/family",
      brief: "Customer needs to consult with family members before deciding",
      handling: "That makes perfect sense - family decisions should definitely be made together! Here's what I can do to make this easier for you. First, I can hold this exact pricing for you for the next 48 hours, so you don't have to worry about it changing while you discuss it. Second, I can send you a summary email with all the savings information we discussed, so you can share the exact details with your family. And third, if it would be helpful, I could schedule a brief call with both of you together so I can answer any questions your spouse might have. What would work best for you? And when would be a good time for me to follow up?",
      proTips: [
        "Validate the need to consult family",
        "Offer to hold pricing for 48 hours",
        "Provide email summary for sharing",
        "Offer joint call option",
        "Schedule specific follow-up time"
      ]
    },
    {
      id: 'barely-use-phone',
      objection: "I barely use my phone",
      brief: "Customer has very low mobile usage",
      handling: "That's actually perfect for Xfinity Mobile! We have a 'By the Gig' plan that's ideal for light users like yourself. You only pay for the data you actually use - it's just $15 per month for the line, plus $12 per GB of data you use. So if you only use 1GB per month, your total bill would be just $27. Compare that to most carriers who charge $50-60 minimum, even if you barely use any data. Plus, you automatically connect to Xfinity WiFi hotspots, so you use even less cellular data. Many of our light-usage customers pay less than $30 per month total. Based on your usage, you could probably save $20-30 every month. Would you like me to help you estimate what your bill would be?",
      proTips: [
        "Position 'By the Gig' as perfect solution",
        "Give specific pricing examples",
        "Compare to typical carrier minimums",
        "Mention WiFi hotspot benefit",
        "Offer to calculate their specific cost"
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

            {/* Mobile Objections Floating Button */}
            <button
              onClick={() => setShowMobileObjections(!showMobileObjections)}
              className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 z-30"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Mobile Objections</span>
              {showMobileObjections ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Objections Dropdown */}
            {renderMobileObjectionsDropdown()}
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