// src/components/Footer.tsx
import React from "react";
import { Link } from "@heroui/react";

export function Footer() {
  return (
    <footer className="bg-content1 border-t border-divider py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="font-bold text-2xl flex items-center gap-2">
            <span className="bg-primary text-primary-foreground p-1.5 rounded-xl text-lg font-extrabold">BN</span>
            BookNook
          </div>
          <p className="text-default-500 text-sm leading-relaxed">
            BookNook is your digital sanctuary for borrowing, exploring, and sharing your favorite literary masterpieces effortlessly.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" color="foreground" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/books" color="foreground" className="hover:text-primary transition-colors">All Books</Link></li>
            <li><Link href="/login" color="foreground" className="hover:text-primary transition-colors">Login</Link></li>
            <li><Link href="/signup" color="foreground" className="hover:text-primary transition-colors">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-foreground">Contact Info</h3>
          <ul className="space-y-2 text-sm text-default-500">
            <li>📍 123 Library Street, Bookville</li>
            <li>📧 support@booknook.dev</li>
            <li>📞 +880 1234-567890</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Us</h3>
          <p className="text-sm text-default-500 mb-4">Follow us on social media for new arrival updates and community events.</p>
          <div className="flex gap-4 text-default-600">
            {/* New X logo instead of old Twitter */}
            <Link href="https://twitter.com" target="_blank" color="foreground" className="hover:text-primary">
              𝕏
            </Link>
            <Link href="https://facebook.com" target="_blank" color="foreground" className="hover:text-primary">
              Facebook
            </Link>
            <Link href="https://github.com" target="_blank" color="foreground" className="hover:text-primary">
              GitHub
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-divider mt-8 pt-6 text-center text-xs text-default-400">
        &copy; 2026 BookNook. All rights reserved. Built with passion for readers.
      </div>
    </footer>
  );
}