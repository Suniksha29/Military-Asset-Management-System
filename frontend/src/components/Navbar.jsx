import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Radio, LogOut, Clock, ChevronDown, Sun, Moon } from 'lucide-react';
import militaryLogo from '../assets/military_logo.png';

const Navbar = () => {
  const { user, logout, isAdmin, isCommander } = useAuth();
  const [time, setTime] = useState(new Date().toUTCString().slice(17, 25) + ' UTC');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mams-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mams-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getRoleBadgeClass = () => {
    if (isAdmin) return 'badge-admin';
    if (isCommander) return 'badge-commander';
    return 'badge-logistics';
  };

  const formatRoleName = (role) => {
    if (role === 'ADMIN') return 'SUPREME ADMIN';
    if (role === 'BASE_COMMANDER') return 'BASE COMMANDER';
    if (role === 'LOGISTICS_OFFICER') return 'LOGISTICS OFFICER';
    return role;
  };

  return (
    <header style={{
      height: '64px',
      background: 'var(--header-bg)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      {/* Brand & System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            flexShrink: 0
          }}>
            <img 
              src={militaryLogo} 
              alt="MAMS Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
              MAMS <span style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>DEFENSE LOGISTICS</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.02em', fontWeight: 500 }}>
              Military Asset Management System
            </div>
          </div>
        </div>

        {/* Live Network & Clock Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'var(--pill-bg)',
          padding: '5px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          marginLeft: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="radar-pulse" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>
              SYSTEM ONLINE
            </span>
          </div>
          <div style={{ width: '1px', height: '12px', background: 'var(--border-color)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }} className="font-mono">
            <Clock size={13} color="#2563eb" />
            {time}
          </div>
        </div>
      </div>

      {/* Action Buttons & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Theme Switcher Toggle (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="btn-tactical btn-secondary"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{
            padding: '6px 12px',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {theme === 'light' ? (
            <>
              <Sun size={14} color="#d97706" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={14} color="#3b82f6" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Base Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--pill-bg)',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)'
        }}>
          <Radio size={14} color="#2563eb" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>
            {user?.baseName || 'Joint Armed Forces HQ'}
          </span>
        </div>

        {/* User Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-color)',
              padding: '5px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-main)',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={16} color="#2563eb" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {user?.fullName || user?.username}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span className={`badge-tactical ${getRoleBadgeClass()}`} style={{ padding: '1px 6px', fontSize: '0.62rem' }}>
                  {formatRoleName(user?.role)}
                </span>
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-dim)" />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              width: '220px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              padding: '12px',
              zIndex: 200,
            }}>
              <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Service ID</div>
                <div className="font-mono" style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: 700 }}>{user?.serviceNumber || 'DOD-HQ-001'}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>Rank</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>{user?.militaryRank}</div>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="btn-tactical btn-danger"
                style={{ width: '100%', padding: '7px', fontSize: '0.78rem' }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
