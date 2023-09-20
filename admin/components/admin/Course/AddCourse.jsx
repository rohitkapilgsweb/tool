import React from 'react';
import dynamic from 'next/dynamic';

const AddCourse = dynamic(() => import('../../../page-components/admin/college/courseAdd'), {
  ssr: false,
});

const CreateCourseAdd = () => {
  return (
    <>
      <AddCourse />
    </>
  );
};

export default CreateCourseAdd