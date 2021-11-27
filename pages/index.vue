<template>
  <div class="showcase">
    <h1 class="text-h1 logo">
      <span id="barkod-logo" class="mr-4">barkod</span>exchange
    </h1>

    <v-card class="kartica-converter py-3 px-3">
      <ValidationObserver
        v-slot="{ invalid }"
        ref="observer"
        style="max-width: 800px; margin: auto"
      >
        <form
          class="mt-3"
          style="max-width: 800px; margin: auto"
          @submit.prevent="submit"
        >
          <div class="d-flex justify-space-between">
            <div class="flex-grow-1 d-flex flex-column justify-end">
              <span class="mb-0;">Količina:</span>
              <ValidationProvider
                v-slot="{ errors }"
                name="amount"
                rules="required"
              >
                <v-text-field
                  v-model="frm.name"
                  :error-messages="errors"
                  label=""
                  required
                ></v-text-field>
              </ValidationProvider>
            </div>
            <div class="flex-grow-1 d-flex align-end"><span>from</span></div>
            <v-btn style="background: #1b1824" dark class="mx-2" fab small
              ><v-icon dark> mdi-minus </v-icon></v-btn
            >
            <div class="flex-grow-1 d-flex align-end"><span>to</span></div>
          </div>

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

          <div class="d-flex justify-end">
            <v-btn class="mr-4" @click="clear"> Clear </v-btn>
            <v-btn type="submit" :disabled="invalid" :loading="buttonLoading">
              Submit
            </v-btn>
          </div>
        </form>
      </ValidationObserver>
    </v-card>
    <div class="converter"></div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
const name = 'ConverterPage'
const components = { ValidationObserver, ValidationProvider }
const frmDefaults = () => {
  return {
    amount: 0,
    currency: '',
    quoteCurrency: '',
  }
}

const frmMetaDefaults = () => ({
  error: null,
  status: null,
})

const data = () => ({
  frm: frmDefaults(),
  frmMeta: frmMetaDefaults(),
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

<style scoped>
.v-main {
  background: red;
}

.showcase {
  height: 50vh;
  background: #1b1824;
  color: #fff;
  position: relative;
}

.showcase .logo {
  position: absolute;
  top: 40%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 800px) {
  .showcase .logo {
    font-size: 4rem !important;
  }
}

@media only screen and (max-width: 600px) {
  .showcase .logo {
    font-size: 2.5rem !important;
  }

  .kartica-converter {
    top: 60% !important;
  }
}

.kartica-converter {
  /* min-width: 600px; */
  width: 80%;
  position: absolute;
  top: 80%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, 0%);
}
</style>
