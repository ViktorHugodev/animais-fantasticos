import AnimaNumeros from './anima-numeros.js'

export default function fetchAnimais(url, target) {
  
  function createAnimal(animal) {
    const div = document.createElement('div')
    div.classList.add('numero-animal')
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`
    return div
  }
  
  //preenche cada animal no DOM
  const numerosGrid = document.querySelector(target)
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal)
    numerosGrid.appendChild(divAnimal)
  }
  
  //anima os numeros de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo')
    animaNumeros.init()
  }
 
  async function criarAnimais() {
    try {
      //fetch e espera a resposta
      const animaisResponse = await fetch(url)
      //transforma a respsta em json
      const animaisJSON = await animaisResponse.json()
      //apos em json ativa as funcões para preencher e animar os items
      animaisJSON.forEach(animal => preencherAnimais(animal))
      animaAnimaisNumeros()
    } catch (erro) {
      console.log(erro)
    }
  }
  
  return criarAnimais()
}
