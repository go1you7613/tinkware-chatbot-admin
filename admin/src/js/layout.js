/* ===================================================
   팅크웨어 챗봇 관리자 시스템 - 공통 레이아웃
=================================================== */

const AdminLayout = {
  menuGroups: [
    /* ── 대시보드 ────────────────────────────── */
    {
      items: [
        {
          key: 'dashboard',
          tooltip: '대시보드',
          icon: 'bi-speedometer2',
          label: '대시보드',
          page: 'index.html'
        }
      ]
    },
    /* ── 데이터 관리 ──────────────────────────── */
    {
      divider: true,
      items: [
        {
          key: 'data-management',
          tooltip: '데이터 관리',
          icon: 'bi-shield-lock',
          label: '데이터 관리',
          children: [
            { key: 'pii-management',   label: 'PII 패턴 정보 관리', page: 'pii-management.html' },
            { key: 'anonymization',    label: '익명화 처리',         page: 'anonymization.html' },
            { key: 'batch-processing', label: '일괄 처리',           page: 'batch-processing.html' },
            { key: 'preprocessing',    label: '데이터 전처리 관리',  page: 'preprocessing.html' }
          ]
        }
      ]
    },
    /* ── 벡터 DB 관리 ─────────────────────────── */
    {
      items: [
        {
          key: 'vector-db',
          tooltip: '벡터 DB 관리',
          icon: 'bi-database',
          label: '벡터 DB 관리',
          children: [
            { key: 'faq-management',      label: 'FAQ 생성 관리',  page: 'faq-management.html' },
            { key: 'document-management', label: '문서 정보 관리', page: 'document-management.html' }
          ]
        }
      ]
    },
    /* ── 데이터 거버넌스 ───────────────────────── */
    {
      items: [
        {
          key: 'governance',
          tooltip: '데이터 거버넌스',
          icon: 'bi-diagram-3',
          label: '데이터 거버넌스',
          children: [
            { key: 'governance-faq', label: 'FAQ 거버넌스 관리', page: 'governance.html' }
          ]
        }
      ]
    },
    /* ── 채팅 관리 ────────────────────────────── */
    {
      items: [
        {
          key: 'chat',
          tooltip: '채팅 관리',
          icon: 'bi-chat-left-text',
          label: '채팅 관리',
          children: [
            { key: 'chat-sessions', label: '채팅 세션 관리', page: 'chat-sessions.html' },
            { key: 'kakao-integration', label: '카카오톡 채널연동 서버', page: 'kakao-integration.html' }
          ]
        }
      ]
    }
  ],

  init() {
    this.renderHeader();
    this.renderSidebar();
    this.renderWorkspaceTabs();
    this.renderUtilWing();
    this.bindHeader();
    this.observeSidebarState();
  },

  renderHeader() {
    const target = document.getElementById('adminHeader');
    if (!target) return;

    target.innerHTML = `
      <header class="admin-header">
        <a href="index.html" class="header-logo text-decoration-none">
          <div class="header-logo-icon"><i class="bi bi-chat-dots-fill"></i></div>
          <div class="header-logo-text">팅크웨어 챗봇</div>
        </a>
        <div class="header-divider"></div>
        <button class="header-toggle" id="sidebarToggle" title="메뉴 접기/펼치기">
          <i class="bi bi-layout-sidebar"></i>
        </button>
        <div class="header-spacer"></div>
        <div class="header-right">
          <button class="header-icon-btn" title="알림">
            <i class="bi bi-bell"></i>
            <span class="badge-dot"></span>
          </button>
          <button class="header-icon-btn" title="설정">
            <i class="bi bi-gear"></i>
          </button>
          <div class="header-divider-small"></div>
          <div class="header-user" id="userMenuTrigger">
            <div class="header-avatar">관</div>
            <div class="header-user-info">
              <span class="header-user-name">관리자</span>
              <span class="header-user-role">SUPER ADMIN</span>
            </div>
            <i class="bi bi-chevron-down header-user-arrow"></i>
          </div>
        </div>
      </header>

      <div class="user-dropdown" id="userDropdown">
        <div class="user-dropdown-item"><i class="bi bi-person"></i> 내 계정</div>
        <div class="user-dropdown-item"><i class="bi bi-shield-check"></i> 권한 관리</div>
        <div class="user-dropdown-divider"></div>
        <div class="user-dropdown-item danger" id="logoutBtn">
          <i class="bi bi-box-arrow-right"></i> 로그아웃
        </div>
      </div>`;
  },

  renderSidebar() {
    const target = document.getElementById('adminSidebar');
    if (!target) return;

    const currentMenu = document.body.dataset.adminMenu || '';
    const currentSubmenu = document.body.dataset.adminSubmenu || '';
    const groups = this.menuGroups.map((group, groupIndex) => {
      const divider = groupIndex === 0 ? '' : '<div class="menu-section-divider"></div>';
      const items = group.items.map(item => this.renderMenuItem(item, currentMenu, currentSubmenu)).join('');
      return `${divider}${items}`;
    }).join('');

    target.innerHTML = `
      <aside class="admin-sidebar" id="sidebar">
        ${groups}
        <div class="menu-section-divider" style="margin-bottom:8px;"></div>
      </aside>`;
  },

  renderMenuItem(item, currentMenu, currentSubmenu) {
    const isActive = item.key === currentMenu;
    const childItems = item.children || [];
    const children = childItems.map((child, index) => {
      const childConfig = typeof child === 'string' ? { label: child } : child;
      const childId = childConfig.key || `${item.key}-${index}`;
      const active = childConfig.label === currentSubmenu ? ' active' : '';
      const pageAttr = childConfig.page ? ` data-page="${childConfig.page}"` : '';
      return `<div class="submenu-item${active}" data-workspace-tab-id="${childId}" data-workspace-tab-title="${childConfig.label}" data-parent-menu="${item.key}"${pageAttr}>${childConfig.label}</div>`;
    }).join('');
    const pageAttr = item.page ? ` data-page="${item.page}"` : '';
    const arrow = childItems.length ? '<i class="bi bi-chevron-right menu-arrow"></i>' : '';
    const submenu = childItems.length ? `<div class="submenu">${children}</div>` : '';

    return `
      <div class="menu-item${isActive ? ' active open' : ''}" data-menu="${item.key}" data-tooltip="${item.tooltip}" data-workspace-tab-id="${item.key}" data-workspace-tab-title="${item.label}"${pageAttr}>
        <i class="bi ${item.icon} menu-icon"></i>
        <span class="menu-label">${item.label}</span>
        ${arrow}
      </div>
      ${submenu}`;
  },

  renderWorkspaceTabs() {
    const mainWrap = document.getElementById('mainWrap');
    if (!mainWrap || document.getElementById('workspaceTabs')) return;

    const defaultTitle = document.querySelector('.page-title')?.textContent?.trim() || document.title || '관리자';
    const defaultPage = window.location.pathname.split('/').pop() || 'index.html';
    const defaultId = document.body.dataset.adminPage || document.body.dataset.adminMenu || defaultPage || 'dashboard';
    const defaultTab = { id: defaultId, title: defaultTitle, page: defaultPage };

    const tabBar = document.createElement('div');
    tabBar.className = 'workspace-tabs-wrap';
    tabBar.innerHTML = `
      <div class="workspace-tabs" id="workspaceTabs" aria-label="열린 화면 탭"></div>
      <div class="workspace-tab-actions">
        <button class="workspace-tab-action" id="workspaceTabsAction" type="button" title="탭 관리">
          <i class="bi bi-three-dots"></i>
        </button>
        <div class="workspace-tab-menu" id="workspaceTabsMenu">
          <button type="button" data-workspace-action="close-others">기타 닫기</button>
          <button type="button" data-workspace-action="close-all">전체 닫기</button>
        </div>
      </div>`;
    mainWrap.insertBefore(tabBar, mainWrap.firstElementChild);

    AdminWorkspaceTabs.init(defaultTab);
  },

  bindHeader() {
    const trigger = document.getElementById('userMenuTrigger');
    const dropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    trigger?.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdown?.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown?.classList.remove('show');
    });

    logoutBtn?.addEventListener('click', () => {
      AdminConfirm.show({
        title: '로그아웃',
        message: '로그아웃 하시겠습니까?',
        onConfirm: () => { window.location.href = 'login.html'; }
      });
    });
  },

  observeSidebarState() {
    const sidebar = document.getElementById('sidebar');
    const logoText = document.querySelector('.header-logo-text');
    if (!sidebar || !logoText) return;

    const syncLogo = () => {
      logoText.style.opacity = sidebar.classList.contains('collapsed') ? '0' : '1';
    };
    const observer = new MutationObserver(syncLogo);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    syncLogo();
  },

  renderUtilWing() {
    if (document.getElementById('utilWing')) return;

    const mainWrap = document.getElementById('mainWrap');
    if (!mainWrap) return;

    const wing = document.createElement('div');
    wing.className = 'util-wing';
    wing.id = 'utilWing';
    wing.innerHTML = `
      <button type="button" class="util-wing-btn" data-util="pii" title="PII 빠른 검출">
        <i class="bi bi-shield-check"></i>
      </button>
      <button type="button" class="util-wing-btn" data-util="legend" title="PII 검출유형 범례">
        <i class="bi bi-list-ul"></i>
      </button>
      <button type="button" class="util-wing-btn" data-util="dict" title="단어사전 빠른 조회">
        <i class="bi bi-book"></i>
      </button>
      <button type="button" class="util-wing-btn" data-util="collection" title="RAG 컬렉션 현황">
        <i class="bi bi-database-check"></i>
      </button>
      <div style="flex:1"></div>
    `;
    mainWrap.appendChild(wing);

    // 패널 오버레이
    const overlay = document.createElement('div');
    overlay.className = 'util-panel-overlay';
    overlay.id = 'utilPanelOverlay';
    overlay.addEventListener('click', () => AdminUtilWing.close());
    mainWrap.appendChild(overlay);

    // 패널 컨테이너
    const panel = document.createElement('div');
    panel.className = 'util-panel';
    panel.id = 'utilPanel';
    mainWrap.appendChild(panel);

    AdminUtilWing.init(wing, panel, overlay);
  }
};

