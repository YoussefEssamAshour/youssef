export interface CallItem {
  id: string;
  title: string;
  verbatim: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  category: 'opening' | 'connection' | 'service' | 'closing';
}

export interface CallInfo {
  accountNumber: string;
  customerName: string;
  phoneNumber: string;
  comments: string;
}

export interface Objection {
  id: string;
  objection: string;
  solution: string;
  bgColor: string;
}

export interface MobileSalesStep {
  id: string;
  title: string;
  verbatim: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  category: 'discovery' | 'presentation' | 'closing';
  tips?: string;
}

export interface SaleRecord {
  id: string;
  accountNumber: string;
  customerName: string;
  callbackNumber: string;
  status: 'pending' | 'callback' | 'activated' | 'cancelled';
  dateCreated: Date;
  lastUpdated: Date;
  notes?: string;
  saleAmount?: number;
  product?: string;
}

export type ViewType = 'tracker' | 'objections' | 'sales';