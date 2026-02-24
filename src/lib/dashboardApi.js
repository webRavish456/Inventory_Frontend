import { fetchWithAuth } from './api';

export async function fetchDashboardData() {
  const [items, lowStock, warehouses, salesOrders, purchaseOrders, invoices, expenses, income, categories] = await Promise.all([
    fetchWithAuth('/items').then(r => r.json()),
    fetchWithAuth('/item/low-stock').then(r => r.json()),
    fetchWithAuth('/warehouses').then(r => r.json()),
    fetchWithAuth('/sales/orders').then(r => r.json()),
    fetchWithAuth('/purchase/orders').then(r => r.json()),
    fetchWithAuth('/invoices').then(r => r.json()),
    fetchWithAuth('/finance/expenses').then(r => r.json()),
    fetchWithAuth('/finance/income').then(r => r.json()),
    fetchWithAuth('/categories').then(r => r.json()),
  ]);

  const getData = (res) => res?.data || [];

  return {
    items: getData(items),
    lowStockItems: getData(lowStock),
    warehouses: getData(warehouses),
    salesOrders: getData(salesOrders),
    purchaseOrders: getData(purchaseOrders),
    invoices: getData(invoices),
    expenses: getData(expenses),
    income: getData(income),
    categories: getData(categories),
  };
}
