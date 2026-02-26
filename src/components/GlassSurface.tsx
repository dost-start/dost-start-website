'use client';
import React, { useEffect, useRef, useState, useId } from 'react';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: 'R' | 'G' | 'B';
  yChannel?: 'R' | 'G' | 'B';
  mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
    | 'plus-darker'
    | 'plus-lighter';
  className?: string;
  style?: React.CSSProperties;
  /** When true, uses plain backdrop-blur with no refractive/chromatic effects for a flat matte frosted look */
  matte?: boolean;
  /** Override light/dark appearance. 'light' = light frosted glass, 'dark' = dark frosted glass. When unset, uses prefers-color-scheme. */
  variant?: 'light' | 'dark';
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 48,
  opacity = 0.9,
  blur = 14,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 0.85,
  distortionScale = -60,
  redOffset = 0,
  greenOffset = 4,
  blueOffset = 8,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {},
  matte = true,
  variant
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const isDarkMode = useDarkMode();

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }

    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;

    return div.style.backdropFilter !== '';
  };

  const supportsBackdropFilter = () => {
    if (typeof window === 'undefined') return true;
    return CSS.supports('backdrop-filter', 'blur(10px)');
  };

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      '--glass-frost': backgroundOpacity,
      '--glass-saturation': saturation
    } as React.CSSProperties;

    const backdropFilterSupported = supportsBackdropFilter();

    // Matte: reference glass style with main, edge, sheen layers
    if (matte) {
      const effectiveDark = variant !== undefined ? variant === 'dark' : isDarkMode;

      // Reference values: main-bg rgba(255,255,255,0.2), main-blur 0.5rem, edge 0.01rem, sheen
      const mainBg = effectiveDark ? 'rgba(20, 25, 35, 0.65)' : 'rgba(255, 255, 255, 0.65)';
      const mainBlur = effectiveDark ? '20px' : '0.5rem';
      const edgeWidth = '0.01rem';
      const edgeBg = effectiveDark ? 'rgba(255,255,255,0.05)' : 'rgba(100, 100, 100, 0)';
      const sheenBg = effectiveDark ? 'rgba(0,0,0,0.03)' : 'rgba(100, 100, 100, 0.05)';
      const border = effectiveDark
        ? '1px solid rgba(255, 255, 255, 0.15)'
        : `${edgeWidth} solid rgba(0, 0, 0, 0.04)`;
      const shadow = effectiveDark
        ? '0 0 0 1px rgba(0,0,0,0.2), 0 4px 24px rgba(0,0,0,0.12)'
        : '0 0 0 1px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.08), inset 0 0 4rem rgba(100,100,100,0.05)';

      if (backdropFilterSupported) {
        return {
          ...baseStyles,
          '--main-background-color': mainBg,
          '--main-blur': mainBlur,
          '--edge-blur': mainBlur,
          '--edge-background-color': edgeBg,
          '--edge-width': edgeWidth,
          '--sheen-background-color': sheenBg,
          '--sheen-blur': '4rem',
          background: mainBg,
          backdropFilter: `blur(${mainBlur}) saturate(${effectiveDark ? '0.9' : '1'})`,
          WebkitBackdropFilter: `blur(${mainBlur}) saturate(${effectiveDark ? '0.9' : '1'})`,
          border,
          boxShadow: shadow,
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease'
        } as React.CSSProperties;
      }
      return {
        ...baseStyles,
        background: effectiveDark ? 'rgba(20, 25, 35, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        border,
        boxShadow: shadow,
        transition: 'background 0.3s ease'
      } as React.CSSProperties;
    }

    if (svgSupported && !matte) {
      return {
        ...baseStyles,
        background: isDarkMode ? `hsl(0 0% 0% / ${backgroundOpacity})` : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 1px 1px color-mix(in oklch, white, transparent 88%) inset,
             0 0 8px 3px color-mix(in oklch, white, transparent 92%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.04),
             0px 8px 24px rgba(17, 17, 26, 0.04),
             0px 16px 48px rgba(17, 17, 26, 0.04)`
          : `0 0 1px 1px color-mix(in oklch, black, transparent 92%) inset,
             0 0 8px 3px color-mix(in oklch, black, transparent 95%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.04),
             0px 8px 24px rgba(17, 17, 26, 0.04),
             0px 16px 48px rgba(17, 17, 26, 0.04)`
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(14px) saturate(1.2) brightness(1.05)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.2) brightness(1.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: `0 0 1px 1px rgba(255, 255, 255, 0.1) inset,
                        0px 8px 24px rgba(17, 17, 26, 0.06)`
          };
        }
      } else {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(14px) saturate(1.2) brightness(1.05)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.2) brightness(1.05)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: `0 0 1px 1px rgba(0, 0, 0, 0.06) inset,
                        0px 8px 24px rgba(17, 17, 26, 0.08)`
          };
        }
      }
    }
  };

  const glassSurfaceClasses =
    'relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out';

  const focusVisibleClasses = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  return (
    <div
      ref={containerRef}
      className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
      style={getContainerStyles()}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      {matte ? (
        <>
          <div className="glass-edge" aria-hidden />
          <div className="glass-sheen" aria-hidden />
          <div className=" !inset-0 z-10 flex !h-full w-full items-center justify-center p-2 rounded-[inherit]">
            {children}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default GlassSurface;
