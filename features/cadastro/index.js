import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../../store/slices/modalSlice';
import { deleteCadastro, getCadastroContent } from './cadastroSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { showNotification } from '../../store/slices/modalSlice';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCadastroModal = () => {
    dispatch(
      openModal({
        title: 'Add New Cadastro',
        bodyType: MODAL_BODY_TYPES.CADASTRO_ADD_NEW
      })
    );
  };

  return (
    <div className='inline-block float-right'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openAddNewCadastroModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Cadastro() {
  const { cadastro } = useSelector(state => state.cadastro);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCadastroContent());
  }, []);

  const getDummyStatus = index => {
    if (index % 5 === 0) return <div className='badge'>Not Interested</div>;
    else if (index % 5 === 1)
      return <div className='badge badge-primary'>In Progress</div>;
    else if (index % 5 === 2)
      return <div className='badge badge-secondary'>Sold</div>;
    else if (index % 5 === 3)
      return <div className='badge badge-accent'>Need Followup</div>;
    else return <div className='badge badge-ghost'>Open</div>;
  };

  const deleteCurrentCadastro = index => {
    dispatch(deleteCadastro({ index }));
    dispatch(showNotification({ message: 'Cadastro Deleted!', status: 1 }));
  };

  return (
    <>
      <TitleCard
        title='Current Cadastro'
        topMargin='mt-2'
        TopSideButtons={<TopSideButtons />}
      >
        {/* Cadastro List in table format loaded from slice after api call */}
        <div className='overflow-x-auto w-full'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cadastro.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className='flex items-center space-x-3'>
                        <div className='avatar'>
                          <div className='mask mask-squircle w-12 h-12'>
                            <img src={l.avatar} alt='Avatar' />
                          </div>
                        </div>
                        <div>
                          <div className='font-bold'>{l.first_name}</div>
                          <div className='text-sm opacity-50'>
                            {l.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>(new Date())</td>
                    <td>{getDummyStatus(k)}</td>
                    <td>{l.last_name}</td>
                    <td>
                      <button
                        className='btn btn-square btn-ghost'
                        onClick={() => deleteCurrentCadastro(k)}
                      >
                        <TrashIcon className='w-5' />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Cadastro;
