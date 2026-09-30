import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ArrowLeftRight, 
  Users, 
  Package, 
  ShieldAlert, 
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const { isAdmin, isCommander } = useAuth();

  const navItems = [
    {
      to: '/',
      label: 'Operational Dashboard',
      icon: LayoutDashboard,
      badge: 'LIVE',
      show: true,
    },
    {
      to: '/purchases',
      label: 'Procurements & Purchases',
      icon: ShoppingCart,
      badge: null,
      show: true,
    },
    {
      to: '/transfers',
      label: 'Inter-Base Transfers',
      icon: ArrowLeftRight,
      badge: null,
      show: true,
    },
    {
      to: '/assignments-expenditures',
      label: 'Assignments & Expenditures',
      icon: Users,
      badge: null,
      show: true,
    },
    {
      to: '/inventory',
      label: 'Inventory Stock Ledger',
      icon: Package,
      badge: null,
      show: true,
    },
    {
      to: '/audit-logs',
      label: 'Audit Trail & Security Logs',
      icon: ShieldAlert,
      badge: 'SEC',
      show: isAdmin || isCommander,
    },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 64px)',
      padding: '20px 14px',
    }}>
      <div style={{ marginBottom: '16px', paddingLeft: '10px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.06em', fontWeight: 700, textTransform: 'uppercase' }}>
          NAVIGATION MODULES
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.filter(item => item.show).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '6px',
                color: isActive ? '#2563eb' : 'var(--text-muted)',
                background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
                transition: 'all 0.15s ease',
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={18} color={undefined} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: item.badge === 'LIVE' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(124, 58, 237, 0.1)',
                  color: item.badge === 'LIVE' ? '#059669' : '#7c3aed',
                  border: `1px solid ${item.badge === 'LIVE' ? 'rgba(5, 150, 105, 0.25)' : 'rgba(124, 58, 237, 0.25)'}`
                }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Clearance Box */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Activity size={14} color="#2563eb" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 700 }}>
            DEFENSE PROTOCOL
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.45, fontWeight: 400 }}>
          All dispatches, expenditures and stock movements are encrypted and logged in DoD-compliant audit stores.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
