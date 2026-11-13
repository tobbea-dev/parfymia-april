import { Component } from '@theme/component';
import { debounce, onDocumentLoaded, setHeaderMenuStyle } from '@theme/utilities';
import { MegaMenuHoverEvent } from '@theme/events';

/**
 * A custom element that manages a header menu.
 *
 * @typedef {Object} State
 * @property {HTMLElement | null} activeItem - The currently active menu item.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} overflowMenu - The overflow menu.
 * @property {HTMLElement[]} [submenu] - The submenu in each respective menu item.
 *
 * @extends {Component<Refs>}
 */
class HeaderMenu extends Component {
  requiredRefs = ['overflowMenu'];

  /**
   * @type {MutationObserver | null}
   */
  #submenuMutationObserver = null;

  connectedCallback() {
    super.connectedCallback();

    onDocumentLoaded(this.#preloadImages);
    window.addEventListener('resize', this.#resizeListener);
    this.overflowMenu?.addEventListener('pointerleave', this.#overflowSubmenuListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.#resizeListener);
    // Parfymia GOA-5: Escape listener, only attached while a menu item is active
    document.removeEventListener('keydown', this.#onKeyDown);
    document.body.removeEventListener('pointermove', this.#onPointerMove);
    if (this.#state.activeItem) {
      this.#stopPointerTracking(this.#state.activeItem);
    }
    this.overflowMenu?.removeEventListener('pointerleave', this.#overflowSubmenuListener);
    this.#cleanupMutationObserver();
  }

  /**
   * Debounced resize event listener to recalculate menu style
   */
  #resizeListener = debounce(() => {
    setHeaderMenuStyle();
  }, 100);

  #overflowSubmenuListener = () => {
    this.#deactivate();
  };

  /**
   * Parfymia GOA-5: set while focus is moved back to the trigger after Escape, so that the focus does not reopen the menu.
   * @type {boolean}
   */
  #ignoreActivate = false;

  /**
   * Parfymia GOA-5: close the open submenu when the Escape key is pressed. Listens on the document while a menu
   * item is active, so that a menu opened by hover closes too. Focus moves to the item that opened the menu only
   * when it was inside the menu. The event is left untouched, so other Escape listeners still receive it.
   * @param {KeyboardEvent} event
   */
  #onKeyDown = (event) => {
    if (event.key !== 'Escape') return;

    const item = this.#state.activeItem;
    if (!item) return;

    // Items in the overflow menu are opened by the "More" button
    const trigger = item.parentElement?.matches('[slot="overflow"]') ? this.moreButton : item;

    // Escape closes the overflow menu even while the pointer is over it
    this.#deactivate(item, true);

    const focused = document.activeElement;
    if (!trigger || focused === trigger || !this.contains(focused)) return;

    this.#ignoreActivate = true;
    try {
      trigger.focus();
    } finally {
      this.#ignoreActivate = false;
    }
  };

  /**
   * @type {State}
   */
  #state = {
    activeItem: null,
  };

  /**
   * @type {ReturnType<typeof setTimeout> | undefined}
   */
  #pointerIdleTimer;

  /**
   * Last known pointer position for Safari hit-test reconciliation.
   * @type {{ x: number, y: number }}
   */
  #lastPointer = { x: 0, y: 0 };

  /**
   * Update the safety box idle state on the active menu item.
   * @param {PointerEvent} event
   */
  #onPointerMove = (event) => {
    const activeLink = this.#state.activeItem;
    if (!activeLink) return;

    this.#lastPointer.x = event.clientX;
    this.#lastPointer.y = event.clientY;

    const moving = Math.abs(event.movementX) >= 1 || event.movementY >= 1;
    activeLink.dataset.safetyBox = `${moving}`;

    clearTimeout(this.#pointerIdleTimer);
    if (moving) {
      this.#pointerIdleTimer = setTimeout(() => {
        if (this.#state.activeItem) {
          this.#state.activeItem.dataset.safetyBox = 'false';
          this.#reconcilePointerTarget();
        }
      }, 50);
    } else {
      this.#reconcilePointerTarget();
    }
  };

  /**
   * Check if the pointer is over a different menu item and trigger activation if so.
   * Works around Safari not re-evaluating hit targets after pseudo-element changes.
   */
  #reconcilePointerTarget() {
    const { x, y } = this.#lastPointer;
    requestAnimationFrame(() => {
      const target = document.elementFromPoint(x, y);
      if (!target) return;
      const listItem = target.closest('.menu-list__list-item');
      if (listItem && !listItem.contains(this.#state.activeItem)) {
        listItem.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false }));
      }
    });
  }

  /**
   * Begin pointer tracking for the safety box on the newly active item.
   * @param {HTMLElement} item
   * @param {HTMLElement | null} previousItem
   */
  #startPointerTracking(item, previousItem) {
    if (previousItem) {
      this.#stopPointerTracking(previousItem);
    } else {
      document.body.addEventListener('pointermove', this.#onPointerMove);
    }

    const rect = item.getBoundingClientRect();
    const isOverlap = this.headerComponent?.hasAttribute('data-submenu-overlap-bottom-row');
    const boundary = isOverlap ? this.headerComponent?.querySelector('.header__row--top') : this.headerComponent;
    item.style.setProperty('--box-height', `${(boundary?.getBoundingClientRect().bottom ?? 0) - rect.top}px`);
  }

  /**
   * Stop pointer tracking and remove all safety box properties from an item.
   * @param {HTMLElement} item
   */
  #stopPointerTracking(item) {
    clearTimeout(this.#pointerIdleTimer);
    this.#pointerIdleTimer = undefined;
    item.style.removeProperty('--box-height');
    delete item.dataset.safetyBox;
  }

  /**
   * Get the overflow menu
   */
  get overflowMenu() {
    return /** @type {HTMLElement | null} */ (this.refs.overflowMenu?.shadowRoot?.querySelector('[part="overflow"]'));
  }

  /**
   * Whether the overflow list is hovered
   * @returns {boolean}
   */
  get overflowListHovered() {
    return this.refs.overflowMenu?.shadowRoot?.querySelector('[part="overflow-list"]')?.matches(':hover') ?? false;
  }

  /**
   * Parfymia GOA-5: get the "More" button that opens the overflow menu
   */
  get moreButton() {
    return /** @type {HTMLButtonElement | null} */ (this.querySelector('[slot="more"] button'));
  }

  get headerComponent() {
    return /** @type {HTMLElement | null} */ (this.closest('header-component'));
  }

  /**
   * Activate the selected menu item immediately
   * @param {PointerEvent | FocusEvent} event
   */
  activate = (event) => {
    // Parfymia GOA-5: focus returned by Escape does not reopen the menu
    if (this.#ignoreActivate) return;

    this.dispatchEvent(new MegaMenuHoverEvent());

    if (!(event.target instanceof Element) || !this.headerComponent) return;

    let item = findMenuItem(event.target);

    if (!item || item == this.#state.activeItem) return;

    const isDefaultSlot = event.target.slot === '';

    this.dataset.overflowExpanded = (!isDefaultSlot).toString();

    // Parfymia GOA-5: state on the "More" button
    if (this.moreButton) {
      this.moreButton.ariaExpanded = this.dataset.overflowExpanded;
    }

    const previouslyActiveItem = this.#state.activeItem;

    if (previouslyActiveItem) {
      previouslyActiveItem.ariaExpanded = 'false';
    }

    this.#state.activeItem = item;
    this.ariaExpanded = 'true';
    item.ariaExpanded = 'true';
    // Parfymia GOA-5: listen for Escape while a menu item is active
    document.addEventListener('keydown', this.#onKeyDown);

    let submenu = findSubmenu(item);
    const hasSubmenu = Boolean(submenu);

    if (!hasSubmenu && !isDefaultSlot) {
      submenu = this.overflowMenu;
    }

    if (submenu) {
      // Mark submenu as active for content-visibility optimization
      submenu.dataset.active = '';

      // Cleanup any existing mutation observer from previous menu activations
      this.#cleanupMutationObserver();

      // Monitor DOM mutations to catch deferred content injection (from section hydration)
      this.#submenuMutationObserver = new MutationObserver(() => {
        requestAnimationFrame(() => {
          // Double requestAnimationFrame to ensure the height is properly calculated and not defaulting to the contain-intrinsic-size
          requestAnimationFrame(() => {
            if (submenu.offsetHeight > 0) {
              this.headerComponent?.style.setProperty('--submenu-height', `${submenu.offsetHeight}px`);
              this.#cleanupMutationObserver();
            }
          });
        });
      });
      this.#submenuMutationObserver.observe(submenu, { childList: true, subtree: true });

      // Auto-disconnect after 500ms to prevent memory leaks
      setTimeout(() => {
        this.#cleanupMutationObserver();
      }, 500);
    }

    let finalHeight = submenu?.offsetHeight || 0;

    // For overflow menu, the height needs to be either content of the submenu or the total height of the menu list links
    if (!isDefaultSlot) {
      const overflowListHeight = this.#getOverflowListLinksHeight();
      if (hasSubmenu) {
        /* Note: When the submenu is inside the overflow menu, its offsetHeight is not valid due to the lack of padding
         * we could add the padding variables to the submenu.offsetHeight, but measuring the overflowMenu.offsetHeight is just easier */
        const overflowHeight = this.overflowMenu?.offsetHeight || 0;
        finalHeight = Math.max(overflowHeight, overflowListHeight);
      } else {
        finalHeight = overflowListHeight;
      }
    }

    if (!submenu) {
      // If there is no content to open, don't try to open it
      finalHeight = 0;
    }

    this.headerComponent.style.setProperty('--submenu-height', `${finalHeight}px`);
    this.#setFullOpenHeaderHeight(finalHeight);
    this.style.setProperty('--submenu-opacity', '1');
    this.#startPointerTracking(item, previouslyActiveItem);
  };

  /**
   * Parfymia GOA-5: click, Enter or Space on the "More" item opens the overflow menu when it is closed.
   * Only keyboard activation closes an open one: a mouse click comes after the hover that opened it.
   * @param {MouseEvent} event
   */
  toggleOverflow = (event) => {
    if (this.dataset.overflowExpanded !== 'true') {
      this.activate(event);
    } else if (event.detail === 0) {
      this.#deactivate(this.#state.activeItem, true);
    }
  };

  /**
   * Deactivate the active item after a delay
   * @param {PointerEvent | FocusEvent} event
   */
  deactivate(event) {
    if (!(event.target instanceof Element)) return;

    const menu = findSubmenu(this.#state.activeItem);
    const isMovingWithinMenu = event.relatedTarget instanceof Node && menu?.contains(document.activeElement);
    const isMovingToSubmenu =
      event.relatedTarget instanceof Node && event.type === 'blur' && menu?.contains(event.relatedTarget);
    const isMovingToOverflowMenu =
      event.relatedTarget instanceof Node && event.relatedTarget.parentElement?.matches('[slot="overflow"]');

    if (isMovingWithinMenu || isMovingToOverflowMenu || isMovingToSubmenu) {
      if (this.#state.activeItem) {
        this.#stopPointerTracking(this.#state.activeItem);
      }
      return;
    }

    this.#deactivate();
  }

  /**
   * Deactivate the active item immediately
   * @param {HTMLElement | null} [item]
   * @param {boolean} [force] - Parfymia GOA-5: close even when the overflow menu is hovered (keyboard)
   */
  #deactivate = (item = this.#state.activeItem, force = false) => {
    if (!item || item != this.#state.activeItem) return;

    // Don't deactivate if the overflow menu or overflow list is still being hovered
    if (!force && (this.overflowListHovered || this.overflowMenu?.matches(':hover'))) return;

    this.headerComponent?.style.setProperty('--submenu-height', '0px');
    this.#setFullOpenHeaderHeight(0);
    this.style.setProperty('--submenu-opacity', '0');
    this.dataset.overflowExpanded = 'false';

    // Parfymia GOA-5: state on the "More" button, and stop listening for Escape
    if (this.moreButton) {
      this.moreButton.ariaExpanded = 'false';
    }
    document.removeEventListener('keydown', this.#onKeyDown);

    const submenu = findSubmenu(item);

    document.body.removeEventListener('pointermove', this.#onPointerMove);
    this.#stopPointerTracking(item);

    this.#state.activeItem = null;
    this.ariaExpanded = 'false';
    item.ariaExpanded = 'false';

    // Remove active state from submenu after animation completes
    if (submenu) {
      delete submenu.dataset.active;
    }
  };

  #getOverflowListLinksHeight() {
    const slottedMenuLinks = this.overflowMenu?.querySelector('slot')?.assignedElements();
    if (!slottedMenuLinks) return this.overflowMenu?.offsetHeight || 0;

    /**
     * @param {(submenu: HTMLElement) => void} cb
     */
    const mapSubmenus = (cb) => {
      slottedMenuLinks.forEach((link) => {
        const submenu = /** @type {HTMLElement | null} */ (link.querySelector('[ref="submenu[]"]'));
        if (submenu) {
          cb(submenu);
        }
      });
    };

    mapSubmenus((submenu) => {
      submenu.style.setProperty('display', 'none');
    });
    const height = this.overflowMenu?.offsetHeight || 0;
    mapSubmenus((submenu) => {
      submenu.style.removeProperty('display');
    });
    return height;
  }

  /**
   * Calculate and set the full open header height. If the submenu is not open, the full open header height is 0.
   * @param {number} submenuHeight
   */
  #setFullOpenHeaderHeight(submenuHeight) {
    if (!this.headerComponent) return;

    const isOverlapSituation = this.headerComponent.hasAttribute('data-submenu-overlap-bottom-row');

    const headerVisibleHeight =
      isOverlapSituation && this.headerComponent.offsetHeight > 0
        ? /** @type {HTMLElement | null} */ (this.headerComponent.querySelector('.header__row--top'))?.offsetHeight ?? 0
        : this.headerComponent.offsetHeight;

    const nothingToOpen = submenuHeight === 0;
    const fullOpenHeaderHeight = nothingToOpen ? 0 : submenuHeight + (headerVisibleHeight ?? 0);

    this.headerComponent?.style.setProperty('--full-open-header-height', `${fullOpenHeaderHeight}px`);
  }

  /**
   * Preload images that are set to load lazily.
   */
  #preloadImages = () => {
    const images = this.querySelectorAll('img[loading="lazy"]');
    images?.forEach((image) => image.removeAttribute('loading'));
  };

  #cleanupMutationObserver() {
    this.#submenuMutationObserver?.disconnect();
    this.#submenuMutationObserver = null;
  }
}

if (!customElements.get('header-menu')) {
  customElements.define('header-menu', HeaderMenu);
}

/**
 * Find the closest menu item.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findMenuItem(element) {
  if (!(element instanceof Element)) return null;

  if (element?.matches('[slot="more"')) {
    // Select the first overflowing menu item when hovering over the "More" item
    return findMenuItem(element.parentElement?.querySelector('[slot="overflow"]'));
  }

  return element?.querySelector('[ref="menuitem"]');
}

/**
 * Find the closest submenu.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findSubmenu(element) {
  const submenu = element?.parentElement?.querySelector('[ref="submenu[]"]');
  return submenu instanceof HTMLElement ? submenu : null;
}
