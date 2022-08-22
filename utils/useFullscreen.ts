import React from 'react';

interface FullscreenElement {
  requestFullscreen?: Element['requestFullscreen'];
  webkitRequestFullscreen?: Element['requestFullscreen'];
  webkitRequestFullScreen?: Element['requestFullscreen'];
  mozRequestFullScreen?: Element['requestFullscreen'];
  msRequestFullscreen?: Element['requestFullscreen'];
}

interface FullscreenDocumentEventMap {
  fullscreenchange: DocumentEventMap['fullscreenchange'];
  webkitfullscreenchange: DocumentEventMap['fullscreenchange'];
  mozfullscreenchange: DocumentEventMap['fullscreenchange'];
  MSFullscreenChange: DocumentEventMap['fullscreenchange'];

  fullscreenerror: DocumentEventMap['fullscreenerror'];
  webkitfullscreenerror: DocumentEventMap['fullscreenerror'];
  mozfullscreenerror: DocumentEventMap['fullscreenerror'];
  MSFullscreenError: DocumentEventMap['fullscreenerror'];
}

interface FullscreenDocument {
  fullscreenEnabled?: Document['fullscreenEnabled'];
  webkitFullscreenEnabled?: Document['fullscreenEnabled'];
  mozFullScreenEnabled?: Document['fullscreenEnabled'];
  msFullscreenEnabled?: Document['fullscreenEnabled'];

  fullscreenElement?: Document['fullscreenElement'];
  webkitFullscreenElement?: Document['fullscreenElement'];
  webkitCurrentFullScreenElement?: Document['fullscreenElement'];
  mozFullScreenElement?: Document['fullscreenElement'];
  msFullscreenElement?: Document['fullscreenElement'];

  exitFullscreen?: Document['exitFullscreen'];
  webkitExitFullscreen?: Document['exitFullscreen'];
  webkitCancelFullScreen?: Document['exitFullscreen'];
  mozCancelFullScreen?: Document['exitFullscreen'];
  msExitFullscreen?: Document['exitFullscreen'];

