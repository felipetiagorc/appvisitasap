import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../../components/Cards/TitleCard';
import { showNotification } from '../../../store/slices/headerSlice';

const BILLS = [
  {
    invoiceNo: '#4567',
    amount: '23,989',
    description: 'RG',
    status: 'Em análise',
    generatedOn: '12/01/2023',
    ValidadoOn: '-'
  },

  {
    invoiceNo: '#4523',
    amount: '34,989',
    description: 'CFP',
    status: 'Em análise',
    generatedOn: '15/01/2023',
    ValidadoOn: '-'
  },

  {
    invoiceNo: '#4453',
    amount: '39,989',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '15/01/2023'
  },

  {
    invoiceNo: '#4359',
    amount: '28,927',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '15/01/2023'
  },

  {
    invoiceNo: '#3359',
    amount: '28,927',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '15/01/2023'
  },

  {
    invoiceNo: '#3367',
    amount: '28,927',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '18/01/2023'
  },

  {
    invoiceNo: '#3359',
    amount: '28,927',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '18/01/2023'
  },

  {
    invoiceNo: '#2359',
    amount: '28,927',
    description: 'Product usages',
    status: 'Validado',
    generatedOn: '15/01/2023',
    ValidadoOn: '18/01/2023'
  }
];

function Enviados() {
  const [bills, setBills] = useState(BILLS);

  const getPaymentStatus = status => {
    if (status === 'Validado')
      return <div className='badge badge-success'>{status}</div>;
    if (status === 'Em análise')
      return <div className='badge badge-primary'>{status}</div>;
    else return <div className='badge badge-ghost'>{status}</div>;
  };

  return (
    <>
      <TitleCard title='Documentos Enviados' topMargin='mt-2'>
        {/* Invoice list in table format loaded constant */}
        <div className='overflow-x-auto w-full'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Envio Num</th>
                <th>Gerado em:</th>
                <th>Descrição</th>
                {/* <th>Qtd</th> */}
                <th>Status</th>
                <th>Validado em:</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.invoiceNo}</td>
                    <td>{l.generatedOn}</td>
                    <td>{l.description}</td>
                    {/* <td>${l.amount}</td> */}
                    <td>{getPaymentStatus(l.status)}</td>
                    <td>{l.ValidadoOn}</td>
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

export default Enviados;
