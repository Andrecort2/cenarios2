chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "applyEffect") {
    const effect = request.effect;
    const images = document.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      if (effect === "pixelation") {
        applyPixelationEffect(images[i]);
      }
    }
  }
});

function applyPixelationEffect(image) {
  const originalSrc = image.src;
  const width = image.width;
  const height = image.height;

  const app = new PIXI.Application({ width, height, transparent: true });
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  image.parentNode.insertBefore(app.view, image);
  image.style.display = "none";

  PIXI.Loader.shared.add(originalSrc).load(() => {
    const texture = PIXI.Loader.shared.resources[originalSrc].texture;
    const sprite = new PIXI.Sprite(texture);

    const pixelationFilter = new PIXI.filters.PixelateFilter();
    pixelationFilter.size = 4;

    sprite.filters = [pixelationFilter];
    app.stage.addChild(sprite);
  });
}


