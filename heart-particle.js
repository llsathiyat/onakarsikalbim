const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 800;

const settings = {
  particleGap: isMobile ? 7 : 5,
  particleSize: isMobile ? 4 : 2,
  mouseForce: 30,
  noise: 30,
  layerCount: isMobile ? 1 : 3,
  layerDistance: 5,
  heartBeat: true,
  beatStrength: 200 };


const heart = new NextParticle({
  renderer: 'webgl',
  image: document.querySelector('#valentines'),
  width: window.innerWidth,
  height: window.innerHeight,
  particleGap: settings.particleGap,
  particleSize: settings.particleSize,
  mouseForce: settings.mouseForce,
  noise: settings.noise,
  layerCount: settings.layerCount,
  layerDistance: settings.layerDistance });


function redraw() {
  heart.particleGap = settings.particleGap;
  heart.particleSize = settings.particleSize;
  heart.mouseForce = settings.mouseForce;
  heart.noise = settings.noise;
  heart.layerCount = settings.layerCount;
  heart.layerDistance = settings.layerDistance;
  heart.width = window.innerWidth;
  heart.height = window.innerHeight;

  heart.start({
    initPosition: 'none',
    initDirection: 'none' });

};

const gui = new dat.GUI();
gui.add(settings, 'particleGap', 1, 20, 1).name('Parçacık Aralığı').onChange(redraw);
gui.add(settings, 'particleSize', .5, 20, .1).name('Parçacık Boyutu').onChange(redraw);
gui.add(settings, 'mouseForce', -300, 300, 5).name('Fare Etkisi').onChange(redraw);
gui.add(settings, 'noise', 0, 100, 1).name('Gürültü').onChange(redraw);
gui.add(settings, 'layerCount', 1, 15, 1).name('Katman Sayısı').onChange(redraw);
gui.add(settings, 'layerDistance', 0.1, 20, .1).name('Katman Mesafesi').onChange(redraw);
gui.add(settings, 'heartBeat').name('Kalp Atışı');
gui.add(settings, 'beatStrength', 0, 500, 1).name('Atış Gücü');

// Başlık ekleme ve Türkçeleştirme
setTimeout(() => {
  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = 'Kalp Ayarları';
  gui.domElement.insertBefore(title, gui.domElement.firstChild);
  
  // Close controls yazısını Türkçe yap
  const closeButton = gui.domElement.querySelector('.close-button');
  if (closeButton) {
    closeButton.textContent = 'Kontrolleri Kapat';
  }
}, 100);

if (isMobile) {
  gui.close();
}

window.addEventListener('resize', redraw);

setInterval(() => {
  if (settings.heartBeat) {
    const strength = settings.beatStrength;
    heart.origins.map(o => o.z -= strength);
    setTimeout(() => {
      heart.origins.map(o => o.z += strength);
    }, isMobile ? 200 : 100);
  }
}, isMobile ? 2500 : 1500);