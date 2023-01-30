import routes from './LeftSideBar-Rotas';
// import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
// import NavLink from '../components/NavLink';

import SidebarSubmenu from './SidebarSubmenu';
import Image from 'next/image';
import Brasao from 'public/brasao-sp-eleicao.png';
import Link from 'next/link';

function LeftSidebar() {
  const router = useRouter();

  return (
    <div className='drawer-side '>
      <label htmlFor='left-sidebar-drawer' className='drawer-overlay'></label>
      <ul className='menu  pt-2 w-52 bg-base-100 text-base-content'>
        <li className='mb-2 font-semibold text-xl'>
          <Link href={'/'}>
            <Image
              className='text-center'
              width='150'
              height='60'
              src={Brasao}
              alt='BrasaoSP'
            />
          </Link>
        </li>
        {routes.map((item, k) => {
          return (
            <Link href={item.path} key={k}>
              <div
                className={`w-48 h-24 text-center pt-6 border-2 border-secondary-500  mt-3 cursor-pointer  ${
                  router.asPath === item.path
                    ? 'text-primary-500'
                    : 'text-secondary-300'
                }`}
              >
                <div className=' hover:text-primary-500 w-10 mx-auto pb-2'>
                  {item.icon}
                </div>

                <p className='text-secondary-300'>{item.name}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
