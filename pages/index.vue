<template>
  <div class="showcase pb-10">
    <h1 class="text-h1 logo text-center mt-16">
      <span id="barkod-logo" class="mr-4">barkod</span>exchange
    </h1>

    <div class="kartica-converter mx-auto mt-16" style="margin-top: 128px !important">
      <v-card class="py-3 px-3">
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
            <div class="main-flex-convertor d-flex justify-space-between">
              <div class="flex-grow-1 d-flex flex-column justify-end mr-2">
                <span class="mb-0;">Količina:</span>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="amount"
                  :rules="{
                    required: true,
                    regex: validNumberRegex,
                  }"
                >
                  <v-text-field
                    v-model="frm.amount"
                    :error-messages="errors"
                    label=""
                    required
                    outlined
                    dense
                    hint="Up to 3 decimals"
                  ></v-text-field>
                </ValidationProvider>
              </div>

              <div class="flex-grow-1 d-flex flex-column justify-end">
                <span class="mb-0;">Konverzija iz:</span>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="selectBase"
                  rules="required"
                >
                  <v-select
                    v-model="frm.baseCurrency"
                    :items="currencies"
                    label=""
                    outlined
                    :error-messages="errors"
                    dense
                  ></v-select>
                </ValidationProvider>
              </div>

              <v-btn
                style="background: #1b1824"
                dark
                class="mt-auto mx-2 mb-7"
                fab
                small
                ><v-icon dark> fas fa-exchange-alt</v-icon></v-btn
              >

              <div class="flex-grow-1 d-flex flex-column justify-end">
                <span class="mb-0;">Konverzija u:</span>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="selectQuote"
                  rules="required"
                >
                  <v-select
                    v-model="frm.quoteCurrency"
                    :items="currencies"
                    label=""
                    outlined
                    :error-messages="errors"
                    dense
                  ></v-select>
                </ValidationProvider>
              </div>

              <!-- <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Outlined style"
          outlined
        ></v-select>
      </v-col> -->
            </div>

            <div class="d-flex justify-end">
              <v-btn class="mr-4" @click="clear"> Clear </v-btn>
              <v-btn type="submit" :disabled="invalid" :loading="buttonLoading">
                Submit
              </v-btn>
            </div>
          </form>
        </ValidationObserver>
      </v-card>
      <v-card
        class="mt-12 d-flex flex-column mx-auto pa-4"
        style="max-width: 400px"
      >
        <p>Trenutne kvote:</p>
        <v-chip label outlined>USD - RSD</v-chip>
        <v-chip label outlined>USD - RSD</v-chip>
        <v-chip label outlined>USD - RSD</v-chip>
      </v-card>
    </div>
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
    baseCurrency: '',
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
  currencies: ['RSD', 'USD', 'EUR', 'JPY'],
  validNumberRegex: /^(\d+(\.\d{0,3})?)$/,
})

const methods = {
  async submit() {
    this.buttonLoading = true
    console.log('submit', this.frm)

    let res
    try {
      res = await this.$axios.$post(
        `https://obscure-cliffs-09563.herokuapp.com/convert?from=${this.frm.baseCurrency}&to=${this.frm.quoteCurrency}&amount=${this.frm.amount}`
      )
      console.log(res)
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
  /* background: rgba(111, 111, 111, 0.8); */

  /* background: #1b1824; */
  color: #fff;

  /* position: relative; */
}

@media only screen and (max-width: 800px) {
  .main-flex-convertor {
    flex-direction: column;
  }
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
}

.v-input {
  /* background: coral; */
}

.v-input.v-select {
  /* background: red; */

  width: 100%;
}
</style>