const AdminWorkspaceTabs = {
  storageKey: 'admin-workspace-tabs',

  init(defaultTab) {
    this.tabsEl = document.getElementById('workspaceTabs');
    this.menuEl = document.getElementById('workspaceTabsMenu');
    this.actionBtn = document.getElementById('workspaceTabsAction');
    if (!this.tabsEl) return;

    const stored = this.loadState();
    this.tabs = stored.tabs.length ? stored.tabs : [defaultTab];
    this.activeId = stored.activeId || this.tabs[0]?.id || defaultTab.id;
    if (!this.tabs.some(tab => tab.id === this.activeId)) {
      this.activeId = this.tabs[0]?.id || '';
    }

    this.bindActions();
    this.saveState();
    this.render();
  },

  loadState() {
    try {
      const raw = sessionStorage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : null;
      return {
        tabs: Array.isArray(parsed?.tabs) ? parsed.tabs : [],
        activeId: parsed?.activeId || ''
      };
    } catch (error) {
      return { tabs: [], activeId: '' };
    }
  },

  saveState() {
    sessionStorage.setItem(this.storageKey, JSON.stringify({
      tabs: this.tabs,
      activeId: this.activeId
    }));
  },

  open(tab) {
    if (!tab?.id || !tab?.title) return;
    const exists = this.tabs.some(item => item.id === tab.id);
    if (!exists) this.tabs.push({ id: tab.id, title: tab.title, page: tab.page || '' });
    this.activeId = tab.id;
    this.saveState();
    this.render();
  },

  activate(id) {
    const tab = this.tabs.find(item => item.id === id);
    if (!tab) return;
    this.activeId = id;
    this.saveState();
    if (tab.page && window.location.pathname.split('/').pop() !== tab.page) {
      window.location.href = tab.page;
      return;
    }
    this.render();
  },

  close(id) {
    const index = this.tabs.findIndex(tab => tab.id === id);
    if (index < 0) return;
    // 마지막 탭이면 닫기 버튼이 숨겨져 있으므로 UI에서는 호출되지 않지만
    // 혹시 직접 호출된 경우 대시보드로 이동
    this.tabs.splice(index, 1);
    if (this.tabs.length === 0) {
      this.goToDashboard();
      return;
    }
    if (this.activeId === id) {
      this.activeId = this.tabs[index]?.id || this.tabs[index - 1]?.id || '';
    }
    this.saveState();
    this.render();
  },

  closeOthers() {
    if (!this.activeId) return;
    this.tabs = this.tabs.filter(tab => tab.id === this.activeId);
    this.saveState();
    this.render();
  },

  closeAll() {
    this.goToDashboard();
  },

  goToDashboard() {
    this.tabs = [];
    this.activeId = '';
    this.saveState();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'index.html' || currentPage === '') {
      // 이미 대시보드 — 탭만 새로 생성
      const dashTab = { id: 'dashboard', title: '대시보드', page: 'index.html' };
      this.tabs = [dashTab];
      this.activeId = dashTab.id;
      this.saveState();
      this.render();
    } else {
      window.location.href = 'index.html';
    }
  },

  bindActions() {
    this.actionBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.menuEl?.classList.toggle('show');
    });

    this.menuEl?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-workspace-action]');
      if (!button) return;
      if (button.dataset.workspaceAction === 'close-others') this.closeOthers();
      if (button.dataset.workspaceAction === 'close-all') this.closeAll();
      this.menuEl.classList.remove('show');
    });

    document.addEventListener('click', () => {
      this.menuEl?.classList.remove('show');
    });
  },

  render() {
    if (!this.tabsEl) return;

    if (!this.tabs.length) {
      this.tabsEl.innerHTML = '<div class="workspace-tabs-empty">열린 화면이 없습니다.</div>';
      return;
    }

    const isSingle = this.tabs.length === 1;
    this.tabsEl.innerHTML = this.tabs.map(tab => `
      <button class="workspace-tab${tab.id === this.activeId ? ' active' : ''}" type="button" data-workspace-tab="${tab.id}">
        <span class="workspace-tab-label">${tab.title}</span>
        ${isSingle ? '' : `<span class="workspace-tab-close" data-workspace-close="${tab.id}" title="닫기">×</span>`}
      </button>
    `).join('');

    this.tabsEl.querySelectorAll('[data-workspace-tab]').forEach(tabEl => {
      tabEl.addEventListener('click', () => this.activate(tabEl.dataset.workspaceTab));
    });

    this.tabsEl.querySelectorAll('[data-workspace-close]').forEach(closeEl => {
      closeEl.addEventListener('click', (event) => {
        event.stopPropagation();
        this.close(closeEl.dataset.workspaceClose);
      });
    });
  }
};

