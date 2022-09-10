import React, { useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import ListBookmark from './ListBookmark';
import { Label, FormGroup, Input, Button } from 'reactstrap';
export default function AddBookmark() {
  const [bookmarks, setBookmarks] = useState();
  const [image_url, setUrl] = useState();
  useEffect(() => {
    fetch(
      'https://api.airtable.com/v0/appWToptGxYlLEtgo/Bookmarks?api_key=keyeNXyxxuuYJY19w'
    )
      .then((res) => res.json())
      .then((response) => {
        setBookmarks(response.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookmarks]);
  const saveData = (data) => {
    const url = `https://api.airtable.com/v0/appWToptGxYlLEtgo/Ideas`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer keyeNXyxxuuYJY19w',
      },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>Ideas List</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          image: '',
          url: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          // if (!values.image) {
          //   errors.image = 'Required';
          // }
          // if (!values.url) {
          //   errors.url = 'Required';
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            saveData({ fields: values });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <FormGroup row>
              <Label htmlFor="title">Title</Label>
              <Field type="title" name="title" placeholder="Enter Idea Title" />
              <ErrorMessage name="title" component="div" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="description">Description</Label>
              <Field
                type="text"
                name="description"
                placeholder="Enter description"
              />
              <ErrorMessage name="description" component="div" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="image">Image</Label>
              <Field
                type="file"
                name="image"
                placeholder="Enter Idea image"
                onChange={(e) => {
                  setUrl(e.target.files[0]);
                }}
              />
              <ErrorMessage name="image" component="div" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="url">Demo url</Label>
              <Field type="text" name="url" placeholder="Enter Idea demo url" />
              <ErrorMessage name="url" component="div" />
            </FormGroup>
            <Button type="submit" className="primary" disabled={isSubmitting}>
              Add Idea
            </Button>
          </Form>
        )}
      </Formik>
      <ListBookmark bookmarks={bookmarks} />
    </div>
  );
}
