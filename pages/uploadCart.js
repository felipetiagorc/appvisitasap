import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/slices/headerSlice';
import UploadCart from '../features/uploadCart';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export const getServerSideProps = async () => {
  const props = { dirs: [] };

  try {
    const dirs = await fs.readdir(path.join(process.cwd(), '/public/uploads'));
    props.dirs = dirs;
    console.log('dirs', dirs);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dirs
    }
  };
};

function InternalPage({ dirs }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Upload' }));
  }, []);
  console.log('dirs:', dirs);
  return (
    <>
      <div>
        {dirs.map((i, k) => (
          <Link href={'/uploads/' + i} key={k}>
            <a className='text-blue-500 hover:underline'>{i}</a>
          </Link>
        ))}
      </div>
      {/* <UploadCart /> */}
    </>
  );
}

export default InternalPage;
