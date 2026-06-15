* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0f1e;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(0, 255, 150, 0.15);
  background: rgba(10, 15, 30, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-icon {
  width: 40px;
  height: 40px;
  border: 2px solid #00ff96;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.nav-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.nav-sub {
  font-size: 10px;
  color: #00ff96;
  letter-spacing: 2px;
}

.nav-menu {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

/* MAIN */
.page {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

/* HERO */
.hero {
  background: linear-gradient(145deg, #0d1b2e, #0a1628);
  border: 1px solid rgba(0, 255, 150, 0.2);
  border-radius: 24px;
  padding: 32px 20px;
  text-align: center;
  margin-bottom: 24px;
}

.logo-circle {
  width: 120px;
  height: 120px;
  border: 2px solid #00ff96;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 150, 0.05);
}

.logo-text {
  font-size: 9px;
  color: #00ff96;
  letter-spacing: 1px;
  font-weight: 700;
}

.brain {
  font-size: 36px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 4px;
}

h1 span {
  display: block;
  color: #00ff96;
}

.divider {
  font-size: 20px;
  margin: 10px 0;
  opacity: 0.7;
}

.bn-text {
  font-size: 15px;
  color: #cbd5e1;
  margin-bottom: 6px;
}

.en-text {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 20px;
}

/* SEARCH */
.search-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-wrap {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(0, 255, 150, 0.3);
  border-radius: 14px;
  padding: 0 14px;
}

.input-icon {
  font-size: 20px;
  margin-right: 10px;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
  padding: 14px 0;
}

input::placeholder {
  color: #64748b;
}

button {
  background: linear-gradient(135deg, #00c97a, #00ff96);
  color: #0a0f1e;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  letter-spacing: 0.5px;
}

button:active {
  opacity: 0.85;
}

/* LOADING */
.loading {
  text-align: center;
  color: #00ff96;
  font-size: 14px;
  padding: 10px;
}

.hidden {
  display: none;
}

/* RESULT */
.result {
  border-radius: 14px;
  padding: 16px;
  font-size: 14px;
}

.result.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.result.success {
  background: rgba(0, 255, 150, 0.08);
  border: 1px solid rgba(0, 255, 150, 0.3);
}

.result-card h3 {
  color: #00ff96;
  margin-bottom: 12px;
  font-size: 16px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.result-row:last-child {
  border-bottom: none;
}

.label {
  color: #94a3b8;
  font-size: 13px;
}

.value {
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

/* WHY SECTION */
.why-section {
  margin-bottom: 24px;
}

.why-section h2 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 16px;
  color: #fff;
}

.feature-row {
  display: flex;
  gap: 10px;
}

.feature-card {
  flex: 1;
  background: rgba(0, 255, 150, 0.05);
  border: 1px solid rgba(0, 255, 150, 0.2);
  border-radius: 16px;
  padding: 16px 10px;
  text-align: center;
}

.feature-card span {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
  color: #00ff96;
}

.feature-card h3 {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #fff;
}

.feature-card p {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
}

/* FOOTER */
footer {
  text-align: center;
  color: #64748b;
  font-size: 12px;
  padding-top: 10px;
}

.green {
  color: #00ff96;
  font-weight: 700;
}
