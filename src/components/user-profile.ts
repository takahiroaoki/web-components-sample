class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // 子コンポーネントからのカスタムイベントをリッスン
    this.addEventListener('status-changed', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('親がイベントを受け取った:', customEvent.detail);

      // 子コンポーネントの属性を更新（親→子への通信）
      const profileHeader = this.querySelector('profile-header');
      if (profileHeader && customEvent.detail.newStatus) {
        profileHeader.setAttribute('status', customEvent.detail.newStatus);
      }

      // 親自体でも処理（例：ログ、分析送信など）
      this.onStatusChanged(customEvent.detail);
    });
  }

  private onStatusChanged(detail: { newStatus: string; timestamp: Date }) {
    console.log(`ステータスが変更されました: ${detail.newStatus}`);
  }

  private render() {
    const template = `
      <style>
        :host {
          display: block;
        }

        .profile {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          max-width: 500px;
        }

        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          color: white;
          text-align: center;
        }

        .profile-content {
          padding: 2rem;
        }

        ::slotted([slot="header"]) {
          display: block;
          margin-bottom: 1rem;
        }

        ::slotted([slot="content"]) {
          display: block;
          line-height: 1.6;
          color: #666;
        }
      </style>

      <div class="profile">
        <div class="profile-header">
          <slot name="header"></slot>
        </div>
        <div class="profile-content">
          <slot name="content"></slot>
        </div>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;
    }
  }
}

customElements.define('user-profile', UserProfile);
