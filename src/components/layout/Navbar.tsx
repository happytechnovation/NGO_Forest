import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '@/data';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  // Transparent only when over the hero (home, top of page) and not scrolled
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-surface/95 shadow-soft backdrop-blur' : 'bg-transparent',
      )}
    >
      <nav className="container-x flex h-20 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={site.logo}
            alt={site.brand}
            className={cn(
              'h-12 w-12 rounded-full object-contain transition',
              !solid && 'bg-white/90 p-0.5 shadow-soft',
            )}
          />
          <span
            className={cn(
              'font-display text-lg font-extrabold leading-none transition-colors',
              solid ? 'text-forest-800' : 'text-white drop-shadow',
            )}
          >
            {site.shortName}
            <span className="block text-[10px] font-medium tracking-wide text-leaf-500">
              FOUNDATION
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-leaf-600'
                      : solid
                        ? 'text-forest-700 hover:text-leaf-600'
                        : 'text-white/90 hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button to="/contact#contact-form" size="sm">
            Get in touch
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2 lg:hidden',
            solid ? 'text-forest-800' : 'text-white',
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-forest-100 bg-surface lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-base font-medium',
                        isActive ? 'bg-leaf-50 text-leaf-700' : 'text-forest-800 hover:bg-forest-50',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Button to="/contact#contact-form" className="w-full">
                  Get in touch
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
