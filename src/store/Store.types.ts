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
    name: string,
    price: number,
    shortDescription: string,
    description: string
    inside: string[],
    mainImg: string
  }[],
  showCatalogModal: {
    show: boolean,
    index: number
  }
}


