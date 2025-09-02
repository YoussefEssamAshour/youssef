import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  MessageSquare, 
  Smartphone, 
  BarChart3,
  Sun,
  Moon,
  User,
  Hash,
  MessageCircle,
  Save,
  X
} from 'lucide-react';
import { CallItem, CallInfo, ViewType } from './types';
import ObjectionsGuide from './components/ObjectionsGuide';
import MobileSales from './components/MobileSales';
import SalesTracker from './components/SalesTracker';
import Statistics from './components/Statistics';

function App() {
  // All hooks must be called at the top level, in the same order every time
  const [currentView, setCurrentView] = useState<ViewType>('tracker');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [callItems, setCallItems] = useState<CallItem[]>([]);
  const [callInfo, setCallInfo] = useState<CallInfo>({
    accountNumber: '',
    customerName: '',
    phoneNumber: '',
    comments: ''
  });
  const [showCallInfo, setShowCallInfo] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('xfinity-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('xfinity-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Load call items
  useEffect(() => {
    const items: CallItem[] = [
      {
        id: '1',
        title: 'Greeting',
        verbatim: 'Thank you for calling Xfinity, my name is [Your Name], may I please have your first and last name?',
        icon: User,
        completed: false,
        category: 'opening'
      },
      {
        id: '2',
        title: 'Context Tool',
        verbatim: 'Thank you [Customer Name], and may I have your account number or the phone number associated with the account?',
        icon: Hash,
        completed: false,
        category: 'opening'
      },
      {
        id: '3',
        title: 'Apology',
        verbatim: 'I sincerely apologize for any inconvenience this may have caused you.',
        icon: MessageCircle,
        completed: false,
        category: 'connection'
      },
      {
        id: '4',
        title: 'Empathy',
        verbatim: 'I completely understand how frustrating this must be for you.',
        icon: MessageCircle,
        completed: false,
        category: 'connection'
      },
      {
        id: '5',
        title: 'Assurance',
        verbatim: 'I want to assure you that I am here to help resolve this issue for you today.',
        icon: CheckCircle2,
        completed: false,
        category: 'connection'
      },
      {
        id: '6',
        title: 'Rephrasing',
        verbatim: 'So if I understand correctly, you are experiencing [restate the issue in your own words].',
        icon: MessageSquare,
        completed: false,
        category: 'service'
      },
      {
        id: '7',
        title: 'Showing Value',
        verbatim: 'As a valued Xfinity customer, I want to make sure we get this resolved quickly and efficiently.',
        icon: CheckCircle2,
        completed: false,
        category: 'service'
      },
      {
        id: '8',
        title: 'Discovery',
        verbatim: 'Can you tell me a little bit more about what happened? When did you first notice this issue?',
        icon: MessageSquare,
        completed: false,
        category: 'service'
      },
      {
        id: '9',
        title: 'Rapport',
        verbatim: 'I really appreciate your patience while we work through this together.',
        icon: MessageCircle,
        completed: false,
        category: 'connection'
      },
      {
        id: '10',
        title: 'Appreciation',
        verbatim: 'Thank you so much for being a loyal Xfinity customer.',
        icon: CheckCircle2,
        completed: false,
        category: 'service'
      },
      {
        id: '11',
        title: 'Branding',
        verbatim: 'At Xfinity, we are committed to providing you with the best possible experience.',
        icon: CheckCircle2,
        completed: false,
        category: 'service'
      },
      {
        id: '12',
        title: 'Recap',
        verbatim: 'Let me recap what we accomplished today to make sure everything is clear.',
        icon: MessageSquare,
        completed: false,
        category: 'closing'
      },
      {
        id: '13',
        title: 'Extra Assistance',
        verbatim: 'Is there anything else I can help you with today?',
        icon: MessageSquare,
        completed: false,
        category: 'closing'
      },
      {
        id: '14',
        title: 'Satisfaction',
        verbatim: 'On a scale of 1-10, how would you rate the service you received today?',
        icon: CheckCircle2,
        completed: false,
        category: 'closing'
      }
    ];

    // Load saved progress
    const savedProgress = localStorage.getItem('xfinity-call-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCallItems(items.map(item => ({
        ...item,
        completed: progress.includes(item.id)
      })));
    } else {
      setCallItems(items);
    }
  }, []);

  const toggleItem = (itemId: string) => {
    setCallItems(prev => {
      const updated = prev.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      
      // Save progress
      const completedIds = updated.filter(item => item.completed).map(item => item.id);
      localStorage.setItem('xfinity-call-progress', JSON.stringify(completedIds));
      
      // Save call history for statistics
      const callHistory = JSON.parse(localStorage.getItem('xfinity-call-history') || '[]');
      const currentCall = {
        date: new Date().toISOString(),
        completedItems: completedIds,
        completionRate: (completedIds.length / updated.length) * 100,
        categoryStats: calculateCategoryStats(updated)
      };
      
      // Update or add current call
      const existingCallIndex = callHistory.findIndex((call: any) => 
        new Date(call.date).toDateString() === new Date().toDateString()
      );
      
      if (existingCallIndex >= 0) {
        callHistory[existingCallIndex] = currentCall;
      } else {
        callHistory.push(currentCall);
      }
      
      localStorage.setItem('xfinity-call-history', JSON.stringify(callHistory));
      
      return updated;
    });
  };

  const calculateCategoryStats = (items: CallItem[]) => {
    const categories = ['opening', 'connection', 'service', 'closing'];
    const stats: any = {};
    
    categories.forEach(category => {
      const categoryItems = items.filter(item => item.category === category);
      const completedCategoryItems = categoryItems.filter(item => item.completed);
      stats[category] = {
        total: categoryItems.length,
        completed: completedCategoryItems.length
      };
    });
    
    return stats;
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCallItems(prev => prev.map(item => ({ ...item, completed: false })));
      localStorage.removeItem('xfinity-call-progress');
    }
  };

  const saveCallInfo = () => {
    if (!callInfo.accountNumber || !callInfo.customerName || !callInfo.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save call info to localStorage
    localStorage.setItem('xfinity-current-call-info', JSON.stringify(callInfo));
    setShowCallInfo(false);
    alert('Call information saved successfully!');
  };

  const completedItems = callItems.filter(item => item.completed).length;
  const progressPercentage = callItems.length > 0 ? (completedItems / callItems.length) * 100 : 0;

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
    modalBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    modalBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    progressBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
  };

  // Conditional rendering based on current view
  if (currentView === 'objections') {
    return <ObjectionsGuide onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  if (currentView === 'sales') {
    return <MobileSales onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  if (currentView === 'salesTracker') {
    return <SalesTracker onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  if (currentView === 'statistics') {
    return <Statistics onBack={() => setCurrentView('tracker')} isDarkMode={isDarkMode} />;
  }

  // Main tracker view
  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
            : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
        }`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Floating Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Call Progress:</span>
              <div className={`flex-1 h-2 rounded-full ${themeClasses.progressBg} min-w-48`}>
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${progressPercentage === 100 ? 'text-emerald-400' : themeClasses.text}`}>
                {progressPercentage === 100 ? 'Call Complete! 🎉' : `${Math.round(progressPercentage)}% (${completedItems}/${callItems.length})`}
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
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Xfinity Call Tracker</h1>
                <p className={`text-lg ${themeClasses.textSecondary}`}>Professional call quality management system</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCallInfo(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Call Info</span>
              </button>
              <button
                onClick={resetProgress}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => setCurrentView('objections')}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-6 transition-transform duration-300"></div>
            <div className="relative flex flex-col items-center space-y-3">
              <MessageSquare className="w-8 h-8" />
              <span className="text-lg font-semibold">Objections Guide</span>
              <span className="text-sm opacity-90">Handle customer concerns</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('sales')}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-6 transition-transform duration-300"></div>
            <div className="relative flex flex-col items-center space-y-3">
              <Smartphone className="w-8 h-8" />
              <span className="text-lg font-semibold">Mobile Sales</span>
              <span className="text-sm opacity-90">Xfinity Mobile offers</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('salesTracker')}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-6 transition-transform duration-300"></div>
            <div className="relative flex flex-col items-center space-y-3">
              <CheckCircle2 className="w-8 h-8" />
              <span className="text-lg font-semibold">Sales Tracker</span>
              <span className="text-sm opacity-90">Track your sales</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('statistics')}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-6 transition-transform duration-300"></div>
            <div className="relative flex flex-col items-center space-y-3">
              <BarChart3 className="w-8 h-8" />
              <span className="text-lg font-semibold">Statistics</span>
              <span className="text-sm opacity-90">Performance analytics</span>
            </div>
          </button>
        </div>

        {/* Call Quality Checklist */}
        <div className={`rounded-xl shadow-xl transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className={`p-6 border-b ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Call Quality Checklist</h2>
              </div>
              <div className={`px-4 py-2 rounded-lg ${progressPercentage === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                <span className="font-medium">
                  {progressPercentage === 100 ? 'Perfect Call!' : `${completedItems}/${callItems.length} Complete`}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {callItems.map((item) => (
                <div
                  key={item.id}
                  className={`group p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    item.completed
                      ? `bg-emerald-50 border-emerald-200 ${isDarkMode ? 'bg-emerald-900/20 border-emerald-700' : ''}`
                      : `${themeClasses.cardBg} border-gray-200 hover:border-blue-300 ${isDarkMode ? 'border-gray-600 hover:border-blue-500' : ''}`
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      item.completed ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
                    } ${isDarkMode && !item.completed ? 'bg-gray-700 text-gray-300' : ''}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-semibold ${item.completed ? 'text-emerald-700' : themeClasses.text} ${isDarkMode && item.completed ? 'text-emerald-300' : ''}`}>
                          {item.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.category === 'opening' ? 'bg-blue-100 text-blue-800' :
                          item.category === 'connection' ? 'bg-purple-100 text-purple-800' :
                          item.category === 'service' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${item.completed ? 'text-emerald-600' : themeClasses.textSecondary} ${isDarkMode && item.completed ? 'text-emerald-400' : ''}`}>
                        {item.verbatim}
                      </p>
                    </div>
                    <div className={`p-2 rounded-full transition-all duration-200 ${
                      item.completed 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                    } ${isDarkMode ? (item.completed ? 'bg-emerald-900/30 text-emerald-400' : 'bg-gray-700 text-gray-400 group-hover:bg-blue-900/30 group-hover:text-blue-400') : ''}`}>
                      {item.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className={`mt-8 rounded-xl shadow-xl p-8 text-center transition-colors duration-300 ${themeClasses.cardBg} border-2 border-emerald-500`}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-500 rounded-full animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">Excellent Call Quality!</h3>
            <p className={`text-lg ${themeClasses.textSecondary}`}>
              You've completed all quality checkpoints for this call. Great job maintaining professional standards!
            </p>
          </div>
        )}
      </div>

      {/* Call Info Modal */}
      {showCallInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl shadow-2xl w-full max-w-md transition-colors duration-300 ${themeClasses.modalBg} border ${themeClasses.modalBorder}`}>
            <div className={`p-6 border-b ${themeClasses.cardBorder}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Call Information</h3>
                <button
                  onClick={() => setShowCallInfo(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${themeClasses.textMuted} hover:${themeClasses.text} hover:${themeClasses.buttonSecondary}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                  Account Number *
                </label>
                <input
                  type="text"
                  value={callInfo.accountNumber}
                  onChange={(e) => setCallInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                  placeholder="Enter account number"
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={callInfo.customerName}
                  onChange={(e) => setCallInfo(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Enter customer name"
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={callInfo.phoneNumber}
                  onChange={(e) => setCallInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                  Comments
                </label>
                <textarea
                  value={callInfo.comments}
                  onChange={(e) => setCallInfo(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Enter any additional comments..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
            </div>
            
            <div className={`p-6 border-t flex justify-end space-x-3 ${themeClasses.cardBorder}`}>
              <button
                onClick={() => setShowCallInfo(false)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${themeClasses.textSecondary} hover:${themeClasses.text} hover:${themeClasses.buttonSecondary}`}
              >
                Cancel
              </button>
              <button
                onClick={saveCallInfo}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Info</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;