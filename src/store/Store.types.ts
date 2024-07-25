export interface State {
  showLogo: boolean
  showMenu: boolean
  menuList: {name: string, url: string}[]
  isMenuScroll: boolean
  showAboutGranny: boolean
  aboutGrannyText: string
  showWhySoHealthy: boolean
  whySoHealthyTitle: string
  healthyText: {
    previewHealthy: string
    list: string[]
    endingHealthy: string
  },
  showDelivery: boolean
  deliveryTitle: string
  deliveryText: string
  showCatalog: boolean
  catalogTitle: string
  catalogList: {
    name: string
    price: number
    shortDescription: string
    description: string
    imgPath: string
    composition: string[]
    gallery: string[]
    calories: {
      protein: string
      fats: string
      carbo: string
      calorie: string
    }
  }[],
  catalogModal: {
    show: boolean
    index: number
  },
  showContacts: boolean
  contactsTitle: string
  contactsList: {
    img: string
    text: string
    link: string
  }[],
  contactsPhone: string
  contactsForm: {
    title: string
    name: string
    phone: string
    comments: string
    aggrement: boolean
    warning: {
      show: boolean
      text: string
      success: boolean
    }
  }
}

export interface AdminState {
  needAuth: boolean
  authForm: {
    show: boolean
    login: string
    pass: string
    type: string
    warning: string
    preloader: boolean
  }
}


