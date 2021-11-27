<template>
  <div>
    <h1>Contact page</h1>

    <v-alert
      v-if="frmMeta.status === 'error'"
      border="left"
      prominent
      type="error"
    >
      {{ frmMeta.error }}
    </v-alert>

    <v-alert v-if="frmMeta.status === 'submitted'" border="left" type="info">
      You have successfully sent your message.
    </v-alert>

    <ValidationObserver
      v-slot="{ invalid }"
      ref="observer"
      style="max-width: 800px; margin: auto"
    >
      <form
        class="mt-5"
        style="max-width: 800px; margin: auto"
        @submit.prevent="submit"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:10"
        >
          <v-text-field
            v-model="frm.name"
            :counter="10"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="frm.email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="url"
          :rules="{
            required: true,
            regex: validUrlRegex,
          }"
        >
          <v-text-field
            v-model="frm.url"
            :error-messages="errors"
            label="URL"
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" name="message" rules="max:1000">
          <v-textarea
            v-model="frm.message"
            :error-messages="errors"
            filled
            :counter="1000"
            hint="optional"
            name="input-7-4"
            label="Filled textarea"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="checkbox"
        >
          <v-checkbox
            v-model="frm.agree"
            :error-messages="errors"
            :value="true"
            label="I agree."
            type="checkbox"
            required
          ></v-checkbox>
        </ValidationProvider>

        <div class="d-flex justify-end">
          <v-btn class="mr-4" @click="clear"> Clear </v-btn>
          <v-btn type="submit" :disabled="invalid" :loading="buttonLoading">
            Submit
          </v-btn>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
const FormData = require('form-data')

const name = 'ContactPage'
const components = { ValidationObserver, ValidationProvider }

// https://regexr.com/39nr7
const validUrlRegex =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/

const frmDefaults = () => {
  return {
    name: '',
    email: '',
    url: '',
    message: '',
    agree: false,
  }
}

const frmMetaDefaults = () => ({
  error: null,
  status: null,
})

const data = () => ({
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
  validUrlRegex,
  buttonLoading: false,
})

const methods = {
  async submit() {
    this.buttonLoading = true
    console.log('submit', this.frm)

    let res
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const fd = new FormData()

      Object.keys(this.frm).map((key) => fd.append(key, this.frm[key]))

      res = await this.$axios.$post(
        `http://192.168.1.12:3000/projects/copyright-complaint`,
        fd,
        config
      )
    } catch (err) {
      this.frmMeta.error = err
      this.frmMeta.status = 'error'
      console.log('ERROR', err)
      return
    }
    this.response = res
    console.log(res)

    // timeout 2 msc
    // setTimeout(() => {
    //   this.buttonLoading = false
    //   this.frmMeta.status = 'submitted'
    // }, 2000)

    this.buttonLoading = false
    this.frmMeta.status = 'submitted'

    this.clear()
  },
  clear() {
    this.frm = frmDefaults()
    this.$refs.observer.reset()
  },
}

export default { name, components, data, methods }
</script>