/* ── 우측 유틸 날개 패널 ── */
const AdminUtilWing = {
  activeUtil: null,

  piiPatterns: [
    { label: '전화번호', regex: /01[0-9]-?\d{3,4}-?\d{4}/g },
    { label: '이메일',   regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
    { label: '주민번호', regex: /\d{6}-[1-4]\d{6}/g },
    { label: '카드번호', regex: /\d{4}-\d{4}-\d{4}-\d{4}/g },
    { label: '계좌번호', regex: /\d{3,4}-\d{4,6}-\d{4,6}/g },
  ],

  panels: {
    pii: {
      icon: 'bi-shield-check',
      title: 'PII 빠른 검출',
      render() {
        return `
          <div style="margin-bottom:8px;">
            <textarea class="util-pii-textarea" id="utilPiiInput"
              placeholder="PII 검출할 텍스트를 입력하세요"></textarea>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:12px;">
            <button class="btn-primary btn-sm" id="utilPiiRun" style="flex:1;">
              <i class="bi bi-search"></i> 검출 실행
            </button>
            <button class="btn-default btn-sm" id="utilPiiClear">초기화</button>
          </div>
          <div class="util-pii-result" id="utilPiiResult">
            <span style="color:var(--color-text-disabled);font-size:13px;">
              텍스트를 입력하고 검출 실행을 누르세요.
            </span>
          </div>
          <div class="util-detection-badges" id="utilPiiBadges"></div>
          <div style="font-size:12px;color:var(--color-text-sub);margin-top:6px;" id="utilPiiSummary"></div>`;
      },
      bind() {
        const input   = document.getElementById('utilPiiInput');
        const result  = document.getElementById('utilPiiResult');
        const badges  = document.getElementById('utilPiiBadges');
        const summary = document.getElementById('utilPiiSummary');

        document.getElementById('utilPiiRun')?.addEventListener('click', () => {
          const text = input?.value.trim();
          if (!text) return;
          let html = text;
          const found = [];
          AdminUtilWing.piiPatterns.forEach(({ label, regex }) => {
            const matches = [...text.matchAll(regex)];
            matches.forEach(m => {
              found.push({ label, value: m[0] });
              html = html.replace(m[0], `<span class="util-highlight">${m[0]}</span>`);
            });
          });
          result.innerHTML = html.replace(/\n/g, '<br>') ||
            '<span style="color:var(--color-text-disabled)">결과 없음</span>';
          badges.innerHTML = found.map(f =>
            `<span class="util-detection-badge"><i class="bi bi-shield-exclamation"></i>${f.label}</span>`
          ).join('');
          summary.textContent = found.length
            ? `${found.length}건 검출됨`
            : 'PII가 검출되지 않았습니다.';
        });

        document.getElementById('utilPiiClear')?.addEventListener('click', () => {
          if (input) input.value = '';
          result.innerHTML = '<span style="color:var(--color-text-disabled);font-size:13px;">텍스트를 입력하고 검출 실행을 누르세요.</span>';
          badges.innerHTML = '';
          summary.textContent = '';
        });
      }
    },

    legend: {
      icon: 'bi-list-ul',
      title: 'PII 검출유형 범례',
      render() {
        const items = [
          { color: '#FF4D4F', name: '전화번호',    desc: '010-XXXX-XXXX 형식의 한국 전화번호' },
          { color: '#FA8C16', name: '이메일',      desc: 'user@domain.com 형식의 이메일 주소' },
          { color: '#722ED1', name: '주민등록번호', desc: '6자리-7자리 형식의 주민등록번호' },
          { color: '#13C2C2', name: '카드번호',    desc: '4자리-4자리-4자리-4자리 형식' },
          { color: '#52C41A', name: '계좌번호',    desc: '은행 계좌번호 패턴' },
          { color: '#1890FF', name: '커스텀 패턴', desc: '관리자가 등록한 커스텀 정규식 패턴' },
        ];
        return items.map(i => `
          <div class="util-legend-item">
            <div class="util-legend-dot" style="background:${i.color}"></div>
            <div>
              <div class="util-legend-name">${i.name}</div>
              <div class="util-legend-desc">${i.desc}</div>
            </div>
          </div>`).join('');
      },
      bind() {}
    },

    dict: {
      icon: 'bi-book',
      title: '단어사전 빠른 조회',
      render() {
        return `
          <div class="form-input-group" style="margin-bottom:12px;">
            <i class="bi bi-search input-icon"></i>
            <input type="text" class="form-input" id="utilDictSearch"
              placeholder="단어 검색..." style="padding-left:36px;">
          </div>
          <div id="utilDictResult">
            ${['비밀번호,비번', '지역센터,센터', '주문번호', '고객명', '모델명', '아이디', '예금주', '주소'].map(w => `
              <div class="util-legend-item">
                <i class="bi bi-tag" style="color:var(--color-primary);flex-shrink:0;margin-top:2px;"></i>
                <div>
                  <div class="util-legend-name" style="font-size:13px;">${w.split(',')[0]}</div>
                  <div class="util-legend-desc">${w}</div>
                </div>
              </div>`).join('')}
          </div>`;
      },
      bind() {
        document.getElementById('utilDictSearch')?.addEventListener('input', function() {
          const q = this.value.toLowerCase();
          document.querySelectorAll('#utilDictResult .util-legend-item').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }
    },

    collection: {
      icon: 'bi-database-check',
      title: 'RAG 컬렉션 상태',
      render() {
        const cols = [
          { name: 'as_kms',       count: 18430, active: true,  updated: '2시간 전' },
          { name: 'faq_approved', count: 4200,  active: true,  updated: '1일 전' },
          { name: 'cs_scripts',   count: 9810,  active: false, updated: '3일 전' },
        ];
        return cols.map(c => `
          <div class="util-collection-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <div class="util-collection-name">${c.name}</div>
              <span style="font-size:11px;padding:1px 8px;border-radius:10px;
                background:${c.active ? 'rgba(82,196,26,0.12)' : 'rgba(0,0,0,0.06)'};
                color:${c.active ? 'var(--color-success)' : 'var(--color-text-disabled)'};">
                ${c.active ? '활성' : '비활성'}
              </span>
            </div>
            <div class="util-collection-meta">
              문서 ${c.count.toLocaleString()}건 · 업데이트 ${c.updated}
            </div>
          </div>`).join('');
      },
      bind() {}
    }
  },

  init(wing, panel, overlay) {
    this.panel   = panel;
    this.overlay = overlay;
    wing.querySelectorAll('.util-wing-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.util;
        if (this.activeUtil === key) { this.close(); return; }
        this.open(key, btn);
      });
    });
  },

  open(key, btn) {
    const config = this.panels[key];
    if (!config) return;

    this.activeUtil = key;
    document.querySelectorAll('.util-wing-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');

    this.panel.innerHTML = `
      <div class="util-panel-header">
        <div class="util-panel-title">
          <i class="bi ${config.icon}" style="color:var(--color-primary);"></i>
          ${config.title}
        </div>
        <button class="util-panel-close" id="utilPanelClose">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="util-panel-body">${config.render()}</div>`;

    document.getElementById('utilPanelClose')?.addEventListener('click', () => this.close());
    config.bind();

    this.overlay.classList.add('show');
    requestAnimationFrame(() => this.panel.classList.add('show'));
  },

  close() {
    this.activeUtil = null;
    document.querySelectorAll('.util-wing-btn').forEach(b => b.classList.remove('active'));
    this.panel.classList.remove('show');
    this.overlay.classList.remove('show');
  }
};

AdminLayout.init();
