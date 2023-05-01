const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const ATTACK_MODE = 'ATTACK';
const STRONG_ATTACK_MODE = 'STRONG_ATTACK';
const HEAL_VALUE = 20;

const userInputForMaxLife = prompt('Maximum life for you and Monster.', '100');

let choseMaxLife = parseInt(userInputForMaxLife);

if (isNaN(choseMaxLife) || choseMaxLife <= 0) {
  choseMaxLife = 100;
}

let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;

let hasBonusLife = true;

adjustHealthBars(choseMaxLife);

function reset() {
  currentMonsterHealth = choseMaxLife;
  currentPlayerHealth = choseMaxLife;
  if (!hasBonusLife) {
    hasBonusLife = true;
    // changes for bonus life reset in UI
  }
  resetGame(choseMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth; // this is used for bonus life
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth; // to update actual data
    setPlayerHealth(initialPlayerHealth); // calling vendor.js method to update UI
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('Match Draw!');
  }

  // if (
  //   (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) ||
  //   (currentMonsterHealth <= 0 && currentMonsterHealth >= 0) ||
  //   (currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
  // ) {
  //   reset();
  // }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function attackMonster(mode) {
  let maxDamage;

  if (mode === ATTACK_MODE) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === STRONG_ATTACK_MODE) {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound(); // Damages to player
}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}
function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  let healValue;

  currentPlayerHealth = 79;
  if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
    // currentPlayerHealth = 95
    // choseMaxLife = 100 Already delared as global variable
    //  HEAL_VALUE = 20  Already delared as global variable
    //   95 >= 100 - 20; which is not possible
    alert(`You can't heal to more than your max initial health.`);
    healValue = choseMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  inrecasePlayerHealth(healValue); //UI update > changed Progress bar value for player health
  currentPlayerHealth += healValue; // Data update
  endRound(); // Damages to player
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
