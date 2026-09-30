import React from 'react';
import { Crosshair, Zap, ChevronRight, ShieldCheck } from 'lucide-react';

const HeroBanner = ({ onExploreNetMovement }) => {
  return (
    <div style={{
      position: 'relative',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '24px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-card)',
      padding: '24px 28px',
      background: 'var(--bg-hero-grad)',
      color: '#ffffff',
    }}>
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge-tactical" style={{
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={13} /> COMBAT READINESS & LOGISTICS COMMAND
          </span>
          <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
            DEFENSE STATUS: OPERATIONAL
          </span>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '6px', letterSpacing: '-0.01em' }}>
          STRATEGIC MILITARY ASSET MANAGEMENT & LEDGER
        </h1>

        <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px', maxWidth: '750px', fontWeight: 400 }}>
          Centralized monitoring of Opening Balances, Net Movements (Purchases + Transfers In - Transfers Out), Personnel Deployments, and Munitions Expenditures across military installations.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={onExploreNetMovement} className="btn-tactical btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Zap size={14} /> View Net Movement Formula Drilldown <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
