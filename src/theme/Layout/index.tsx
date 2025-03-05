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
import { useHistory, useLocation } from '@docusaurus/router';

export default function Layout(props: Props): ReactNode {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();
  const location = useLocation(); // Get current URL
  const history = useHistory(); // Router navigation

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const hasUTMParams =
      currentParams.has("utm_source") ||
      currentParams.has("utm_medium") ||
      currentParams.has("utm_campaign");

    if (!hasUTMParams) {
      const storedParams = localStorage.getItem("utm_params");

      if (storedParams) {
        history.replace(`${location.pathname}?${storedParams}`);
      }
    } else {
      localStorage.setItem("utm_params", currentParams.toString());
    }
  }, [location, history]);
  
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
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName,
        )}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}
