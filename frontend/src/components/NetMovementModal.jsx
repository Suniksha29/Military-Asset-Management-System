import React, { useState } from 'react';
import { X, ShoppingCart, ArrowDownLeft, ArrowUpRight, Calculator } from 'lucide-react';

const NetMovementModal = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState('purchases');

  if (!isOpen || !data) return null;

  const purchases = data.purchases || [];
  const transfersIn = data.transfersIn || [];
  const transfersOut = data.transfersOut || [];

  const purchasesCount = data.totalPurchasesCount || 0;
  const inCount = data.totalTransfersInCount || 0;
  const outCount = data.totalTransfersOutCount || 0;
  const netCount = data.netMovementCount || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--modal-header-bg)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(37, 99, 235, 0.25)'
            }}>
              <Calculator size={18} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
                NET MOVEMENT DETAILED DRILLDOWN
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                AUDITED BREAKDOWN: PURCHASES + TRANSFERS IN - TRANSFERS OUT
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tactical Equation Summary Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--pill-bg)',
          borderBottom: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
        }}>
          <div style={{
            background: 'rgba(5, 150, 105, 0.08)',
            border: '1px solid rgba(5, 150, 105, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>(+) TOTAL PURCHASES</div>
            <div style={{ fontSize: '1.25rem', color: '#059669', fontWeight: 800 }}>
              +{purchasesCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>(+) TRANSFERS IN</div>
            <div style={{ fontSize: '1.25rem', color: '#2563eb', fontWeight: 800 }}>
              +{inCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>(-) TRANSFERS OUT</div>
            <div style={{ fontSize: '1.25rem', color: '#dc2626', fontWeight: 800 }}>
              -{outCount.toLocaleString()}
            </div>
          </div>

          <div style={{
            background: 'rgba(217, 119, 6, 0.08)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            borderRadius: '6px',
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>(=) NET MOVEMENT</div>
            <div style={{ fontSize: '1.25rem', color: '#d97706', fontWeight: 800 }}>
              {netCount >= 0 ? `+${netCount.toLocaleString()}` : netCount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '14px 24px 0 24px',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <button
            onClick={() => setActiveTab('purchases')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: activeTab === 'purchases' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'purchases' ? '2px solid #059669' : '2px solid transparent',
              color: activeTab === 'purchases' ? '#059669' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <ShoppingCart size={15} /> Purchases ({purchases.length})
          </button>

          <button
            onClick={() => setActiveTab('transfersIn')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: activeTab === 'transfersIn' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'transfersIn' ? '2px solid #2563eb' : '2px solid transparent',
              color: activeTab === 'transfersIn' ? '#2563eb' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <ArrowDownLeft size={15} /> Transfers In ({transfersIn.length})
          </button>

          <button
            onClick={() => setActiveTab('transfersOut')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: activeTab === 'transfersOut' ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'transfersOut' ? '2px solid #dc2626' : '2px solid transparent',
              color: activeTab === 'transfersOut' ? '#dc2626' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <ArrowUpRight size={15} /> Transfers Out ({transfersOut.length})
          </button>
        </div>

        {/* Tab Content Tables */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', maxHeight: '420px' }}>
          {activeTab === 'purchases' && (
            purchases.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                No purchase records found for selected period and base.
              </div>
            ) : (
              <table className="mams-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Base</th>
                    <th>Asset Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p) => (
                    <tr key={p.id || p.poNumber}>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#2563eb' }}>{p.purchaseOrderNumber || p.poNumber}</td>
                      <td>{p.baseName}</td>
                      <td style={{ fontWeight: 600 }}>{p.assetName}</td>
                      <td><span className="badge-tactical badge-logistics">{p.categoryName}</span></td>
                      <td style={{ fontWeight: 700, color: '#059669' }}>+{p.quantity}</td>
                      <td className="font-mono">₹{p.unitCost?.toLocaleString()}</td>
                      <td className="font-mono" style={{ fontWeight: 700 }}>₹{p.totalCost?.toLocaleString()}</td>
                      <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {p.purchaseDate ? new Date(p.purchaseDate).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activeTab === 'transfersIn' && (
            transfersIn.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                No inbound transfer records found for selected period.
              </div>
            ) : (
              <table className="mams-table">
                <thead>
                  <tr>
                    <th>Transfer ID</th>
                    <th>Source Base</th>
                    <th>Destination Base</th>
                    <th>Asset Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transfersIn.map((t) => (
                    <tr key={t.id || t.transferNumber}>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#2563eb' }}>{t.transferNumber}</td>
                      <td>{t.sourceBaseName}</td>
                      <td style={{ fontWeight: 600 }}>{t.destinationBaseName}</td>
                      <td>{t.assetName}</td>
                      <td style={{ fontWeight: 700, color: '#2563eb' }}>+{t.quantity}</td>
                      <td><span className="badge-tactical badge-active">{t.status}</span></td>
                      <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {t.dispatchedAt ? new Date(t.dispatchedAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activeTab === 'transfersOut' && (
            transfersOut.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '0.88rem' }}>
                No outbound transfer records found for selected period.
              </div>
            ) : (
              <table className="mams-table">
                <thead>
                  <tr>
                    <th>Transfer ID</th>
                    <th>Source Base</th>
                    <th>Destination Base</th>
                    <th>Asset Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transfersOut.map((t) => (
                    <tr key={t.id || t.transferNumber}>
                      <td className="font-mono" style={{ fontWeight: 700, color: '#dc2626' }}>{t.transferNumber}</td>
                      <td style={{ fontWeight: 600 }}>{t.sourceBaseName}</td>
                      <td>{t.destinationBaseName}</td>
                      <td>{t.assetName}</td>
                      <td style={{ fontWeight: 700, color: '#dc2626' }}>-{t.quantity}</td>
                      <td><span className="badge-tactical badge-commander">{t.status}</span></td>
                      <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                        {t.dispatchedAt ? new Date(t.dispatchedAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NetMovementModal;
