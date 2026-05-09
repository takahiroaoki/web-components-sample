class ProfileBio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    const template = `
      <style>
        :host {
          display: block;
        }

        .bio {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .bio h3 {
          color: #667eea;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .bio p {
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat {
          text-align: center;
          padding: 0.75rem;
          background: white;
          border-radius: 6px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #999;
          margin-top: 0.25rem;
        }
      </style>

      <div class="bio">
        <h3>🎯 プロフィール</h3>
        <slot></slot>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-value">1.5K</div>
          <div class="stat-label">フォロワー</div>
        </div>
        <div class="stat">
          <div class="stat-value">42</div>
          <div class="stat-label">投稿</div>
        </div>
        <div class="stat">
          <div class="stat-value">89</div>
          <div class="stat-label">いいね</div>
        </div>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
    }
  }
}

customElements.define('profile-bio', ProfileBio);