  addEventListener<K extends keyof FullscreenDocumentEventMap>(
    type: K,
    listener: (this: Document, ev: FullscreenDocumentEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof FullscreenDocumentEventMap>(
    type: K,
    listener: (this: Document, ev: FullscreenDocumentEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
}

const FullscreenApi = {
  DOM_UNAVAILABLE_ERROR:
    'DOM is unavailable server-side. Please use this method client-side only.',
  FULLSCREEN_UNSUPPORTED_ERROR: 'Your browser does not support Fullscreen API.',

  getEventsNames(): Array<keyof FullscreenDocumentEventMap> | null {
    if (typeof document === 'undefined') return null;

    const _document = document as FullscreenDocument;

    if ('exitFullscreen' in _document)
      return ['fullscreenchange', 'fullscreenerror'];
    if ('webkitExitFullscreen' in _document)
      return ['webkitfullscreenchange', 'webkitfullscreenerror'];
    if ('webkitCancelFullScreen' in _document)
      return ['webkitfullscreenchange', 'webkitfullscreenerror'];
    if ('mozCancelFullScreen' in _document)
      return ['mozfullscreenchange', 'mozfullscreenerror'];
    if ('msExitFullscreen' in _document)
      return ['MSFullscreenChange', 'MSFullscreenError'];

    return null;
  },

  getEventName(eventType: 'change' | 'error') {
    const eventsNames = this.getEventsNames();
    if (!eventsNames) return null;

    if (eventType === 'change') return eventsNames[0];
    return eventsNames[1];
  },

  get fullscreenEnabled() {
    if (typeof document === 'undefined') return false;

    const _document = document as FullscreenDocument;

    return (
      _document.fullscreenEnabled ||
      _document.webkitFullscreenEnabled ||
      !!_document.webkitCancelFullScreen ||
      _document.mozFullScreenEnabled ||
      _document.msFullscreenEnabled ||
      false
    );
  },

  get fullscreenElement() {
    if (typeof document === 'undefined') return null;

    const _document = document as FullscreenDocument;

    return (
      _document.fullscreenElement ||
      _document.webkitFullscreenElement ||
      _document.webkitCurrentFullScreenElement ||
      _document.mozFullScreenElement ||
      _document.msFullscreenElement ||
      null
    );
  },

  requestFullscreen(
    element: Element | null,
    options?: FullscreenOptions | undefined,
  ): Promise<void> {
    if (typeof document === 'undefined')
      throw new Error(this.DOM_UNAVAILABLE_ERROR);

    const target = (element ?? document.documentElement) as FullscreenElement;

    const method =
      target.requestFullscreen ||
      target.webkitRequestFullscreen ||
      target.webkitRequestFullScreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullscreen;

    if (!method) throw new Error(this.FULLSCREEN_UNSUPPORTED_ERROR);

    return method.call(target, options);
  },

  exitFullscreen(): Promise<void> {
    if (typeof document === 'undefined')
      throw new Error(this.DOM_UNAVAILABLE_ERROR);

    const _document = document as FullscreenDocument;

    const method =
      _document.exitFullscreen ||
      _document.webkitExitFullscreen ||
      _document.webkitCancelFullScreen ||
      _document.mozCancelFullScreen ||
      _document.msExitFullscreen;

    if (!method) throw new Error(this.FULLSCREEN_UNSUPPORTED_ERROR);

    return method.call(_document);
  },

  on(eventType: 'change' | 'error', callback: (event: Event) => void) {
    const eventName = this.getEventName(eventType);
    if (!eventName) return;

    (document as FullscreenDocument).addEventListener(eventName, callback);
  },

  off(eventType: 'change' | 'error', callback: (event: Event) => void) {
    const eventName = this.getEventName(eventType);
    if (!eventName) return;

    (document as FullscreenDocument).removeEventListener(eventName, callback);
  },
};

interface UseFullscreenProps {
  target?: React.RefObject<Element>;
  onChange?: (event: Event) => void;
  onError?: (event: Event) => void;
  requestFullScreenOptions?: FullscreenOptions;
}

function useFullscreen(props: UseFullscreenProps = {}) {
  const { target, onChange, onError, requestFullScreenOptions } = props;

  const [isFullscreenAvailable, setIsFullscreenAvailable] =
    React.useState<boolean>(false);
  const [fullscreenElement, setFullscreenElement] =
    React.useState<Element | null>(null);
  const [isFullscreenEnabled, setIsFullscreenEnabled] =
    React.useState<boolean>(false);

  const enableFullscreen = React.useCallback(() => {
    return FullscreenApi.requestFullscreen(
      target?.current || null,
      requestFullScreenOptions,
    );
  }, [target, requestFullScreenOptions]);

  const disableFullscreen = React.useCallback(() => {
    return FullscreenApi.exitFullscreen();
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    if (!!FullscreenApi.fullscreenElement) return disableFullscreen();
    return enableFullscreen();
  }, [enableFullscreen, disableFullscreen]);

  const onChangeHandler = React.useCallback(
    (event: Event) => {
      const fullscreenElement = FullscreenApi.fullscreenElement;
      setFullscreenElement(fullscreenElement);
      setIsFullscreenEnabled(!!fullscreenElement);
      onChange?.(event);
    },
    [onChange],
  );

  const onErrorHandler = React.useCallback(
    (event: Event) => {
      const fullscreenElement = FullscreenApi.fullscreenElement;
      setFullscreenElement(fullscreenElement);
      setIsFullscreenEnabled(!!fullscreenElement);
      onError?.(event);
    },
    [onError],
  );

  // Set state after first client-side render
  React.useEffect(() => {
    setIsFullscreenAvailable(FullscreenApi.fullscreenEnabled);
  }, []);

  // Attach event listeners
  React.useEffect(() => {
    FullscreenApi.on('change', onChangeHandler);
    FullscreenApi.on('error', onErrorHandler);

    return () => {
      FullscreenApi.off('change', onChangeHandler);
      FullscreenApi.off('error', onErrorHandler);
    };
  }, [onChangeHandler, onErrorHandler]);

  return {
    isFullscreenAvailable,
    fullscreenElement,
    isFullscreenEnabled,
    enableFullscreen,
    disableFullscreen,
    toggleFullscreen,
  };
}

export default useFullscreen;
