export default interface State {
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
  }[]
}


