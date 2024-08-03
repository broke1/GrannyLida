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
    id: number,
    name: string
    price: number
    shortDescription: string
    description: string
    composition: string
    protein: string
    fats: string
    carbo: string
    calorie: string
    gallery: string
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
  },
  cards: {
    preloader: boolean,
    body: {
      id: number,
      name: string
      price: number | null
      shortDescription: string
      description: string
      composition: string
      protein: string
      fats: string
      carbo: string
      calorie: string
      gallery: string
    }[],
    warning: {
      show: boolean
      text: string
      success: boolean
    }
  }
  cardForm: {
    id: number
    name: string
    price: number | null
    shortDescription: string
    description: string
    composition: string
    gallery: File[] | string[]
    calories: {
      protein: string
      fats: string
      carbo: string
      calorie: string
    }
    preloader: boolean
    warning: {
      show: boolean
      text: string
      success: boolean
    }
    show: boolean,
    btnText: string
  }
}


