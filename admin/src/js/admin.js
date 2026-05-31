/* ===================================================
   팅크웨어 챗봇 관리자 시스템 - 공통 JS
=================================================== */

/* ── 사이드바 토글 ── */
const AdminSidebar = {
  init() {
    this.sidebar  = document.getElementById('sidebar');
    this.mainWrap = document.getElementById('mainWrap');
    this.toggleBtn = document.getElementById('sidebarToggle');
    if (!this.sidebar) return;
    this.collapsed = false;
    this.applyExpanded();
    this.toggleBtn?.addEventListener('click', () => this.toggle());
  },
  toggle() {
    this.collapsed = !this.collapsed;
    this.collapsed ? this.applyCollapsed() : this.applyExpanded();
  },
  applyCollapsed() {
    this.sidebar?.classList.add('collapsed');
    this.mainWrap?.classList.add('sidebar-collapsed');
  },
  applyExpanded() {
    this.sidebar?.classList.remove('collapsed');
    this.mainWrap?.classList.remove('sidebar-collapsed');
  }
};

/* ── 사이드바 메뉴 활성 + 서브메뉴 아코디언 ── */
const AdminMenu = {
  init() {
    // 메뉴 항목 클릭
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const submenu = item.nextElementSibling;
        if (submenu?.classList.contains('submenu')) {
          // 1Depth: 서브메뉴 토글 + 첫 번째 2Depth 자동 선택
          e.stopPropagation();
          const wasOpen = item.classList.contains('open');
          this.toggleSubmenu(item);
          if (!wasOpen) {
            const firstChild = submenu.querySelector('.submenu-item');
            firstChild?.click();
          }
        } else {
          // 2Depth 없는 단독 메뉴: 직접 탭 오픈
          this.setActive(item);
          AdminWorkspaceTabs?.open({
            id: item.dataset.workspaceTabId || item.dataset.menu,
            title: item.dataset.workspaceTabTitle || item.querySelector('.menu-label')?.textContent?.trim(),
            page: item.dataset.page || ''
          });
          this.navigate(item.dataset.page);
        }
      });
    });

    // 서브메뉴 항목 클릭
    document.querySelectorAll('.submenu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.submenu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const parentMenu = item.previousElementSibling?.classList.contains('menu-item')
          ? item.previousElementSibling
          : item.closest('.submenu')?.previousElementSibling;
        if (parentMenu?.classList.contains('menu-item')) this.setActive(parentMenu);
        AdminWorkspaceTabs?.open({
          id: item.dataset.workspaceTabId || item.textContent.trim(),
          title: item.dataset.workspaceTabTitle || item.textContent.trim(),
          page: item.dataset.page || ''
        });
        this.navigate(item.dataset.page);
      });
    });

    // 현재 페이지 메뉴 자동 활성
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.menu-item[data-page]').forEach(item => {
      if (item.dataset.page === path) this.setActive(item);
    });
  },
  setActive(item) {
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  },
  toggleSubmenu(item) {
    const isOpen = item.classList.contains('open');
    // 다른 열린 메뉴 닫기
    document.querySelectorAll('.menu-item.open').forEach(i => {
      if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open', !isOpen);
  },
  navigate(page) {
    if (!page) return;
    if (window.location.pathname.split('/').pop() === page) return;
    window.location.href = page;
  }
};

/* ── 아코디언 (콘텐츠 영역) ── */
const AdminAccordion = {
  init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.closest('.accordion-section');
        section?.classList.toggle('open');
      });
    });
  }
};

/* ── 탭 전환 ── */
const AdminTabs = {
  init(containerSelector = '.tab-container') {
    document.querySelectorAll(containerSelector).forEach(container => {
      container.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          container.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          container.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.dataset.tab === target);
          });
        });
      });
    });
  }
};

/* ── 모달 ── */
const AdminModal = {
  open(id) {
    const el = document.getElementById(id);
    el?.classList.add('show');
    document.body.style.overflow = 'hidden';
  },
  close(id) {
    const el = document.getElementById(id);
    el?.classList.remove('show');
    document.body.style.overflow = '';
  },
  init() {
    // [data-modal-open] 클릭
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => this.open(btn.dataset.modalOpen));
    });
    // [data-modal-close] 클릭
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close(btn.dataset.modalClose));
    });
    // 오버레이 클릭으로 닫기
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });
  }
};

/* ── Confirm 팝업 ── */
const AdminConfirm = {
  show({ title = '확인', message = '진행하시겠습니까?', onConfirm } = {}) {
    let overlay = document.getElementById('confirmOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'confirmOverlay';
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-box">
          <div class="confirm-icon"><i class="bi bi-exclamation-circle-fill"></i></div>
          <div class="confirm-title" id="confirmTitle"></div>
          <div class="confirm-msg" id="confirmMsg"></div>
          <div class="confirm-actions">
            <button class="btn-default btn-sm" id="confirmCancel">취소</button>
            <button class="btn-primary btn-sm" id="confirmOk">확인</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
    }
    overlay.querySelector('#confirmTitle').textContent = title;
    overlay.querySelector('#confirmMsg').textContent  = message;
    overlay.classList.add('show');
    overlay.querySelector('#confirmOk').onclick = () => {
      overlay.classList.remove('show');
      onConfirm?.();
    };
    overlay.querySelector('#confirmCancel').onclick = () => overlay.classList.remove('show');
  }
};

/* ── Toast 알림 ── */
const AdminToast = {
  show(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="bi ${icons[type] || icons.success} toast-icon"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

/* ── 토글 스위치 ── */
const AdminToggle = {
  init() {
    document.querySelectorAll('.toggle-switch input').forEach(input => {
      input.addEventListener('change', function() {
        const label = this.closest('[data-toggle-label]')?.dataset.toggleLabel;
        if (label) {
          AdminToast.show(`${label}: ${this.checked ? '활성화' : '비활성화'}됐습니다.`);
        }
      });
    });
  }
};

/* ── 드롭다운 (커스텀) ── */
const AdminDropdown = {
  init() {
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = document.getElementById(trigger.dataset.dropdown);
        const isOpen = menu?.classList.contains('show');
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        if (!isOpen) menu?.classList.add('show');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    });
  }
};

/* ── 진행률 시뮬레이터 ── */
const AdminProgress = {
  simulate(fillEl, labelEl, onComplete) {
    let pct = 0;
    const step = () => {
      pct += Math.random() * 8 + 2;
      if (pct >= 100) pct = 100;
      if (fillEl) fillEl.style.width = pct + '%';
      if (labelEl) labelEl.textContent = Math.floor(pct) + '%';
      if (pct < 100) setTimeout(step, 300);
      else onComplete?.();
    };
    setTimeout(step, 300);
  }
};

/* ── 초기화 ── */
document.addEventListener('DOMContentLoaded', () => {
  AdminSidebar.init();
  AdminMenu.init();
  AdminAccordion.init();
  AdminTabs.init();
  AdminModal.init();
  AdminToggle.init();
  AdminDropdown.init();
});
