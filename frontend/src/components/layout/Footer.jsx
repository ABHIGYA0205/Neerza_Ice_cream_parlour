import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4 text-gradient-blue" style={{ WebkitTextFillColor: 'unset', background: 'linear-gradient(135deg, #60A5FA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Neerza Amul Ice Cream Parlour
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your trusted destination for premium Amul ice creams and dairy products in Mansarovar, Jaipur. Authorized Amul outlet offering the freshest dairy products.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/neerzaamulicecream"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/918209524367"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/" className="text-slate-400 text-sm hover:text-primary-light transition-colors">Home</Link>
              <Link href="/products" className="text-slate-400 text-sm hover:text-primary-light transition-colors">All Products</Link>
              <Link href="/products?category=ice-creams" className="text-slate-400 text-sm hover:text-primary-light transition-colors">Ice Creams</Link>
              <Link href="/products?category=milk" className="text-slate-400 text-sm hover:text-primary-light transition-colors">Milk & Dairy</Link>
              <Link href="/cart" className="text-slate-400 text-sm hover:text-primary-light transition-colors">My Cart</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-white">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.google.com/maps/dir//Amul+ice+Cream+parlor+-+Mansarovar" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-slate-400 text-sm hover:text-white transition-colors">
                <MapPin size={16} className="shrink-0 mt-0.5 text-primary-light" />
                <span>Shop 69/396, Madhyam Marg, Mansarovar, Jaipur, Rajasthan 302020</span>
              </a>
              <a href="tel:+918209524367" className="flex items-center gap-2.5 text-slate-400 text-sm hover:text-white transition-colors">
                <Phone size={16} className="shrink-0 text-primary-light" />
                <span>+91 82095 24367</span>
              </a>
              <a href="mailto:neerzicecreamparlour@gmail.com" className="flex items-center gap-2.5 text-slate-400 text-sm hover:text-white transition-colors">
                <Mail size={16} className="shrink-0 text-primary-light" />
                <span>neerzicecreamparlour@gmail.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Clock size={16} className="shrink-0 text-primary-light" />
                <span>Open Daily: 9:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Neerza Amul Ice Cream Parlour. All rights reserved. Authorized Amul Outlet.
          </p>
        </div>
      </div>
    </footer>
  );
}
