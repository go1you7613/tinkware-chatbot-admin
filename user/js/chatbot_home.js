'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const productLabel = document.querySelector('.product-section-label');
  const loginCard = document.querySelector('.login-card');
  const loginButton = document.querySelector('.login-btn');
  const categoryButton = document.querySelector('.cat-btn');
  const categoryModal = document.querySelector('.category-modal');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const supportCards = document.querySelectorAll('.support-card');
  const asCategoryButton = document.querySelector('.category-card-active');
  const locatorCategoryButton = document.querySelector('.category-card-locator');
  const asFlow = document.querySelector('.as-flow');
  const locatorFlow = document.querySelector('.locator-flow');
  const locatorCloseButton = document.querySelector('.locator-close');
  const featureButtons = document.querySelectorAll('.js-open-feature');
  const featureFlows = document.querySelectorAll('.feature-flow');
  const featureBackButtons = document.querySelectorAll('.feature-flow-back');
  const locatorTabButtons = document.querySelectorAll('[data-locator-tab]');
  const locatorTabPanels = document.querySelectorAll('[data-locator-panel]');
  const faqFlow = document.getElementById('faq-flow');
  const faqPanels = document.querySelectorAll('[data-faq-panel]');
  const faqOpenButtons = document.querySelectorAll('[data-faq-open]');
  const asBackButton = document.querySelector('.as-flow-back');
  const asPrimaryButton = document.querySelector('.as-primary-btn');
  const asSecondaryButton = document.querySelector('.as-secondary-btn');
  const asStepPanels = document.querySelectorAll('.as-step-panel');
  const asProgressItems = document.querySelectorAll('.as-progress span');
  const asStepCurrent = document.querySelector('.as-step-current');
  const asStepName = document.querySelector('.as-step-name');
  const asTitle = document.querySelector('.as-flow-header h2');
  const asBubble = document.querySelector('.as-ai-bubble');
  let asCurrentStep = 1;

  if (productLabel && loginCard && loginButton) {
    const renderProductRegister = () => {
      productLabel.innerHTML = '김창곤님의 보유제품 <span class="product-count">0</span>';
      loginCard.className = 'login-card owned-product-card';
      loginCard.innerHTML = '<button class="owned-product-register" type="button">보유제품 등록 <span aria-hidden="true">+</span></button>';
    };

    const renderRegisteredProduct = () => {
      productLabel.innerHTML = '김창곤님의 보유제품 <span class="product-count">1</span>';
      loginCard.className = 'login-card owned-products-wrap';
      loginCard.innerHTML = `
        <div class="owned-product-item">
          <div class="owned-product-top">
            <img class="owned-product-image" src="image/product-qxd5000.jpg" alt="아이나비 QXD5000">
            <div class="owned-product-info">
              <strong>아이나비 QXD5000</strong>
              <span>블랙박스 · 전후방 QHD</span>
            </div>
            <button class="owned-product-toggle" type="button" aria-label="접기">⌃</button>
          </div>
          <div class="owned-product-actions">
            <button type="button">스스로해결/출장예약</button>
            <button type="button">소모품 구입</button>
          </div>
        </div>
        <button class="owned-product-add" type="button">보유제품 추가 <span aria-hidden="true">+</span></button>
      `;
    };

    loginButton.addEventListener('click', () => {
      renderProductRegister();
    });

    loginCard.addEventListener('click', (event) => {
      if (event.target.closest('.owned-product-register')) {
        renderRegisteredProduct();
      }
    });
  }

  const openModal = () => {
    categoryModal.classList.add('is-open');
    categoryModal.setAttribute('aria-hidden', 'false');
    categoryButton.setAttribute('aria-expanded', 'true');
  };

  const closeModal = () => {
    categoryModal.classList.remove('is-open');
    categoryModal.setAttribute('aria-hidden', 'true');
    categoryButton.setAttribute('aria-expanded', 'false');
  };

  const asStepMeta = [
    { name: '· 약관동의', button: '동의하고 다음 단계로', secondary: true, message: '방문 AS 예약을 시작하겠습니다.<br>먼저 <strong>개인정보 수집·이용</strong>에 동의해주세요.' },
    { name: '· 센터 선택', button: '다음 단계 (날짜·시간 선택)', secondary: false, message: '방문하실 <strong>서비스센터</strong>를 선택해주세요.<br>지역을 선택하거나 현재 위치로 가까운 센터를 찾을 수 있습니다.' },
    { name: '· 날짜·시간 선택', button: '다음 단계 (예약자 정보 입력)', secondary: false, message: '방문 날짜와 시간을 선택해주세요.<br><strong>점심 시간(12~13시)</strong>과 예약 완료 시간은 선택할 수 없습니다.' },
    { name: '· 예약자 정보 입력', button: '예약 확정하기', secondary: false, message: '마지막 단계입니다! <strong>예약자 정보</strong>를 입력해주세요.' },
    { name: '· 예약 완료', button: 'AI Chat으로 돌아가기', secondary: true, secondaryButton: '예약 취소하기', message: '' }
  ];

  const renderAsStep = (step) => {
    asCurrentStep = Math.min(Math.max(step, 1), asStepMeta.length);
    const meta = asStepMeta[asCurrentStep - 1];

    asStepPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.asStep === String(asCurrentStep));
    });
    asProgressItems.forEach((item, index) => {
      item.classList.toggle('is-active', index < asCurrentStep);
    });

    if (asStepCurrent) asStepCurrent.textContent = String(asCurrentStep);
    if (asStepName) asStepName.textContent = meta.name;
    if (asTitle) asTitle.textContent = asCurrentStep === asStepMeta.length ? '예약확정' : '방문 AS 예약';
    if (asPrimaryButton) asPrimaryButton.textContent = meta.button;
    if (asSecondaryButton) asSecondaryButton.hidden = !meta.secondary;
    if (asSecondaryButton) asSecondaryButton.textContent = meta.secondaryButton || '동의하지 않음 (예약 불가)';
    if (asBubble) asBubble.innerHTML = meta.message;
    asFlow?.classList.toggle('is-complete', asCurrentStep === asStepMeta.length);
  };

  const openAsFlow = () => {
    renderAsStep(1);
    if (categoryModal?.classList.contains('is-open')) closeModal();
    asFlow?.classList.add('is-open');
    asFlow?.setAttribute('aria-hidden', 'false');
  };

  const closeAsFlow = () => {
    asFlow?.classList.remove('is-open');
    asFlow?.setAttribute('aria-hidden', 'true');
  };

  const openLocatorFlow = () => {
    if (categoryModal?.classList.contains('is-open')) closeModal();
    locatorFlow?.classList.add('is-open');
    locatorFlow?.setAttribute('aria-hidden', 'false');
  };

  const closeLocatorFlow = () => {
    locatorFlow?.classList.remove('is-open');
    locatorFlow?.setAttribute('aria-hidden', 'true');
  };

  const openFeatureFlow = (targetId) => {
    const targetFlow = document.getElementById(targetId);
    if (!targetFlow) return;
    if (categoryModal?.classList.contains('is-open')) closeModal();
    targetFlow.classList.add('is-open');
    targetFlow.setAttribute('aria-hidden', 'false');
  };

  const closeFeatureFlow = (flow) => {
    flow.classList.remove('is-open');
    flow.setAttribute('aria-hidden', 'true');
  };

  const renderFaqPanel = (panelName) => {
    faqPanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.faqPanel === panelName);
    });
  };

  if (categoryButton && categoryModal) {
    categoryButton.addEventListener('click', openModal);
    categoryButton.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openModal();
    });
  }

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  supportCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index === 1 || index === 2) {
        openLocatorFlow();
        return;
      }
      if (index === 3) {
        openFeatureFlow('reservation-check-flow');
        return;
      }
      openAsFlow();
    });
  });

  asCategoryButton?.addEventListener('click', openAsFlow);
  locatorCategoryButton?.addEventListener('click', openLocatorFlow);
  locatorCloseButton?.addEventListener('click', closeLocatorFlow);
  featureButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.featureTarget === 'faq-flow') renderFaqPanel('list');
      openFeatureFlow(button.dataset.featureTarget);
    });
  });
  featureBackButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const flow = button.closest('.feature-flow');
      if (flow === faqFlow && flow.querySelector('[data-faq-panel="detail"].is-active')) {
        renderFaqPanel('list');
        return;
      }
      if (flow) closeFeatureFlow(flow);
    });
  });
  faqOpenButtons.forEach((button) => {
    button.addEventListener('click', () => renderFaqPanel(button.dataset.faqOpen));
  });
  locatorTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedTab = button.dataset.locatorTab;
      locatorTabButtons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle('is-active', isSelected);
        item.setAttribute('aria-selected', String(isSelected));
      });
      locatorTabPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.locatorPanel === selectedTab);
      });
    });
  });
  asBackButton?.addEventListener('click', () => {
    if (asCurrentStep === 1) {
      closeAsFlow();
      return;
    }
    renderAsStep(asCurrentStep - 1);
  });
  asPrimaryButton?.addEventListener('click', () => {
    if (asCurrentStep === asStepMeta.length) {
      closeAsFlow();
      return;
    }
    renderAsStep(asCurrentStep + 1);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && categoryModal.classList.contains('is-open')) {
      closeModal();
    }
    if (event.key === 'Escape' && asFlow?.classList.contains('is-open')) {
      closeAsFlow();
    }
    if (event.key === 'Escape' && locatorFlow?.classList.contains('is-open')) {
      closeLocatorFlow();
    }
    featureFlows.forEach((flow) => {
      if (event.key === 'Escape' && flow.classList.contains('is-open')) {
        closeFeatureFlow(flow);
      }
    });
  });
});
