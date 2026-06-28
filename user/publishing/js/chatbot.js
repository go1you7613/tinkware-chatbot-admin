(() => {
  const app = document.querySelector('[data-js="chatbot"]');
  if (!app) return;

  const categorySheet = app.querySelector('[data-js="categorySheet"]');
  const categoryToggle = app.querySelector('[data-js="categoryToggle"]');
  const chatInput = app.querySelector('[data-js="chatInput"]');
  const messageList = app.querySelector('[data-js="messageList"]');
  const ownedProductStates = Array.from(app.querySelectorAll('[data-owned-product-state]'));
  const scrollArea = app.querySelector('[data-js="scrollArea"]');
  const flows = Array.from(app.querySelectorAll('[data-flow]'));
  const asFlow = app.querySelector('[data-js="asFlow"]');
  const asSteps = asFlow ? Array.from(asFlow.querySelectorAll('[data-as-step]')) : [];
  const asProgress = asFlow?.querySelector('[data-js="asProgress"]');
  const asStepText = asFlow?.querySelector('[data-js="asStepText"]');
  const asBodyStepCurrent = asFlow?.querySelector('[data-js="asBodyStepCurrent"]');
  const asBodyStepRest = asFlow?.querySelector('[data-js="asBodyStepRest"]');
  const asStepCurrent = asFlow?.querySelector('[data-js="asStepCurrent"]');
  const asStepName = asFlow?.querySelector('[data-js="asStepName"]');
  const asFlowTitle = asFlow?.querySelector('[data-js="asFlowTitle"]');
  const asGuideText = asFlow?.querySelector('[data-js="asGuideText"]');
  const asAllAgree = asFlow?.querySelector('[data-js="asAllAgree"]');
  const asRequiredAgree = asFlow?.querySelector('[data-js="asRequiredAgree"]');
  const asCalendarEl = asFlow?.querySelector('[data-js="asCalendar"]');
  const asSlotGrid = asFlow?.querySelector('[data-js="asSlotGrid"]');
  const asSlotTitle = asFlow?.querySelector('[data-js="asSlotTitle"]');
  const asSummaryDate = asFlow?.querySelector('[data-js="asSummaryDate"]');
  const asSummaryTime = asFlow?.querySelector('[data-js="asSummaryTime"]');
  const asRegionSelect = asFlow?.querySelector('[data-js="asRegionSelect"]');
  const asRegionLabel = asFlow?.querySelector('[data-js="asRegionLabel"]');
  const asToast = asFlow?.querySelector('[data-js="asToast"]');
  let asToastTimer = null;
  let asStepIndex = 0;

  // ── 캘린더 · 시간 슬롯 ────────────────────────────────────────
  const DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];

  // 프로토타입용 요일별 예약 가능 시간 (0=일, 6=토 = 센터 휴무)
  const SLOT_AVAIL = {
    1: ['09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30'],
    2: ['09:30', '10:00', '13:00', '14:00', '14:30'],
    3: ['09:30', '10:00', '10:30', '13:30', '14:00'],
    4: ['09:30', '11:00', '13:00', '13:30', '14:30'],
    5: ['09:30', '10:00', '10:30', '14:00']
  };

  const ALL_TIME_SLOTS = [
    { time: '09:00', alwaysDisabled: true },
    { time: '09:30' }, { time: '10:00' }, { time: '10:30' }, { time: '11:00' },
    { time: '11:30', alwaysDisabled: true },
    { time: 'LUNCH', lunch: true },
    { time: '13:00' }, { time: '13:30' }, { time: '14:00' }, { time: '14:30' }
  ];

  const renderTimeSlots = (date) => {
    if (!asSlotGrid || !asSlotTitle) return;
    const dow = date.getDay();
    const avail = SLOT_AVAIL[dow] || [];
    const m = date.getMonth() + 1;
    const d = date.getDate();
    asSlotTitle.textContent = `${m}월 ${d}일(${DOW_KO[dow]}) 예약 가능 시간`;
    asSlotGrid.innerHTML = ALL_TIME_SLOTS.map((slot) => {
      if (slot.lunch) {
        return '<button class="is-break" type="button" disabled>점심 (12~13시)</button>';
      }
      const disabled = slot.alwaysDisabled || !avail.includes(slot.time);
      const [h, min] = slot.time.split(':');
      const label = `${parseInt(h)}시 ${min}분`;
      return disabled
        ? `<button type="button" disabled aria-label="${label}">${slot.time}</button>`
        : `<button type="button" aria-label="${label}" data-action="select-slot" data-time="${slot.time}">${slot.time}</button>`;
    }).join('');
  };

  const updateAsSummaryDate = (date) => {
    if (!asSummaryDate || !date) return;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    asSummaryDate.textContent = `${year}년 ${month}월 ${day}일 (${DOW_KO[date.getDay()]})`;
  };

  const updateAsSummaryTime = (time) => {
    if (!asSummaryTime || !time) return;
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const period = hour >= 12 ? '오후' : '오전';
    const display = String(hour % 12 || 12).padStart(2, '0');
    asSummaryTime.textContent = `${period} ${display}:${m}`;
  };

  // Flatpickr 한국어 로케일 (CDN 별도 파일 없이 인라인 정의)
  const KO_LOCALE = {
    weekdays: {
      shorthand: ['일', '월', '화', '수', '목', '금', '토'],
      longhand: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    },
    months: {
      shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    },
    firstDayOfWeek: 0
  };

  let calendarInstance = null;
  let activeCalendarMonthSelect = null;

  const closeCalendarMonthSelect = () => {
    if (!activeCalendarMonthSelect) return;
    activeCalendarMonthSelect.classList.remove('is-open');
    activeCalendarMonthSelect.querySelector('[data-js="calendarMonthButton"]')?.setAttribute('aria-expanded', 'false');
    activeCalendarMonthSelect = null;
  };

  const syncCalendarMonthDropdown = (fp) => {
    const currentMonth = fp.calendarContainer?.querySelector('.flatpickr-current-month');
    const nativeSelect = currentMonth?.querySelector('select.flatpickr-monthDropdown-months, select.cur-month');
    if (!currentMonth || !nativeSelect) return;

    nativeSelect.classList.add('is-enhanced');
    nativeSelect.setAttribute('aria-hidden', 'true');
    nativeSelect.tabIndex = -1;
    let wrapper = currentMonth.querySelector('[data-js="calendarMonthSelect"]');

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'twc-calendar-month-select';
      wrapper.dataset.js = 'calendarMonthSelect';

      const button = document.createElement('button');
      button.className = 'twc-calendar-month-button';
      button.type = 'button';
      button.dataset.js = 'calendarMonthButton';
      button.setAttribute('aria-haspopup', 'listbox');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', '월 선택');

      const list = document.createElement('div');
      list.className = 'twc-calendar-month-list';
      list.dataset.js = 'calendarMonthList';
      list.setAttribute('role', 'listbox');
      list.setAttribute('aria-label', '월 선택 목록');

      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const willOpen = !wrapper.classList.contains('is-open');
        closeCalendarMonthSelect();
        wrapper.classList.toggle('is-open', willOpen);
        button.setAttribute('aria-expanded', String(willOpen));
        activeCalendarMonthSelect = willOpen ? wrapper : null;
      });

      wrapper.append(button, list);
      currentMonth.insertBefore(wrapper, nativeSelect);
    }

    const button = wrapper.querySelector('[data-js="calendarMonthButton"]');
    const list = wrapper.querySelector('[data-js="calendarMonthList"]');
    if (!button || !list) return;

    button.textContent = KO_LOCALE.months.shorthand[fp.currentMonth];
    list.innerHTML = '';

    KO_LOCALE.months.shorthand.forEach((label, index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.textContent = label;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(index === fp.currentMonth));
      option.className = index === fp.currentMonth ? 'is-selected' : '';
      option.addEventListener('click', (event) => {
        event.stopPropagation();
        fp.changeMonth(index, false);
        closeCalendarMonthSelect();
        syncCalendarMonthDropdown(fp);
      });
      list.appendChild(option);
    });
  };

  document.addEventListener('click', closeCalendarMonthSelect);

  const closeAsRegionSelect = () => {
    if (!asRegionSelect) return;
    asRegionSelect.classList.remove('is-open');
    asRegionSelect.querySelector('[data-action="toggle-as-region"]')?.setAttribute('aria-expanded', 'false');
  };

  const toggleAsRegionSelect = () => {
    if (!asRegionSelect) return;
    const isOpen = asRegionSelect.classList.toggle('is-open');
    asRegionSelect.querySelector('[data-action="toggle-as-region"]')?.setAttribute('aria-expanded', String(isOpen));
  };

  const selectAsRegion = (button) => {
    if (!asRegionSelect || !button) return;
    const label = button.dataset.regionLabel || button.textContent.trim();
    if (asRegionLabel) asRegionLabel.textContent = label;
    asRegionSelect.querySelectorAll('[role="option"]').forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('is-selected', isSelected);
      option.setAttribute('aria-selected', String(isSelected));
    });
    closeAsRegionSelect();
  };

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-js="asRegionSelect"]')) closeAsRegionSelect();
  });

  const initCalendar = () => {
    if (!asCalendarEl || typeof flatpickr === 'undefined') return;
    if (calendarInstance) {
      calendarInstance.redraw();
      syncCalendarMonthDropdown(calendarInstance);
      return;
    }
    calendarInstance = flatpickr(asCalendarEl, {
      inline: true,
      locale: KO_LOCALE,
      minDate: 'today',
      disable: [(date) => date.getDay() === 0 || date.getDay() === 6],
      onReady: (dates, str, fp) => {
        syncCalendarMonthDropdown(fp);
      },
      onMonthChange: (dates, str, fp) => {
        syncCalendarMonthDropdown(fp);
      },
      onYearChange: (dates, str, fp) => {
        syncCalendarMonthDropdown(fp);
      },
      onDayCreate: (dates, str, fp, dayElem) => {
        const dow = dayElem.dateObj?.getDay();
        if (dow === 0) dayElem.classList.add('is-sunday');
        if (dow === 6) dayElem.classList.add('is-saturday');
      },
      onChange: (dates) => {
        if (!dates.length) return;
        renderTimeSlots(dates[0]);
        updateAsSummaryDate(dates[0]);
      }
    });
  };
  // ────────────────────────────────────────────────────────────

  const asStepMeta = [
    {
      label: '약관 동의',
      shortLabel: '· 약관동의',
      next: '동의하고 다음 단계로',
      prev: '동의하지 않음 (예약 불가)',
      showPrev: true,
      guide: '방문 AS 예약을 시작하겠습니다.<br>먼저 <strong>개인정보 수집·이용</strong>에 동의해주세요.'
    },
    {
      label: '센터 선택',
      shortLabel: '· 센터 선택',
      next: '다음 단계 (날짜·시간 선택)',
      showPrev: false,
      guide: '방문하실 <strong>서비스센터</strong>를 선택해주세요.<br>지역을 선택하거나 현재 위치로 가까운 센터를 찾을 수 있습니다.'
    },
    {
      label: '날짜·시간 선택',
      shortLabel: '· 날짜·시간 선택',
      next: '다음 단계 (예약자 정보 입력)',
      showPrev: false,
      guide: '방문 날짜와 시간을 선택해주세요.<br><strong>점심 시간(12~13시)</strong>과 예약 완료 시간은 선택할 수 없습니다.'
    },
    {
      label: '예약자 정보',
      shortLabel: '· 예약자 정보 입력',
      next: '예약 확정하기',
      showPrev: false,
      guide: '마지막 단계입니다. 예약자 정보를 입력해주세요.'
    },
    {
      label: '예약 완료',
      shortLabel: '· 예약 완료',
      next: 'AI Chat으로 돌아가기',
      prev: '예약 취소하기',
      showPrev: true,
      guide: ''
    }
  ];
  const flowAliases = {
    'product-search-flow': 'product-flow',
    'product-spec-flow': 'spec-flow',
    'reservation-check-flow': 'reservation-flow'
  };

  const resolveFlowId = (flowId) => flowAliases[flowId] || flowId;

  const navigateTo = (href) => {
    if (!href) return;
    window.location.href = href;
  };

  const scrollToBottom = () => {
    if (!scrollArea) return;
    requestAnimationFrame(() => {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    });
  };

  const showAsToast = (message, focusTarget) => {
    if (!asToast) return;
    window.clearTimeout(asToastTimer);
    asToast.textContent = message;
    asToast.hidden = false;
    requestAnimationFrame(() => asToast.classList.add('is-visible'));
    focusTarget?.focus?.({ preventScroll: true });
    asToastTimer = window.setTimeout(() => {
      asToast.classList.remove('is-visible');
      asToastTimer = window.setTimeout(() => {
        asToast.hidden = true;
      }, 180);
    }, 2200);
  };

  const setSheetOpen = (isOpen) => {
    if (!categorySheet) return;
    categorySheet.classList.toggle('is-open', isOpen);
    categorySheet.setAttribute('aria-hidden', String(!isOpen));
    categoryToggle?.setAttribute('aria-expanded', String(isOpen));
  };

  const setupSheetSwipeClose = () => {
    const panel = categorySheet?.querySelector('.sheet-panel');
    if (!panel) return;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const resetPanel = () => {
      panel.style.transform = '';
      panel.style.transition = '';
    };

    panel.addEventListener('pointerdown', (event) => {
      if (!categorySheet.classList.contains('is-open')) return;
      if (event.target.closest('button, a, input, textarea, select, label, [data-action]')) return;
      isDragging = true;
      startY = event.clientY;
      currentY = startY;
      panel.style.transition = 'none';
      panel.setPointerCapture?.(event.pointerId);
    });

    panel.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      currentY = event.clientY;
      const deltaY = currentY > startY ? currentY - startY : 0;
      if (deltaY > 0) panel.style.transform = `translateY(${deltaY}px)`;
    });

    const finishDrag = () => {
      if (!isDragging) return;
      const deltaY = currentY > startY ? currentY - startY : 0;
      isDragging = false;
      if (deltaY > 80) {
        resetPanel();
        setSheetOpen(false);
        return;
      }
      resetPanel();
    };

    panel.addEventListener('pointerup', finishDrag);
    panel.addEventListener('pointercancel', finishDrag);
  };

  const closeAllFlows = () => {
    flows.forEach((flow) => {
      flow.classList.remove('is-open');
      flow.setAttribute('aria-hidden', 'true');
    });
  };

  const setTab = (group, target) => {
    if (!group || !target) return;
    app.querySelectorAll(`[data-tab-group="${group}"]`).forEach((item) => {
      const isActive = item.dataset.tabTarget === target;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    app.querySelectorAll(`[data-tab-panel="${group}"]`).forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.tabName === target);
    });
  };

  const openFlow = (flowId, options = {}) => {
    const resolvedFlowId = resolveFlowId(flowId);
    const target = document.getElementById(resolvedFlowId);
    if (!target) return;
    setSheetOpen(false);
    closeAllFlows();
    if (resolvedFlowId === 'as-flow') {
      asStepIndex = 0;
      renderAsStep();
    }
    if (resolvedFlowId === 'locator-flow' && options.locatorTab) {
      setTab('locator', options.locatorTab);
    }
    target.classList.add('is-open');
    target.setAttribute('aria-hidden', 'false');
    target.querySelector('button, input, textarea, [tabindex]')?.focus({ preventScroll: true });
  };

  const closeFlow = (trigger) => {
    const flow = trigger?.closest?.('[data-flow]') || flows.find((item) => item.classList.contains('is-open'));
    if (!flow) return;
    flow.classList.remove('is-open');
    flow.setAttribute('aria-hidden', 'true');
  };

  const getNowLabel = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes}`;
  };

  const getNowDatetime = () => new Date().toISOString().slice(0, 16);

  const addUserMessage = (message) => {
    if (!messageList || !message) return;
    const row = document.createElement('div');
    row.className = 'twc-message-row is-user';
    row.innerHTML = `
      <div class="twc-message-bubble is-user"></div>
      <time class="message-time"></time>
    `;
    row.querySelector('.twc-message-bubble').textContent = message;
    const userTimeEl = row.querySelector('.message-time');
    userTimeEl.textContent = getNowLabel();
    userTimeEl.setAttribute('datetime', getNowDatetime());
    messageList.appendChild(row);
  };

  const addAiMessage = (message) => {
    if (!messageList) return;
    const row = document.createElement('div');
    row.className = 'twc-message-row is-ai';
    row.innerHTML = `
      <article class="twc-message-bubble is-ai">
        <p class="twc-body-relaxed"></p>
        <div class="answer-actions">
          <button class="twc-btn twc-btn-secondary twc-focus-ring" type="button" data-action="open-flow" data-flow-target="product-search-flow">추천 제품 보기</button>
          <button class="twc-btn twc-btn-secondary twc-focus-ring" type="button" data-action="open-flow" data-flow-target="faq-flow">FAQ 보기</button>
        </div>
      </article>
      <time class="message-time"></time>
    `;
    row.querySelector('.twc-body-relaxed').textContent = message;
    const aiTimeEl = row.querySelector('.message-time');
    aiTimeEl.textContent = getNowLabel();
    aiTimeEl.setAttribute('datetime', getNowDatetime());
    messageList.appendChild(row);
  };

  const sendMessage = (value) => {
    const message = value.trim();
    if (!message) return;
    addUserMessage(message);
    addAiMessage('문의 내용을 확인했습니다. 관련 제품 안내와 고객지원 메뉴를 함께 확인해보세요.');
    if (chatInput) chatInput.value = '';
    scrollToBottom();
  };

  const renderAsStep = () => {
    if (!asFlow) return;
    const meta = asStepMeta[asStepIndex];
    asSteps.forEach((step, index) => {
      step.classList.toggle('is-active', index === asStepIndex);
    });
    if (asProgress) asProgress.dataset.progress = String(asStepIndex + 1);
    if (asBodyStepCurrent && asBodyStepRest) {
      asBodyStepCurrent.textContent = String(asStepIndex + 1);
      asBodyStepRest.textContent = ` / ${asSteps.length} ${meta.label}`;
    } else if (asStepText) {
      asStepText.textContent = `${asStepIndex + 1} / ${asSteps.length} ${meta.label}`;
    }
    if (asStepCurrent) asStepCurrent.textContent = String(asStepIndex + 1);
    if (asStepName) asStepName.textContent = meta.shortLabel;
    if (asFlowTitle) asFlowTitle.textContent = asStepIndex === asSteps.length - 1 ? '예약확정' : '방문 AS 예약';
    if (asGuideText) asGuideText.innerHTML = meta.guide;
    asFlow.classList.toggle('is-complete', asStepIndex === asSteps.length - 1);
    if (asStepIndex === 2) initCalendar();
    const prev = asFlow.querySelector('[data-action="as-prev"]');
    const next = asFlow.querySelector('[data-action="as-next"]');
    if (prev) {
      prev.hidden = !meta.showPrev;
      prev.textContent = meta.prev || '이전';
    }
    if (next) next.textContent = meta.next;
  };

  const validateAsStep = () => {
    const activeStep = asSteps[asStepIndex];
    if (!activeStep) return true;

    if (asStepIndex === 0 && asRequiredAgree && !asRequiredAgree.checked) {
      showAsToast('필수 개인정보 수집·이용에 동의해주세요.', asRequiredAgree);
      return false;
    }

    if (asStepIndex === 1) {
      if (!asRegionLabel?.textContent.trim()) {
        showAsToast('서비스센터를 찾을 지역을 선택해주세요.', activeStep.querySelector('[data-action="toggle-as-region"]'));
        return false;
      }
      const selectedCenter = activeStep.querySelector('.as-center-card.is-selected');
      if (!selectedCenter) {
        showAsToast('방문하실 서비스센터를 선택해주세요.', activeStep.querySelector('.as-center-card'));
        return false;
      }
    }

    if (asStepIndex === 2) {
      if (!asSummaryDate?.textContent.trim() || asSummaryDate.textContent.trim() === '—') {
        showAsToast('예약 날짜를 선택해주세요.', activeStep.querySelector('[data-js="asCalendar"]'));
        return false;
      }
      if (!asSummaryTime?.textContent.trim() || asSummaryTime.textContent.trim() === '—') {
        showAsToast('예약 시간을 선택해주세요.', activeStep.querySelector('[data-js="asSlotGrid"] button:not(:disabled)'));
        return false;
      }
    }

    if (asStepIndex === 3) {
      const emptyField = Array.from(activeStep.querySelectorAll('input, textarea')).find((field) => !field.value.trim());
      if (emptyField) {
        showAsToast('예약자 정보를 모두 입력해주세요.', emptyField);
        return false;
      }
    }

    return true;
  };

  const goToPreviousAsStep = (trigger) => {
    if (asStepIndex <= 0) {
      closeFlow(trigger);
      return;
    }
    asStepIndex -= 1;
    renderAsStep();
  };

  const setOwnedProductState = (state) => {
    ownedProductStates.forEach((section) => {
      const isActive = section.dataset.ownedProductState === state;
      section.hidden = !isActive;
      section.setAttribute('aria-hidden', String(!isActive));
    });
  };

  const renderOwnedProductEmpty = () => {
    setOwnedProductState('empty');
  };

  const renderOwnedProductRegistered = () => {
    setOwnedProductState('registered');
  };

  const selectInGroup = (button) => {
    const group = button.closest('.twc-segment, .survey-choice-grid, .score-grid, .reason-grid, .slot-grid, .calendar-grid, .as-step');
    if (!group) return;
    const items = group.classList.contains('as-step')
      ? Array.from(group.querySelectorAll('.twc-place-card'))
      : Array.from(group.querySelectorAll('button'));
    items.forEach((item) => item.classList.remove('is-selected', 'is-active'));
    if (group.classList.contains('twc-segment')) {
      button.classList.add('is-active', 'is-selected');
    } else {
      button.classList.add('is-selected');
    }
  };

  const switchTab = (button) => {
    const group = button.dataset.tabGroup;
    const target = button.dataset.tabTarget;
    setTab(group, target);
  };

  const renderFaq = (view) => {
    app.querySelectorAll('[data-faq-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.faqPanel === view);
    });
  };

  const showButtonFeedback = (button) => {
    button.classList.add('is-selected');
    window.setTimeout(() => button.classList.remove('is-selected'), 1200);
  };

  app.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-action]');
    if (!actionTarget) return;
    if (actionTarget.tagName === 'A') event.preventDefault();

    const action = actionTarget.dataset.action;
    if (action === 'open-sheet') setSheetOpen(true);
    if (action === 'close-sheet') setSheetOpen(false);
    if (action === 'open-flow') {
      openFlow(actionTarget.dataset.flowTarget || actionTarget.dataset.featureTarget, {
        locatorTab: actionTarget.dataset.locatorTab
      });
    }
    if (action === 'navigate') navigateTo(actionTarget.dataset.href);
    if (action === 'close-flow') closeFlow(actionTarget);
    if (action === 'as-back') goToPreviousAsStep(actionTarget);
    if (action === 'send-message') sendMessage(chatInput?.value || '');
    if (action === 'send-suggestion') sendMessage(actionTarget.dataset.message || actionTarget.textContent || '');
    if (action === 'select-in-group') selectInGroup(actionTarget);
    if (action === 'toggle-as-region') toggleAsRegionSelect();
    if (action === 'select-as-region') selectAsRegion(actionTarget);
    if (action === 'select-slot') {
      selectInGroup(actionTarget);
      updateAsSummaryTime(actionTarget.dataset.time);
    }
    if (action === 'register-product') renderOwnedProductRegistered();
    if (action === 'button-feedback') showButtonFeedback(actionTarget);
    if (action === 'switch-tab') switchTab(actionTarget);
    if (action === 'faq-detail') renderFaq('detail');
    if (action === 'faq-list') renderFaq('list');
    if (action === 'as-prev' && asStepIndex > 0) {
      if (asStepIndex === asSteps.length - 1) {
        showButtonFeedback(actionTarget);
        return;
      }
      asStepIndex -= 1;
      renderAsStep();
      return;
    }
    if (action === 'as-prev' && asStepIndex === 0) closeFlow(actionTarget);
    if (action === 'as-next') {
      if (!validateAsStep()) return;
      if (asStepIndex >= asSteps.length - 1) {
        closeFlow(actionTarget);
      } else {
        asStepIndex += 1;
        renderAsStep();
      }
    }
  });

  chatInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  asAllAgree?.addEventListener('change', () => {
    if (asRequiredAgree) asRequiredAgree.checked = asAllAgree.checked;
  });

  asRequiredAgree?.addEventListener('change', () => {
    if (asAllAgree) asAllAgree.checked = asRequiredAgree.checked;
  });

  app.querySelector('[data-js="loginForm"]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    renderOwnedProductEmpty();
    closeFlow(event.target);
  });

  app.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target.closest('[role="button"][data-action]');
    if (!target) return;
    event.preventDefault();
    target.click();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (categorySheet?.classList.contains('is-open')) {
      setSheetOpen(false);
      return;
    }
    closeFlow();
  });

  const openInitialHashFlow = () => {
    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (hashTarget) openFlow(hashTarget);
  };

  window.addEventListener('hashchange', openInitialHashFlow);

  setupSheetSwipeClose();
  setOwnedProductState('guest');
  renderAsStep();
  openInitialHashFlow();
})();
