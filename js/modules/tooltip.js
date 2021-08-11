export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips)
    //bind do objeto da classse aos objetos da classe
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
  }
  //Move a tooltip com base nos seus estilos de acordo com mouse
  
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`
    this.tooltipBox.style.left = `${event.pageX + 20}px`
  }
  
  //Remove a tooltip e os eventos de mouse over e leave
  onMouseLeave(event) {
    this.tooltipBox.remove()
    event.currentTarget.removeEventListener('mouseleave', this.onMouseLeave)
    event.currentTarget.removeEventListener('mousemove', this.onMouseMove)
  }
  
  //Cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div')
    const text = element.getAttribute('aria-label')
    tooltipBox.classList.add('tooltip')
    tooltipBox.innerText = text
    document.body.appendChild(tooltipBox)
    this.tooltipBox = tooltipBox
  }

  onMouseOver(event) {
    //cria a tooltip box e coloca em propriedade
    this.criarTooltipBox(event.currentTarget)
    event.currentTarget.addEventListener('mousemove', this.onMouseMove)
    event.currentTarget.addEventListener('mouseleave', this.onMouseLeave)
  }
  
  //adiciona os eventos de mouse over e leave a cada tooltip
  addToolTipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver)
    })
  }
  
  init() {
    if (this.tooltips.length) {
      this.addToolTipsEvent()
    }
    return this
  }
}
