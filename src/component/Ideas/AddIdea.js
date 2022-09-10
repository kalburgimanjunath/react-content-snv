import React, { useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import ListIdea from './ListIdea';
import { Label, FormGroup, Input, Button } from 'reactstrap';

// import { useAlert } from 'react-alert';
export default function AddIdea() {
  // const alert = useAlert();

  const [ideas, setIdeas] = useState();
  const [image_url, setUrl] = useState();
  useEffect(() => {
    fetch(
      'https://api.airtable.com/v0/appWToptGxYlLEtgo/Contents?api_key=keyeNXyxxuuYJY19w'
    )
      .then((res) => res.json())
      .then((response) => {
        setIdeas(response.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideas]);
  const saveData = (data) => {
    // console.log(image_url);
    // const url1 = `https://api.cloudinary.com/v1_1/demo/image/upload?api_key=485975791175125`;
    // const requestOptions1 = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/json',
    //   },
    //   body: JSON.stringify({
    //     file: { image_url },
    //     upload_preset: 'e1idtzym',
    //   }),
    // };
    // console.log({ file: data.fields.image, upload_preset: 'e1idtzym' });
    // fetch(url1, requestOptions1)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data.url));

    const url = `https://api.airtable.com/v0/appWToptGxYlLEtgo/Contents`;
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

    // alert.show('Oh look, an alert!');
  };
  return (
    <div className="row" style={{ padding: 20 }} xs="2">
      <div className="col-6" xs="2">
        <h1>Sensvio Content</h1>
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
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              saveData({ fields: values });
              setSubmitting(false);
            }, 400);
            resetForm();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <FormGroup row>
                <Label htmlFor="title">Title</Label>
                <Field type="title" name="title" placeholder="Enter Title" />
                <ErrorMessage name="title" component="div" />
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="description">Description</Label>
                <Field
                  type="text"
                  as="textarea"
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
                <Field
                  type="text"
                  name="url"
                  placeholder="Enter Idea demo url"
                />
                <ErrorMessage name="url" component="div" />
              </FormGroup>
              <Button type="submit" className="primary" disabled={isSubmitting}>
                Add Idea
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="col-6">
        <ListIdea ideas={ideas} />
      </div>
    </div>
  );
}
