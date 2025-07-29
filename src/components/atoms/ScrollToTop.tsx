import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function getScrollParent(element: HTMLElement | null): HTMLElement | Window {
  if (!element) return window;
  const style = getComputedStyle(element);
  const overflowY = style.overflowY;
  if (overflowY === 'auto' || overflowY === 'scroll') return element;
  return getScrollParent(element.parentElement);
}

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollParent = getScrollParent(document.body);

    if (scrollParent instanceof Window) {
      window.scrollTo(0, 0);
    } else {
      scrollParent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
