// Defining types for better type safety
export interface DataPoint {
    date: string;
    totalUsers: number;
    screenPageViews: number;
  }
  
export interface Metric {
    key: string;
    label: string;
    accessor: (d: DataPoint) => number;
    color: string;
    backgroundColor: string;
  }
  


export type AnalyticsContextType = {
  data: any;
  loading: boolean;
  error: any;
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
};

