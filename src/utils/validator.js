import * as Yup from 'yup';


export const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordValidator = /^((?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,})$/;


export const validCategory = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing', 'other'];




export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export const updateSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
});


export const registerSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const validImageType = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

export const productSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  category: Yup.string().oneOf(validCategory, 'Invalid category').required('Category is required'),

  // image: Yup
  //   .mixed()
  //   .required("Required")
  //   .test("is-valid-type", "Not a valid image type",
  //     value => value && validImageType.includes(value.type))
});