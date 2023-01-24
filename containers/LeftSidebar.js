import routes from './LeftSideBar-Rotas';
// import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import NavLink from '../components/NavLink';
import SidebarSubmenu from './SidebarSubmenu';
import Image from 'next/image';
import Brasao from 'public/brasao-sp-eleicao.png';

function LeftSidebar() {
  const router = useRouter();

  return (
    <div className='drawer-side '>
      <label htmlFor='left-sidebar-drawer' className='drawer-overlay'></label>
      <ul className='menu  pt-2 w-80 bg-base-100 text-base-content'>
        <li className='mb-2 font-semibold text-xl'>
          <NavLink href={'/'}>
            <Image
              className='mask mask-squircle w-10'
              width='100'
              height='55'
              src={Brasao}
              alt='BrasaoSP'
            />
            Sistema
          </NavLink>{' '}
        </li>
        {routes.map((route, k) => {
          return (
            <li className='' key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  href={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'
                    }`
                  }
                >
                  {route.icon} {route.name}
                  {router.asPath === route.path ? (
                    <span
                      className='absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                      aria-hidden='true'
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
