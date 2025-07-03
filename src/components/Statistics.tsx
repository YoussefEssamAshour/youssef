import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Award, 
  Calendar,
  Users,
  Smartphone,
  PhoneCall,
  Star,
  AlertCircle,
  Activity,
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { CallStatistics } from '../types';

interface StatisticsProps {
  onBack: () => void;
  isDarkMode: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ onBack, isDarkMode }) => {
  const [statistics, setStatistics] = useState<CallStatistics | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

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
    buttonSecondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    progressBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    chartBg: isDarkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'
  };

  useEffect(() => {
    loadStatistics();
  }, [selectedTimeframe]);

  const loadStatistics = () => {
    // Load call history from localStorage
    const callHistory = JSON.parse(localStorage.getItem('xfinity-call-history') || '[]');
    const mobileSalesHistory = JSON.parse(localStorage.getItem('xfinity-mobile-sales-history') || '[]');
    const salesRecords = JSON.parse(localStorage.getItem('xfinity-sales') || '[]');

    // Calculate statistics
    const stats: CallStatistics = {
      totalCalls: callHistory.length,
      completedCalls: callHistory.filter((call: any) => call.completionRate === 100).length,
      averageCompletionRate: callHistory.length > 0 
        ? callHistory.reduce((sum: number, call: any) => sum + (call.completionRate || 0), 0) / callHistory.length 
        : 0,
      qualityAttributes: calculateQualityAttributes(callHistory),
      mobileSalesAttempts: mobileSalesHistory.length,
      categoryPerformance: calculateCategoryPerformance(callHistory),
      dailyStats: calculateDailyStats(callHistory, mobileSalesHistory),
      timeSpentOnCalls: calculateTimeSpent(callHistory),
      bestPerformingAttributes: getBestPerformingAttributes(callHistory),
      improvementAreas: getImprovementAreas(callHistory)
    };

    setStatistics(stats);
  };

  const calculateQualityAttributes = (callHistory: any[]) => {
    const attributes = {
      'Greeting': { used: 0, total: 0, percentage: 0 },
      'Context Tool': { used: 0, total: 0, percentage: 0 },
      'Apology': { used: 0, total: 0, percentage: 0 },
      'Empathy': { used: 0, total: 0, percentage: 0 },
      'Assurance': { used: 0, total: 0, percentage: 0 },
      'Rephrasing': { used: 0, total: 0, percentage: 0 },
      'Showing Value': { used: 0, total: 0, percentage: 0 },
      'Discovery': { used: 0, total: 0, percentage: 0 },
      'Rapport': { used: 0, total: 0, percentage: 0 },
      'Appreciation': { used: 0, total: 0, percentage: 0 },
      'Branding': { used: 0, total: 0, percentage: 0 },
      'Recap': { used: 0, total: 0, percentage: 0 },
      'Extra Assistance': { used: 0, total: 0, percentage: 0 },
      'Satisfaction': { used: 0, total: 0, percentage: 0 }
    };

    callHistory.forEach(call => {
      if (call.completedItems) {
        Object.keys(attributes).forEach(attr => {
          attributes[attr].total++;
          if (call.completedItems.includes(attr.toLowerCase().replace(/\s+/g, '-'))) {
            attributes[attr].used++;
          }
        });
      }
    });

    Object.keys(attributes).forEach(attr => {
      if (attributes[attr].total > 0) {
        attributes[attr].percentage = (attributes[attr].used / attributes[attr].total) * 100;
      }
    });

    return attributes;
  };

  const calculateCategoryPerformance = (callHistory: any[]) => {
    const categories = {
      'opening': { completed: 0, total: 0, percentage: 0 },
      'connection': { completed: 0, total: 0, percentage: 0 },
      'service': { completed: 0, total: 0, percentage: 0 },
      'closing': { completed: 0, total: 0, percentage: 0 }
    };

    callHistory.forEach(call => {
      if (call.categoryStats) {
        Object.keys(categories).forEach(category => {
          if (call.categoryStats[category]) {
            categories[category].total += call.categoryStats[category].total || 0;
            categories[category].completed += call.categoryStats[category].completed || 0;
          }
        });
      }
    });

    Object.keys(categories).forEach(category => {
      if (categories[category].total > 0) {
        categories[category].percentage = (categories[category].completed / categories[category].total) * 100;
      }
    });

    return categories;
  };

  const calculateDailyStats = (callHistory: any[], mobileSalesHistory: any[]) => {
    const dailyStats: any = {};
    
    callHistory.forEach(call => {
      const date = new Date(call.date).toDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = { calls: 0, completionRate: 0, mobileSalesAttempts: 0 };
      }
      dailyStats[date].calls++;
      dailyStats[date].completionRate += call.completionRate || 0;
    });

    mobileSalesHistory.forEach(attempt => {
      const date = new Date(attempt.date).toDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = { calls: 0, completionRate: 0, mobileSalesAttempts: 0 };
      }
      dailyStats[date].mobileSalesAttempts++;
    });

    Object.keys(dailyStats).forEach(date => {
      if (dailyStats[date].calls > 0) {
        dailyStats[date].completionRate = dailyStats[date].completionRate / dailyStats[date].calls;
      }
    });

    return dailyStats;
  };

  const calculateTimeSpent = (callHistory: any[]) => {
    return callHistory.reduce((total, call) => {
      return total + (call.duration || 15); // Default 15 minutes per call if not tracked
    }, 0);
  };

  const getBestPerformingAttributes = (callHistory: any[]) => {
    const attributeScores: any = {};
    
    callHistory.forEach(call => {
      if (call.completedItems) {
        call.completedItems.forEach((item: string) => {
          attributeScores[item] = (attributeScores[item] || 0) + 1;
        });
      }
    });

    return Object.entries(attributeScores)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([attr]) => attr);
  };

  const getImprovementAreas = (callHistory: any[]) => {
    const attributeScores: any = {};
    const totalCalls = callHistory.length;
    
    callHistory.forEach(call => {
      const allAttributes = ['greeting', 'context', 'apology', 'empathy', 'assurance', 'rephrasing', 'showing-value', 'discovery', 'rapport', 'appreciation', 'branding', 'recap', 'extra-assistance', 'satisfaction'];
      allAttributes.forEach(attr => {
        if (!attributeScores[attr]) attributeScores[attr] = 0;
        if (call.completedItems && call.completedItems.includes(attr)) {
          attributeScores[attr]++;
        }
      });
    });

    return Object.entries(attributeScores)
      .map(([attr, count]) => ({ attr, percentage: totalCalls > 0 ? ((count as number) / totalCalls) * 100 : 0 }))
      .filter(({ percentage }) => percentage < 70)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3)
      .map(({ attr }) => attr);
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 80) return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (percentage >= 60) return <Target className="w-4 h-4 text-yellow-400" />;
    return <TrendingDown className="w-4 h-4 text-red-400" />;
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

  if (!statistics) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${themeClasses.background}`}>
        <div className="text-center">
          <Activity className={`w-12 h-12 mx-auto mb-4 animate-pulse ${themeClasses.textMuted}`} />
          <p className={`text-lg ${themeClasses.text}`}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Header */}
      <header className={`shadow-xl transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Call Statistics & Analytics</h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Performance insights and quality metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText}`}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Total Calls</p>
                <p className={`text-3xl font-bold ${themeClasses.text}`}>{statistics.totalCalls}</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>
                  {statistics.completedCalls} completed
                </p>
              </div>
              <Phone className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Avg Completion</p>
                <p className={`text-3xl font-bold ${getPerformanceColor(statistics.averageCompletionRate)}`}>
                  {Math.round(statistics.averageCompletionRate)}%
                </p>
                <div className="flex items-center space-x-1">
                  {getPerformanceIcon(statistics.averageCompletionRate)}
                  <p className={`text-xs ${themeClasses.textSecondary}`}>Quality score</p>
                </div>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Mobile Sales</p>
                <p className={`text-3xl font-bold text-orange-400`}>{statistics.mobileSalesAttempts}</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>Attempts made</p>
              </div>
              <Smartphone className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Time Spent</p>
                <p className={`text-3xl font-bold text-purple-400`}>{Math.round(statistics.timeSpentOnCalls / 60)}h</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>
                  {statistics.timeSpentOnCalls % 60}m total
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Quality Attributes Performance */}
        <div className={`rounded-xl shadow-xl p-6 mb-8 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Quality Attributes Performance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(statistics.qualityAttributes).map(([attribute, data]) => (
              <div key={attribute} className={`p-4 rounded-lg ${themeClasses.chartBg} border ${themeClasses.cardBorder}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-medium ${themeClasses.text}`}>{attribute}</h3>
                  <span className={`text-sm font-bold ${getPerformanceColor(data.percentage)}`}>
                    {Math.round(data.percentage)}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${themeClasses.progressBg}`}>
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      data.percentage >= 80 ? 'bg-emerald-500' :
                      data.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className={themeClasses.textMuted}>{data.used} used</span>
                  <span className={themeClasses.textMuted}>{data.total} total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className={`rounded-xl shadow-xl p-6 mb-8 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex items-center space-x-3 mb-6">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Category Performance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(statistics.categoryPerformance).map(([category, data]) => (
              <div key={category} className={`p-4 rounded-lg ${themeClasses.chartBg} border ${themeClasses.cardBorder}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-medium ${themeClasses.text}`}>{getCategoryTitle(category)}</h3>
                  <span className={`text-sm font-bold ${getPerformanceColor(data.percentage)}`}>
                    {Math.round(data.percentage)}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-3 ${themeClasses.progressBg}`}>
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      data.percentage >= 80 ? 'bg-emerald-500' :
                      data.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className={themeClasses.textMuted}>{data.completed} completed</span>
                  <span className={themeClasses.textMuted}>{data.total} total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Best Performing Attributes */}
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-emerald-500" />
              <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Top Performing Attributes</h2>
            </div>
            
            {statistics.bestPerformingAttributes.length > 0 ? (
              <div className="space-y-4">
                {statistics.bestPerformingAttributes.map((attribute, index) => (
                  <div key={attribute} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`font-medium capitalize ${themeClasses.text}`}>
                      {attribute.replace(/-/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 ${themeClasses.textMuted}`}>
                No data available yet. Complete more calls to see insights.
              </p>
            )}
          </div>

          {/* Improvement Areas */}
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h2 className={`text-xl font-semibold ${themeClasses.text}`}>Areas for Improvement</h2>
            </div>
            
            {statistics.improvementAreas.length > 0 ? (
              <div className="space-y-4">
                {statistics.improvementAreas.map((area, index) => (
                  <div key={area} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      !
                    </div>
                    <span className={`font-medium capitalize ${themeClasses.text}`}>
                      {area.replace(/-/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-8 ${themeClasses.textMuted}`}>
                Great job! No major improvement areas identified.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;