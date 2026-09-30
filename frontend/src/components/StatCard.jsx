import React from 'react';
import { ChevronRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = 'blue', // 'blue', 'emerald', 'amber', 'rose', 'purple'
  interactive = false,
  badgeText = null,
  onClick = null,
}) => {
  const getAccentDetails = () => {
    switch (accentColor) {
      case 'emerald':
        return {
          color: '#059669',
          bgIcon: 'rgba(5, 150, 105, 0.1)',
          border: '#059669',
        };
      case 'amber':
        return {
          color: '#d97706',
          bgIcon: 'rgba(217, 119, 6, 0.1)',
          border: '#d97706',
        };
      case 'rose':
        return {
          color: '#dc2626',
          bgIcon: 'rgba(220, 38, 38, 0.1)',
          border: '#dc2626',
        };
      case 'purple':
        return {
          color: '#7c3aed',
          bgIcon: 'rgba(124, 58, 237, 0.1)',
          border: '#7c3aed',
        };
      default:
        return {
          color: '#2563eb',
          bgIcon: 'rgba(37, 99, 235, 0.1)',
          border: '#2563eb',
        };
    }
  };

  const accent = getAccentDetails();

  return (
    <div
      onClick={onClick}
      className={`glass-panel ${interactive ? 'glass-panel-interactive' : ''}`}
      style={{
        padding: '18px 20px',
        position: 'relative',
        borderLeft: `4px solid ${accent.border}`,
        cursor: interactive ? 'pointer' : 'default',
        background: 'var(--bg-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          {badgeText && (
            <span style={{
              marginLeft: '8px',
              fontSize: '0.65rem',
              padding: '2px 6px',
              borderRadius: '4px',
              background: accent.bgIcon,
              color: accent.color,
              fontWeight: 700
            }}>
              {badgeText}
            </span>
          )}
        </div>

        {Icon && (
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '6px',
            background: accent.bgIcon,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={18} color={accent.color} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {subtitle}
        </span>
        {interactive && (
          <span style={{
            fontSize: '0.72rem',
            color: accent.color,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 700
          }}>
            DRILLDOWN <ChevronRight size={13} />
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
