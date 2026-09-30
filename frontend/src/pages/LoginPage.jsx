import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Key, Award, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import militaryLogo from '../assets/military_logo.png';

const LoginPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [militaryRank, setMilitaryRank] = useState('Captain');
  const [serviceNumber, setServiceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('LOGISTICS_OFFICER');
  const [baseId, setBaseId] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await register({
        username,
        password,
        fullName,
        militaryRank,
        serviceNumber: serviceNumber || `MIL-${Math.floor(1000 + Math.random() * 9000)}`,
        email,
        role,
        baseId: Number(baseId),
      });
      setSuccessMsg('Registration successful! You may now sign in with your military credentials.');
      setIsRegisterMode(false);
      setPassword('password123');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (userType) => {
    setError(null);
    setSuccessMsg(null);
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('password123');
    } else if (userType === 'commander_liberty') {
      setUsername('commander_liberty');
      setPassword('password123');
    } else if (userType === 'commander_pendleton') {
      setUsername('commander_pendleton');
      setPassword('password123');
    } else if (userType === 'logistics_liberty') {
      setUsername('logistics_liberty');
      setPassword('password123');
    } else if (userType === 'logistics_pendleton') {
      setUsername('logistics_pendleton');
      setPassword('password123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '24px',
      background: 'var(--bg-primary)',
    }}>
      {/* Main Authentication Container in Crisp Enterprise Theme */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '500px',
        width: '100%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '36px',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '10px',
            margin: '0 auto 12px auto',
            border: '1px solid #3b82f6',
            overflow: 'hidden',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={militaryLogo} 
              alt="MAMS Command Emblem" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span className="badge-tactical badge-commander" style={{ fontSize: '0.7rem' }}>
              <ShieldCheck size={12} /> SECURE COMMAND PORTAL
            </span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            MILITARY ASSET MANAGEMENT
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
            STRATEGIC DEFENSE LOGISTICS & INVENTORY LEDGER
          </p>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '6px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            fontSize: '0.82rem',
            marginBottom: '18px',
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '6px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            fontSize: '0.82rem',
            marginBottom: '18px',
          }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Demo Account Quick-Selection Pills */}
        <div style={{
          marginBottom: '20px',
          padding: '12px',
          background: 'var(--bg-primary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            SELECT DEMO MILITARY CLEARANCE ROLE:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setDemoCredentials('admin')}
              className={`badge-tactical ${username === 'admin' ? 'badge-admin' : ''}`}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
              General Hayes (ADMIN)
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('commander_liberty')}
              className={`badge-tactical ${username === 'commander_liberty' ? 'badge-commander' : ''}`}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
              Commander Liberty
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('logistics_liberty')}
              className={`badge-tactical ${username === 'logistics_liberty' ? 'badge-logistics' : ''}`}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
              Logistics Liberty
            </button>
          </div>
        </div>

        {/* Login / Register Form */}
        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          {!isRegisterMode ? (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Username</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter military username"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-tactical btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
              >
                {loading ? 'AUTHENTICATING...' : 'ACCESS COMMAND HUB'} <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Capt. Alex Miller"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label className="form-label">Military Rank</label>
                  <input
                    type="text"
                    className="form-input"
                    value={militaryRank}
                    onChange={(e) => setMilitaryRank(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@mams.mil"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label className="form-label">System Role</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="LOGISTICS_OFFICER">Logistics Officer</option>
                    <option value="BASE_COMMANDER">Base Commander</option>
                    <option value="ADMIN">Supreme Admin</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Assigned Base</label>
                  <select
                    className="form-select"
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                  >
                    <option value={1}>Fort Liberty Command</option>
                    <option value={2}>Camp Pendleton Marine Base</option>
                    <option value={3}>Nellis Strategic Air Base</option>
                    <option value={4}>Ramstein Allied Support Base</option>
                    <option value={5}>Naval Station Norfolk Command</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-tactical btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
              >
                {loading ? 'REGISTERING...' : 'REGISTER OFFICER ACCOUNT'}
              </button>
            </>
          )}
        </form>

        {/* Toggle Login/Register */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError(null);
              setSuccessMsg(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {isRegisterMode ? 'Already registered? Sign in here' : 'Register new military officer account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
