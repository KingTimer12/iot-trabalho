import { create } from 'zustand';

interface DashboardData {
  charts: {
    profitMonthData: { month: string; profit: number }[];
    unitsSoldMonthData: { month: string; units: number }[];
    typesData: { name: string; value: number }[];
  };
  cards: {
    title: string;
    value: number | string;
    prefix?: string;
    suffix?: string;
  }[];
  sellers?: {
    name: string;
    ativo: boolean;
    unitsSold: number;
    profit: number;
    toFinish: number;
  }[];
  target: string;
}

type DashboardState = {
  data?: DashboardData | null;
};

type DashboardActions = {
  setData: (data: DashboardData) => void;
};

type Dashboard = DashboardState & DashboardActions;

const useDashboard = create<Dashboard>((set) => ({
  data: {
    cards: [],
    charts: {
      profitMonthData: [],
      typesData: [],
      unitsSoldMonthData: [],
    },
    target: 'app-desktop',
  },
  setData: (data) => set({ data }),
}));

export { useDashboard, type DashboardData };
export default useDashboard;
