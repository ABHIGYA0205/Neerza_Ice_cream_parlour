/**
 * Format price in INR
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate discounted price
 */
export function getDiscountedPrice(price, discount) {
  if (!discount || discount === 0) return price;
  return Math.round(price * (1 - discount / 100));
}

/**
 * Get stock status label and color
 */
export function getStockStatus(stock, availability) {
  if (!availability || stock === 0) {
    return { label: 'Out of Stock', color: 'danger', className: 'badge-out-of-stock' };
  }
  if (stock <= 5) {
    return { label: `Only ${stock} left`, color: 'warning', className: 'badge-low-stock' };
  }
  return { label: 'In Stock', color: 'success', className: 'badge-in-stock' };
}

/**
 * Truncate text
 */
export function truncate(str, length = 50) {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Generate unique session ID
 */
export function getSessionId() {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}
