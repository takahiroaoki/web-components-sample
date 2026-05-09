interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoList extends HTMLElement {
  private todos: Todo[] = [
    { id: 1, text: 'Web Componentsを学ぶ', completed: false },
    { id: 2, text: 'Pure JavaScriptで実装する', completed: true },
    { id: 3, text: 'Shadow DOMを活用する', completed: false },
  ];
  private nextId = 4;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private addTodo = () => {
    const input = this.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (input && input.value.trim()) {
      this.todos.push({
        id: this.nextId++,
        text: input.value,
        completed: false,
      });
      input.value = '';
      this.render();
    }
  };

  private toggleTodo = (id: number) => {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  };

  private deleteTodo = (id: number) => {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.render();
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  };

  private render() {
    const todoListHTML = this.todos
      .map(
        (todo) => `
        <li class="todo-item">
          <input
            type="checkbox"
            ${todo.completed ? 'checked' : ''}
            data-id="${todo.id}"
            class="todo-checkbox"
          />
          <span class="todo-text">${this.escapeHtml(todo.text)}</span>
          <button class="delete-btn" data-id="${todo.id}">削除</button>
        </li>
      `
      )
      .join('');

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

        .input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        input[type="text"] {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input[type="text"]:focus {
          outline: none;
          border-color: #667eea;
        }

        .input-group button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: opacity 0.3s ease;
        }

        .input-group button:hover {
          opacity: 0.9;
        }

        .todo-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .todo-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.2s ease;
        }

        .todo-item:last-child {
          border-bottom: none;
        }

        .todo-item:hover {
          background-color: #f5f5f5;
        }

        .todo-checkbox {
          width: 20px;
          height: 20px;
          margin-right: 1rem;
          cursor: pointer;
        }

        .todo-text {
          flex: 1;
          color: #333;
          font-size: 1rem;
          word-break: break-word;
        }

        .todo-item input[type="checkbox"]:checked ~ .todo-text {
          text-decoration: line-through;
          color: #999;
        }

        .delete-btn {
          background: #f97316;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: opacity 0.3s ease;
        }

        .delete-btn:hover {
          opacity: 0.8;
        }

        .empty-message {
          text-align: center;
          color: #999;
          padding: 2rem 1rem;
          font-style: italic;
        }
      </style>

      <div class="card">
        <h2>📝 Todoリスト</h2>
        <div class="input-group">
          <input
            type="text"
            placeholder="新しいタスクを追加..."
            id="todo-input"
          />
          <button id="add-btn">追加</button>
        </div>

        ${
          this.todos.length === 0
            ? `<div class="empty-message">タスクはまだありません</div>`
            : `<ul class="todo-list">${todoListHTML}</ul>`
        }
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = template;

      // イベントリスナーを再度設定
      this.shadowRoot
        .getElementById('add-btn')
        ?.addEventListener('click', this.addTodo);
      this.shadowRoot
        .getElementById('todo-input')
        ?.addEventListener('keypress', this.handleKeyPress);

      // チェックボックスと削除ボタンのイベント設定
      this.shadowRoot.querySelectorAll('.todo-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
          const id = parseInt((e.target as HTMLElement).getAttribute('data-id') || '0');
          this.toggleTodo(id);
        });
      });

      this.shadowRoot.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = parseInt((e.target as HTMLElement).getAttribute('data-id') || '0');
          this.deleteTodo(id);
        });
      });
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('todo-list', TodoList);
