export default interface State {
  showLogo: boolean
  showMenu: boolean
  menuList: string[]
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


