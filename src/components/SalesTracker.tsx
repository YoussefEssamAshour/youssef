import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  Phone, 
  User, 
  Hash, 
  Calendar, 
  DollarSign,
  CheckCircle2,
  Clock,
  PhoneCall,
  XCircle,
  Save,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { SaleRecord } from '../types';

interface SalesTrackerProps {
  onBack: () => void;
  isDarkMode: boolean;
  isDarkMode: boolean;
}

const SalesTracker: React.FC<SalesTrackerProps> = ({ onBack, isDarkMode }) => {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSale, setEditingSale] = useState<SaleRecord | null>(null);
  const [newSale, setNewSale] = useState<Partial<SaleRecord>>({
    accountNumber: '',
    customerName: '',
    callbackNumber: '',
    status: 'pending',
    notes: '',
    saleAmount: 0,
    product: ''
  });

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
    tableBg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    tableHover: isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50',
    tableDivider: isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
  };

  // Load sales from localStorage on component mount
  useEffect(() => {
    const savedSales = localStorage.getItem('xfinity-sales');
    if (savedSales) {
      const parsedSales = JSON.parse(savedSales).map((sale: any) => ({
        ...sale,
        dateCreated: new Date(sale.dateCreated),
        lastUpdated: new Date(sale.lastUpdated)
      }));
      setSales(parsedSales);
    }
  }, []);

  // Save sales to localStorage whenever sales change
  useEffect(() => {
    localStorage.setItem('xfinity-sales', JSON.stringify(sales));
  }, [sales]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activated':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'callback':
        return <PhoneCall className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activated':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'callback':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddSale = () => {
    if (!newSale.accountNumber || !newSale.customerName || !newSale.callbackNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const sale: SaleRecord = {
      id: Date.now().toString(),
      accountNumber: newSale.accountNumber!,
      customerName: newSale.customerName!,
      callbackNumber: newSale.callbackNumber!,
      status: newSale.status as any || 'pending',
      dateCreated: new Date(),
      lastUpdated: new Date(),
      notes: newSale.notes || '',
      saleAmount: newSale.saleAmount || 0,
      product: newSale.product || ''
    };

    setSales(prev => [sale, ...prev]);
    setNewSale({
      accountNumber: '',
      customerName: '',
      callbackNumber: '',
      status: 'pending',
      notes: '',
      saleAmount: 0,
      product: ''
    });
    setShowAddModal(false);
  };

  const handleEditSale = (sale: SaleRecord) => {
    setEditingSale(sale);
    setNewSale({
      accountNumber: sale.accountNumber,
      customerName: sale.customerName,
      callbackNumber: sale.callbackNumber,
      status: sale.status,
      notes: sale.notes || '',
      saleAmount: sale.saleAmount || 0,
      product: sale.product || ''
    });
    setShowAddModal(true);
  };

  const handleUpdateSale = () => {
    if (!editingSale || !newSale.accountNumber || !newSale.customerName || !newSale.callbackNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setSales(prev => prev.map(sale => 
      sale.id === editingSale.id 
        ? {
            ...sale,
            accountNumber: newSale.accountNumber!,
            customerName: newSale.customerName!,
            callbackNumber: newSale.callbackNumber!,
            status: newSale.status as any || 'pending',
            lastUpdated: new Date(),
            notes: newSale.notes || '',
            saleAmount: newSale.saleAmount || 0,
            product: newSale.product || ''
          }
        : sale
    ));

    setEditingSale(null);
    setNewSale({
      accountNumber: '',
      customerName: '',
      callbackNumber: '',
      status: 'pending',
      notes: '',
      saleAmount: 0,
      product: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteSale = (id: string) => {
    if (confirm('Are you sure you want to delete this sale record?')) {
      setSales(prev => prev.filter(sale => sale.id !== id));
    }
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.callbackNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Account Number', 'Customer Name', 'Callback Number', 'Status', 'Date Created', 'Product', 'Sale Amount', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredSales.map(sale => [
        sale.accountNumber,
        `"${sale.customerName}"`,
        sale.callbackNumber,
        sale.status,
        sale.dateCreated.toLocaleDateString(),
        `"${sale.product || ''}"`,
        sale.saleAmount || 0,
        `"${sale.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xfinity-sales-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statusCounts = {
    all: sales.length,
    pending: sales.filter(s => s.status === 'pending').length,
    callback: sales.filter(s => s.status === 'callback').length,
    activated: sales.filter(s => s.status === 'activated').length,
    cancelled: sales.filter(s => s.status === 'cancelled').length
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Header */}
      <header className={`shadow-xl transition-colors duration-300 ${themeClasses.headerBg} border-b ${themeClasses.headerBorder}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600 rounded-lg shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.text}`}>Sales Tracker</h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Manage your Xfinity sales records</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg ${themeClasses.buttonSecondary}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tracker</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Total Sales</p>
                <p className={`text-2xl font-bold ${themeClasses.text}`}>{statusCounts.all}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{statusCounts.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Callbacks</p>
                <p className="text-2xl font-bold text-blue-400">{statusCounts.callback}</p>
              </div>
              <PhoneCall className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Activated</p>
                <p className="text-2xl font-bold text-emerald-400">{statusCounts.activated}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          
          <div className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textMuted}`}>Cancelled</p>
                <p className="text-2xl font-bold text-red-400">{statusCounts.cancelled}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`rounded-xl shadow-xl p-6 mb-8 transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
              
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textMuted}`} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`pl-10 pr-8 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="callback">Callback</option>
                  <option value="activated">Activated</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Sale</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className={`rounded-xl shadow-xl overflow-hidden transition-colors duration-300 ${themeClasses.cardBg} border ${themeClasses.cardBorder}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={themeClasses.tableBg}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Customer</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Account</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Phone</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Status</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Product</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Amount</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Date</th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`${themeClasses.tableDivider} divide-y`}>
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={`px-6 py-12 text-center ${themeClasses.textMuted}`}>
                      <DollarSign className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      <p className="text-lg font-medium">No sales records found</p>
                      <p className="text-sm">Add your first sale to get started</p>
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => (
                    <tr key={sale.id} className={`transition-colors duration-200 ${themeClasses.tableHover}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600 rounded-full p-2">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${themeClasses.text}`}>{sale.customerName}</p>
                            {sale.notes && (
                              <p className={`text-xs truncate max-w-32 ${themeClasses.textMuted}`}>{sale.notes}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Hash className={`w-4 h-4 ${themeClasses.textMuted}`} />
                          <span className={`text-sm font-mono ${themeClasses.textSecondary}`}>{sale.accountNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Phone className={`w-4 h-4 ${themeClasses.textMuted}`} />
                          <span className={`text-sm ${themeClasses.textSecondary}`}>{sale.callbackNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sale.status)}`}>
                          {getStatusIcon(sale.status)}
                          <span className="capitalize">{sale.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${themeClasses.textSecondary}`}>{sale.product || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-emerald-400">
                          {sale.saleAmount ? `$${sale.saleAmount.toFixed(2)}` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className={`w-4 h-4 ${themeClasses.textMuted}`} />
                          <span className={`text-sm ${themeClasses.textSecondary}`}>{sale.dateCreated.toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditSale(sale)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSale(sale.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Sale Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${themeClasses.modalBg} border ${themeClasses.modalBorder}`}>
            <div className={`p-6 border-b ${themeClasses.cardBorder}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
                  {editingSale ? 'Edit Sale Record' : 'Add New Sale'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSale(null);
                    setNewSale({
                      accountNumber: '',
                      customerName: '',
                      callbackNumber: '',
                      status: 'pending',
                      notes: '',
                      saleAmount: 0,
                      product: ''
                    });
                  }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${themeClasses.textMuted} hover:${themeClasses.text} hover:${themeClasses.buttonSecondary}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={newSale.accountNumber || ''}
                    onChange={(e) => setNewSale(prev => ({ ...prev, accountNumber: e.target.value }))}
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
                    value={newSale.customerName || ''}
                    onChange={(e) => setNewSale(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Enter customer name"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                    Callback Number *
                  </label>
                  <input
                    type="tel"
                    value={newSale.callbackNumber || ''}
                    onChange={(e) => setNewSale(prev => ({ ...prev, callbackNumber: e.target.value }))}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                    Status
                  </label>
                  <select
                    value={newSale.status || 'pending'}
                    onChange={(e) => setNewSale(prev => ({ ...prev, status: e.target.value as any }))}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="callback">Callback</option>
                    <option value="activated">Activated</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                    Product/Service
                  </label>
                  <input
                    type="text"
                    value={newSale.product || ''}
                    onChange={(e) => setNewSale(prev => ({ ...prev, product: e.target.value }))}
                    placeholder="Enter product or service"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                    Sale Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newSale.saleAmount || ''}
                    onChange={(e) => setNewSale(prev => ({ ...prev, saleAmount: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary}`}>
                  Notes
                </label>
                <textarea
                  value={newSale.notes || ''}
                  onChange={(e) => setNewSale(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Enter any additional notes..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.inputText} ${themeClasses.inputPlaceholder}`}
                />
              </div>
            </div>
            
            <div className={`p-6 border-t flex justify-end space-x-3 ${themeClasses.cardBorder}`}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingSale(null);
                  setNewSale({
                    accountNumber: '',
                    customerName: '',
                    callbackNumber: '',
                    status: 'pending',
                    notes: '',
                    saleAmount: 0,
                    product: ''
                  });
                }}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${themeClasses.textSecondary} hover:${themeClasses.text} hover:${themeClasses.buttonSecondary}`}
              >
                Cancel
              </button>
              <button
                onClick={editingSale ? handleUpdateSale : handleAddSale}
                className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>{editingSale ? 'Update Sale' : 'Add Sale'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTracker;