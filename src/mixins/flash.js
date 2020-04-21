import { FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '@store/flash/mutations'
import uniqid from 'uniqid';
import { mapState } from 'vuex';
export default {
  computed: {
      ...mapState({
          flashMessages: state => state.flash.messages,
      }),

  },
  methods: {
      flash(message, type = 'success') {
          const id = uniqid()

          this.$store.commit(FLASH_MESSAGE, {
              id,
              type,
              message
          })


          setTimeout(() => {
              this.$store.commit(CLEAR_FLASH_MESSAGE, id)
          }, 3000)
      }
  }
}