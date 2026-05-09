class MyCounter extends HTMLElement {
  private count = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private increment = () => {
    this.count++;
    this.render();
  };

  private decrement = () => {
    this.count--;
    this.render();
  };

  private reset = () => {
    this.count = 0;
    this.render();
  };

  private render() {
    const template = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        h2 {
          color: #667eea;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .counter-display {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .counter-value {
          font-size: 3rem;
          font-weight: bold;
        }

        .counter-label {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-top: 0.5rem;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        button {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        button:active {
          transform: scale(0.98);
        }

        .reset-btn {
          background: #f97316;
          color: white;
          border-color: #f97316;
        }

        .reset-btn:hover {
          background: #ea580c;
          border-color: #ea580c;
        }
      </style>

      <div class="card">
        <h2>⭐ カウンター</h2>
        <div class="counter-display">
          <div class="counter-value">${this.count}</div>
          <div class="counter-label">現在のカウント</div>
        </div>
        <div class="button-group">
          <button id="decrement-btn">➖ 減らす</button>
          <button id="increment-btn">➕ 増やす</button>
          <button class="reset-btn" id="reset-btn">🔄 リセット</button>
        </div>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
      this.shadowRoot
        .getElementById('increment-btn')
        ?.addEventListener('click', this.increment);
      this.shadowRoot
        .getElementById('decrement-btn')
        ?.addEventListener('click', this.decrement);
      this.shadowRoot
        .getElementById('reset-btn')
        ?.addEventListener('click', this.reset);
    }
  }
}

customElements.define('my-counter', MyCounter);
