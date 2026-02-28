import { fetchWithAuth, getApiUrl } from './api';

// ================================
// STOCK TRANSACTIONS
// ================================

export async function getAllStockTransactions() {
  const res = await fetchWithAuth('/stock/transactions');
  if (!res.ok) throw new Error('Failed to fetch stock transactions');
  return res.json();
}

export async function getStockTransactionById(id) {
  const res = await fetchWithAuth(`/stock/transactions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch stock transaction');
  return res.json();
}

export async function createStockTransaction(data) {
  const res = await fetchWithAuth('/stock/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create stock transaction');
  return res.json();
}

export async function updateStockTransaction(id, data) {
  const res = await fetchWithAuth(`/stock/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update stock transaction');
  return res.json();
}

export async function deleteStockTransaction(id) {
  const res = await fetchWithAuth(`/stock/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete stock transaction');
  return res.json();
}

export async function getStockByWarehouse(warehouse) {
  const res = await fetchWithAuth(`/stock/warehouse/${warehouse}`);
  if (!res.ok) throw new Error('Failed to fetch stock by warehouse');
  return res.json();
}

export async function getStockByItem(itemId) {
  const res = await fetchWithAuth(`/stock/item/${itemId}`);
  if (!res.ok) throw new Error('Failed to fetch stock by item');
  return res.json();
}

// ================================
// STOCK BATCHES
// ================================

export async function getAllStockBatches() {
  const res = await fetchWithAuth('/stock/batches');
  if (!res.ok) throw new Error('Failed to fetch stock batches');
  return res.json();
}

export async function getStockBatchById(id) {
  const res = await fetchWithAuth(`/stock/batches/${id}`);
  if (!res.ok) throw new Error('Failed to fetch stock batch');
  return res.json();
}

export async function createStockBatch(data) {
  const res = await fetchWithAuth('/stock/batches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create stock batch');
  return res.json();
}

export async function updateStockBatch(id, data) {
  const res = await fetchWithAuth(`/stock/batches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update stock batch');
  return res.json();
}

export async function deleteStockBatch(id) {
  const res = await fetchWithAuth(`/stock/batches/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete stock batch');
  return res.json();
}

// ================================
// STOCK IN/OUT
// ================================

export async function getAllStockInOut() {
  const res = await fetchWithAuth('/stock/in-out');
  if (!res.ok) throw new Error('Failed to fetch stock in/out records');
  return res.json();
}

export async function getStockInOutById(id) {
  const res = await fetchWithAuth(`/stock/in-out/${id}`);
  if (!res.ok) throw new Error('Failed to fetch stock in/out record');
  return res.json();
}

export async function createStockInOut(data) {
  const res = await fetchWithAuth('/stock/in-out', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create stock in/out record');
  return res.json();
}

export async function updateStockInOut(id, data) {
  const res = await fetchWithAuth(`/stock/in-out/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update stock in/out record');
  return res.json();
}

export async function deleteStockInOut(id) {
  const res = await fetchWithAuth(`/stock/in-out/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete stock in/out record');
  return res.json();
}

// ================================
// OPENING STOCK
// ================================

export async function getAllOpeningStock() {
  const res = await fetchWithAuth('/stock/opening');
  if (!res.ok) throw new Error('Failed to fetch opening stock records');
  return res.json();
}

export async function getOpeningStockById(id) {
  const res = await fetchWithAuth(`/stock/opening/${id}`);
  if (!res.ok) throw new Error('Failed to fetch opening stock record');
  return res.json();
}

export async function createOpeningStock(data) {
  const res = await fetchWithAuth('/stock/opening', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create opening stock record');
  return res.json();
}

export async function updateOpeningStock(id, data) {
  const res = await fetchWithAuth(`/stock/opening/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update opening stock record');
  return res.json();
}

export async function deleteOpeningStock(id) {
  const res = await fetchWithAuth(`/stock/opening/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete opening stock record');
  return res.json();
}

// ================================
// REAL-TIME STOCK
// ================================

export async function getAllRealTimeStock() {
  const res = await fetchWithAuth('/stock/real-time');
  if (!res.ok) throw new Error('Failed to fetch real-time stock records');
  return res.json();
}

export async function getRealTimeStockById(id) {
  const res = await fetchWithAuth(`/stock/real-time/${id}`);
  if (!res.ok) throw new Error('Failed to fetch real-time stock record');
  return res.json();
}

export async function createRealTimeStock(data) {
  const res = await fetchWithAuth('/stock/real-time', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create real-time stock record');
  return res.json();
}

export async function updateRealTimeStock(id, data) {
  const res = await fetchWithAuth(`/stock/real-time/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update real-time stock record');
  return res.json();
}

export async function deleteRealTimeStock(id) {
  const res = await fetchWithAuth(`/stock/real-time/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete real-time stock record');
  return res.json();
}

// ================================
// STOCK TRANSFERS
// ================================

export async function getAllStockTransfers() {
  const res = await fetchWithAuth('/stock/transfers');
  if (!res.ok) throw new Error('Failed to fetch stock transfers');
  return res.json();
}

export async function getStockTransferById(id) {
  const res = await fetchWithAuth(`/stock/transfers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch stock transfer');
  return res.json();
}

export async function createStockTransfer(data) {
  const res = await fetchWithAuth('/stock/transfers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create stock transfer');
  return res.json();
}

export async function updateStockTransfer(id, data) {
  const res = await fetchWithAuth(`/stock/transfers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update stock transfer');
  return res.json();
}

export async function deleteStockTransfer(id) {
  const res = await fetchWithAuth(`/stock/transfers/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete stock transfer');
  return res.json();
}
