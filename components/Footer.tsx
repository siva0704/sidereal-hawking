'use client';

import RevealText from './ui/RevealText';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <RevealText tag="h3" className="text-3xl font-extrabold text-white mb-6 tracking-tighter">SB INFRA <span className="text-gold">PROJECTS</span></RevealText>
            <RevealText tag="p" delay={0.2} className="text-gray-400 max-w-xs leading-relaxed">
              We create durable, well-engineered structures with predictable timelines and transparent costing.
            </RevealText>
          </div>

          {/* Services */}
          <div>
            <RevealText tag="h4" delay={0.1} className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Services</RevealText>
            <ul className="space-y-3">
              {['Structured Planning', 'Architectural Design', 'Consultancy', 'Construction'].map((item, i) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors block text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <RevealText tag="h4" delay={0.2} className="text-lg font-semibold text-gold mb-4">Contact Us</RevealText>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@sbinfraprojects.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Address: 11/12 Construction Avenue, Bangalore</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} SB Infra Projects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
