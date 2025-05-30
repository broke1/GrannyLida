import { defineStore } from 'pinia'
import { State } from './Store.types'

export const mainStore = defineStore('main', {
  state: (): State => {
    return {
      showLogo: false,
      showMenu: false,
      menuList: [
        {
          url: '#why-so-healthy',
          name: 'Вкус и польза'
        },
        {
          url: '#delivery',
          name: 'Доставка'
        },
        {
          url: '#catalog',
          name: 'Каталог'
        },
        {
          url: '#contacts',
          name: 'Контакты'
        }],
      isMenuScroll: false,
      showAboutGranny: false,
      aboutGrannyText: `
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__center">Здравствуйте мои дорогие. \r\n Я <span class="about-granny-container_block_text_item__orange">Бабушка Лида</span>.</div>  
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Я создаю самые вкусные и самые полезные муссовые торты и пироженные. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> А о том на сколько красивые и уникальные торты у меня получаются уже ходят сказки и легенды. </div> 
      <div class="about-granny-container_block_text_item about-granny-container_block_text_item__intent"> Просто попробуйте, и Вы всё чаще будете возвращаться ко мне в гости.</div>`,
      showWhySoHealthy: false,
      whySoHealthyTitle: `
      <div class="why-so-healthy-container_block_title_text">Почему мои торты <span class="why-so-healthy-container_block_title_text__orange">вкусные</span>,
      <span class="why-so-healthy-container_block_title_text__orange">красивые</span>
      и такие <span class="why-so-healthy-container_block_title_text__orange">полезные</span>?
      </div>`,
      healthyText: {
        firstRowHealthy: `<div class="why-so-healthy-container_block_body_left_part_text_item"><span class="why-so-healthy-container_block_body_left_part_text_item__orange">Полезные</span> они,
         потому что я использую натуральные и свежие продукты.</div>
         <div class="why-so-healthy-container_block_body_left_part_text_item">В основании торта находится бисквит из миндальной муки с миндальной крошкой. Пшеничную муку я не использую. Мои торты низкокалорийные и низкобелковые.
         Белок присутствует только в желатине с расчетом 10-12 грамм на 1 килограмм торта.</div>
         <div class="why-so-healthy-container_block_body_left_part_text_item">Так же я стараюсь использовать натуральные красиатели: чай матча зелёный или голубой, спирулина голубая, 
         порошок цветков гибискуса, сиреневой питахаи и еще много подобных вкусностей.
        </div>
        <div class="why-so-healthy-container_block_body_left_part_text_item why-so-healthy-container_block_body_left_part_text_item__center">Но есть кое-что что я не использую:</div>`,
        list: ['лактозу','глютен',' искусственные красители','консерванты'],
        secondRowHealthy: `<div class="why-so-healthy-container_block_body_left_part_text_item"><span class="why-so-healthy-container_block_body_left_part_text_item__orange">Вкусные</span> они,
         потому что основная масса это мусс из сливок с любой ягодой или любым фруктом. Также мусс может быть карамельным или шоколадным. 
         На выбор три классчиеских шоколада - белый, молочный, тёмный</div>
         <div class="why-so-healthy-container_block_body_left_part_text_item">А ещё они вкусные, потому что я вкладываю в каждое изделие частичку своей души и любви к Вам.</div>
         <div class="why-so-healthy-container_block_body_left_part_text_item"><span class="why-so-healthy-container_block_body_left_part_text_item__orange">Красивые</span> они,
         потому что внутри изделия идёт желейная прослойка из любйо ягоды, которая может быть ровной, круглой и даже в виде сердечка. Это красиво смотрится на разрезе.
        </div>
        <div class="why-so-healthy-container_block_body_left_part_text_item">А ещё они красивые, потому что мне нравится видеть Ваши счастливые глаза.</div>`
      },
      showDelivery: false,
      deliveryTitle: `<div class="delivery-container_block_title_text">Как мои торты попадают к вам на стол?</div>`,
      deliveryText: `<div class="delivery-container_block_body_right_part_text_item"> При изготовлении кондитерских изысков, я вкладываю в них свою  
        <span class="delivery-container_block_body_right_part_text_item__orange">любовь, мастерство и вдохновение</span>, поэтому лучше всего будет, если Вы приедите ко мне в гости, 
        и я вручу мой торт в том виде, который задумала я.
        </div>
        <div class="delivery-container_block_body_right_part_text_item">Однако можно заказать доставку и курьером. Сами заказы принимаются не меньше, чем за неделю.
        А вот если Вам нужно срочно, попрошу Вас доплатить.</div>
      `,
      deliveryAddres: `ул. Народного ополчения, д. 48, к. 1, кв. 39`,
      showCatalog: false,
      catalogTitle: `<div class="catalog-container_block_title_text">А вот и сами <span class="catalog-container_block_title_text__orange">торты</span> и 
      <span class="catalog-container_block_title_text__orange">пироженные</span></div>`,
      catalogList: [],
      catalogModal: {
        show: false,
        index: -1
      },
      showContacts: false,
      contactsTitle: `
        <div class="contacts-container_block_title_text">Как со мной <span class="contacts-container_block_title_text__orange">связаться</span>?
        </div>`,
      contactsList: [
        {img: 'watsapp.png',  text: '+7 916 853-52-82', link: 'https://wa.me/+79168535282'},
        {img: 'telegram.png',  text: '+7 916 853-52-82', link: 'https://t.me/+79168535282'}
      ],
      contactsPhone: '+7 916 853-52-82',
      contactsForm: {
        title: `
        <div class="contacts-form_block_title_text">Напиши мне и я обязательно приготовлю торт <span class="contacts-form_block_title_text__orange">твоей мечты</span>
        </div>`,
        name: '',
        phone: '',
        comments: '',
        aggrement: false,
        warning: {
          show: false,
          text: 'К сожалению отправить данные не удалось, попробуйте ещё раз',
          success: false
        }
      },
      isMobile: false
    }
  },
  getters: {
    CatalogList: (state) => state.catalogList,
    CatalogIndex: (state) => state.catalogModal.index,
    ContactForm: (state) => { return {
      name: state.contactsForm.name,
      phone: state.contactsForm.phone,
      comments: state.contactsForm.comments,
    }}
  },
  actions: {
    async getCatalogList() {
      
      await fetch('/api/getCards')
        .then( response => {
          if ([200,204].includes(response.status)){
            response.json().then( res => {
              this.catalogList = res
            })
          }
        })

    },
    async sendOrder() {

      const {  name, phone, comments, warning, aggrement } = this.contactsForm

      warning.show = false 
      
      if (name == ''){
        warning.success = false
        warning.text = 'Пожалуйста введите Ваше имя'
        warning.show = true
      } else if (phone == '') {
        warning.success = false
        warning.text = 'Пожалуйста введите Ваш телефон'
        warning.show = true
      } else if (!aggrement) {
        warning.success = false
        warning.text = 'Пожалуйста согласитесь на обработку данных'
        warning.show = true
      }else {

       

        await fetch('/api/sendOrder',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            comments
          }),
        })
          .then( response => {
            if ([200,204].includes(response.status)){
              response.json().then( () => {
                warning.success = true
                warning.text = 'Ваше письмо успешно отправлено'
                warning.show = true
                setTimeout( () => {
                  warning.show = false
                },3000)
              })
            } else {
              warning.success = false
              warning.text = 'К сожалению, письмо отправить не удалось. Попробуйте еще раз.'
              warning.show = true
            }
            
          })
          .catch(() => {
            warning.success = false
            warning.text = 'К сожалению, письмо отправить не удалось. Попробуйте еще раз.'
            warning.show = true
          })

      }

    }
  }
})


