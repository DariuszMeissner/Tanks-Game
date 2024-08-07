import { AssetsType, AssetsTypeLookup } from '../constants/game.js';

export default class AssetsService {
  constructor() {
    this.assets = new Map();
  }

  #loadImage(key, fileName, onComplete) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener(
        'load',
        () => {
          this.assets.set(key, image);
          resolve({ fileName, image });

          if (typeof onComplete === 'function') onComplete({ fileName, image });
        },
        { once: true }
      );

      image.src = fileName;
    });
  }

  #loadSound(key, fileName, onComplete) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.addEventListener(
        'canplay',
        () => {
          this.assets.set(key, audio);
          resolve({ fileName, audio });

          if (typeof onComplete === 'function') onComplete({ fileName, audio });
        },
        { once: true }
      );

      audio.src = fileName;
    });
  }

  #loadFont(key, fileName, onComplete) {
    return new Promise((resolve, reject) => {
      const font = new FontFace(key, `url(${fileName})`);

      font.load().then(
        () => {
          resolve({ fileName, font });
          document.fonts.add(font);
          this.assets.set(key, font);

          if (typeof onComplete === 'function') onComplete({ fileName, font });
        },
        (err) => console.error(err)
      );
    });
  }

  async load(assetsArray, onComplete) {
    const promises = assetsArray.map(([key, fileName]) => {
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
      const type = AssetsTypeLookup[extension];

      if (type === AssetsType.IMAGE) {
        return this.#loadImage(key, fileName, onComplete);
      } else if (type === AssetsType.SOUND) {
        return this.#loadSound(key, fileName, onComplete);
      } else if (type === AssetsType.FONT) {
        return this.#loadFont(key, fileName, onComplete);
      } else {
        throw new TypeError('Error unknown type');
      }
    });

    return Promise.all(promises).then((loadedAssets) => {
      for (const { key, assets } of loadedAssets) {
        this.assets.set(key, assets);
      }
    });
  }
}
