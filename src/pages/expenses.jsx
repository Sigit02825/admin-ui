import { useContext, useEffect, useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "../components/Layouts/MainLayout";
import Card from "../components/Elements/Card";
import Icon from "../components/Elements/Icon";
import AppSnackbar from "../components/Elements/AppSnackbar";
import { expensesService } from "../services/dataService";
import { AuthContext } from "../context/authContext";

const categoryIcons = {
  housing: Icon.House,
  house: Icon.House,
  food: Icon.Food,
  transportation: Icon.Transport,
  transport: Icon.Transport,
  entertainment: Icon.Gamepad,
  movie: Icon.Movie,
  shopping: Icon.Shopping,
  other: Icon.Other,
  others: Icon.Other,
  bill: Icon.Bill,
};

const getExpenseList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.expenses)) {
    return payload.expenses;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
};

const getNestedItems = (item) =>
  item?.items || item?.details || item?.transactions || item?.expense_items || [];

const getItemAmount = (item) => Number(item?.amount ?? item?.nominal ?? item?.total ?? 0);

const getTotalAmount = (item) => {
  const directAmount = getItemAmount(item);

  if (directAmount > 0) {
    return directAmount;
  }

  const nestedItems = getNestedItems(item);

  if (nestedItems.length === 0) {
    return 0;
  }

  return nestedItems.reduce((total, current) => total + getItemAmount(current), 0);
};

const groupRawExpenses = (items) => {
  const grouped = new Map();

  items.forEach((item) => {
    const category = item?.category || item?.category_name || item?.name || "Others";
    const key = String(category).toLowerCase();
    const amount = getTotalAmount(item);
    const current = grouped.get(key) || {
      id: item?.id ?? key,
      category,
      amount: 0,
      percentage: Number(item?.percentage ?? item?.compare_percentage ?? 0),
      trend: item?.trend || item?.direction || "down",
    };

    current.amount += amount;
    grouped.set(key, current);
  });

  return Array.from(grouped.values());
};

const normalizeExpenses = (payload) => {
  const rawItems = getExpenseList(payload);

  if (rawItems.length === 0) {
    return [];
  }

  const hasNestedItems = rawItems.some(
    (item) =>
      Array.isArray(item?.items) ||
      Array.isArray(item?.details) ||
      Array.isArray(item?.transactions) ||
      Array.isArray(item?.expense_items)
  );

  if (!hasNestedItems) {
    return groupRawExpenses(rawItems);
  }

  return rawItems.map((item, index) => {
    return {
      id: item?.id ?? `${item?.category || item?.name || "expense"}-${index}`,
      category: item?.category || item?.category_name || item?.name || "Others",
      amount: getTotalAmount(item),
      percentage: Number(item?.percentage ?? item?.compare_percentage ?? item?.change ?? 0),
      trend:
        item?.trend ||
        item?.direction ||
        (Number(item?.percentage ?? item?.compare_percentage ?? item?.change ?? 0) >= 0
          ? "up"
          : "down"),
    };
  });
};

const getCategoryIcon = (category) => {
  const key = String(category || "others").toLowerCase();
  const SelectedIcon = categoryIcons[key] || Icon.Other;

  return <SelectedIcon />;
};

const renderTrendIcon = (category, trend, percentage) => {
  const key = String(category || "").toLowerCase();

  if (key === "housing" || key === "house") {
    return (
      <span className="text-special-red">
        <Icon.ArrowUp size={16} />
      </span>
    );
  }

  if (key === "food") {
    return (
      <span className="text-special-green">
        <Icon.ArrowDown size={16} />
      </span>
    );
  }

  const isUp = trend === "up" || Number(percentage) > 0;
  const TrendIcon = isUp ? Icon.ArrowUp : Icon.ArrowDown;

  return <TrendIcon size={16} color="#000000" />;
};

const mapBreakdownItems = (items) =>
  items.map((item) => ({
    id: item.id,
    category: item.category,
    amount: item.amount,
    percentage: Math.abs(item.percentage),
    icon: getCategoryIcon(item.category),
    arrow: renderTrendIcon(item.category, item.trend, item.percentage),
  }));

const expenseCardContent = (items) => (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
    {items.map((expense) => (
      <div key={expense.id} className="rounded-lg border border-gray-05 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="bg-special-bg rounded-lg p-3 text-gray-02">
              {expense.icon}
            </div>
            <div>
              <p className="text-sm text-gray-02">{expense.category}</p>
              <p className="text-2xl font-bold text-black">${expense.amount}</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-02">
            <div className="flex items-center justify-end gap-1">
              <span>{expense.percentage}%</span>
              {expense.arrow}
            </div>
            <p>Compare to last month</p>
          </div>
        </div>

        <div className="my-4 border-b border-gray-05"></div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-black">Expense Item</p>
          <p className="text-sm font-semibold text-gray-02">${expense.amount}</p>
        </div>
      </div>
    ))}
  </div>
);

function Expenses() {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expensesService();
        setExpenses(normalizeExpenses(data));
      } catch (err) {
        setSnackbar({
          open: true,
          message: err?.msg || "Gagal mengambil data expenses",
          severity: "error",
        });

        if (err?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [logout]);

  const breakdownItems = useMemo(() => mapBreakdownItems(expenses), [expenses]);
  const expenseContent = useMemo(() => {
    if (loading) {
      return (
        <div className="min-h-[420px] flex flex-col justify-center items-center gap-3 text-primary">
          <CircularProgress color="inherit" size={52} enableTrackSlot />
          <p className="text-sm font-medium">Loading Data</p>
        </div>
      );
    }

    if (breakdownItems.length === 0) {
      return (
        <div className="min-h-[240px] flex items-center justify-center text-gray-03">
          Belum ada data expenses dari backend.
        </div>
      );
    }

    return expenseCardContent(breakdownItems);
  }, [breakdownItems, loading]);

  return (
    <MainLayout>
      <Card title="Expenses Comparison" desc={expenseContent} />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </MainLayout>
  );
}

export default Expenses;
