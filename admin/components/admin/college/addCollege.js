import React from 'react';
import dynamic from 'next/dynamic';
// import withAuth from 'redux/services/withAuth';

const CreateCollege = dynamic(() => import('../../../page-components/admin/college/collegeAdd'), {
  ssr: false,
});

const CreateCollegeAdd = () => {
  return (
    <>
      <CreateCollege />
    </>
  );
};

export default CreateCollegeAdd