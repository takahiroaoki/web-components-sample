class ProfileHeader extends HTMLElement {
  // 監視対象の属性を指定
  static get observedAttributes() {
    return ['name', 'role', 'avatar', 'status'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // 属性が変更されるたびに呼ばれる
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private handleStatusClick = () => {
    // 子から親へカスタムイベントを発火
    const event = new CustomEvent('status-changed', {
      detail: {
        newStatus: this.getAttribute('status') === 'active' ? 'inactive' : 'active',
        timestamp: new Date(),
      },
      bubbles: true, // イベント伝播を有効化
      composed: true, // Shadow DOM の外へも伝播
    });
    this.dispatchEvent(event);
  };

  private render() {
    const name = this.getAttribute('name') || 'Unknown';
    const role = this.getAttribute('role') || 'User';
    const avatar = this.getAttribute('avatar') || '👤';
    const status = this.getAttribute('status') || 'inactive';
    const statusColor = status === 'active' ? '#10b981' : '#6b7280';
    const statusText = status === 'active' ? 'オンライン' : 'オフライン';

    const template = `
      <style>
        :host {
          display: block;
        }

        .header {
          text-align: center;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .header:hover {
          opacity: 0.8;
        }

        .avatar {
          font-size: 4rem;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .status-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 16px;
          height: 16px;
          background-color: ${statusColor};
          border-radius: 50%;
          border: 3px solid white;
        }

        .name {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .role {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .status {
          font-size: 0.85rem;
          color: ${statusColor};
          font-weight: 600;
        }
      </style>

      <div class="header" id="header-click">
        <div class="avatar">
          ${avatar}
          <div class="status-indicator"></div>
        </div>
        <div class="name">${this.escapeHtml(name)}</div>
        <div class="role">${this.escapeHtml(role)}</div>
        <div class="status">${statusText}</div>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
      this.shadowRoot
        .getElementById('header-click')
        ?.addEventListener('click', this.handleStatusClick);
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('profile-header', ProfileHeader);
