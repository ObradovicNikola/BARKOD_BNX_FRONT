/* eslint-disable camelcase */
import { extend } from 'vee-validate'
import {
  alpha_spaces,
  alpha_num,
  confirmed,
  double,
  email,
  ext,
  length,
  max,
  numeric,
  required,
  required_if,
  regex,
  size,
} from 'vee-validate/dist/rules'

// const validUsernamePattern = /^[a-zA-Z0-9.\-_]{3,20}$/;

extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'This field must only contain alphabetic characters',
})

extend('alpha_num', {
  ...alpha_num,
  message: "We're looking for a-z and 0-9 here.",
})

extend('confirmed', confirmed)

extend('email', {
  ...email,
  message: 'This email is invalid',
})

extend('double', {
  ...double,
  message: 'Up to {decimal} decimal points'
})

extend('length', length)

extend('max', {
  ...max,
  message: 'This field must be less than {length} characters',
})

extend('numeric', numeric)

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('required_if', required_if)

extend('regex', {
  ...regex,
  message: 'This expression is invalid.',
})

extend('checked', {
  validate(value) {
    return value
  },
  message: 'This field must be checked',
})

extend('extAudio', {
  ...ext,
  message: 'This file is invalid. Valid extensions are: mp3, ogg, wav, flac',
})

extend('extImage', {
  ...ext,
  message: 'This file is invalid. Valid extensions are: png, jpeg, jpg',
})

extend('size10MB', {
  ...size,
  message: `Maximum allowed file size is 10MB`,
})

extend('extPictureAndGif', {
  ...ext,
  message: 'This file is invalid. Valid extensions are: png, jpg, jpeg, gif',
})
