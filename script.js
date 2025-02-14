// Получаем элементы
const buttons = document.querySelector('.buttons')
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const result = document.getElementById('result');
const container = document.querySelector('.container');
const easterEgg = document.querySelector('.easter-egg')
const progressContainer = document.querySelector('.progress-container');
let countNo = 0

// Функция для перемещения кнопки "Нет"
function moveNoButton(event) {

  if(countNo === 19){
    noButton.removeEventListener('mouseenter', moveNoButton)
    noButton.addEventListener('click', () => {
      document.querySelector('.engry-wrapper').classList.add('visible')
      easterEgg.style.display = 'none'
    })
  }
  const containerRect = document.querySelector('.container').getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  // Генерируем случайные координаты внутри контейнера
  const randomX = Math.random() * (containerRect.width - buttonRect.width);
  const randomY = Math.random() * (containerRect.height - buttonRect.height);

  // Устанавливаем новые координаты
  noButton.style.position = 'absolute';
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
  countNo++
}

// Добавляем обработчик события для кнопки "Нет"
noButton.addEventListener('mouseenter', moveNoButton);

// Функция для создания дождя из сердечек
function createHeartRain() {
  const heartCount = 50; // Количество сердечек
  const container = document.querySelector('.heart-content');

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`; // Случайная позиция по горизонтали
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // Случайная скорость
    heart.style.fontSize = `${Math.random() * 20 + 10}px`; // Случайный размер
    container.appendChild(heart);

    // Удаляем сердечко после завершения анимации
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }
}

// Добавляем обработчик события для кнопки "Да"
yesButton.addEventListener('click', () => {
  // Показываем результат
  result.classList.remove('hidden');
  buttons.style.display = 'none'
  setTimeout(() => {
    container.classList.add('invisible');
    progressContainer.classList.remove('invisible');
    easterEgg.style.display = 'none'
    animateProgressBar();
  }, 5000);
  // Запускаем дождь из сердечек
  createHeartRain();
});

function animateProgressBar() {
  const progressFill = document.getElementById('progressFill');
  const progressLabels = document.querySelector('.progress-labels');

  const content = {
    0: 'Не люблю',
    25: 'Ну так, присунуть можно',
    50: 'А вот это уже что-то',
    75: 'Может это реально любовь',
    100: 'Ты мое все, давай доживем до старости вместе'
  };

  const totalDuration = 10000; // Общая длительность анимации в мс
  let startTime = null;
  let lastLabelStep = -1; // Последний ключевой шаг текста

  function updateProgressBar(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime; // Время, прошедшее с начала
    const progress = Math.min(elapsed / totalDuration, 1); // Прогресс от 0 до 1
    const width = progress * 100; // Прогресс в процентах

    // Обновляем ширину прогресс-бара плавно
    progressFill.style.width = `${width}%`;

    // Определяем, какой текст сейчас должен отображаться
    const steps = Object.keys(content).map(Number); // [0, 25, 50, 75, 100]
    const currentStep = steps.find((step) => step <= width && step > lastLabelStep);

    // Обновляем текст только при переходе на следующий ключевой шаг
    if (currentStep !== undefined) {
      progressLabels.textContent = content[currentStep];
      lastLabelStep = currentStep;
    }

    // Продолжаем анимацию, если не завершено
    if (progress < 1) {
      requestAnimationFrame(updateProgressBar);
    }
  }

  // Запускаем анимацию
  requestAnimationFrame(updateProgressBar);
}
