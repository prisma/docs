import React, {useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import type {Props} from '@theme/Layout';
import styles from './styles.module.css';
import { useUTMPersistenceDocs } from '@site/src/utils/useUTMPersistenceDocs';

export default function Layout(props: Props): ReactNode {
  const {
    children,
    noFooter,
    wrapperClassName,
    title,
    description,
  } = props;

  useKeyboardNavigation();
  useUTMPersistenceDocs();

  useEffect(() => {
    const utms = sessionStorage.getItem('utm_params');
    if (!utms) return;

    const updateLinks = (links: NodeListOf<Element>) => {
      links.forEach((a) => {
        const href = a.getAttribute('href');
        if (!href) return;
        try {
          const url = new URL(href, window.location.origin);
          new URLSearchParams(utms).forEach((v, k) => url.searchParams.set(k, v));
          a.setAttribute('href', url.toString());
        } catch (e) {
        }
      });
    };

    updateLinks(document.querySelectorAll('a[href*="console.prisma.io"]'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            const links = node.querySelectorAll('a[href*="console.prisma.io"]');
            updateLinks(links);
            if (node.matches('a[href*="console.prisma.io"]')) {
              updateLinks([node] as any);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isKapaModalOpen = document.querySelector('#__docusaurus[aria-hidden="true"]');
      if (isKapaModalOpen && event.key === "/") {
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div
        id={SkipToContentFallbackId}
        className={clsx(ThemeClassNames.wrapper.main, styles.mainWrapper, wrapperClassName)}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}
