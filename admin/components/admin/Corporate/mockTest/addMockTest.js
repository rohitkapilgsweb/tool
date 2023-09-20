import React from 'react';
import dynamic from 'next/dynamic';
// import withAuth from 'redux/services/withAuth';

const AddMockTest = dynamic(() => import('../../../../page-components/admin/college/mockTest'), {
  ssr: false,
});

const CreateMockTestAdd = () => {
  return (
    <>
      <AddMockTest />
    </>
  );
};

export default CreateMockTestAdd