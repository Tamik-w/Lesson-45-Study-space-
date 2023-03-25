// import React, { useState } from "react";

// function App () {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState(0);
//   const [login, setLogin] = useState('')

//   const [isNameValid, setIsNameValid] = useState(false)
//   const [isEmailValid, setIsEmailValid] = useState(false)
//   const [isAgeValid, setIsAgeValid] = useState(false)
//   const [isLoginValid, setIsLoginValid] = useState(false)

//   const submit = (e) => {
//     e.preventDefault();
    
//     if (name.trim().length <= 1 || /\d/.test(name)) {
//       setIsNameValid(false);
//     } else {
//       setIsNameValid(true);
//     }

//     if (login.length <= 5) {
//       setIsLoginValid(false);
//     } else {
//       setIsLoginValid(true);
//     }

//     if (age < 18) {
//       setIsAgeValid(false);
//     } else {
//       setIsAgeValid(true);
//     }

//     if (
//       !/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
//     ) {
//       setIsEmailValid(false);
//     } else {
//       setIsEmailValid(true);
//     }

//     if (isNameValid && isEmailValid && isAgeValid && isLoginValid) {
//       console.log(`Your name: ${name}; Your email: ${email}; Your age: ${age}; Your login: ${login}`);
//     }
//   }

//   const nameChange = e => setName(e.target.value);
//   const emailChange = e => setEmail(e.target.value);
//   const ageChange = e => setAge(e.target.value);
//   const loginChange = e => setLogin(e.target.value);


//   return (
//   <div className="wrapper">
//     <form onSubmit={submit}>
//       <label>Name</label>
//       <input onInput={nameChange} className={isNameValid ? '' : 'invalid'}/>
//       {!isNameValid && <p>Enter correct name</p>}
//       <label>Login</label>
//       <input onInput={loginChange} className={isLoginValid ? '' : 'invalid'}/>
//       {!isLoginValid && <p>Enter correct email</p>}
//       <label>Age</label>
//       <input type="number" onInput={ageChange} className={isAgeValid ? '' : 'invalid'}/>
//       {!isAgeValid && <p>You are too young</p>}
//       <label>Email</label>
//       <input onInput={emailChange} className={isEmailValid ? '' : 'invalid'}/>
//       {!isEmailValid && <p>Enter correct email</p>}
//       <button type="submit">Sign in</button>
//     </form>
//   </div>
//   );
//   } 

// export default App;


//FORMIK

// import React from "react";
// import { useFormik } from "formik";

// function App () {

//   const validate = values => {
//     const errors = {};

//     if(!values.name || !/^[a-zA-Z]+$/.test(values.name)) {
//       errors.name = 'Enter correct name'
//     }

//     if(!values.login || values.login.length < 6) {
//       errors.login = 'Enter correct login'
//     }

//     if(!values.age || values.age < 18) {
//       errors.age = 'You are too young'
//     }

//     if(!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = 'Enter correct email'
//     }

//     return errors;
//   }

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       age: '',
//       login: '',
//     },
//     validate,
//     onSubmit: values => {
//       console.log(`Your name: ${values.name}; Your email: ${values.email}; Your age: ${values.age}; Your login: ${values.login}`)
//     },
//   });

//   return (
//     <div className="wrapper">
//       <form onSubmit={formik.handleSubmit}>
//         <label>Name</label>
//         <input
//           name="name"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.name}
//           className={formik.errors.name ? 'invalid' : ''}
//         />
//         {formik.errors.name && <p>{formik.errors.name}</p>}

//         <label>Login</label>
//         <input
//           name="login"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.login}
//           className={formik.errors.login ? 'invalid' : ''}
//         />
//         {formik.errors.login && <p>{formik.errors.login}</p>}

//         <label>Age</label>
//         <input
//           name="age"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.age}
//           className={formik.errors.age ? 'invalid' : ''}
//         />
//         {formik.errors.age && <p>{formik.errors.age}</p>}

//         <label>Email</label>
//         <input
//           name="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//           className={formik.errors.email ? 'invalid' : ''}
//         />
//         {formik.errors.email && <p>{formik.errors.email}</p>}

//         <button type="submit">Sign in</button>
//       </form>
//     </div>
//   );
// } 

// export default App;

//REACT-HOOK-FORM

import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      login: '',
      age: 0,
      email: '',
    },
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: async (data) => {
      let errors = {};
      if (!data.name) {
        errors.name = { message: 'Name is required' };
      } else if (!/^[A-Za-z]+$/i.test(data.name)) {
        errors.name = {
          message: 'Name must not contain numbers or special characters',
        };
      }
      if (!data.login) {
        errors.login = { message: 'Login is required' };
      } else if (data.login.length < 6) {
        errors.login = { message: 'Login must be at least 6 characters' };
      }
      if (!data.age) {
        errors.age = { message: 'Age is required' };
      } else if (data.age < 18) {
        errors.age = { message: 'You must be at least 18 years old' };
      }
      if (!data.email) {
        errors.email = { message: 'Email is required' };
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = { message: 'Invalid email address' };
      }
      return {
        values: data,
        errors: errors,
      };
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          {...register('name', { required: true })}
          className={errors?.name ? 'invalid' : ''}
        />
        {errors?.name && <p>{errors.name.message}</p>}
        <label>Login</label>
        <input
          {...register('login', { required: true })}
          className={errors?.login ? 'invalid' : ''}
        />
        {errors?.login && <p>{errors.login.message}</p>}
        <label>Age</label>
        <input
          {...register('age', { required: true })}
          type='number'
          className={errors?.age ? 'invalid' : ''}
        />
        {errors?.age && <p>{errors.age.message}</p>}
        <label>Email</label>
        <input
          {...register('email', { required: true })}
          className={errors?.email ? 'invalid' : ''}
        />
        {errors?.email && <p>{errors.email.message}</p>}
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
}

export default App;