import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  image: Yup.string().required('Image is required'),
  title: Yup.string().required('Title is required'),
  tag_line: Yup.string().required('Tag Line is required'),
  desc: Yup.string().required('Description is required'),
  sell_price: Yup.number().required('Sell Price is required'),
  actual_price: Yup.number().required('Actual Price is required'),
  status: Yup.string().required('Status is required'),
});

export default validationSchema;