// focus - focusOptions - preventScroll polyfill
(function () {
  if (
    typeof window === "undefined" ||
        typeof document === "undefined" ||
        typeof HTMLElement === "undefined"
  ) {
    return;
  }

  let supportsPreventScrollOption = false;
  try {
    const focusElem = document.createElement("div");
    focusElem.addEventListener(
      "focus",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );
    focusElem.focus(
      Object.defineProperty({}, "preventScroll", {
        get() {
          // Edge v18 gives a false positive for supporting inputs
          if (
            navigator &&
            typeof navigator.userAgent !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.match(/Edge\/1[7-8]/)
          ) {
            supportsPreventScrollOption = false;
          } else {
            supportsPreventScrollOption = true;
          }

          return supportsPreventScrollOption;
        }
      })
    );
  } catch (e) {
    return;
  }

  if (
    HTMLElement.prototype.nativeFocus === undefined &&
        !supportsPreventScrollOption
  ) {
    HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

    const calcScrollableElements = function (element) {
      let parent = element.parentNode;
      const scrollableElements = [];
      const rootScrollingElement =
            document.scrollingElement || document.documentElement;

      while (parent && parent !== rootScrollingElement) {
        if (
          parent.offsetHeight < parent.scrollHeight ||
            parent.offsetWidth < parent.scrollWidth
        ) {
          scrollableElements.push([
            parent,
            parent.scrollTop,
            parent.scrollLeft
          ]);
        }
        parent = parent.parentNode;
      }
      parent = rootScrollingElement;
      scrollableElements.push([parent, parent.scrollTop, parent.scrollLeft]);

      return scrollableElements;
    };

    const restoreScrollPosition = function (scrollableElements) {
      for (let i = 0; i < scrollableElements.length; i++) {
        const [element1, element2, element3] = scrollableElements[i];

        element1.scrollTop = element2;
        element1.scrollLeft = element3;
      }
      scrollableElements = [];
    };

    const patchedFocus = function (args) {
      if (args && args.preventScroll) {
        const evScrollableElements = calcScrollableElements(this);
        if (typeof setTimeout === 'function') {
          const thisElem = this;
          setTimeout(() => {
            thisElem.nativeFocus();
            restoreScrollPosition(evScrollableElements);
          }, 0);
        } else {
          this.nativeFocus();
          restoreScrollPosition(evScrollableElements);
        }
      } else {
        this.nativeFocus();
      }
    };

    HTMLElement.prototype.focus = patchedFocus;
  }
}());
