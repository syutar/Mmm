let canvas = document.getElementById('canvas')

// 너비와 높이를 화면 크기와 똑 같이 만들어 줌
canvas.width = window.innerWidth
canvas.height = window.innerHeight

center = { 
  x: canvas.width / 2,
  y: canvas.height / 2
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  center.x = canvas.width / 2
  center.y = canvas.height / 2
})

// canvas api 가져오기
let ctx = canvas.getContext('2d')