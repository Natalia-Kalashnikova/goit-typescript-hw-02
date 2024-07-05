import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { AiOutlineSearch } from "react-icons/ai";
import css from './SearchBar.module.css';
import { SearchBarProps, FormValues } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
          if (values.query.trim() === '') {
            toast.error('Please enter a keyword of search!');
            return;
          }
          onSubmit(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btn} type="submit">
            <AiOutlineSearch size='25' />
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
