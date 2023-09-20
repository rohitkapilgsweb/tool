import React from 'react';
import dynamic from 'next/dynamic';

const AddExams = dynamic(() => import('../../../page-components/admin/college/examAdd'), {
  ssr: false,
});

const CreateCourseAdd = () => {
  return (
    <>
      <AddExams/>
    </>
  );
};

export default CreateCourseAdd