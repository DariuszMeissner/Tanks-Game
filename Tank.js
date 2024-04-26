export default class Tank {
  constructor(x, y, width, height, bulletController) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.widthOriginal = width;
    this.heightOriginal = height;
    this.speed = 2;
    this.angle = 0
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.shootPressed = false;
    this.bulletController = bulletController;
    this.bulletSpeed = 3;
    this.bulletDelay = 10;
    this.bulletDamage = 1;
    this.direction = 'forward';

    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
  }

  draw(ctx) {
    this.move();
    // tank body
    ctx.beginPath();
    ctx.rect(
      this.x / 2,
      this.y,
      this.width,
      this.height
    );
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const bulletX = this.x / 2 + (this.width / 5 * 2);
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction)
    }
  }

  move() {
    if (this.forward) {
      this.y -= this.speed
    };
    if (this.reverse) {
      this.y += this.speed
    };
    if (this.left) {
      this.x -= this.speed
    };
    if (this.right) {
      this.x += this.speed
    };

    switch (this.direction) {
      case 'forward':
        this.width = this.widthOriginal;
        this.height = this.heightOriginal;
        break;
      case 'reverse':
        this.width = this.widthOriginal;
        this.height = this.heightOriginal;
        break;
      case 'left':
        this.width = this.heightOriginal;
        this.height = this.widthOriginal;
        break;
      case 'right':
        this.width = this.heightOriginal;
        this.height = this.widthOriginal;
        break;
    }

  }

  keydown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        this.direction = 'left'
        this.forward = false;
        this.left = true;
        this.right = false;
        this.reverse = false;
        break;
      case "ArrowRight":
        this.direction = 'right'
        this.forward = false;
        this.left = false;
        this.right = true;
        this.reverse = false;
        break;
      case "ArrowUp":
        this.direction = 'forward'
        this.forward = true;
        this.left = false;
        this.right = false;
        this.reverse = false;
        break;
      case "ArrowDown":
        this.direction = 'reverse'
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = true;
        break;
      case "Space":
        this.shootPressed = true;
        break;
    }
  }

  keyup = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        this.left = false;
        break;
      case "ArrowRight":
        this.right = false;
        break;
      case "ArrowUp":
        this.forward = false;
        break;
      case "ArrowDown":
        this.reverse = false;
        break;
      case "Space":
        this.shootPressed = false;
        break;
    }
  }
}