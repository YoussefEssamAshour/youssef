import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Smartphone, 
  DollarSign, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp,
  Target,
  Brain,
  Heart,
  Clock,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { MobileSalesStep } from '../types';

interface MobileSalesProps {
  onBack: () => void;
  isDarkMode: boolean;
}

const MobileSales: React.FC<MobileSalesProps> = ({ onBack, isDarkMode }) => {
  const [steps, setSteps] = useState<MobileSalesStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

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
    stepBg: isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50',
    stepBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    buttonSecondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    progressBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
  };

  useEffect(() => {
    const mobileSalesSteps: MobileSalesStep[] = [
      {
        id: '1',
        title: 'Build Rapport & Discovery',
        verbatim: "I see you're an Xfinity customer - that's fantastic! Before we wrap up today, I'd love to help you save even more money. Can I ask, who do you currently use for your mobile service?",
        icon: Heart,
        completed: false,
        category: 'discovery',
        tips: 'Use their name frequently. Mirror their communication style. Show genuine interest in helping them save money.'
      },
      {
        id: '2',
        title: 'Pain Point Amplification',
        verbatim: "And how much are you paying monthly for that service? *[Listen to amount]* Wow, that's quite a bit! Are you happy with the coverage and speed you're getting for that price? Have you ever experienced dropped calls or slow data?",
        icon: Target,
        completed: false,
        category: 'discovery',
        tips: 'Let them talk about frustrations. Use silence after asking about problems - people will fill the silence with complaints.'
      },
      {
        id: '3',
        title: 'Social Proof & Authority',
        verbatim: "You know, I've helped hundreds of customers just like you switch to Xfinity Mobile, and they're saving an average of $300-600 per year. We use Verizon's network - the same towers, same coverage - but at a fraction of the cost.",
        icon: Users,
        completed: false,
        category: 'presentation',
        tips: 'Use specific numbers and statistics. Mention Verizon by name for credibility. Reference other customers for social proof.'
      },
      {
        id: '4',
        title: 'Scarcity & Urgency Creation',
        verbatim: "Here's what makes this perfect timing - we have a limited-time promotion running this month where existing Xfinity customers get our best rates. This offer won't be available much longer, and I'd hate for you to miss out on these savings.",
        icon: Clock,
        completed: false,
        category: 'presentation',
        tips: 'Create time pressure. Use phrases like "limited-time" and "won\'t be available much longer" to trigger urgency.'
      },
      {
        id: '5',
        title: 'Number Portability Assurance',
        verbatim: "And the best part? You keep your exact same phone number. The process is completely seamless - we handle everything. Your friends and family won't even know you switched carriers. It typically takes just 24-48 hours.",
        icon: Smartphone,
        completed: false,
        category: 'presentation',
        tips: 'Address the biggest objection upfront. Use words like "seamless" and "we handle everything" to reduce perceived effort.'
      },
      {
        id: '6',
        title: 'Savings Calculation & Anchoring',
        verbatim: "Let me show you the savings. If you're paying $[their amount] now, with Xfinity Mobile you'd pay around $[lower amount] - that's $[difference] less every single month. Over a year, that's $[yearly savings] back in your pocket. What would you do with an extra $[yearly savings]?",
        icon: DollarSign,
        completed: false,
        category: 'presentation',
        tips: 'Use their exact numbers. Make them visualize what they could do with the savings. Ask engaging questions about the money.'
      },
      {
        id: '7',
        title: 'Risk Reversal & Guarantee',
        verbatim: "I'm so confident you'll love the service that if for any reason you're not completely satisfied in the first 30 days, we can switch you back with no penalties. You literally have nothing to lose and hundreds of dollars to save.",
        icon: Shield,
        completed: false,
        category: 'presentation',
        tips: 'Remove all perceived risk. Use phrases like "nothing to lose" and "completely satisfied" to build confidence.'
      },
      {
        id: '8',
        title: 'Assumptive Close',
        verbatim: "Based on everything we've discussed, this seems like a perfect fit for you. The savings are substantial, you keep your number, and you get better service. Should we get you set up with 1 line or do you have multiple lines to switch?",
        icon: CheckCircle2,
        completed: false,
        category: 'closing',
        tips: 'Assume the sale. Give them choices between yes and yes (1 line vs multiple lines). Don\'t ask if they want it.'
      },
      {
        id: '9',
        title: 'Objection Handling',
        verbatim: "I understand you might want to think about it - that's completely normal. But let me ask you this: if you could save $[yearly amount] this year while getting the same or better service, what exactly would you need to think about? The promotion ends soon, and I'd hate for you to pay more than necessary.",
        icon: Brain,
        completed: false,
        category: 'closing',
        tips: 'Acknowledge their hesitation, then redirect with a question. Create urgency and make staying with current provider seem illogical.'
      },
      {
        id: '10',
        title: 'Final Close & Commitment',
        verbatim: "Perfect! I'm going to get you set up right now while I have you on the line. This will only take a few minutes, and you'll start saving immediately. Can you confirm the phone number you'd like to keep? And I'll need to verify your account for security.",
        icon: Award,
        completed: false,
        category: 'closing',
        tips: 'Take immediate action. Use phrases like "right now" and "while I have you" to prevent them from changing their mind.'
      }
    ];

    // Load saved progress
    const savedProgress = localStorage.getItem('xfinity-mobile-sales-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setSteps(mobileSalesSteps.map(step => ({
        ...step,
        completed: progress.includes(step.id)
      })));
    } else {
      setSteps(mobileSalesSteps);
    }

    // Track mobile sales attempts
    const attempts = JSON.parse(localStorage.getItem('xfinity-mobile-sales-history') || '[]');
    attempts.push({
      date: new Date().toISOString(),
      sessionId: Date.now().toString()
    });
    localStorage.setItem('xfinity-mobile-sales-history', JSON.stringify(attempts));
  }, []);

  const toggleStep = (stepId: string) => {
    setSteps(prev => {
      const updated = prev.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      );
      
      // Save progress
      const completedIds = updated.filter(step => step.completed).map(step => step.id);
      localStorage.setItem('xfinity-mobile-sales-progress', JSON.stringify(completedIds));
      
      return updated;
    });
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discovery':
        return <Target className="w-5 h-5 text-blue-500" />;
      case 'presentation':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'closing':
        return <Zap className="w-5 h-5 text-emerald-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'discovery':
        return 'Discovery Phase';
      case 'presentation':
        return 'Presentation Phase';
      case 'closing':
        return 'Closing Phase';
      default:
        return category;
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setSteps(prev => prev.map(step => ({ ...step, completed: false })));
      localStorage.removeItem('xfinity-mobile-sales-progress');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Floating Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Mobile Sales Progress:</span>
              <div className={`flex-1 h-2 rounded-full ${themeClasses.progressBg} min-w-48`}>
                <div 
                  className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${progressPercentage === 100 ? 'text-emerald-400' : themeClasses.text}`}>
                {progressPercentage === 100 ? 'Sale Complete! 🎉' : `${Math.round(progressPercentage)}% (${completedSteps}/${steps.length})`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`pt-16 shadow-xl transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Xfinity Mobile Sales Process</h1>
                <p className={`text-lg ${themeClasses.textSecondary}`}>Advanced persuasion techniques for mobile conversions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={resetProgress}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                Reset Progress
              </button>
              <button
                onClick={onBack}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg ${themeClasses.buttonSecondary}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Tracker</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sales Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className={`rounded-xl shadow-xl transition-all duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder} ${step.completed ? 'ring-2 ring-emerald-500' : ''}`}>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Step Number & Checkbox */}
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                      step.completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                    </div>
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        step.completed 
                          ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <step.icon className={`w-6 h-6 ${
                        step.category === 'discovery' ? 'text-blue-500' :
                        step.category === 'presentation' ? 'text-purple-500' :
                        'text-emerald-500'
                      }`} />
                      <h3 className={`text-xl font-semibold ${themeClasses.text}`}>{step.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        step.category === 'discovery' ? 'bg-blue-100 text-blue-800' :
                        step.category === 'presentation' ? 'bg-purple-100 text-purple-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {getCategoryTitle(step.category)}
                      </span>
                    </div>

                    {/* Verbatim Script */}
                    <div className={`p-4 rounded-lg mb-4 ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-orange-500" />
                        <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Verbatim Script:</span>
                      </div>
                      <p className={`text-base leading-relaxed ${themeClasses.text} italic`}>
                        "{step.verbatim}"
                      </p>
                    </div>

                    {/* Pro Tips */}
                    {step.tips && (
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-yellow-900/20 border-yellow-700/30' : 'bg-yellow-50 border-yellow-200'} border`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Influence Technique:</span>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                          {step.tips}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Summary */}
        {progressPercentage === 100 && (
          <div className={`mt-8 rounded-xl shadow-xl p-8 text-center transition-colors duration-300 ${themeClasses.cardBg} border-2 border-emerald-500`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-500 rounded-full">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className={`text-2xl font-bold text-emerald-400 mb-2`}>Mobile Sales Process Complete!</h3>
            <p className={`text-lg ${themeClasses.textSecondary} mb-4`}>
              You've successfully completed all 10 steps of the Xfinity Mobile sales process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className={`p-4 rounded-lg ${themeClasses.stepBg}`}>
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className={`text-sm font-medium ${themeClasses.text}`}>Discovery Complete</p>
                <p className={`text-xs ${themeClasses.textMuted}`}>Customer needs identified</p>
              </div>
              <div className={`p-4 rounded-lg ${themeClasses.stepBg}`}>
                <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className={`text-sm font-medium ${themeClasses.text}`}>Presentation Delivered</p>
                <p className={`text-xs ${themeClasses.textMuted}`}>Value proposition presented</p>
              </div>
              <div className={`p-4 rounded-lg ${themeClasses.stepBg}`}>
                <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className={`text-sm font-medium ${themeClasses.text}`}>Closing Executed</p>
                <p className={`text-xs ${themeClasses.textMuted}`}>Sale successfully closed</p>
              </div>
            </div>
          </div>
        )}

        {/* Psychological Techniques Summary */}
        <div className={`mt-8 rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-6 h-6 text-orange-500" />
            <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Psychological Influence Techniques Used</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-blue-400 mb-2`}>Social Proof</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>Reference other customers and statistics to build credibility</p>
            </div>
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-purple-400 mb-2`}>Scarcity & Urgency</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>Limited-time offers create pressure to act now</p>
            </div>
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-emerald-400 mb-2`}>Risk Reversal</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>30-day guarantee removes perceived risk</p>
            </div>
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-yellow-400 mb-2`}>Anchoring</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>Use their current high bill as comparison point</p>
            </div>
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-red-400 mb-2`}>Pain Amplification</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>Highlight problems with current service</p>
            </div>
            <div className={`p-4 rounded-lg ${themeClasses.stepBg} border ${themeClasses.stepBorder}`}>
              <h4 className={`font-semibold text-indigo-400 mb-2`}>Assumptive Close</h4>
              <p className={`text-sm ${themeClasses.textMuted}`}>Assume the sale and offer choices between yes and yes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSales;