const STORE_PHONE = '918209524367';

/**
 * Generate a formatted WhatsApp order message from cart items
 */
export function generateOrderMessage(cartItems, customerName, customerPhone) {
  const lines = cartItems.map((item, index) => {
    const price = item.discount > 0
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    const total = price * item.qty;
    return `${index + 1}. ${item.name}${item.quantity ? ` (${item.quantity})` : ''} x ${item.qty} = ₹${total}`;
  });

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.discount > 0
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + price * item.qty;
  }, 0);

  const message = `Hello Neerza Amul Ice Cream Parlour,

I would like to place an order:

🛒 *Order Details*

${lines.join('\n')}

💰 *Total Amount: ₹${totalAmount}*

👤 Customer Name: ${customerName}
📱 Phone Number: ${customerPhone}

Thank you!
Please confirm product availability. 🙏`;

  return message;
}

/**
 * Open WhatsApp with pre-filled order message
 */
export function openWhatsAppOrder(cartItems, customerName, customerPhone) {
  const message = generateOrderMessage(cartItems, customerName, customerPhone);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_PHONE}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

/**
 * Open WhatsApp for general enquiry
 */
export function openWhatsAppChat(message = 'Hi! I have a query about your products.') {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_PHONE}?text=${encodedMessage}`;
  window.open(url, '_blank');
}
