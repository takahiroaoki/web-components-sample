class GreetingCard extends HTMLElement {
  private clickCount = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private handleClick = () => {
    this.clickCount++;
    const name = this.getAttribute('name') || 'Guest';
    alert(`こんにちは、${name}さん！(クリック数: ${this.clickCount})`);
  };

  private render() {
    const name = this.getAttribute('name') || 'Guest';
    const message = this.getAttribute('message') || 'Hello there!';

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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        h2 {
          color: #667eea;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .emoji {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: opacity 0.3s ease;
        }

        button:hover {
          opacity: 0.9;
        }

        button:active {
          transform: scale(0.98);
        }
      </style>

      <div class="card">
        <div class="emoji">👋</div>
        <h2>Hello, ${name}!</h2>
        <p>${message}</p>
        <button id="greet-btn">挨拶する</button>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
      this.shadowRoot
        .getElementById('greet-btn')
        ?.addEventListener('click', this.handleClick);
    }
  }
}

customElements.define('greeting-card', GreetingCard);
