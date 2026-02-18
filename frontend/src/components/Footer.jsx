import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Digital Gram Panchayat</h3>
          <p className="text-sm leading-relaxed">
            Empowering citizens through transparent digital governance and direct communication with local authorities.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition">Village Development Plan</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Government Schemes (Yojana)</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Right to Information</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact Office</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2"><MapPin size={16} /> Panchayat Samiti, Ward No. 4</p>
            <p className="flex items-center gap-2"><Phone size={16} /> +91 222-333-4444</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@grampanchayat.in</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © 2026 Lok-Samvad Digital Initiative. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;