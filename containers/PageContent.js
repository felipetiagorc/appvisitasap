import Header from './Header';
import Link from 'next/link';
import routes from '../containers/LeftSideBar-Rotas';
import { Suspense, lazy } from 'react';
import SuspenseContent from './SuspenseContent';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const Page404 = lazy(() => import('../pages/404'));

function PageContent() {
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector(state => state.header);

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [pageTitle]);

  return (
    <div className='drawer-content flex flex-col '>
      <Header />
      <main
        className='flex-1 overflow-y-auto pt-8 px-6  bg-base-200'
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          {routes.map((route, key) => {
            return <Link key={key} exact={true} href={`${route.path}`} />;
          })}

          {/* Redirecting unknown url to 404 page */}
        </Suspense>
        <div className='h-16'></div>
      </main>
    </div>
  );
}

export default PageContent;
