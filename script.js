function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x - (width / 2), y - (height / 2), width, height)
}


// 1. 기본 공격
// 2. 방어 (뎀감 50%)
// 3. 힐
// 4. 피흡 공격

const enemyStats = {
    health: 2000,
    basicAttackDamage: 5
}

const enemyUi = {
    health() {
        ctx.fillStyle = 'black'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(enemyStats.health, center.x, 40)
    }
}

const playerStats = {
    coin: 100,
    actionPoint: 10,
    health: 1000,
    // q
    basicAttackDamage: 10,
    // w
    defenseAmount: 50,
    defenseturnmax: 2,
    defenseturncur: 0, //뎀감 버프 현재 턴
    defenseusing: false,
    // e
    healAmount: 50,
    // r
    lifeStealAmount: 50,
    lifeStealDamageAmount: 50,
}

const playerUi = {
    health() {
        ctx.fillStyle = 'black'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(playerStats.health, center.x, canvas.height - 25)
    }
}

const playerturn = 0
const oppturn = 1
let turn = playerturn

function endturn() {
    turn = turn == playerturn
        ? oppturn
        : playerturn
}

function enemyai() {
    console.log('적 턴 시작!')


    if (playerStats.defenseusing == true) {
        let dmg = enemyStats.basicAttackDamage - (enemyStats.basicAttackDamage / (100 / playerStats.defenseAmount))
        dmg = Math.floor(dmg)//소숫점 버림
        playerStats.health -= dmg
        console.log(`기본 공격! ${dmg}의 피해를 주었다!`)

    } else {
        playerStats.health -= enemyStats.basicAttackDamage
        console.log(`기본 공격! ${enemyStats.basicAttackDamage}의 피해를 주었다!`)
    }
    endturn()

    playerStats.actionPoint = 10

    if (playerStats.defenseusing == true) {
        playerStats.defenseturncur += 1
        console.log(`뎀감 버프 남은 턴: ${playerStats.defenseturnmax - playerStats.defenseturncur}`)
        if (playerStats.defenseturncur == playerStats.defenseturnmax) {
            playerStats.defenseusing = false
            playerStats.defenseturncur = 0
        }
    }
}

function useactionPoint(ap) {
    if (playerStats.actionPoint < ap) {
        console.log('action point 부족!')
        return false
    }
    playerStats.actionPoint -= ap
    return true

}

// 키보드 인풋
window.addEventListener('keydown', event => {
    if (turn == oppturn)
        return

    if (event.key == 'Enter') {
        console.log('턴 종료!')
        endturn()
        setTimeout(enemyai, 1000)

    }
    if (event.key == 'q') {
        if (!useactionPoint(2)) return
        enemyStats.health -= playerStats.basicAttackDamage
        console.log(`기본 공격! ${playerStats.basicAttackDamage}의 피해를 주었다!`)
    }

    if (event.key == 'w') {
        if(!useactionPoint(8)) return
        playerStats.defenseusing = true
        playerStats.defenseturncur = 0
        console.log(`뎀감 버프! (${playerStats.defenseAmount}% 뎀감)`)
    }

    if (event.key == 'e') {
        if(!useactionPoint(8)) return
        playerStats.health += playerStats.healAmount
        console.log(`회복! ${playerStats.healAmount}만큼 체력 회복!`)
    }

    if (event.key == 'r') {
        if(!useactionPoint(10)) return
        enemyStats.health -= playerStats.lifeStealDamageAmount
        playerStats.health += playerStats.lifeStealAmount
        console.log(`피흡! ${playerStats.lifeStealDamageAmount}의 피해를 주고 ${playerStats.lifeStealAmount}만큼 피흡!`)
    }
})


// loop 반복 되는 코드
function loop() {
    // 화면 전체를 지움
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 플레이어 그리기
    drawRect(center.x, canvas.height - 100, 100, 100, '#4287f5')

    // 적 그리기
    drawRect(center.x, 100, 100, 100, '#f5428a')

    // 체력 표시 하기
    playerUi.health()
    enemyUi.health()

    requestAnimationFrame(loop)
}

loop()