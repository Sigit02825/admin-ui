import React, {useContext, useEffect, useState } from 'react'
import MainLayout from '../components/Layouts/MainLayout'
import Card from '../components/Elements/Card'
import CardBalance from '../components/Fragments/CardBalance'
import CardGoal from '../components/Fragments/CardGoal'
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill'
import CardRecentTransaction from '../components/Fragments/CardRecentTransaction'
import CardStatistic from '../components/Fragments/CardStatistic'
import CardExpenseBreakdown from '../components/Fragments/CardExpenseBreakdown'
import {
  transactions,
  expensesBreakdowns,
  balances,
  expensesStatistics,
} from '../data';
import Icon from "../components/Elements/Icon";
import { billsService, goalService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Elements/AppSnackbar';

function dashboard() {
  	const [goals, setGoals] = useState({});
    const [bills, setBills] = useState([]);
    const [billsLoading, setBillsLoading] = useState(true);
    const { logout } = useContext(AuthContext);

    	const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data goals",
        severity: "error",
      });
      if (err.status === 401) {
        logout();
      }
    }
  };

  const normalizeBills = (payload) => {
    const rawBills = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.bills)
          ? payload.bills
          : [];

    return rawBills.map((item, index) => {
      const dateValue = item?.date || item?.due_date || item?.bill_date || "";
      const parsedDate = dateValue ? new Date(dateValue) : null;
      const isValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());
      const itemDate = isValidDate ? String(parsedDate.getDate()) : item?.date || "--";
      const itemMonth = isValidDate
        ? parsedDate.toLocaleDateString("en-US", { month: "short" })
        : item?.month || "-";

      return {
        id: item?.id ?? `bill-${index}`,
        name: item?.name || item?.title || item?.bill_name || "Upcoming Bill",
        month: itemMonth,
        date: itemDate,
        lastCharge:
          item?.lastCharge ||
          item?.last_charge ||
          item?.date ||
          item?.due_date ||
          "-",
        amount: Number(item?.amount ?? item?.nominal ?? item?.total ?? 0),
        icon: <Icon.Bill />,
      };
    });
  };

  const fetchBills = async () => {
    try {
      const data = await billsService();
      setBills(normalizeBills(data));
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.msg || "Gagal mengambil data bills",
        severity: "error",
      });

      if (err.status === 401) {
        logout();
      }
    } finally {
      setBillsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchBills();
  }, []);
  
  console.log(goals);
  return (
    <>
      <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills} loading={billsLoading} />            
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>
        				<AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </MainLayout>
    </>
  )
}

export default dashboard
