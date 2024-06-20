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
  }
}


